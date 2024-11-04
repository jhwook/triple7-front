import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import I_x from '../../img/icon/I_x.svg';
import axios from 'axios';
import { API } from '../../api/api';
import I_qnaWhite from '../../img/icon/I_qnaWhite.svg';
import { useState } from 'react';

export default function FollowCheckPopup({
  off,
  reqFollowCheck,
  userEmail,
  assetInfo,
}) {
  const { t } = useTranslation();
  const token = localStorage.getItem('token');
  const [amount, setAmount] = useState(0);
  console.log(userEmail);
  console.log(assetInfo);

  function onClickConfirmBtn() {
    axios
      .post(
        API.REQUEST_FOLLOW,
        {
          followingUserEmail: userEmail,
          cryptoId: assetInfo.id,
          cryptoAmount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        reqFollowCheck();
        off();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function onClickRejectBtn() {
    off();
  }

  return (
    <PpreDepositWarningPopupBox className="defaultPopup">
      <article className="topArea">
        <span className="blank" />

        <p className="title">{t('Confirmation')}</p>

        <button className="exitBtn" onClick={() => off()}>
          <img src={I_x} alt="" />
        </button>
      </article>

      <article className="contArea">
        <p className="explain">
          {t('Enter the amount you want to subscribe to')}
        </p>
        <div className="actionBox">
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
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
                  setAmount(onlyNumbers);
                }}
              />
            </div>
          </div>
        </div>

        <div className="btnBox">
          <button className="confirmBtn" onClick={onClickConfirmBtn}>
            {t('Yes')}
          </button>

          <button className="confirmBtn" onClick={onClickRejectBtn}>
            {t('No')}
          </button>
        </div>
      </article>
    </PpreDepositWarningPopupBox>
  );
}

const PpreDepositWarningPopupBox = styled.section`
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

    .exitBtn {
      img {
        width: 16px;
        opacity: 0.4;
      }
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 44px;
    padding: 30px 40px 44px;

    .explain {
      font-size: 14px;
      text-align: center;
    }

    .btnBox {
      display: flex;
      align-items: center;
      gap: 20px;

      button {
        flex: 1;
        height: 56px;
        font-size: 18px;
        font-weight: 700;
        border-radius: 10px;

        &.confirmBtn {
          color: #4e3200;
          background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
        }

        &.cancelBtn {
          color: #f7ab1f;
          border: 2px solid #f7ab1f;
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
`;
