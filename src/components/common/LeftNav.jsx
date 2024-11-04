import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';

export default function LeftNav({ list, baseUrl }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <LeftNavBox>
      <ul className="navList">
        {list.map((v, i) => (
          <li
            key={i}
            className={`${
              location.pathname.indexOf(String(v.url).toLocaleLowerCase()) !==
                -1 && 'on'
            }`}
            onClick={() => navigate(`/${baseUrl}/${v.url}`)}
          >
            {v.icon && (
              <span className="iconBox">
                <img src={v.icon} alt="" />
              </span>
            )}
            <p>{t(v.key)}</p>
          </li>
        ))}
      </ul>
    </LeftNavBox>
  );
}

const LeftNavBox = styled.aside`
  width: 100%;
  min-width: 200px;
  max-width: 348px;
  padding: 130px 14px 14px 14px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);

  .navList {
    li {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 40px;
      padding: 0 16px;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;

      &.on {
        background: rgba(255, 255, 255, 0.1);

        .iconBox {
          img {
            opacity: 1;
          }
        }
      }

      .iconBox {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 22px;
        height: 22px;
        padding: 4px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);

        img {
          width: 100%;
          opacity: 0.4;
        }
      }
    }
  }
`;
