import styled from 'styled-components';
import { keyframes } from 'styled-components';
import DefaultHeader from '../components/header/DefaultHeader';

import B_lending1 from '../img/bg/B_lending1.png';
import B_lending2 from '../img/bg/B_lending2.png';

import B_float1 from '../img/bg/B_float1.png';
import B_float2 from '../img/bg/B_float2.png';
import B_float3 from '../img/bg/B_float3.png';
import B_float4 from '../img/bg/B_float4.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { API } from '../api/api';
import I_1 from '../img/icon/I_1.png';
import I_2 from '../img/icon/I_2.png';
import I_3 from '../img/icon/I_3.png';
import I_4 from '../img/icon/I_4.png';
import I_5 from '../img/icon/I_5.png';

export default function Lending() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [assetList, setAssetList] = useState([]);
  const [rankingList, setRankingList] = useState([]);

  const rank = {
    0: I_1,
    1: I_2,
    2: I_3,
    3: I_4,
    4: I_5,
  };

  async function getTopRanking() {
    let _rankingList = [];

    let _rankingRes = await axios
      .get(`${API.GET_TOP_RANKING}/5/BTCUSDT`)
      .then(({ data }) => {
        return data;
      });

    console.log(_rankingRes);
    setRankingList(_rankingRes.rankingList);
  }

  useEffect(() => {
    getTopRanking();
  }, []);

  return (
    <>
      <DefaultHeader />
      <PlendingBox assetListLength={3}>
        <section className="placeSec">
          <article className="contArea">
            <div className="textCont">
              <strong className="explain">
                {t('THE MOST')}
                <br /> {t('TRUSTED PLATFORM')}
              </strong>

              <strong className="do">
                {t('Place Your Trades On Best Conditions')}
              </strong>
            </div>
          </article>

          <img className="bg" src={B_lending1} alt="" />
        </section>

        <section className="rankingSec">
          <strong className="title">Ranking</strong>

          <article className="contArea">
            <span className="filter" />
            <span className="filter" />

            <ul className="slideList assetList">
              {rankingList.map((v, i) => (
                <li key={i}>
                  <span className="assetImgBox">
                    <img src={rank[i]} alt="" />
                  </span>

                  <div className="textBox">
                    <strong className="name">{v.userEmail}</strong>
                    <p className="close">{Number(v.yield).toLocaleString()}</p>

                    {/* <strong
                      className={`${v.change > 0 ? 'up' : ''} ${
                        v.change < 0 ? 'dn' : ''
                      } change`}
                    >
                      {v.change &&
                        `${Math.floor(v.change * 10 ** 2) / 10 ** 2}%`}
                    </strong> */}
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="featureSec">
          <article className="windowArea">
            <div className="window">
              <span className="floatBox">
                <img className="float" src={B_float1} alt="" />
                <img className="float" src={B_float2} alt="" />
                <img className="float" src={B_float3} alt="" />
                <img className="float" src={B_float4} alt="" />
              </span>

              <div className="imgBox">
                <img src={B_lending2} alt="" />
              </div>
            </div>
          </article>
        </section>
      </PlendingBox>
    </>
  );
}

const tranlate = keyframes`
  0%{
    transform: translate(100%)
  }
  100%{
    transform: translate(-100%)
  }
`;

const tranlate2 = keyframes`
  0%{
    transform: translate(0%)
  }
  100%{
    transform: translate(-200%)
  }
`;

const pFloat = keyframes`
  0%{
    transform: translate(0)
  }
  100%{
    transform: translate(-8px, -20px)
  }
`;

const PlendingBox = styled.main`
  height: 100vh;
  padding: 60px 0 0;
  color: #fff;
  background: #0a0e17;
  overflow-y: scroll;

  .placeSec {
    width: 1120px;
    padding: 176px 0 210px 0;
    margin: 0 auto;
    position: relative;

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 30px;

      .textCont {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;

        .explain {
          display: inline-block;
          font-size: 64px;
          font-weight: 700;
          font-family: 'Noto Sans JP';
          background: linear-gradient(
            96deg,
            #ffffff 40.65%,
            rgba(255, 255, 255, 0) 127.33%
          );
          color: transparent;
          -webkit-background-clip: text;
        }

        .do {
          font-size: 30px;
          font-family: 'Noto Sans JP';
          background: linear-gradient(
            96deg,
            #ffffff 40.65%,
            rgba(255, 255, 255, 0) 127.33%
          );
          color: transparent;
          -webkit-background-clip: text;
        }
      }

      .tradeBtn {
        width: 180px;
        height: 50px;
        font-size: 20px;
        font-weight: 700;
        background: rgba(235, 235, 235, 0.2);
        border: 1.6px solid #fbfbfb;
        box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.25);
        border-radius: 30px;

        &:hover {
          color: #0a0e17;
          background: #fff;
        }
      }
    }

    .bg {
      width: 740px;
      right: -18%;
      top: 50%;
      position: absolute;
      transform: translate(0, -50%);
    }
  }

  .rankingSec {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 1180px;
    margin: 0 auto;
    overflow: hidden;

    .title {
      font-size: 20px;
    }

    .contArea {
      display: flex;
      position: relative;

      .filter {
        width: 120px;
        top: 0;
        bottom: 0;
        position: absolute;
        z-index: 1;

        &:nth-of-type(1) {
          left: 0;
          background: linear-gradient(to left, rgba(0, 0, 0, 0), #0a0e17);
        }

        &:nth-of-type(2) {
          right: 0;
          background: linear-gradient(to right, rgba(0, 0, 0, 0), #0a0e17);
        }
      }

      .slideList {
        display: flex;
        gap: 20px;
        padding: 0 10px;

        &:nth-of-type(1) {
          animation: ${tranlate} ${(props) => 4 * props.assetListLength || 40}s
            ${(props) => -2 * props.assetListLength || 20}s infinite linear;
        }

        &:nth-of-type(2) {
          animation: ${tranlate2} ${(props) => 4 * props.assetListLength || 40}s
            infinite linear;
        }

        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 12px;
          min-width: 280px;
          width: 280px;
          height: 140px;
          color: #000;
          background: #fafafc;
          border-radius: 12px;

          .assetImgBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }

          .textBox {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;

            .name {
            }

            .close {
              font-size: 12px;
              opacity: 1;
            }

            .change {
              &.up {
                color: #3fb68b;
              }

              &.dn {
                color: #ff5353;
              }
            }
          }
        }
      }

      .btnList {
        display: flex;
        align-items: center;
        gap: 4px;
        margin: 0 auto;

        button {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;

          &.on {
            width: 30px;
            background: #fff;
            border-radius: 10px;
          }
        }
      }
    }
  }

  .featureSec {
    display: flex;
    flex-direction: column;
    gap: 36px;

    .windowArea {
      display: flex;
      justify-content: center;
      padding: 220px 0;

      .window {
        width: 1160px;
        color: inherit;
        border: 10px solid transparent;
        background-image: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.6) -41.6%,
          rgba(255, 255, 255, 0) 118.76%
        );
        border-radius: 20px;
        background-origin: border-box;
        background-clip: content-box, border-box;
        position: relative;

        .floatBox {
          .float {
            position: absolute;
            animation: ${pFloat} 2s infinite alternate
              cubic-bezier(0.6, 0.03, 0.6, 0.91);

            &:nth-of-type(1) {
              top: 474px;
              left: -152px;
            }

            &:nth-of-type(2) {
              top: -66px;
              left: 232px;
            }

            &:nth-of-type(3) {
              top: 54px;
              right: -86px;
            }

            &:nth-of-type(4) {
              top: 256px;
              right: -188px;
            }
          }
        }

        .imgBox {
          margin: 10px;
          border-radius: 20px;
          overflow: hidden;

          img {
            width: 100%;
            object-fit: cover;
          }
        }
      }
    }

    .featureList {
      display: flex;
      justify-content: center;
      gap: 30px;
      padding: 60px 0 0 0;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 460px;
        height: 264px;
        padding: 0 80px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        position: relative;

        &:nth-of-type(1) {
          &:hover {
            .shadowBox {
              .shadow {
                box-shadow: 0px 30px 60px rgba(251, 246, 40, 0.4);
              }
            }
          }

          .shadowBox {
            .shadow {
              box-shadow: 0px 30px 60px rgba(251, 246, 40, 0.2);
            }
          }

          .iconBox {
            background: radial-gradient(
              171.41% 92.71% at 50% 0%,
              rgba(251, 246, 40, 0.3) 0%,
              rgba(251, 246, 40, 0) 100%
            );

            .borderBox {
              border-color: rgba(251, 246, 40, 0.2);
            }
          }
        }

        &:nth-of-type(2) {
          &:hover {
            .shadowBox {
              .shadow {
                box-shadow: 0px 30px 60px rgba(247, 65, 207, 0.4);
              }
            }
          }

          .shadowBox {
            .shadow {
              box-shadow: 0px 30px 60px rgba(247, 65, 207, 0.2);
            }
          }

          .iconBox {
            background: radial-gradient(
              171.41% 92.71% at 50% 0%,
              rgba(247, 65, 207, 0.3) 0%,
              rgba(247, 65, 207, 0) 100%
            );

            .borderBox {
              border-color: rgba(247, 65, 207, 0.2);
            }
          }
        }

        &:nth-of-type(3) {
          &:hover {
            .shadowBox {
              .shadow {
                box-shadow: 0px 30px 60px rgba(247, 171, 31, 0.4);
              }
            }
          }

          .shadowBox {
            .shadow {
              box-shadow: 0px 30px 60px rgba(247, 171, 31, 0.2);
            }
          }

          .iconBox {
            background: radial-gradient(
              171.41% 92.71% at 50% 0%,
              rgba(247, 171, 31, 0.3) 0%,
              rgba(247, 171, 31, 0) 100%
            );

            .borderBox {
              border-color: rgba(247, 171, 31, 0.2);
            }
          }
        }

        .shadowBox {
          display: flex;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: absolute;
          overflow: hidden;

          .shadow {
            width: 270px;
            height: 120px;

            top: -120px;
            position: absolute;
          }
        }

        .iconBox {
          width: 96px;
          height: 96px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          top: -60px;
          position: absolute;

          .borderBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: inherit;
            height: inherit;
            border: 3px solid;
            border-radius: inherit;
            top: -3px;
            left: -3px;
            position: absolute;
          }
        }

        p {
          font-size: 22px;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
        }
      }
    }
  }
`;
