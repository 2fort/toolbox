export default function calendar({
  dateSelected, monthSelected, onlyCurrentMonth, startWithSunday, splitByWeek,
}) {
  const dateNow = new Date();
  const yearNow = dateNow.getFullYear();
  const monthNow = dateNow.getMonth();
  const dayNow = dateNow.getDate();

  let selectedDateYear;
  let selectedDateMonth;
  let selectedDateDay;

  if (dateSelected) {
    selectedDateYear = dateSelected.getFullYear();
    selectedDateMonth = dateSelected.getMonth();
    selectedDateDay = dateSelected.getDate();
  }

  const currentMonth = monthSelected.getMonth();
  const currentYear = monthSelected.getFullYear();

  const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);

  const prevMonth = prevMonthDate.getMonth();
  const nextMonth = nextMonthDate.getMonth();

  const prevMonthYear = prevMonthDate.getFullYear();
  const nextMonthYear = nextMonthDate.getFullYear();

  let firstDay = monthSelected.getDay() || 7;

  if (startWithSunday) {
    firstDay = monthSelected.getDay() + 1;
  }

  function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  const monthDaysTotal = daysInMonth(currentMonth, currentYear);
  const prevMonthDaysTotal = daysInMonth(prevMonth, prevMonthYear);

  const prevMonthDaysToDisplay = 6 - (7 - firstDay);
  const startDay = prevMonthDaysToDisplay ? prevMonthDaysTotal - prevMonthDaysToDisplay + 1 : 1;

  function isCurrent(day, month) {
    return yearNow === currentYear && monthNow === month && dayNow === day;
  }

  function isSelected(day, month) {
    return currentYear === selectedDateYear && month === selectedDateMonth && day === selectedDateDay;
  }

  let totalLenght = 42;

  if (onlyCurrentMonth && monthDaysTotal + prevMonthDaysToDisplay <= 35) {
    totalLenght = 35;
  }

  const allDays = Array.from({ length: totalLenght }, (day, i) => {
    const dayOfWeek = i + 1 > 7 ? (i % 7) + 1 : i + 1;

    if (i < prevMonthDaysToDisplay) {
      const nextDay = startDay + i;
      const tempDate = new Date(currentYear, currentMonth - 1, 1);
      return {
        day: nextDay,
        month: tempDate.getMonth(),
        year: tempDate.getFullYear(),
        dayOfWeek,
        isPrevMonth: true,
        isCurrentDay: isCurrent(nextDay, currentMonth - 1),
        isSelected: isSelected(nextDay, currentMonth - 1),
        key: `${prevMonthYear}_${prevMonth}_${nextDay}`,
      };
    }

    if (i - prevMonthDaysToDisplay + 1 > monthDaysTotal) {
      const nextDay = i - monthDaysTotal - prevMonthDaysToDisplay + 1;
      const tempDate = new Date(currentYear, currentMonth + 1, 1);
      return {
        day: nextDay,
        month: tempDate.getMonth(),
        year: tempDate.getFullYear(),
        dayOfWeek,
        isNextMonth: true,
        isCurrentDay: isCurrent(nextDay, currentMonth + 1),
        isSelected: isSelected(nextDay, currentMonth + 1),
        key: `${nextMonthYear}_${nextMonth}_${nextDay}`,
      };
    }

    const nextDay = i - prevMonthDaysToDisplay + 1;

    return {
      day: nextDay,
      month: currentMonth,
      year: currentYear,
      dayOfWeek,
      isCurrentDay: isCurrent(nextDay, currentMonth),
      isSelected: isSelected(nextDay, currentMonth),
      key: `${currentYear}_${currentMonth}_${nextDay}`,
    };
  });

  // useful for tables
  if (splitByWeek) {
    return Array.from({ length: 6 }, (week, i) => allDays.slice(i * 7, (i + 1) * 7));
  }

  return allDays;
}
