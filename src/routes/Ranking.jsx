import { Route, Routes, Navigate } from 'react-router';
import styled from 'styled-components';
import DefaultHeader from '../components/header/DefaultHeader';
import LeftBar from '../components/common/LeftNav';
import { D_rankNavList } from '../data/D_position';
import Rank from './Rank';

export default function Ranking() {
  return (
    <PpositionBox>
      <DefaultHeader border />

      <LeftBar list={D_rankNavList} baseUrl={'ranking'} />

      <Routes>
        <Route path="/" element={<Navigate to="/ranking/rank" replace />} />
        <Route path="/rank" element={<Rank />} />
      </Routes>
    </PpositionBox>
  );
}

const PpositionBox = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 60px 0 0 0;
  color: #fff;
  background: #0a0e17;
  overflow: hidden;
`;
