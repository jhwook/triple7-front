import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../api/api';
import I_x from '../../img/icon/I_x.svg';

export default function ProfPopup({ off, offAll }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [data, setData] = useState('');

  const token = localStorage.getItem('token');

  function getData() {
    axios
      .get(API.GET_USER_INFO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setData(data);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getData();
  }, []);
  function onClickLogOutBtn() {
    localStorage.removeItem('token');
    navigate('/');

    if (offAll) offAll();
    off();
  }

  function onClickNav(url) {
    navigate(url);
    off();

    if (offAll) offAll();
  }

  return (
    <PprofPopupBox className="profPopup">
      <button className="exitBtn" onClick={() => off()}>
        <img src={I_x} alt="" />
      </button>

      <div className="profBox">
        <div className="textBox">
          <p className="id">{data.name}</p>
        </div>
      </div>

      <div className="accountBox">
        <div className="title">
          {/* <span className="dot" />

          <p>{t('Live account')}</p> */}
        </div>

        <ul className="infoList">
          {/* <li>
              <p className="key">{t("Deals")}</p>
              <p className="value">{data.deal}</p>
            </li>
            <li>
              <p className="key">{t("Trading turnover")}</p>
              <p className="value">${getBigCount(data.trading_turnover)}</p>
            </li>
            <li>
              <p className="key">{t("Net turnover")}</p>
              <p className="value">${getBigCount(data.net_turnover)}</p>
            </li>
            <li>
              <p className="key">{t("Trading profit")}</p>
              <p className="value">${getBigCount(data.total_win_amount)}</p>
            </li> */}
        </ul>
      </div>

      <ul className="navList">
        <li>
          <button
            className="navBtn"
            onClick={() => onClickNav('/setting/prof')}
          >
            {t('Profile')}
          </button>
        </li>
      </ul>

      <button className="logOutBtn" onClick={onClickLogOutBtn}>
        {t('Sign Out')}
      </button>
    </PprofPopupBox>
  );
}

const PprofPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  width: 380px;
  padding: 24px 30px 34px;
  background: #22262e;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.8);
  top: 70px;
  right: 30px;
  bottom: 30px;
  position: fixed;
  z-index: 6;

  .exitBtn {
    display: block;
    margin: 0 0 0 auto;
    opacity: 0.4;

    img {
      width: 14px;
    }
  }

  .profBox {
    display: flex;
    align-items: center;
    gap: 8px;

    .tierImg {
      height: 68px;
    }

    .textBox {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .id {
        font-size: 18px;
        color: #fff;
      }

      .pos {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }

  .accountBox {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 24px 0;
    font-size: 14px;

    .title {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #fff;

      .dot {
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 50%;
      }
    }

    .infoList {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 14px 20px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 10px;

      li {
        display: flex;
        justify-content: space-between;
        height: 18px;

        .key {
          color: rgba(255, 255, 255, 0.4);
        }

        .value {
          color: #fff;
        }
      }
    }
  }

  .navList {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    border-top: 1.4px solid rgba(255, 255, 255, 0.2);

    li {
      button {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        height: 100%;
        padding: 0 14px;
        height: 40px;
        border-radius: 6px;
        color: rgba(255, 255, 255, 0.4);

        &:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .new {
          color: #ff5353;
        }
      }
    }
  }

  .logOutBtn {
    width: 100%;
    height: 50px;
    font-size: 16px;
    color: #fff;
    border: 1.2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: #fff;
    }
  }
`;
