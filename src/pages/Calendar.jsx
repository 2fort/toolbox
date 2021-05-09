import { useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import getCalendar from '../components/calendar';

const useStyles = createUseStyles((theme) => ({
  main: {
    padding: '15px 5px 5px',
    border: `1px solid ${theme.palette.stroke}`,
    display: 'inline-block',
    borderRadius: 3,
  },

  monthYearRow: {
    marginLeft: 7,
  },

  monthSelect: {
    marginRight: 15,
  },

  calendar: {
    marginTop: 12,
    display: 'grid',
    gap: 8,
    gridTemplateColumns: 'repeat(7, 34px)',

    '& *': {
      fontSize: 16,
      width: 34,
      padding: 0,
      height: 34,
      border: 0,
      background: 'none',
      borderRadius: '100%',
    },

    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'gray',
    },

    '& button': {
      cursor: 'pointer',
      fontFamily: 'inherit',
    },
  },

  notCurrentMonth: {
    opacity: 0.4,
  },

  notCurrentMonthHidden: {
    visibility: 'hidden',
  },

  currentDay: {
    fontWeight: 'bold',
    color: theme.palette.button,
  },

  selectedDay: {
    background: theme.palette.secondary,
    fontWeight: 'bold',
    color: theme.palette.headline,
  },

  dateString: {
    marginBottom: 20,
  },

  options: {
    marginBottom: 20,
    display: 'flex',
  },

  secondOption: {
    marginLeft: 30,
  },
}));

const YEARS = (() => {
  let currentYear = (new Date()).getFullYear() + 5;
  const target = currentYear - 115;
  const years = [];

  while (currentYear !== target) {
    years.push(currentYear);
    currentYear -= 1;
  }

  return years;
})();

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAYS_SHORT = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const Calendar = () => {
  const classes = useStyles();
  const dateNow = new Date();
  const yearNow = dateNow.getFullYear();
  const monthNow = dateNow.getMonth();
  const [dateSelected, setDateSelected] = useState(new Date(yearNow, monthNow, 12));
  const [monthSelected, setMonthSelected] = useState(new Date(yearNow, monthNow));
  const [onlyCurrentMonth, setOnlyCurrentMonth] = useState(false);
  const [startWithSunday, setStartWithSunday] = useState(false);

  const currentMonth = monthSelected.getMonth();
  const currentYear = monthSelected.getFullYear();

  const days = useMemo(() => getCalendar({
    dateSelected, monthSelected, onlyCurrentMonth, startWithSunday,
  }), [dateSelected, monthSelected, onlyCurrentMonth, startWithSunday]);

  function setMonth(e) {
    setMonthSelected(new Date(currentYear, e.target.value, 1));
  }

  function setYear(e) {
    setMonthSelected(new Date(e.target.value, currentMonth, 1));
  }

  function onChangeDay({ day, month, year }) {
    return () => {
      if (month !== currentMonth) setMonthSelected(new Date(year, month, 1));
      setDateSelected(new Date(year, month, day));
    };
  }

  const weekdays = [...WEEKDAYS_SHORT];

  if (startWithSunday) {
    const su = weekdays.pop();
    weekdays.unshift(su);
  }

  return (
    <div>
      <div className={classes.dateString}>
        Date: {dateSelected ? dateSelected.toDateString() : 'Null'}
      </div>

      <div className={classes.options}>
        <label>
          <input
            type="checkbox"
            checked={onlyCurrentMonth}
            onChange={(e) => {
              setOnlyCurrentMonth(e.target.checked);
            }}
          />
          &nbsp;Only current month
        </label>

        <label className={classes.secondOption}>
          <input
            type="checkbox"
            checked={startWithSunday}
            onChange={(e) => {
              setStartWithSunday(e.target.checked);
            }}
          />
          &nbsp;First day is sunday
        </label>
      </div>

      <div className={classes.main}>
        <div className={classes.monthYearRow}>
          <select onChange={setMonth} value={currentMonth} className={classes.monthSelect}>
            {MONTHS.map((month, i) => <option key={month} value={i}>{month}</option>)}
          </select>

          <select onChange={setYear} value={currentYear}>
            {YEARS.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>

        <div className={classes.calendar}>
          {weekdays.map((day) => <div key={day}>{day}</div>)}
          {days.map((dayObj) => (
            <button
              key={dayObj.key}
              type="button"
              className={
                classNames(
                  (dayObj.isPrevMonth || dayObj.isNextMonth) && classes.notCurrentMonth,
                  dayObj.isCurrentDay && classes.currentDay,
                  dayObj.isSelected && classes.selectedDay,
                  (dayObj.isPrevMonth || dayObj.isNextMonth) && onlyCurrentMonth && classes.notCurrentMonthHidden,
                )
              }
              onClick={onChangeDay(dayObj)}
            >
              {dayObj.day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
