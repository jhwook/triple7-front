import styled from 'styled-components';
import I_candleChartWhite from '../img/icon/I_candleChartWhite.svg';
import I_dnPolWhite from '../img/icon/I_dnPolWhite.svg';
import { useEffect, useLayoutEffect, useState } from 'react';
import PopupBg from '../components/common/PopupBg';
import LoadingBar from '../components/common/LoadingBar';
import { D_timeList, D_tokenCategoryList } from '../data/D_bet';
import BarSizePopup from '../components/common/BarSizePopup';
import ChartTypePopup from '../components/common/ChartTypePopup';
import AmChart from '../components/AmChart';
import TokenPopup from '../components/TokenPopup';
import axios from 'axios';
import { API } from '../api/api';
import DefaultHeader from '../components/header/DefaultHeader';
import { useDispatch, useSelector } from 'react-redux';
import I_qnaWhite from '../img/icon/I_qnaWhite.svg';
import I_buy from '../img/icon/I_buy.svg';
import I_sell from '../img/icon/I_sell.svg';
import { setBetFlag } from '../reducers/chart';
import { setToast } from '../util/Util';
import OrderBook from '../components/orderbook/OrderBook';

export default function Chart() {
  const [assetInfo, setAssetInfo] = useState();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [chartOpt, setChartOpt] = useState({
    type: 'candlestick',
    typeStr: 'Candles',
    barSize: D_timeList[0].value,
    barSizeStr: D_timeList[0].key,
  });
  const [barSizePopup, setBarSizePopup] = useState(false);
  const [chartTypePopup, setChartTypePopup] = useState(false);
  const [tokenPopup, setTokenPopup] = useState(false);
  const [amount, setAmount] = useState('');
  const openedData = useSelector((state) => state.chart.openedData);
  const tokenPopupData = useSelector((state) => state.chart.tokenPopupData);

  const token = localStorage.getItem('token');

  function getAssetList() {
    axios
      .get(`${API.GET_CRYPTO_LIST}`)
      .then(({ data }) => {
        console.log('asset', data.symbolList);
        setAssetInfo(data.symbolList[0]);
      })
      .catch((err) => console.error(err));
  }

  function turnLoader() {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }

  async function onClickPayBtn(type) {
    let _amount;
    setToast({ type, assetInfo, amount });
    axios
      .post(
        `${API.POST_TRADE}/${assetInfo.id}/trades`,
        {
          amount,
          tradeType: type,
          tradeFor: 'SELF',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        dispatch(setBetFlag());
        setToast({ type, assetInfo, amount });
      })
      .catch((err) => console.error(err));
    console.log(type, '---', assetInfo, '---', amount);
  }

  useLayoutEffect(() => {
    localStorage.setItem('balanceType', 'Live');
  }, []);

  useEffect(() => {
    getAssetList();
    turnLoader();
  }, []);

  useEffect(() => {}, [assetInfo, openedData, tokenPopupData]);

  return (
    <>
      <DefaultHeader />
      {loading ? (
        <LoadingBar />
      ) : (
        <>
          <PbetBox>
            <section className="innerBox">
              <article className="tokenArea">
                <div className="selectBox">
                  <button
                    className="selectBtn"
                    onClick={() => setTokenPopup(true)}
                  >
                    <p>{assetInfo?.symbol}</p>
                    <img src={I_dnPolWhite} alt="" />
                  </button>

                  {tokenPopup && (
                    <>
                      <TokenPopup
                        off={setTokenPopup}
                        setAssetInfo={setAssetInfo}
                      />
                      <PopupBg off={setTokenPopup} />
                    </>
                  )}
                </div>
              </article>

              <article className="contArea">
                <div className="orderBook">
                  <OrderBook />
                </div>

                <div className="chartCont">
                  <ul className="btnList">
                    <li>
                      <button
                        className="utilBtn"
                        onClick={() => setBarSizePopup(true)}
                      >
                        <p>{chartOpt.barSizeStr}</p>
                      </button>

                      <p className="info">{`Time frames : ${chartOpt.barSizeStr}`}</p>
                    </li>

                    {barSizePopup && (
                      <>
                        <BarSizePopup
                          off={setBarSizePopup}
                          chartOpt={chartOpt}
                          setChartOpt={setChartOpt}
                        />
                        <PopupBg off={setBarSizePopup} />
                      </>
                    )}

                    <li>
                      <button
                        className="utilBtn"
                        onClick={() => setChartTypePopup(true)}
                      >
                        <img src={I_candleChartWhite} alt="" />
                      </button>

                      <p className="info">{`Chart type : ${chartOpt.typeStr}`}</p>
                    </li>

                    {chartTypePopup && (
                      <>
                        <ChartTypePopup
                          off={setChartTypePopup}
                          chartOpt={chartOpt}
                          setChartOpt={setChartOpt}
                        />
                        <PopupBg off={setChartTypePopup} />
                      </>
                    )}
                  </ul>

                  <AmChart
                    assetInfo={assetInfo}
                    chartOpt={chartOpt}
                    openedData={openedData}
                  />
                </div>

                <div className="actionBox">
                  {/* <div className="timeBox contBox">
                      <div className="key">
                        <p>Time</p>

                        <button className="infoBtn">
                          <img src={I_qnaWhite} alt="" />

                          <span className="hoverPopup">
                            <p>
                              Set the time when your trading operation will be
                              dosed. By placing a “Higher” or “Lower” forecast
                              you will receive the result in 5min.
                            </p>
                          </span>
                        </button>
                      </div>

                      <div className="value">
                        <button
                          className="contBtn"
                          onClick={() => setTimePopup(true)}
                        >
                          <p>
                            {`${Math.floor(duration / 60)}`.padStart(2, '0')}:
                            {`${duration % 60}`.padStart(2, '0')}:00
                          </p>

                          <img src={I_timeWhite} alt="" />
                        </button>

                        {timePopup && (
                          <>
                            <TimePopup
                              off={setTimePopup}
                              duration={duration}
                              setDuration={setDuration}
                            />
                            <PopupBg off={setTimePopup} />
                          </>
                        )}
                      </div>
                    </div> */}

                  <div className="amountBox contBox">
                    <div className="key">
                      <p>Amount</p>

                      <button className="infoBtn" onClick={() => {}}>
                        <img src={I_qnaWhite} alt="" />

                        <span className="hoverPopup">
                          <p>{'Specify the exact amount of trade.'}</p>
                        </span>
                      </button>
                    </div>

                    <div className="value">
                      <p className="unit">$</p>
                      <input
                        value={amount}
                        onChange={(e) => {
                          const onlyNumbers = e.target.value.replace(
                            /[^0-9]/g,
                            ''
                          ); // 숫자만 남기기
                          setAmount(onlyNumbers);
                        }}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <span className="btnBox">
                    <button
                      className="highBtn"
                      disabled={!amount}
                      onClick={() => onClickPayBtn('BUY')}
                    >
                      <span className="defaultBox">
                        {/* <img src={I_buy} alt="" /> */}
                        <strong>BUY</strong>
                      </span>
                    </button>
                  </span>

                  <span className="btnBox">
                    <button
                      className="lowBtn"
                      disabled={!amount}
                      onClick={() => onClickPayBtn('SELL')}
                    >
                      <span className="defaultBox">
                        {/* <img src={I_sell} alt="" /> */}
                        <strong>SELL</strong>
                      </span>
                    </button>
                  </span>
                </div>
              </article>
            </section>
          </PbetBox>
        </>
      )}
    </>
  );
}

