import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';
import * as am5stock from '@amcharts/amcharts5/stock';
import * as am5xy from '@amcharts/amcharts5/xy';
import axios from 'axios';
import { API } from '../api/api';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setPrice } from '../reducers/chart';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { D_timeList } from '../data/D_bet';

export default function CandleChart({ assetInfo, chartOpt, openedData }) {
  const dispatch = useDispatch();

  // const url = 'http://localhost:8081/ws';

  const [valueSeries, setValueSeries] = useState();
  const [dateAxis, setDateAxis] = useState();
  const [root, setRoot] = useState();
  const [apiData, setApiData] = useState([]);
  const [tooltip, setTooltip] = useState();
  const [currentLabel, setCurrentLabel] = useState();
  const [stockChart, setStockChart] = useState();
  const [currentValueDataItem, setCurrentValueDataItem] = useState();
  const [currentPrice, setCurrentPrice] = useState(0);
  // const [chartOpt, setChartOpt] = useState({
  //   type: 'candlestick',
  //   typeStr: 'Candles',
  //   barSize: D_timeList[0].value,
  //   barSizeStr: D_timeList[0].key,
  // });
  // console.log(assetInfo);
  const stompClient = useRef(null);
  // const url = 'https://013e-1-241-47-142.ngrok-free.app/ws';
  const url = 'http://localhost:8083/ws';
  useEffect(() => {
    const socket = new SockJS(url, null, {
      transports: ['websocket'],
      withCredentials: false, // 이 옵션을 추가하여 CORS 정책을 완화
    }); // WebSocket 설정
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected');

        // 서버로부터 메시지 구독 및 처리
        stompClient.current.subscribe(
          `/topic/get_ticker_price/${assetInfo.symbol}`,
          (message) => {
            try {
              const price = JSON.parse(message.body); // 메시지 파싱
              setCurrentPrice(Number(price));
              // console.log('Received price: ' + price);
            } catch (error) {
              console.error('Error parsing message: ', error);
            }
          }
        );
      },
      onStompError: (frame) => {
        console.error('Broker error: ', frame.headers['message']);
      },
    });

    stompClient.current.activate(); // STOMP 클라이언트 활성화

    return () => {
      stompClient.current.deactivate(); // 컴포넌트 해제 시 연결 종료
    };
  }, []);

  function getPreData() {
    console.log('chartOpt.barSize', chartOpt.barSize);
    axios
      .get(`${API.GET_LATEST_CRYPTO_PRICE}`, {
        params: {
          // symbol: 'BTCUSDT',
          symbol: assetInfo.symbol,
          limit: 900,
        },
      })
      .then(({ data }) => {
        let _data = [];

        console.log('data', data);

        data.prices.map((e, i) => {
          let price;
          let createdAt;
          let newE = e.split(',');
          price = newE[0];
          createdAt = newE[1];
          const utcDate = new Date(createdAt);
          const localDate = new Date(
            utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
          );

          if (localDate % chartOpt.barSize) {
            let _chartIndex = _data.length - 1;

            if (!_data[_chartIndex]?.Open) return;

            if (Number(price) > _data[_chartIndex].High)
              _data[_chartIndex].High = Number(price);
            else if (Number(price) < _data[_chartIndex].Low)
              _data[_chartIndex].Low = Number(price);

            _data[_chartIndex].Close = Number(price);
          } else {
            let _chartIndex = _data.length - 1;

            _data.push({
              Date: localDate.getTime(),
              Open: _data[_chartIndex]?.Close
                ? _data[_chartIndex].Close
                : Number(price),
              High: Number(price),
              Low: Number(price),
              Close: Number(price),
            });
          }
        });

        setApiData([..._data]);
      });
  }

  function getData(price) {
    let pushData;
    let _apiData = apiData;
    let _lastIndex = _apiData[_apiData.length - 1];
    let _now = new Date().setMilliseconds(0);

    dispatch(setPrice({ currentPrice: price, pastPrice: _lastIndex.Close }));

    if (
      Math.floor(_now / chartOpt.barSize) ===
      Math.floor(_lastIndex.Date / chartOpt.barSize)
    ) {
      if (price > _lastIndex.High) _lastIndex.High = price;
      else if (price < _lastIndex.Low) _lastIndex.Low = price;

      _lastIndex.Close = price;

      _apiData[_apiData.length - 1] = _lastIndex;

      valueSeries.data.setIndex(valueSeries.data.length - 1, _lastIndex);
    } else {
      pushData = {
        Date: _now,
        Open: _lastIndex.Close,
        High: price,
        Low: price,
        Close: price,
      };

      valueSeries.data.push(pushData);
    }

    setApiData([...valueSeries.data]);

    if (currentLabel) {
      currentValueDataItem.animate({
        key: 'value',
        to: price,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic),
      });
      currentLabel.set('text', stockChart.getNumberFormatter().format(price));
      let bg = currentLabel.get('background');
      if (bg) {
        if (price < _lastIndex.Open) {
          bg.set('fill', root.interfaceColors.get('negative'));
        } else {
          bg.set('fill', root.interfaceColors.get('positive'));
        }
      }
    }
  }

  function makeEvent(
    dateAxis,
    root,
    tooltip,
    date,
    letter,
    color,
    description
  ) {
    if (!dateAxis) return;

    var dataItem = dateAxis.createAxisRange(
      dateAxis.makeDataItem({ value: date })
    );

    var grid = dataItem.get('grid');
    if (grid) {
      grid.setAll({
        visible: true,
        strokeOpacity: 0.2,
        strokeDasharray: [3, 3],
        stroke: color,
      });
    }

    var bullet = am5.Container.new(root, {
      y: -100,
    });

    var circle = bullet.children.push(
      am5.Circle.new(root, {
        radius: 10,
        stroke: color,
        fill: am5.color(0x181c25),
        tooltipText: description,
        tooltip: tooltip,
        tooltipY: 0,
      })
    );

    var label = bullet.children.push(
      am5.Label.new(root, {
        text: letter,
        stroke: color,
        strokeOpacity: 0.6,
        centerX: am5.p50,
        centerY: am5.p50,
      })
    );

    dataItem.set(
      'bullet',
      am5xy.AxisBullet.new(root, {
        location: 0,
        sprite: bullet,
      })
    );
  }

  useLayoutEffect(() => {
    var root = am5.Root.new('ChartBox');
    setRoot(root);
    root.setThemes([am5themes_Animated.new(root), am5themes_Dark.new(root)]);

    var stockChart = root.container.children.push(
      am5stock.StockChart.new(root, {
        background: am5.Rectangle.new(root, {
          fill: am5.color(0x181c25),
        }),
      })
    );

    root.interfaceColors.setAll({
      grid: 'rgba(255, 255, 255, 0.1)',
      negative: am5.color(0xff5353),
      positive: am5.color(0x3fb68b),
    });

    setStockChart(stockChart);

    root.numberFormatter.set('numberFormat', '#,###.####');

    var mainPanel = stockChart.panels.push(
      am5stock.StockPanel.new(root, {
        wheelY: 'zoomX',
        panX: true,
        panY: true,
      })
    );

    var valueAxis = mainPanel.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          pan: 'zoom',
        }),
        extraMin: 0.1, // adds some space for for main series
        tooltip: am5.Tooltip.new(root, {}),
        numberFormat: '#,###.####',
        extraTooltipPrecision: 2,
      })
    );

    var dateAxis = mainPanel.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        baseInterval: {
          timeUnit: 'second',
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    setDateAxis(dateAxis);

    let currentValueDataItem = valueAxis.createAxisRange(
      valueAxis.makeDataItem({ value: 0 })
    );
    setCurrentValueDataItem(currentValueDataItem);

    let currentLabel = currentValueDataItem.get('label');
    setCurrentLabel(currentLabel);

    if (currentLabel) {
      currentLabel.setAll({
        fill: am5.color(0xffffff),
        background: am5.Rectangle.new(root, { fill: am5.color(0x000000) }),
      });
    }

    let currentGrid = currentValueDataItem.get('grid');
    if (currentGrid) {
      currentGrid.setAll({
        strokeOpacity: 0.5,
        strokeDasharray: [2, 5],
        stroke: am5.color(0xffffff),
      });
    }

    var valueSeries = mainPanel.series.push(
      am5xy.CandlestickSeries.new(root, {
        name: assetInfo.symbol,
        clustered: false,
        valueXField: 'Date',
        valueYField: 'Close',
        highValueYField: 'High',
        lowValueYField: 'Low',
        openValueYField: 'Open',
        calculateAggregates: true,
        xAxis: dateAxis,
        yAxis: valueAxis,
        legendValueText:
          'open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]',
        legendRangeValueText: '',
      })
    );

    setValueSeries(valueSeries);

    stockChart.set('stockSeries', valueSeries);

    var valueLegend = mainPanel.plotContainer.children.push(
      am5stock.StockLegend.new(root, {
        stockChart: stockChart,
        paddingTop: 50,
        paddingLeft: 0,
      })
    );

    var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
      inside: true,
    });

    volumeAxisRenderer.labels.template.set('forceHidden', true);
    volumeAxisRenderer.grid.template.set('forceHidden', true);

    var volumeValueAxis = mainPanel.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: '#.#a',
        height: am5.percent(20),
        y: am5.percent(100),
        centerY: am5.percent(100),
        renderer: volumeAxisRenderer,
      })
    );

    var volumeSeries = mainPanel.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Volume',
        clustered: false,
        valueXField: 'Date',
        valueYField: 'Volume',
        xAxis: dateAxis,
        yAxis: volumeValueAxis,
        legendValueText: "[bold]{valueY.formatNumber('#,###.0a')}[/]",
      })
    );

    volumeSeries.columns.template.setAll({
      strokeOpacity: 0,
      fillOpacity: 0.5,
    });

    stockChart.set('volumeSeries', volumeSeries);

    valueLegend.data.setAll([valueSeries, volumeSeries]);

    mainPanel.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        yAxis: valueAxis,
        xAxis: dateAxis,
        snapToSeries: [valueSeries],
        snapToSeriesBy: 'y!',
      })
    );

    let cursor = mainPanel.get('cursor');

    cursor.lineX.setAll({
      strokeDasharray: [2, 5],
      stroke: am5.color(0xffffff),
    });

    cursor.lineY.setAll({
      strokeDasharray: [2, 5],
      stroke: am5.color(0xffffff),
    });

    var tooltip = am5.Tooltip.new(root, {
      getStrokeFromSprite: false,
      getFillFromSprite: false,
    });

    setTooltip(tooltip);

    tooltip.get('background').setAll({
      stroke: am5.color(0xffffff),
      strokeOpacity: 0.8,
    });

    mainPanel.set('tooltip', tooltip);
  }, []);

  useEffect(() => {
    if (!root) return;

    getPreData();
  }, [root, chartOpt]);

  // useEffect(() => {
  //   socket.on('get_ticker_price', (res) => {
  //     if (!res) return;
  //     console.log(res);
  //     setCurrentPrice(Number(res));
  //   });
  // }, []);
  // ==============================================================================================

  // ==============================================================================================

  useEffect(() => {
    if (!apiData[0]) return;
    valueSeries.data.setAll([...apiData]);

    let _dataInterval = setTimeout(() => {
      // socket.emit('get_ticker_price', assetInfo.APISymbol);
      // stompClient.current.subscribe('/topic/get_ticker_price');
      if (currentPrice) getData(currentPrice);
    }, 100);

    return () => {
      clearTimeout(_dataInterval);
    };
  }, [
    apiData,
    currentPrice,
    valueSeries,
    currentLabel,
    currentValueDataItem,
    stockChart,
  ]);

  useEffect(() => {
    if (!openedData) return;
    console.log(openedData);
    openedData.map((e) => {
      makeEvent(
        dateAxis,
        root,
        tooltip,
        Number(moment(e.createdat).format('x')),
        e.side === 'HIGH' ? 'H' : 'L',
        am5.color(e.side === 'HIGH' ? 0x3fb68b : 0xff5353),
        Number(e.startingPrice).toFixed(2)
      );
    });
  }, [dateAxis, root, tooltip, openedData]);

  // console.log(chartOpt.type);

  return <AmChartBox id="ChartBox"></AmChartBox>;
}

const AmChartBox = styled.div`
  flex: 1;
  overflow: hidden;
`;
