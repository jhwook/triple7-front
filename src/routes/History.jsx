import { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import '../util/react-datepicker.css';
import I_calender from '../img/icon/I_calender.svg';
import I_ltArwWhite from '../img/icon/I_ltArwWhite.svg';
import I_rtArwWhite from '../img/icon/I_rtArwWhite.svg';
import moment from 'moment';
import { D_historyListHeader, D_historyCategoryList } from '../data/D_market';
import renderCustomHeader from '../util/DatePickerHeader';
import axios from 'axios';
import { API } from '../api/api';
import { useTranslation } from 'react-i18next';

export default function History() {
  const { t } = useTranslation();

  const [category, setCategory] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [useDate, setUseDate] = useState(false);
  const [page, setPage] = useState(1);
  const [tblData, setTblData] = useState([]);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem('token');

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className={`${useDate && 'on'} dateBtn`}
      onClick={onClick}
      ref={ref}
    >
      <img src={I_calender} alt="" />
      <p>{value}</p>
    </button>
  ));

  function getData(arg) {
    let params = {};

    if (arg?.filter) {
      if (useDate) {
        params.startDate = startDate;
        params.endDate = endDate;
        params.page = page - 1;
        params.size = 8;
      }
    }
    console.log(startDate);
    console.log(endDate);
    axios
      .get(API.GET_DEPOSIT_HISTORY, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      })
      .then(({ data }) => {
        console.log(data);
        setTblData(data.dataList);
        setTotal(data.totalElements);
      });
  }

  function dateChange(dates) {
    const [start, end] = dates;
    setStartDate(start);

    setStartDate(start);
    setEndDate(end);
  }

  function onClickPrePageBtn() {
    setPage(page - 1);
  }

  function onClickNextPageBtn() {
    setPage(page + 1);
  }

  useEffect(() => {
    getData();
  }, [category, page]);

  return (
    <PhistoryBox>
      <section className="innerBox">
        <ul className="categoryList">
          {D_historyCategoryList.map((v, i) => (
            <li
              key={i}
              className={`${category === i && 'on'}`}
              onClick={() => setCategory(i)}
            >
              {t(v)}
            </li>
          ))}
        </ul>

        <article className="contArea">
          <div className="filterBar">
            <div className="filterBox">
              <span className="dateBox filterOpt">
                <DatePicker
                  selected={startDate}
                  onChange={dateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  renderCustomHeader={renderCustomHeader}
                  customInput={<CustomInput />}
                />
              </span>

              <button
                className="applyBtn"
                onClick={() => getData({ filter: true })}
              >
                {t('Apply')}
              </button>
            </div>
          </div>

          <div className="listBox">
            <ul className="listHeader">
              {D_historyListHeader.map((v, i) => (
                <li key={i}>
                  <p>{t(v)}</p>
                </li>
              ))}
            </ul>

            <ul className="list">
              {tblData.map((v, i) => (
                <li key={i}>
                  <span>{i + 1}</span>

                  <span>
                    <p>{moment(v.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
                  </span>

                  <span>
                    <p>{`${v?.cash.toLocaleString()}₩`}</p>
                  </span>

                  <span>
                    <p>{'Deposit'}</p>
                  </span>

                  <span className={v.chargeStatus}>
                    <p>{v.chargeStatus}</p>
                  </span>
                </li>
              ))}
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
        </article>
      </section>
    </PhistoryBox>
  );
}

const PhistoryBox = styled.main`
  flex: 1;
  padding: 70px 140px;
  overflow-y: scroll;

  @media (max-width: 1440px) {
    max-width: 1020px;
    padding: 70px 40px 70px 80px;
  }

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 40px;
    height: 100%;

    .categoryList {
      display: flex;
      gap: 20px;

      li {
        height: 36px;
        font-size: 18px;
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

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .filterBar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .filterBox {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;

          .filterOpt {
            display: flex;
            align-items: center;
            width: 280px;
            height: 40px;
            padding: 0 22px;
            color: rgba(255, 255, 255, 0.4);
            border: 1px solid #3b3e45;
            border-radius: 20px;

            &:focus-within {
              border-color: #fff;
              color: #fff;
            }

            &.dateBox {
              .dateBtn {
                display: flex;
                align-items: center;
                gap: 8px;

                &.on {
                  color: #fff;
                }

                img {
                  width: 16px;
                  height: 17px;
                }
              }
            }
          }

          .applyBtn {
            width: 120px;
            height: 40px;
            font-size: 14px;
            font-weight: 700;
            border: 1px solid #3b3e45;
            border-radius: 20px;

            &:focus-within {
              border-color: #fff;
            }
          }
        }

        .exportBtn {
          display: flex;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 10px 13px 13px;
          border: 1px solid #3b3e45;
          border-radius: 50%;

          img {
            width: 14px;
          }
        }
      }

      .listBox {
        border: 1px solid #3b3e45;
        border-radius: 14px;
        overflow-x: scroll;

        &::-webkit-scrollbar {
          height: 8px;
        }

        &::-webkit-scrollbar-thumb {
          height: 8px;
          background: #888;
          border-radius: 10px;

          &:hover {
            background: #fff;
          }
        }

        .listHeader {
          display: flex;
          align-items: center;

          height: 46px;
          color: rgba(255, 255, 255, 0.6);
        }

        .list {
          display: flex;
          flex-direction: column;

          li {
            display: flex;

            span {
              height: 60px;
              border-top: 1px solid #3b3e45;

              &:nth-of-type(1) {
                gap: 14px;
              }

              .timeImg {
                height: 16px;
              }

              .arwImg {
                height: 14px;
              }

              .percent {
                color: rgba(255, 255, 255, 0.6);
              }
            }
          }
        }

        .listHeader li,
        .list li span {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          flex-grow: 1; /* flex-grow로 각 span이 여유롭게 확장 */

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
            width: 60px;
            min-width: 60px;
          }

          &:nth-of-type(2) {
            width: 98px;
            min-width: 98px;
          }

          &:nth-of-type(3) {
            width: 72px;
            min-width: 72px;
          }

          &:nth-of-type(4) {
            width: 210px;
            min-width: 210px;
          }

          &:nth-of-type(5) {
            width: 162px;
            min-width: 162px;
          }

          &:nth-of-type(6) {
            width: 162px;
            min-width: 162px;
          }

          &:nth-of-type(7) {
            width: 94px;
            min-width: 94px;
          }

          &:nth-of-type(8) {
            width: 94px;
            min-width: 94px;
          }

          &:nth-of-type(9) {
            width: 102px;
            min-width: 102px;
          }

          &:nth-of-type(10) {
            flex: 1;
            width: 124px;
            min-width: 124px;
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
    }
  }
`;
