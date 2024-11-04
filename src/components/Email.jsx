import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import I_xWhite from '../img/icon/I_xWhite.svg';

export default function Email({ userData, setUserData, type }) {
  const { t } = useTranslation();

  function validateEmail(str) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(str);
  }

  function validateName(str) {
    const regex = /(?=.*[a-zA-Z가-힣].*[a-zA-Z가-힣])/;
    return regex.test(str);
  }

  function validatePw(str) {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,15}/;
    return regex.test(str);
  }

  useEffect(() => {
    if (userData.email && !validateEmail(userData.email))
      setUserData({
        ...userData,
        emailAlarm: '이메일 형식이 아닙니다.',
      });
    else setUserData({ ...userData, emailAlarm: '' });
  }, [userData.email]);

  useEffect(() => {
    if (userData.name && !validateName(userData.name))
      setUserData({
        ...userData,
        nameAlarm: '이름은 두글자 이상이어야 합니다.',
      });
    else setUserData({ ...userData, nameAlarm: '' });
  }, [userData.name]);

  useEffect(() => {
    if (userData.pw && !validatePw(userData.pw))
      setUserData({
        ...userData,
        pwAlarm:
          '비밀번호는 8자 이상 15자 이하로, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개씩 포함해야 합니다',
      });
    else setUserData({ ...userData, pwAlarm: '' });
  }, [userData.pw]);

  return (
    <>
      <PemailBox>
        <li>
          <p className="key">{t('Email')}</p>
          <div className="value">
            <div className={`${userData.emailAlarm && 'alarm'} inputBox`}>
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  })
                }
                placeholder=""
              />

              {userData.email && (
                <button
                  className="delBtn"
                  onClick={() => setUserData({ ...userData, email: '' })}
                >
                  <img src={I_xWhite} alt="" />
                </button>
              )}
            </div>

            {userData.emailAlarm && (
              <p className="alarm">{t(userData.emailAlarm)}</p>
            )}
          </div>
        </li>

        {type === 'signup' && (
          <li>
            <p className="key">{t('Name')}</p>
            <div className="value">
              <div className={`${userData.nameAlarm && 'alarm'} inputBox`}>
                <input
                  type="name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  placeholder=""
                />
              </div>

              {userData.nameAlarm && (
                <p className="alarm">{t(userData.nameAlarm)}</p>
              )}
            </div>
          </li>
        )}

        <li>
          <p className="key">{t('Password')}</p>
          <div className="value">
            <div className={`${userData.pwAlarm && 'alarm'} inputBox`}>
              <input
                type="password"
                value={userData.pw}
                onChange={(e) =>
                  setUserData({ ...userData, pw: e.target.value })
                }
                placeholder=""
              />
            </div>

            {userData.pwAlarm && <p className="alarm">{t(userData.pwAlarm)}</p>}
          </div>
        </li>
      </PemailBox>
    </>
  );
}

const PemailBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;

  li {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;

    .key {
    }

    .value {
      display: flex;
      flex-direction: column;
      gap: 10px;

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

        .delBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 16px;
          height: 16px;
          background: #ddd;
          border-radius: 50%;

          img {
            width: 8px;
          }
        }
      }

      p.alarm {
        font-size: 12px;
        color: #ff5353;
      }
    }
  }
`;
