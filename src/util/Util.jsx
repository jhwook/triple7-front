import { toast } from 'react-toastify';
import I_chkOrange from '../img/icon/I_chkOrange.svg';

import axios from 'axios';
import { utils, writeFile } from 'xlsx';

export function strDot(str, startNum = 0, endNum = 0) {
  if (!str?.length) return;
  return `${str.slice(0, startNum)}...${str.slice(-endNum)}`;
}

export function chkValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}

export function getStyle(ref, getStyle) {
  const style = window.getComputedStyle(ref.current);
  let styleGap = style.getPropertyValue(getStyle);
  let numStyleGap = Number(styleGap.replace('px', ''));

  if (isNaN(numStyleGap)) return 0;
  else return numStyleGap;
}

export function isDeviceMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function onClickPreBtn(ref, itemList, index, setIndex) {
  if (!ref.current.children) return;

  const wrapWidth = ref.current.offsetWidth;
  const contWidth = ref.current.children[0].offsetWidth;
  const itemNumByPage = Math.floor(wrapWidth / contWidth);
  const pageNum = Math.ceil(itemList.length / itemNumByPage);

  if (index > 0) setIndex(index - 1);
  else setIndex(pageNum - 1);
}

export function onClickNextBtn(ref, itemList, index, setIndex) {
  if (!ref.current.children) return;

  const wrapWidth = ref.current.offsetWidth;
  const contWidth = ref.current.children[0].offsetWidth;
  const itemNumByPage = Math.floor(wrapWidth / contWidth);
  const pageNum = Math.ceil(itemList.length / itemNumByPage);

  if (index < pageNum - 1) setIndex(index + 1);
  else setIndex(0);
}

export function swiperListener(ref, index) {
  if (!ref || !ref.current || !ref.current.children[0]) return;

  const wrapWidth = ref.current.offsetWidth;
  const contWidth = ref.current.children[0].offsetWidth;
  const itemNumByPage = Math.floor(wrapWidth / contWidth);

  if (ref.current?.scrollTo) {
    if (index === 0) {
      ref.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    } else {
      ref.current.scrollTo({
        left:
          contWidth * itemNumByPage * index +
          index * getStyle(ref, 'gap') * itemNumByPage,
        behavior: 'smooth',
      });
    }
  }
}

export function getTotalPage(ref, list) {
  if (!ref || !ref.current || !ref.current.children[0]) return;

  const wrapWidth = ref.current.offsetWidth;
  const contWidth = ref.current.children[0].offsetWidth;
  const itemNumByPage = Math.floor(wrapWidth / contWidth);

  return Math.floor(list.length / itemNumByPage);
}

export function setCookie(name, value, expiredDay) {
  const expired = new Date();
  expired.setTime(expired.getTime() + expiredDay * 24 * 60 * 60 * 1000);
  document.cookie =
    name +
    '=' +
    encodeURIComponent(value) +
    ';expires=' +
    expired.toUTCString() +
    ';path=/';
}

export function getCookie(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? decodeURIComponent(value[2]) : null;
}

export function onClickCopy(str) {
  const textArea = document.createElement('textarea');
  document.body.appendChild(textArea);
  textArea.value = str;
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

export function setToast({ type, cont, assetInfo, amount, profit }) {
  switch (type) {
    case 'alarm':
      toast(
        <div className="customBox">
          <span className="iconBox">
            <img src={I_chkOrange} alt="" />
          </span>

          <p className="cont">{cont}</p>
        </div>,
        {
          className: 'CustomToastAlarm',
        }
      );
      break;
    case 'alarm_black':
      toast(
        <div className="customBox">
          <span className="iconBox">
            <img src={I_chkOrange} alt="" />
          </span>

          <p className="cont">{cont}</p>
        </div>,
        {
          className: 'CustomToastAlarm black',
        }
      );
      break;
      // case 'qna':
      //   toast(
      //     <div className="customBox">
      //       <span className="iconBox">
      //         <img src={I_chkOrange} alt="" />
      //       </span>

      //       <p className="cont">{cont}</p>
      //     </div>,
      //     {
      //       className: 'CustomToastAlarm',
      //     }
      //   );
      break;
    default:
      break;
  }
}

export function AxiosInterCept(token) {
  if (!token) return;

  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = token;

    return config;
  });
}

export function getExcelFile(dataList, docName) {
  const ws = utils.json_to_sheet(dataList);

  const wb = utils.book_new();

  utils.book_append_sheet(wb, ws, 'Sheet1');

  writeFile(wb, docName + '.xlsx');
}

// custom

export function getDividFromData({ id, _case, dataObj }) {
  let _dividObj = Object.values(dataObj);

  if (!dataObj) return '';

  let _targetData = _dividObj.find((e) => e.assetId === id);

  if (!_targetData) return;

  let dividendrate = _targetData.dividendrate;

  switch (_case) {
    case 'HIGH':
      return Math.floor(dividendrate.high_side_dividendrate * 100) / 100;

    case 'LOW':
      return Math.floor(_targetData.low_side_amount * 100) / 100;

    case 'totalRate':
      if (
        dividendrate.high_side_dividendrate < dividendrate.low_side_dividendrate
      )
        return Math.floor(dividendrate.low_side_dividendrate * 100) / 100;
      else return Math.floor(dividendrate.high_side_dividendrate * 100) / 100;

    case 'highRate':
      return Math.floor(dividendrate.high_side_dividendrate * 100) / 100;

    case 'lowRate':
      return Math.floor(dividendrate.low_side_dividendrate * 100) / 100;

    case 'highAmount':
      return Math.floor(_targetData.high_side_amount * 100) / 100;

    case 'lowAmount':
      return Math.floor(_targetData.low_side_amount * 100) / 100;
    case 'betCount':
      return _targetData.bet_count;

    default:
      break;
  }
}

export function getBigCount(num) {
  if (num === undefined) return;

  let _num = Number(num);

  if (_num > 10 ** 9) return `${Math.floor(_num / 10 ** (9 - 2)) / 10 ** 2}B`;
  else if (_num > 10 ** 6)
    return `${Math.floor(_num / 10 ** (6 - 2)) / 10 ** 2}M`;
  else if (_num > 10 ** 3)
    return `${Math.floor(_num / 10 ** (3 - 2)) / 10 ** 2}K`;
  else return Math.floor(_num * 10 ** 2) / 10 ** 2;
}
