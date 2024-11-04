import { useEffect, useState } from 'react';
import styled from 'styled-components';

import L_loader from '../img/icon/L_loader.png';
import PopupBg from '../components/common/PopupBg';
import { API, URL } from '../api/api';
import axios from 'axios';

import PreDepositWarningPopup from '../components/market/PreDepositWarningPopup';

import { useTranslation } from 'react-i18next';

export default function Deposit() {
  const { t } = useTranslation();

  const [amount, setAmount] = useState('');

  const [loader, setLoader] = useState('');
  const [preDepositWarningPopup, setPreDepositWarningPopup] = useState(false);

  const token = localStorage.getItem('token');

  function addToAmount(value) {
    setAmount((prevAmount) =>
      (Number(prevAmount.replace(/,/g, '')) + value).toLocaleString()
    );
  }

  function onChangeAmount(e) {
    const numericValue = e.target.value.replace(/,/g, '');
    setAmount(Number(numericValue).toLocaleString());
  }

  function reqDeposit() {
    window.location.reload();
  }

  function onClickDepositBtn() {
    axios
      .post(
        API.DEPOSIT,
        {
          chargeAmount: amount.replace(/,/g, ''), // 콤마 제거 후 숫자 값으로 전달
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        setPreDepositWarningPopup(true);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <PdepositBox>
        <article className="deposit">
          <div className="key">
            <span className="count">1</span>

            <strong className="title">{t('Deposit')}</strong>
          </div>

          <div className="value">
            <ul className="inputList">
              <li className="amountBox">
                <p className="key">{t('Amount')}</p>

                <div className="valueBox">
                  <input
                    type="text"
                    value={amount}
                    onChange={onChangeAmount}
                    placeholder=""
                  />
                  <strong className="unit">{token.text}</strong>
                </div>

                <ul className="optList">
                  <button
                    className={`${amount === 10000 && 'on'} optBtn`}
                    onClick={() => addToAmount(10000)}
                  >
                    {'10,000₩'}
                  </button>
                  <button
                    className={`${amount === 50000 && 'on'} optBtn`}
                    onClick={() => addToAmount(50000)}
                  >
                    {'50,000₩'}
                  </button>
                  <button
                    className={`${amount === 100000 && 'on'} optBtn`}
                    onClick={() => addToAmount(100000)}
                  >
                    {'100,000₩'}
                  </button>
                  <button
                    className={`${amount === 500000 && 'on'} optBtn`}
                    onClick={() => addToAmount(500000)}
                  >
                    {'500,000₩'}
                  </button>
                </ul>
              </li>
            </ul>

            <div className="depositBox">
              <button
                className={`${loader === 'depositBtn' && 'loading'} depositBtn`}
                disabled={!amount}
                onClick={onClickDepositBtn}
              >
                <p className="common">{t('Deposit')}</p>
                <img className="loader" src={L_loader} alt="" />
              </button>
            </div>
          </div>
        </article>

        <article className="detailArea">
          <div className="key">
            <span className="count">2</span>

            <strong className="title">{t('Confirm deposit details')}</strong>
          </div>

          <div className="value">
            <p className="head">{t('Important')} :</p>

            <ul className="bodyList">
              <li>
                {t(
                  'Attention! Please note that the address the system gave you for this payment is unique and can only be used once. Each payment needs to be initiated anew.'
                )}
              </li>
              <li>
                {t(
                  'The funds will be credited as soon as we get 18 confirmations from the Polygon network.'
                )}
              </li>
              <li>
                {t('Coin deposits are monitored according to our AML program.')}
              </li>
            </ul>
          </div>
        </article>
      </PdepositBox>
      {preDepositWarningPopup && (
        <>
          <PreDepositWarningPopup
            off={setPreDepositWarningPopup}
            reqDeposit={reqDeposit}
          />
          <PopupBg off={setPreDepositWarningPopup} />
        </>
      )}
    </>
  );
}

const PdepositBox = styled.main`
  flex: 1;
  display: flex;
  gap: 100px;
  padding: 70px 140px;

  @media (max-width: 1440px) {
    max-width: 1020px;
    min-width: 1020px;
    padding: 70px 40px 70px 80px;
  }

  & > article {
    display: flex;
    flex-direction: column;
    gap: 40px;

    & > .key {
      display: flex;
      align-items: center;
      gap: 12px;

      .count {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        font-size: 14px;
        color: #2a2a2a;
        border-radius: 50%;
        background: #f7ab1f;
      }

      .title {
        font-size: 24px;
      }
    }

    &.deposit {
      width: 454px;
      min-width: 392px;

      & > .value {
        display: flex;
        flex-direction: column;
        gap: 60px;

        .inputList {
          display: flex;
          flex-direction: column;
          gap: 20px;

          li {
            &.tokenBox {
              .selectBox {
                margin: 10px 0 0 0;
                position: relative;

                .selBtn {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  width: 100%;
                  height: 56px;
                  padding: 0 24px;
                  font-size: 20px;
                  font-weight: 700;
                  background: #22262e;
                  border-radius: 10px;
                  position: relative;
                  z-index: 7;

                  &.on {
                    .arw {
                      opacity: 1;
                      transform: rotate(180deg);
                    }
                  }

                  .token {
                    width: 38px;
                    aspect-ratio: 1;
                  }

                  .name {
                    text-align: start;
                    flex: 1;
                  }

                  .arw {
                    height: 8px;
                    opacity: 0.4;
                  }
                }
              }
            }

            &.paymentBox {
              .selectBox {
                margin: 10px 0 0 0;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                background: #22262e;
                position: relative;

                .selBtn {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  width: 100%;
                  height: 56px;
                  padding: 0 24px;
                  font-size: 20px;
                  font-weight: 700;

                  &.on {
                    .arw {
                      opacity: 1;
                      transform: rotate(180deg);
                    }
                  }

                  .name {
                    text-align: start;
                    flex: 1;
                  }

                  .arw {
                    height: 8px;
                    opacity: 0.4;
                  }
                }

                .selectPopup {
                  backdrop-filter: blur(20px);
                  -webkit-backdrop-filter: blur(20px);
                  top: unset;

                  li {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 10px;
                    height: 50px;
                    padding: 0 24px;
                    font-size: 18px;
                    font-weight: 700;
                    opacity: 0.4;
                    cursor: pointer;

                    &:hover {
                      opacity: 1;
                    }
                  }
                }
              }
            }

            &.amountBox {
              .optList {
                display: flex;
                gap: 12px;
                margin: 14px 0 0 0;
                font-size: 20px;
                overflow-x: scroll;

                .optBtn {
                  flex: 1;
                  height: 42px;
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 8px;
                  color: rgba(255, 255, 255, 0.6);
                  border: 1px solid rgba(255, 255, 255, 0.4);

                  &.on {
                    color: #fff;
                    border: 1px solid #fff;
                  }
                }
              }
            }

            .key {
              font-size: 16px;
            }

            .valueBox {
              display: flex;
              align-items: center;
              gap: 10px;
              height: 56px;
              padding: 0 24px;
              margin: 10px 0 0 0;
              font-size: 20px;
              font-weight: 700;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
              border: 1.4px solid rgba(0, 0, 0, 0);
              cursor: pointer;
              position: relative;

              input {
                flex: 1;
                height: 100%;
              }

              &:focus-within {
                border-color: #f7ab1f;
              }
            }
          }
        }

        .depositBox {
          .infoList {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 16px 18px 20px;
            background: rgba(0, 0, 0, 0.6);

            li {
              display: flex;
              justify-content: space-between;
              font-size: 16px;

              .key {
                opacity: 0.6;
              }

              .value {
              }
            }
          }

          .depositBtn {
            width: 100%;
            height: 56px;
            font-size: 18px;
            font-weight: 700;
            color: #4e3200;
            background: linear-gradient(
              99.16deg,
              #604719 3.95%,
              #f7ab1f 52.09%
            );
            border-radius: 10px;

            &:disabled {
              color: #f7ab1f;
              background: #fff;
            }
          }
        }
      }
    }

    &.detailArea {
      width: 472px;

      & > .value {
        height: 478px;
        padding: 40px 28px;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        box-shadow:
          inset 0px 3px 3px rgba(255, 255, 255, 0.4),
          0px 10px 40px rgba(255, 255, 255, 0.2);

        .head {
          font-size: 16px;
        }

        .bodyList {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 14px 0 0 0;

          li {
            margin: 0 0 0 20px;
            font-size: 14px;
            opacity: 0.4;
            list-style-type: disc;
          }
        }
      }
    }
  }
`;
