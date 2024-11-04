import styled from 'styled-components';
import { D_chartTypeList } from '../../data/D_bet';
import { useTranslation } from 'react-i18next';

export default function ChartTypePopup({ off, chartOpt, setChartOpt }) {
  const { t } = useTranslation();

  function onClickTypeBtn(v) {
    let _chartOpt = chartOpt;

    _chartOpt.type = v.type;
    _chartOpt.typeStr = v.typeStr;
    setChartOpt({ ..._chartOpt });
  }
  return (
    <PchartTypePopupBox>
      <p className="key">{t('Chart types')}</p>
      <ul className="value">
        {D_chartTypeList.map((v, i) => (
          <li
            key={i}
            className={`${chartOpt.typeStr === v.typeStr && 'on'}`}
            onClick={() => onClickTypeBtn(v)}
          >
            <img src={v.icon} alt="" />
            <p>{t(v.typeStr)}</p>
          </li>
        ))}
      </ul>
    </PchartTypePopupBox>
  );
}

const MchartTypePopupBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 24px 30px;
  color: rgba(255, 255, 255, 0.4);
  background: #22262e;
  border-radius: 20px;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.8));
  top: 46px;
  right: 0;
  left: 0;
  position: absolute;
  z-index: 6;

  .key {
    font-size: 14px;
  }

  .value {
    display: flex;
    gap: 14px;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
      width: 100px;
      height: 100px;
      font-size: 12px;
      font-weight: 700;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      cursor: pointer;

      &:hover,
      &.on {
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
        border-color: #fff;

        img {
          opacity: 1;
        }
      }

      img {
        width: 48px;
        opacity: 0.4;
      }
    }
  }
`;

const PchartTypePopupBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 430px;
  padding: 20px 24px 30px;
  color: rgba(255, 255, 255, 0.4);
  background: #22262e;
  border-radius: 20px;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.8));
  top: 46px;
  position: absolute;
  z-index: 6;

  .key {
    font-size: 14px;
  }

  .value {
    display: flex;
    gap: 14px;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
      width: 118px;
      height: 118px;
      font-size: 14px;
      font-weight: 700;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      cursor: pointer;

      &:hover,
      &.on {
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
        border-color: #fff;

        img {
          opacity: 1;
        }
      }

      img {
        width: 52px;
        opacity: 0.4;
      }
    }
  }
`;
