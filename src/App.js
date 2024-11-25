import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Chart from './routes/chart';
import GlobalStyle from '../src/components/common/globalStyle';
import styled from 'styled-components';
import Auth from './routes/Auth';
import Lending from './routes/Lending';
import { ToastContainer } from 'react-toastify';
import EventListener from './components/common/EventListener';
import Setting from './routes/Setting';
import Ranking from './routes/Ranking';
import Market from './routes/Market';

export default function App() {
  return (
    <AppBox className="appBox">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap"
        rel="stylesheet"
      />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <HashRouter>
        <GlobalStyle />
        <EventListener />

        <Routes>
          <Route path="/" element={<Lending />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/crypto/*" element={<Chart />} />
          <Route path="/setting/*" element={<Setting />} />
          <Route path="/ranking/*" element={<Ranking />} />
          <Route path="/market/*" element={<Market />} />
        </Routes>
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  width: 100vw;
  color: #2a2a2a;
  overflow-x: hidden;
`;
