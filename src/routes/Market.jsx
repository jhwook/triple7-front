import { Route, Routes } from 'react-router';
import styled from 'styled-components';
import DefaultHeader from '../components/header/DefaultHeader';
import LeftNav from '../components/common/LeftNav';
import Deposit from './Deposit';
import { D_marketLeftBarList } from '../data/D_market';
import History from './History';

export default function Market() {
  return (
    <PmarketBox>
      <DefaultHeader border />

      <LeftNav list={D_marketLeftBarList} baseUrl={'market'} />

      <Routes>
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </PmarketBox>
  );
}

const PmarketBox = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 60px 0 0 0;
  color: #fff;
  background: #0a0e17;
  overflow: hidden;
`;
