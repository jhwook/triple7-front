import { useState } from 'react';
import styled from 'styled-components';
import { D_joinData } from '../data/D_auth';
import Email from '../components/Email';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API } from '../api/api';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(D_joinData);

  function onClickLoginBtn() {
    let loginDataForm = { email: userData.email, password: userData.pw };

    console.log(loginDataForm);

    axios
      .post(`${API.LOGIN}`, loginDataForm)
      .then(({ data }) => {
        console.log(data);
        let token = data.bearerToken.replace('Bearer ', '');
        localStorage.setItem('token', token);
        navigate('/');

        if (data.message === 'TOKEN_CREATED') {
          localStorage.setItem('token', data.result.tokenId);
          navigate('/');
          return;
        }

        if (data.message === 'EMAIL-DOESNT-EXIST') {
          setUserData({
            ...userData,
            emailAlarm: "The account doesn't exist.",
          });
          return;
        }

        if (data.message === 'ACCESS-NOT-ALLOWED') {
          setUserData({
            ...userData,
            emailAlarm: 'The account not allowed',
          });
          return;
        }

        if (data.message === 'PHONE-NUMBER-DOESNT-EXIST') {
          setUserData({
            ...userData,
            phoneAlarm: "The account doesn't exist.",
          });
          return;
        }

        if (data.message === 'INVALID-PASSWORD')
          setUserData({
            ...userData,
            pwAlarm: 'The password you have entered does not coincide',
          });
        return;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') onClickLoginBtn();
  }

  return (
    <>
      <PloginBox onKeyDown={onKeyDown}>
        <section className="innerBox">
          <div className="titleBox">
            <strong className="pgTitle">{t('Login')}</strong>
          </div>

          <article className="contArea">
            <div className="loginArc">
              <div className="contBox">
                <Email
                  userData={userData}
                  setUserData={setUserData}
                  type={'login'}
                />
              </div>

              <div className="btnCont">
                <button
                  className="loginBtn"
                  // disabled={disableLoginBtn()}
                  onClick={onClickLoginBtn}
                >
                  {t('Login')}
                </button>
              </div>

              <div className="btnBox">
                <button
                  className="signUpBtn"
                  onClick={() => navigate('/auth/signup')}
                >
                  {t('Sign up with email')}
                </button>
              </div>

              <div className="utilBox">
                <button
                  className="signupBtn"
                  onClick={() => navigate('/auth/signup')}
                >
                  {t('Register now')}
                </button>
              </div>
            </div>
          </article>
        </section>
      </PloginBox>
    </>
  );
}

const PloginBox = styled.main`
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
        }

        .btnCont {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          margin: 40px 0 0 0;

          button {
            width: 100%;
            height: 56px;
            font-size: 18px;
            border-radius: 8px;

            &.loginBtn {
              font-weight: 700;
              color: #fff;
              background: #2a2a2a;
            }
          }

          .btnBox {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .or {
            font-size: 16px;
          }
        }

        .utilBox {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          margin: 24px 0 0 0;
          font-size: 14px;

          button {
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

  .btnBox {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 40px 0 0 0;

    .signUpBtn,
    .googleBtn {
      height: 60px;
      font-size: 18px;
      font-weight: 700;
      border-radius: 8px;

      &.signUpBtn {
        color: #fff;
        background: #000;
      }

      &.googleBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 14px;
        border: 1px solid #e6e6e6;
      }
    }

    .or {
      font-size: 16px;
      text-align: center;
    }
  }
`;
