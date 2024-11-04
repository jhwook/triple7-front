import moment from 'moment';
import I_ltArwWhite from '../img/icon/I_ltArwWhite.svg';
import I_rtArwWhite from '../img/icon/I_rtArwWhite.svg';

const renderCustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => (
  <div className="datePickerHeader">
    <p>{moment(date).format('YYYY년 M월')}</p>

    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
      <img src={I_ltArwWhite} alt="" />
    </button>

    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      <img src={I_rtArwWhite} alt="" />
    </button>
  </div>
);

export default renderCustomHeader;
