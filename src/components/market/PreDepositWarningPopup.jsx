import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import I_x from '../../img/icon/I_x.svg';

export default function PreDepositWarningPopup({ off, reqDeposit }) {
  const { t } = useTranslation();

  function onClickConfirmBtn() {
    reqDeposit();
    off();
  }

  return (
    <PpreDepositWarningPopupBox className="defaultPopup">
      <article className="topArea">
        <span className="blank" />

        <p className="title">{t('Confirmation')}</p>

        <button className="exitBtn" onClick={() => off()}>
          <img src={I_x} alt="" />
        </button>
      </article>

      <article className="contArea">
        <p className="explain">{t('Successfully Deposit!')}</p>

        <div className="btnBox">
          <button className="confirmBtn" onClick={onClickConfirmBtn}>
            {t('Good!')}
          </button>
        </div>
      </article>
    </PpreDepositWarningPopupBox>
  );
}

const PpreDepositWarningPopupBox = styled.section`
  width: 500px;
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

    .exitBtn {
      img {
        width: 16px;
        opacity: 0.4;
      }
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 44px;
    padding: 30px 40px 44px;

    .explain {
      font-size: 14px;
      text-align: center;
    }

    .btnBox {
      display: flex;
      align-items: center;
      gap: 20px;

      button {
        flex: 1;
        height: 56px;
        font-size: 18px;
        font-weight: 700;
        border-radius: 10px;

        &.confirmBtn {
          color: #4e3200;
          background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
        }

        &.cancelBtn {
          color: #f7ab1f;
          border: 2px solid #f7ab1f;
        }
      }
    }
  }
`;
