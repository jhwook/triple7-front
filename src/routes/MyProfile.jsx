import { useState } from 'react';
import styled from 'styled-components';

import { onClickCopy, setToast } from '../util/Util';
import { D_referralCategoryList } from '../data/D_setting';
import Subscriber from '../components/setting/Subscriber';
import Subscribed from '../components/setting/Subscribed';
import { useTranslation } from 'react-i18next';

export default function MyProfile({ userData }) {
  const { t } = useTranslation();

  const [category, setCategory] = useState(0);

  function onClickCopyBtn(str) {
    onClickCopy(str);
    setToast({ type: 'alarm', cont: 'Copied Successfully' });
  }
  return (
    <>
      <PreferralBox>
        <section className="innerBox">
          <article className="titleArea">
            <strong className="title">{t('My Profile')}</strong>
            <p className="explain">
              {t(
                'Please for your security, please fill out the following form'
              )}
            </p>
          </article>

          {/* <article className="recommendArea">
              <strong className="title">{t("Recommend")}</strong>

              <ul className="dataList">
                <li>
                  <p className="key">{t("Code")}</p>
                  <button
                    className="value"
                    onClick={() => onClickCopyBtn(userData?.referercode)}
                  >
                    <p className="code">{userData?.referercode}</p>
                    <img src={I_cpWhite} alt="" />
                  </button>
                </li>

                <li>
                  <p className="key">{t("Link")}</p>
                  <button
                    className="value"
                    onClick={() =>
                      onClickCopyBtn(
                        "https://users.options1.net/#/auth/signup?refcode={userData?.referercode}"
                      )
                    }
                  >
                    <p className="url">
                      https://users.options1.net/#/auth/signup?refcode=
                      {userData?.referercode}
                    </p>
                    <img src={I_cpWhite} alt="" />
                  </button>
                </li>
              </ul>
            </article> */}

          <article className="listArea">
            <ul className="categoryList">
              {D_referralCategoryList.map((v, i) => (
                <li
                  key={i}
                  className={`${category === i && 'on'}`}
                  onClick={() => setCategory(i)}
                >
                  {t(v)}
                </li>
              ))}
            </ul>

            {category === 0 && <Subscriber />}
            {category === 1 && <Subscribed />}
          </article>
        </section>
      </PreferralBox>
    </>
  );
}

const PreferralBox = styled.main`
  flex: 1;
  height: 100%;
  padding: 70px 140px 0;
  overflow-y: scroll;

  @media (max-width: 1440px) {
    max-width: 1020px;
    padding: 70px 40px 70px 80px;
  }

  .innerBox {
    height: 100%;

    .titleArea {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 618px;

      .title {
        font-size: 24px;
      }

      .explain {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
      }
    }

    .recommendArea {
      display: flex;
      flex-direction: column;
      gap: 14px;
      width: 900px;
      margin: 44px 0 0 0;
      font-size: 16px;

      .title {
        font-size: 16px;
      }

      .dataList {
        display: flex;
        flex-direction: column;
        gap: 14px;

        li {
          display: flex;
          align-items: center;
          gap: 40px;
          height: 56px;
          padding: 0 24px;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1.4px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;

          &:focus-within {
            border-color: #fff;
          }

          .key {
            color: rgba(255, 255, 255, 0.4);
          }

          .value {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;

            img {
              width: 16px;
            }
          }
        }
      }
    }

    .listArea {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 100%;
      margin: 80px 0 0 0;

      .categoryList {
        display: flex;
        gap: 14px;

        li {
          height: 32px;
          font-size: 16px;
          font-weight: 700;
          border-bottom: 4px solid transparent;
          opacity: 0.4;
          cursor: pointer;

          &.on {
            border-color: #fff;
            opacity: 1;
          }
        }
      }
    }
  }
`;
