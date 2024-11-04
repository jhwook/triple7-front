import styled from 'styled-components';
import { useNavigate } from 'react-router';
import B_auth from '../img/bg/B_auth.svg';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API } from '../api/api';
import { D_joinData } from '../data/D_auth';
import Email from '../components/Email';
import { useState } from 'react';

export default function Index() {
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
      <PindexBox onKeyDown={onKeyDown}>
        <section className="innerBox">
          <article className="contArea">
            <div className="titleBox">
              <strong className="pgTitle">{t('Welcome')}</strong>
              <p className="explain">
                {t(
                  'By creating an account you agree to our Terms and Conditions and Data Protection Guidelines.'
                )}
              </p>
            </div>

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
            </div>
          </article>

          <article className="bgArea">
            <img src={B_auth} alt="" />
          </article>
        </section>
      </PindexBox>
    </>
  );
}

const PindexBox = styled.main`
  display: flex;
  justify-content: center;
  padding: 70px 0;

  .innerBox {
    display: flex;
    gap: 118px;
    padding: 90px 0;

    .contArea {
      width: 440px;

      .titleBox {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 30px; /* 아래쪽 간격을 늘립니다 */

        .pgTitle {
          font-size: 28px;
        }
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

    .bgArea {
      img {
        width: 394px;
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

      &.googleBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 14px;
        font-weight: 700;
        border: 1px solid #e6e6e6;
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
`;
