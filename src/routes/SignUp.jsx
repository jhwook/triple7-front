import { useState } from 'react';
import styled from 'styled-components';
import { D_joinData } from '../data/D_auth';
import Email from '../components/Email';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API } from '../api/api';
import { setToast } from '../util/Util';
import { useTranslation } from 'react-i18next';

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(D_joinData);

  function onClickSignup() {
    let signDataForm;

    signDataForm = {
      email: userData.email,
      name: userData.name,
      password: userData.pw,
    };

    axios
      .post(`${API.SIGNUP}`, signDataForm)
      .then(({ data }) => {
        console.log(data);

        if (data.status === 'ERR') {
          setToast({ type: 'alarm_black', cont: t(data.message) });
        }

        if (data.message === 'TOKEN_CREATED') {
        }

        let token = data.bearerToken.replace('Bearer ', '');
        localStorage.setItem('token', token);
        navigate('/');
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <PsignupBox>
        <section className="innerBox">
          <div className="titleBox">
            <strong className="pgTitle">{t('Create Account')}</strong>
            <p className="explain">{t('Register with your email')}</p>
          </div>

          <article className="contArea">
            <div className="loginArc">
              <div className="contBox">
                <Email
                  userData={userData}
                  setUserData={setUserData}
                  type={'signup'}
                />
              </div>

              <div className="btnBox">
                <button
                  className="nextBtn"
                  disabled={
                    !userData.email ||
                    !userData.name ||
                    !userData.pw ||
                    userData.emailAlarm ||
                    userData.nameAlarm ||
                    userData.pwAlarm
                  }
                  onClick={onClickSignup}
                >
                  {t('Next')}
                </button>
              </div>

              <div className="utilBox">
                <span className="loginBox">
                  <button
                    className="loginBtn"
                    onClick={() => navigate('/auth/login')}
                  >
                    {t('LogIn')}
                  </button>
                </span>
              </div>
            </div>
          </article>
        </section>
      </PsignupBox>
    </>
  );
}

const PsignupBox = styled.main`
  display: flex;
  justify-content: center;
  padding: 70px 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 44px;
    padding: 90px 0;

    .titleBox {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .pgTitle {
        font-size: 28px;
      }
    }

    .contArea {
      display: flex;
      gap: 125px;

      .loginArc {
        width: 400px;

        .contBox {
          .categoryList {
            display: flex;
            margin: 0 0 40px 0;

            li {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 34px;
              color: #ddd;
              border: 3px solid transparent;
              border-bottom: unset;

              &.on {
                color: inherit;
                border: solid transparent;
                border-width: 3px 3px 0 3px;
                background-image: linear-gradient(#fff, #fff),
                  linear-gradient(
                    180deg,
                    #000000 -12.12%,
                    rgba(0, 0, 0, 0) 131.82%
                  );
                border-radius: 8px 8px 0 0;
                background-origin: border-box;
                background-clip: content-box, border-box;
              }

              button {
                width: 100%;
                height: 100%;
                padding: 0 22px;
              }
            }
          }

          .referralDet {
            margin: 24px 0 0 0;

            &[open] {
              summary {
                img {
                  transform: rotate(180deg);
                }
              }
            }

            summary {
              display: flex;
              align-items: center;
              gap: 6px;
              font-size: 14px;

              img {
                width: 8px;
              }
            }

            .inputCont {
              display: flex;
              flex-direction: column;
              gap: 10px;
              margin: 8px 0 0 0;

              .inputBox {
                display: flex;
                align-items: center;
                height: 44px;
                padding: 0 16px;
                border-radius: 8px;
                border: 1px solid #ddd;

                &:focus-within {
                  border-color: #f7ab1f;
                }

                &.alarm {
                  border-color: #f00;
                }

                input {
                  flex: 1;
                }
              }

              p.alarm {
                font-size: 12px;
                color: #ff5353;
              }
            }
          }
        }

        .btnBox {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 40px 0 0 0;

          .termBox {
            display: flex;
            align-items: center;
            gap: 8px;

            .chkBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 20px;
              height: 20px;
              border-radius: 4px;
              box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.3);

              &.on {
                img {
                  display: block;
                }
              }

              img {
                display: none;
                width: 14px;
              }
            }

            .agreeBox {
              display: flex;
              align-items: center;
              font-size: 14px;

              .termBtn {
                color: #f7ab1f;
              }
            }
          }

          .nextBtn {
            height: 56px;
            font-size: 18px;
            font-weight: 700;
            color: #fff;
            background: #2a2a2a;
            border-radius: 8px;
          }
        }

        .utilBox {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          margin: 24px 0 0 0;
          font-size: 14px;

          .loginBox {
            display: flex;
            align-items: center;
          }

          button {
            font-size: 14px;
            color: #f7ab1f;
          }
        }
      }

      .qrArea {
        display: flex;
        flex-direction: column;
        gap: 40px;
        width: 240px;

        .qrBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 240px;
          height: 240px;
          padding: 10px;
          border-radius: 14px;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.14);
        }

        .textBox {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;

          .title {
            font-size: 16px;
          }

          .explain {
            font-size: 14px;
            color: #888;
            text-align: center;
          }
        }
      }
    }
  }

  .cpRight {
    font-size: 12px;
    bottom: 30px;
    left: 50%;
    position: fixed;
    transform: translate(-50%);
  }
`;
