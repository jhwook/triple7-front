import { Route, Routes } from 'react-router';
import styled from 'styled-components';
import DefaultHeader from '../components/header/DefaultHeader';
import LeftNav from '../components/common/LeftNav';
import MyProfile from './MyProfile';
import { D_settingNavList } from '../data/D_setting';
import axios from 'axios';
import { API } from '../api/api';
import { useState, useEffect } from 'react';
import TradingHistory from './TradingHistory';

export default function Setting() {
  const [userData, setUserData] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    console.log('token', token);
    axios
      .get(`${API.GET_USER_INFO}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async ({ data }) => {
        console.log(data);
        // setBalance({ ...data });
        // console.log('balance', balance);
        setUserData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <PmarketBox>
      <DefaultHeader border />

      <LeftNav list={D_settingNavList} baseUrl={'setting'} />

      <Routes>
        <Route path="/prof" element={<MyProfile userData={userData} />} />
        <Route path="/history" element={<TradingHistory />} />
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
