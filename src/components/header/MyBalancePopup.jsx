import { useEffect, useState } from 'react';
import styled from 'styled-components';
import I_xWhite from '../../img/icon/I_xWhite.svg';
import I_chkOrange from '../../img/icon/I_chkOrange.svg';
import axios from 'axios';
import { API } from '../../api/api';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function MyBalancePopup({ off, setAddPopup }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [balanceData, setBalanceData] = useState([]);
  const token = localStorage.getItem('token');

  console.log(balanceData);

  function onClickConfirmBtn({ nextProc, isNotNavigate }) {
    off();

    if (isNotNavigate) nextProc(true);
    else navigate('/market/deposit');
  }

  useEffect(() => {
    async function getBalance() {
      if (!token) return;
      try {
        const { data } = await axios.get(`${API.GET_USER_WALLET}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalanceData(data);
      } catch (err) {
        console.error(err);
      }
    }

    getBalance();
  }, [token]);

  return (
    <PmyBalancePopup className="defaultPopup">
      <article className="topArea">
        <span className="blank" />

        <p className="title">{t('My Wallet')}</p>

        <button className="exitBtn" onClick={() => off()}>
          <img src={I_xWhite} alt="" />
        </button>
      </article>

      <article className="contArea">
        <div className="targetBox">
          <div className="leftBox">
            <p className="type">{t(`my assets`)}</p>
            <p className="balance">{balanceData[0]?.cash.toLocaleString()}₩</p>
            <p className="type"></p>
          </div>

          <button
            className="actionBtn"
            onClick={() =>
              onClickConfirmBtn({
                nextProc: navigate('/market/deposit'),
                isNotNavigate: false,
              })
            }
          >
            {t('Deposit')}
          </button>
        </div>

        <ul className="typeList">
          {balanceData.map((item) => (
            <li className={`${item.cryptoSymbol}`}>
              <p className="key">{t(item.cryptoSymbol)}</p>

              <strong className="value">{item.amount}</strong>
            </li>
          ))}
        </ul>
      </article>
    </PmyBalancePopup>
  );
}

const PmyBalancePopup = styled.section`
  width: 500px;
  color: #fff;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 30px;

    .title {
      font-size: 18px;
    }

    .blank,
    .exitBtn img {
      width: 16px;
    }
  }

  .contArea {
    padding: 30px 40px 60px;

    .targetBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;

      .leftBox {
        display: flex;
        flex-direction: column;
        gap: 6px;

        .type {
          font-size: 14px;
          height: 18px;
        }

        .balance {
          font-size: 24px;
        }
      }

      .actionBtn {
        height: 40px;
        padding: 0 20px;
        font-size: 16px;
        font-weight: 700;
        background: rgba(255, 255, 255, 0.1);
        border: 1.4px solid #fff;
        border-radius: 20px;

        &:hover {
          color: #f7ab1f;
          background: rgba(247, 171, 31, 0.1);
          border-color: #f7ab1f;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
        }
      }
    }

    .typeList {
      display: flex;
      flex-direction: column;
      gap: 10px;

      li {
        display: flex;
        align-items: center;
        gap: 10px;
        height: 48px;
        padding: 0 24px;
        font-size: 16px;
        background: rgba(0, 0, 0, 0.4);
        border: 1.4px solid transparent;
        border-radius: 10px;
        cursor: pointer;

        &.on {
          border-color: rgba(247, 171, 31, 0.4);

          img {
            opacity: 1;
          }
        }

        img {
          opacity: 0;
          width: 18px;
        }

        .key {
          flex: 1;
        }

        .value {
        }
      }
    }
  }
`;
