import styled from 'styled-components';
import TitleRow from './TitleRow/TitleRow';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { API } from '../../api/api';

export default function OrderBook() {
  const [sellOrders, setSellOrders] = useState([]);
  const [buyOrders, setBuyOrders] = useState([]);

  const stompClient = useRef(null);
  const url = 'http://localhost:8083/ws';

  useEffect(() => {
    const socket = new SockJS(url);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected');
        stompClient.current.subscribe('/topic/order_book', (message) => {
          const data = JSON.parse(message.body);
          process(data);
        });
      },
      onStompError: (frame) => {
        console.error('Broker error: ', frame.headers['message']);
      },
    });
    stompClient.current.activate();

    return () => {
      stompClient.current.deactivate();
    };
  }, []);

  const process = (data) => {
    if (data?.SELL) {
      setSellOrders(data.SELL);
    }
    if (data?.BUY) {
      setBuyOrders(data.BUY);
    }
  };

  const formatNumber = (arg) => {
    return new Intl.NumberFormat('ko-KR').format(arg);
  };

  const formatPrice = (arg) => {
    return new Intl.NumberFormat('ko-KR', {
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(arg);
  };

  const DepthVisualizerColors = {
    SELL: '#113534',
    BUY: '#3d1e28',
  };

  const DepthVisualizer = ({ depth, orderType }) => (
    <div
      style={{
        backgroundColor:
          orderType === 'SELL'
            ? DepthVisualizerColors.SELL
            : DepthVisualizerColors.BUY,
        height: '1.250em',
        width: `${depth}%`,
        marginTop: -24,
        zIndex: 1,
      }}
    />
  );

  const PriceLevelRow = ({
    total,
    size,
    price,
    reversedFieldsOrder = false,
  }) => (
    <ContainerT isRight={!reversedFieldsOrder}>
      <span className="price">{price}</span>
      <span>{size}</span>
      <span>{total}</span>
    </ContainerT>
  );

  const buildPriceLevels = (levels, orderType) => {
    return levels.map((level, idx) => {
      const total = formatNumber(level[2]);
      const depth = level[3];
      const size = formatNumber(level[1]);
      const price = formatPrice(level[0]);

      return (
        <PriceLevelRowContainer key={idx + depth}>
          <DepthVisualizer depth={depth} orderType={orderType} />
          <PriceLevelRow
            total={total}
            size={size}
            price={price}
            reversedFieldsOrder={orderType === 'BUY'}
          />
        </PriceLevelRowContainer>
      );
    });
  };

  return (
    <Container>
      <TableContainer>
        <TitleRow />
        <div>{buildPriceLevels(sellOrders, 'SELL')}</div>
        <div>{buildPriceLevels(buyOrders, 'BUY')}</div>
      </TableContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  min-height: 31.25em;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  border-color: #263946;

  @media only screen and (min-width: 800px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const TableContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: #bfc1c8;

  @media only screen and (min-width: 800px) {
    width: 100%;
  }
`;

const PriceLevelRowContainer = styled.div`
  margin: 0.155em 0;
`;

const ContainerT = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #121723;
  position: relative;

  &:after {
    background-color: ${(props) => (props.isRight ? '#113534' : '#3d1e28')};
    height: 100%;
    padding: 0.3em 0;
    display: block;
    content: '';
    position: absolute;
    left: 0;
    right: unset;
    z-index: 0;

    @media only screen and (min-width: 800px) {
      left: ${(props) => (props.isRight ? 'unset' : 0)};
      right: ${(props) => (props.isRight ? 0 : 'unset')};
    }
  }

  span {
    z-index: 1;
    min-width: 54px;
  }

  .price {
    color: ${(props) => (props.isRight ? '#118860' : '#bb3336')};
  }
`;
