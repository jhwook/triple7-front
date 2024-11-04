import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API } from '../api/api';
import { setTokenPopupData } from '../reducers/chart';

export default function TokenPopup({ off, setAssetInfo }) {
  const dispatch = useDispatch();

  const [listData, setListData] = useState([]);

  function onClickStock(asset) {
    console.log(asset);
    setAssetInfo(asset);
    off();
  }

  function getAssetList() {
    axios
      .get(`${API.GET_CRYPTO_LIST}`)
      .then(({ data }) => {
        console.log(data);
        setListData(data.symbolList || []);
        dispatch(setTokenPopupData(data.symbolList));
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getAssetList();
  }, []);

  return (
    <PtokenPopupBox>
      <article className="listArea">
        <ul className="tokenList">
          {listData
            // .filter((e) => e.active)
            .map((v, i) => {
              return (
                <li key={i} onClick={() => onClickStock(v)}>
                  <span className="nameBox">
                    <p className="name">{v.symbol}</p>
                  </span>
                </li>
              );
            })}
        </ul>
      </article>
    </PtokenPopupBox>
  );
}

const PtokenPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 380px;
  max-height: 80vh;
  padding: 30px 20px;
  background: #22262e;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.8);
  top: 120px;
  position: fixed;
  z-index: 6;

  .topArea {
    display: flex;
    flex-direction: column;
    gap: 30px;

    .categoryList {
      display: flex;
      gap: 10px;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        padding: 0 20px;
        font-size: 16px;
        font-weight: 700;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid transparent;
        border-radius: 20px;
        cursor: pointer;

        &.on {
          border-color: #fff;
        }
      }
    }

    .searchBox {
      flex: 1;
      display: flex;
      gap: 14px;
      height: inherit;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;

      &:hover {
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        aspect-ratio: 1;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;

        &.searchBtn {
          img {
            width: 18px;
          }
        }

        &.cancelBtn {
          border: 1.2px solid rgba(255, 255, 255, 0.4);

          img {
            width: 16px;
            opacity: 0.4;
          }
        }
      }

      input {
        &::placeholder {
          color: #fff;
          opacity: 0.2;
        }
      }
    }
  }

  .listArea {
    flex: 1;
    overflow-y: scroll;

    .tokenList {
      display: flex;
      flex-direction: column;
      font-size: 16px;

      & > li {
        display: flex;
        align-items: center;
        gap: 10px;
        height: 50px;
        padding: 0 14px;
        border-radius: 6px;
        cursor: pointer;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .favBtn {
          img {
            width: 14px;
          }
        }

        .tknImg {
          height: 34px;
        }

        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .nameBox {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;

          .name {
          }

          .inital {
            padding: 4px;
            font-size: 12px;
            line-height: 20px;
            color: rgba(255, 255, 255, 0.6);
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
          }
        }

        .percent {
          &.red {
            color: #ff5353;
          }

          &.green {
            color: #3fb68b;
          }
        }
      }
    }
  }
`;
