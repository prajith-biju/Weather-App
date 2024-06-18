type Month = {
  dateValue: number;
  currentMonth: boolean;
}[];


//
export const formatNumber = (num: number) => {
  return num < 10 ? `0${num}` : num;
};

export const checkNumberOfDay31 = (monthNumber: number) => {
  return [0, 2, 4, 6, 7, 9, 11, -1].includes(monthNumber);
};

export const checkLeapYear = (year: number) => {
  return year % 4 === 0 ? true : false;
};

export const generateCalendarPage = (month: Month, date: number) => {
  let htmlForCalender = [];
  for (let i = 0; i < month.length; i++) {
    htmlForCalender.push({
      id: i,
      isCurrentMonth: month[i].currentMonth ? "active-month" : "",
      isToday:
        month[i].dateValue === date && month[i].currentMonth ? " today" : "",
      value: month[i].dateValue,
    });
  }
  return htmlForCalender;
};

export const isValidKey = (key: number, isShift: boolean) => {
  if (key === 109 || (isShift === false && key === 189)) {
    return false;
  } else {
    if (
      (key >= 65 && key <= 90) ||
      (isShift && key >= 65 && key <= 90) ||
      (key >= 186 && key <= 222) ||
      (key >= 106 && key <= 111) ||
      (isShift && key >= 48 && key <= 57) ||
      key === 32
    ) {
      return true;
    }
  }
}


export const isValidDate = (day: number, month: number, year: number) => {
  let leapYear = checkLeapYear(year);
  let isOdd = checkNumberOfDay31(month);
  if (month < 0 || month > 11 || year <= 1000) {
    return false;
  }

  if (month === 1) {
    if (
      (month === 1 && leapYear && day >= 1 && day <= 29) ||
      (month === 1 && leapYear === false && day >= 1 && day <= 28)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    if (
      (isOdd && day >= 1 && day <= 31) ||
      (isOdd === false && day >= 1 && day <= 30)
    ) {
      return true;
    } else {
      return false;
    }
  }
}