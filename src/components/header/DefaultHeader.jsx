import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { D_headerList, D_lngList } from '../../data/D_header.jsx';
import L_yellow from '../../img/logo/L_yellow.svg';
import I_dnPolWhite from '../../img/icon/I_dnPolWhite.svg';
import I_defaultProfImg from '../../img/icon/I_defaultProfImg.svg';
import I_wallet from '../../img/icon/I_wallet.svg';
import PopupBg from '../common/PopupBg';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProfPopup from './ProfPopup';
import { useSelector } from 'react-redux';
import MyBalancePopup from './MyBalancePopup';
import axios from 'axios';
import { API } from '../../api/api';
import AddPopup from './AddPopup';
import I_LOGO from '../../img/logo/I_LOGO.png';

export default function DefaultHeader({ white, border, title, demoToken }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n, t } = useTranslation();

  const token = localStorage.getItem('token');
  // const balanceType = localStorage.getItem("balanceType");

  const [lngPopup, setLngPopup] = useState(false);
  const [profPopup, setProfPopup] = useState(false);
  const [myBalancePopup, setMyBalancePopup] = useState(false);
  const [menuPopup, setMenuPopup] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);
  const [userData, setUserData] = useState({});
  const [balance, setBalance] = useState({});
  const [addPopup, setAddPopup] = useState(false);

  function onClickMenuBtn() {
    if (white) setAuthPopup(true);
    else setMenuPopup(true);
  }

  async function getUserData() {
    if (!token) return;
    console.log('token', token);
    await axios
      .get(`${API.GET_USER_WALLET}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setBalance(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function onClickDepositBtn() {
    if (token) navigate('/market/deposit');
    else navigate('/auth');
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <PdefaultHeaderBox
        className={`${white && 'white'} ${border && 'border'}`}
      >
        <div className="filterBox" />

        <article className="leftArea">
          <button className="logoBtn" onClick={() => navigate('/')}>
            <img src={I_LOGO} alt="" />
          </button>

          {!white && (
            <>
              <ul className="navList">
                {D_headerList.map((v, i) => (
                  <li
                    key={i}
                    className={`${
                      location.pathname.indexOf(
                        String(v.key).toLocaleLowerCase()
                      ) !== -1 && 'on'
                    }`}
                    onClick={() => navigate(v.url)}
                  >
                    {t(v.key)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>

        <article className="rightArea">
          {location.pathname.indexOf('auth') === -1 ? (
            token ? (
              <>
                <span className="accountBox">
                  <button
                    className="accountBtn"
                    onClick={() => setMyBalancePopup(true)}
                  >
                    {/* <>
                          <strong className="value">{`$${Number(
                            balance?.LIVE?.avail / 10 ** 6 || 0
                          ).toFixed(2)}`}</strong>
                        </> */}
                    <>
                      <strong className="value">
                        {balance[0]?.cash.toLocaleString()}₩
                      </strong>
                    </>
                  </button>

                  <button className="depositBtn" onClick={onClickDepositBtn}>
                    {/* <button className="depositBtn"> */}
                    <img src={I_wallet} alt="" />

                    <strong>{t('Deposit')}</strong>
                  </button>
                </span>

                {token && (
                  <button className="myBtn" onClick={() => setProfPopup(true)}>
                    <img src={I_defaultProfImg} alt="" />
                  </button>
                )}
              </>
            ) : (
              <button className="loginBtn" onClick={() => navigate('/auth')}>
                {t('LOGIN')}
              </button>
            )
          ) : (
            <div className="lngBox">
              <button
                className="lngBtn"
                onClick={() => setLngPopup(true)}
              ></button>
            </div>
          )}
        </article>
      </PdefaultHeaderBox>

      {myBalancePopup && (
        <>
          <MyBalancePopup off={setMyBalancePopup} setAddPopup={setAddPopup} />
          <PopupBg off={setMyBalancePopup} />
        </>
      )}

      {addPopup && (
        <>
          <AddPopup off={setAddPopup} />
          <PopupBg off={setAddPopup} />
        </>
      )}

      {profPopup && token && (
        <>
          <ProfPopup off={setProfPopup} userData={userData} />
          <PopupBg off={setProfPopup} />
        </>
      )}
    </>
  );
}

const PdefaultHeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 30px;
  color: #fff;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 3;

  .filterBox {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
  }

  &.border {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  &.white {
    color: #2a2a2a;
    border-bottom: none;

    .rightArea {
      .profBox {
        .profPopup {
          color: #fff;
          background: #2a2a2a;
        }
      }

      .lngBox {
        .selectPopup {
          background: #fff;
          box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.2);

          li {
            &.on {
              color: #f7ab1f;
            }
          }
        }
      }

      .loginBtn {
        color: #2a2a2a;
        border: 1px solid #2a2a2a;
      }
    }
  }

  .leftArea {
    display: flex;
    align-items: center;
    gap: 24px;

    .logoBtn {
      display: flex;

      align-items: center;
      img {
        height: 40px;
      }
    }

    .navList {
      display: flex;
      gap: 24px;

      li {
        display: flex;
        align-items: center;
        height: 30px;
        padding: 0 12px;
        font-size: 14px;
        border-radius: 6px;
        cursor: pointer;

        &.on {
          background: rgba(255, 255, 255, 0.1);

          &.moreBox {
            .moreBtn {
              img {
                transform: rotate(180deg);
              }
            }
          }
        }

        &.moreBox {
          position: relative;

          .moreBtn {
            display: flex;
            align-items: center;
            gap: 6px;
          }
        }
      }
    }
  }

  .lngBox {
    position: relative;

    .lngBtn {
      height: 30px;
      padding: 0 12px;
      font-size: 14px;
      font-weight: 700;
      border-radius: 6px;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .rightArea {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;

    .accountBox {
      display: flex;
      height: 38px;
      font-size: 14px;
      background: rgba(247, 171, 31, 0.2);
      border-radius: 28px;

      .accountBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        width: 138px;
      }

      .depositBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        width: 122px;
        height: 100%;
        color: #2a2a2a;
        background: #f7ab1f;
        border-radius: 28px;

        img {
          height: 18px;
        }
      }
    }

    .myBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 34px;
      aspect-ratio: 1;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;

      img {
        width: 22px;
      }
    }

    .loginBtn {
      width: 132px;
      height: 34px;
      font-weight: 700;
      border: 1px solid #fff;
      border-radius: 28px;

      &:hover {
        color: #f7ab1f;
        border-color: #f7ab1f;
      }
    }
  }
`;