const PbetBox = styled.main`
  height: 100vh;
  padding: 0 30px 0;
  color: #fff;
  background: #0a0e17;
  overflow-y: scroll;

  .innerBox {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 60px 0 30px 0;

    .tokenArea {
      display: flex;
      align-items: center;
      gap: 30px;
      height: 60px;

      .selectBox {
        position: relative;

        .selectBtn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          min-width: 154px;
          height: 40px;
          padding: 0 24px;
          font-size: 16px;
          font-weight: 700;
          border: 1px solid #ffffff;
          border-radius: 20px;

          img {
            width: 8px;
          }
        }
      }

      & > .tokenList {
        flex: 1;
        display: flex;
        gap: 8px;
        overflow-x: scroll;
        position: relative;

        li {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 40px;
          padding: 0 20px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          cursor: pointer;

          img {
            width: 15px;
          }

          .textBox {
            display: flex;
            gap: 20px;
            font-size: 14px;
            cursor: pointer;

            p {
              white-space: nowrap;
            }
          }
        }

        .filter {
          width: 120px;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.94)
          );
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
        }
      }
    }

    .contArea {
      flex: 1;
      display: flex;
      overflow: hidden;

      .orderBook {
        width: 20%; /* 부모 요소의 가로 크기를 100%로 설정 */
        height: 100%; /* 원하는 높이로 설정 (필요에 따라 조정) */
        padding: 20px; /* 내부 여백을 추가 */
        margin: 0 auto; /* 요소를 수평 중앙에 배치 */
        overflow: hidden;
        position: relative;
      }

      .chartCont {
        flex: 1;
        display: flex;
        border-radius: 12px;
        overflow: hidden;
        position: relative;

        .btnList {
          display: flex;
          align-items: center;
          gap: 8px;
          top: 24px;
          left: 20px;
          position: absolute;
          z-index: 1;

          li {
            &:hover {
              .info {
                display: inline-block;
              }
            }

            .utilBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 32px;
              height: 32px;
              font-size: 16px;
              font-weight: 700;
              background: #32323d;
              border-radius: 6px;

              &:hover {
                background: #474751;
              }

              img {
                width: 23px;
              }
            }

            .info {
              display: none;
              height: 34px;
              padding: 0 12px;
              font-size: 12px;
              white-space: nowrap;
              line-height: 34px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 4px;
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              top: 44px;
              position: absolute;
            }

            .priceBox {
              display: flex;
              align-items: center;
              gap: 6px;
              margin: 0 0 0 4px;

              &.up {
                .price {
                  color: #3fb68b;
                }

                .percent {
                  background: #3fb68b;
                }
              }

              &.dn {
                .price {
                  color: #ff5353;
                }
              }

              .percent {
                padding: 3px 8px;
                font-size: 12px;
                background: #ff5353;
                border-radius: 6px;
              }
            }
          }
        }
      }

      .actionBox {
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-width: 180px;
        width: 180px;
        padding: 20px;
        margin: 0 0 0 10px;
        background: #181c25;
        border-radius: 12px;

        .contBox {
          display: flex;
          flex-direction: column;
          gap: 6px;

          .key {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.4);

            .infoBtn {
              position: relative;

              &:hover {
                .hoverPopup {
                  display: block;
                }
              }

              img {
                width: 12px;
              }

              .hoverPopup {
                display: none;
                width: 210px;
                padding: 10px 12px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                backdrop-filter: blur(40px);
                -webkit-backdrop-filter: blur(40px);
                top: 18px;
                right: 0;
                position: absolute;

                p {
                  color: #fff;
                }
              }
            }
          }

          .value {
            display: flex;
            align-items: center;
            gap: 4px;
            height: 48px;
            padding: 0 18px;
            font-size: 16px;
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 8px;
            position: relative;

            input {
              flex: 1;
            }

            .contBtn {
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;

              p {
                flex: 1;
                text-align: start;
              }
            }

            img {
              width: 20px;
              height: 20px;
              object-fit: contain;
            }
          }
        }

        .btnBox {
          width: 100%;

          button {
            width: 100%;
            height: 48px;
            font-size: 16px;
            border: 1.2px solid;
            border-radius: 8px;
            position: relative;

            .defaultBox {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 20px;
            }

            .hoverBox {
              display: none;

              .hoverPopup {
                padding: 10px;
                font-size: 12px;
                color: #fff;
                white-space: nowrap;
                background: rgba(0, 0, 0, 0.4);
                border-radius: 4px;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                position: fixed;
                transform: translate(-100%, 0);
              }
            }

            &:hover {
              .defaultBox {
                display: none;
              }

              .hoverBox {
                display: block;

                .percent {
                }

                .amount {
                  font-size: 12px;
                }
              }
            }

            &.highBtn {
              color: #3fb68b;
              border-color: #3fb68b;

              &:hover {
                background: rgba(63, 182, 139, 0.2);
                box-shadow: 0px 0px 10px rgba(63, 182, 139, 0.6);
              }
            }

            &.lowBtn {
              color: #ff5353;
              border-color: #ff5353;

              &:hover {
                background: rgba(255, 83, 83, 0.2);
                box-shadow: 0px 0px 10px rgba(255, 83, 83, 0.6);
              }
            }
          }
        }
      }

      & > .plusBtn {
        display: flex;
        align-items: flex-start;
        min-width: 20px;
        width: 20px;
        height: 20px;
        margin: 6px 0 0 10px;
        opacity: 0.6;

        img {
          height: 20px;
          transition: all 0.3s;
        }

        &.on {
          img {
            transform: rotate(45deg);
          }
        }
      }
    }
  }

  footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 14px;
    padding: 0 0 30px;

    button {
      img {
        height: 22px;
      }
    }
  }
`;
