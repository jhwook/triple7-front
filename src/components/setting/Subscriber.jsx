import styled from 'styled-components';
import { D_Follower } from '../../data/D_setting';
import moment from 'moment';
import I_ltArwWhite from '../../img/icon/I_ltArwWhite.svg';
import I_rtArwWhite from '../../img/icon/I_rtArwWhite.svg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API } from '../../api/api';
import { useTranslation } from 'react-i18next';

export default function Subscriber() {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [tbData, setTbData] = useState([]);
  const [total, setTotal] = useState(10);
  console.log(total);
  function onClickPrePageBtn() {
    setPage(page - 1);
  }

  function onClickNextPageBtn() {
    setPage(page + 1);
  }

  function getData() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    axios
      .get(`${API.GET_MY_FOLLOWERS}/0/10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        console.log(data.subscriptions);
        console.log(data.totalElements);
        setTbData(data.subscriptions);
        setTotal(data.totalElements);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <PrecommenderBox>
      <div className="listBox">
        <ul className="listHeader">
          {D_Follower.map((v, i) => (
            <li key={i}>{t(v)}</li>
          ))}
        </ul>
        <ul className="list">
          <ul className="list">
            {tbData.map((v, i) => (
              <li key={i}>
                <span>
                  <p>{String(i + 1 + (page - 1) * 10).padStart(2, '0')}</p>
                </span>

                <span>
                  <p>{v.followingEmail}</p>
                </span>

                <span>
                  <p>{`${v.cryptoSymbol}`}</p>
                </span>

                <span>
                  <p>{`${v.cryptoAmount}`}</p>
                </span>

                <span>
                  <p>{'5%'}</p>
                </span>

                <span>
                  <p>{moment(v.createdAt).format('YYYY-MM-DD')}</p>
                </span>

                <span>
                  <p>{'1 month'}</p>
                </span>
              </li>
            ))}
          </ul>
        </ul>
      </div>

      <div className="pageBox">
        <button
          className="arwBtn"
          disabled={page <= 1}
          onClick={onClickPrePageBtn}
        >
          <img src={I_ltArwWhite} alt="" />
        </button>

        <ul className="pageList">
          {new Array(Math.ceil(total / 10)).fill('').map(
            (v, i) =>
              i > page - 6 &&
              i < page + 4 && (
                <li
                  key={i}
                  className={`${i + 1 === page && 'on'}`}
                  onClick={() => setPage(i + 1)}
                >
                  <strong>{i + 1}</strong>
                  <span className="onBar" />
                </li>
              )
          )}
        </ul>

        <button
          className="arwBtn"
          disabled={page >= Math.ceil(total / 10)}
          onClick={onClickNextPageBtn}
        >
          <img src={I_rtArwWhite} alt="" />
        </button>
      </div>
    </PrecommenderBox>
  );
}

const PrecommenderBox = styled.div`
  padding: 0 0 20px;

  .listBox {
    border: 1px solid #3b3e45;
    border-radius: 14px;
    width: 100%; // 박스를 가득 채우도록 설정
    overflow-x: auto;

    .listHeader {
      display: flex;
      align-items: center;
      height: 46px;
      width: 100%; /* 전체 너비 채우기 */
      flex: 1; // 가로 공간을 균등하게 나누기

      color: rgba(255, 255, 255, 0.6);
      li {
        flex: 1; /* 항목이 가로 공간을 균등하게 나누도록 설정 */
        text-align: center; /* 중앙 정렬 */
        padding: 0; /* 패딩 없애기 */
      }
    }

    .list {
      display: flex;
      flex-direction: column;

      li {
        display: flex;

        span {
          flex: 1; // 가로 공간을 균등하게 나누기
          height: 60px;
          border-top: 1px solid #3b3e45;

          .price {
            color: #3fb68b;
          }
        }
      }
    }

    .listHeader li,
    .list li span {
      display: flex;
      align-items: center;
      font-size: 14px;

      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &:first-of-type {
        padding: 0 0 0 20px;
      }

      &:last-of-type {
        padding: 0 20px 0 0;
      }

      &:nth-of-type(1) {
        width: 126px;
        min-width: 126px;
      }

      &:nth-of-type(2) {
        width: 260px;
        min-width: 260px;
      }

      &:nth-of-type(3) {
        width: 172px;
        min-width: 172px;
      }

      &:nth-of-type(4) {
        width: 212px;
        min-width: 212px;
      }

      &:nth-of-type(5) {
        width: 148px;
        min-width: 148px;
      }

      &:nth-of-type(6) {
        width: 202px;
        min-width: 202px;
      }

      &:nth-of-type(7) {
        width: 170px;
        min-width: 170px;
      }
    }
  }

  .pageBox {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 30px 0 0 0;

    .arwBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border: 2px solid #fff;
      border-radius: 50%;

      &:disabled {
        opacity: 0.2;
      }
    }

    .pageList {
      display: flex;
      align-items: center;

      li {
        display: flex;
        justify-content: center;
        padding: 0 5px;
        font-size: 18px;
        position: relative;
        cursor: pointer;

        &.on {
          .onBar {
            background: #f7ab1f;
          }
        }

        .onBar {
          width: 100%;
          height: 6px;
          border-radius: 4px;
          bottom: -6px;
          position: absolute;
        }
      }
    }
  }
`;
