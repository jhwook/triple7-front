import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { API } from '../../api/api';
import I_xWhite from '../../img/icon/I_xWhite.svg';

export default function AddPopup({ off }) {
  const { t } = useTranslation();

  const [amount, setAmount] = useState('');

  return (
    <PaddPopupBox className="defaultPopup">
      <article className="topArea">
        <span className="blank" />

        <p className="title">{t('Add')}</p>

        <button className="exitBtn" onClick={() => off()}>
          <img src={I_xWhite} alt="" />
        </button>
      </article>

      <article className="contArea">
        <div className="inputCont">
          <p className="key">{t('Add virtual money on Demo account')}</p>
          <div className="value">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder=""
            />

            <p className="unit">USDT</p>
          </div>
        </div>
      </article>
    </PaddPopupBox>
  );
}

const PaddPopupBox = styled.section`
  width: 380px;
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

    .blank,
    .exitBtn img {
      width: 16px;
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 14px 30px 40px;

    .inputCont {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      .key {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
      }

      .value {
        display: flex;
        align-items: center;
        width: 100%;
        height: 44px;
        padding: 0 20px;
        font-size: 16px;
        background: rgba(0, 0, 0, 0.4);
        border: 1.4px solid transparent;
        border-radius: 10px;

        &:focus-within {
          border-color: rgba(247, 171, 31, 0.4);
        }

        input {
          flex: 1;
        }
      }
    }

    .addBtn {
      height: 56px;
      font-size: 18px;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
      border-radius: 12px;
    }
  }
`;
