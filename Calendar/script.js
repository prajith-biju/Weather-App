// getting dom elements
const inputEl = document.getElementById("input");
const calendarMainEl = document.querySelector(".calendar-main");
const calendarPage = document.querySelector(".show-calender");
const incrementYearBtn = document.getElementById("increment-year");
const incrementMonthBtn = document.getElementById("increment-month");
const decrementYearBtn = document.getElementById("decrement-year");
const decrementMonthBtn = document.getElementById("decrement-month");
const monthEl = document.getElementById("month");
const yearEl = document.getElementById("year");

//
const monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// declerations
let CURRENT_MONTH;
let CURRENT_YEAR;
let CURRENT_DAY;
let CURRENT_DATE;

// eventLisreners
inputEl.addEventListener("click", () => showCalendar());
inputEl.addEventListener("keydown", (e) => findEnterdDate(e));
incrementMonthBtn.addEventListener("click", () => incrementMonth());
decrementMonthBtn.addEventListener("click", () => decrementMonth());
incrementYearBtn.addEventListener("click", () => incrementYear());
decrementYearBtn.addEventListener("click", () => decrementYear());

// functions
function showCalendar() {
  getDate();
  displayDate();
  calendarMainEl.style.display = "block";
  displayCalendarPage();
  updateInput();
}

function getDate() {
  const date = new Date();
  CURRENT_MONTH = date.getMonth();
  CURRENT_YEAR = date.getFullYear();
  CURRENT_DATE = date.getDate();
  CURRENT_DAY = date.getDay();
  // console.log(CURRENT_DAY);
}

function displayDate() {
  monthEl.innerText = `${monthArray[CURRENT_MONTH]}`;
  yearEl.innerText = `${CURRENT_YEAR}`;
}

function incrementMonth() {
  CURRENT_MONTH++;
  CURRENT_MONTH > 11 ? ((CURRENT_MONTH = 0), CURRENT_YEAR++) : CURRENT_MONTH;
  displayDate();
  displayCalendarPage();
  updateInput();
}

function decrementMonth() {
  CURRENT_MONTH--;
  CURRENT_MONTH < 0 ? ((CURRENT_MONTH = 11), CURRENT_YEAR--) : CURRENT_MONTH;
  displayDate();
  displayCalendarPage();
  updateInput();
}

function checkOddMonth(monthNumber) {
  return [0, 2, 4, 6, 7, 9, 11, -1].includes(monthNumber); //here -1 included (Jan have number 0 and 0 - 1 is -1 so Dec have 31 day)
}

function displayCalendarPage() {
  let calendarArray = [];
  let start;
  let isCurrentMonthOdd = checkOddMonth(CURRENT_MONTH);
  let isLastMonthOdd = checkOddMonth(CURRENT_MONTH - 1); // if CURRENT_MONTH

  // updating number of days in and past month
  let noOfDaysInCurrentMonth;
  let noOfDaysInLastMonth;
  isCurrentMonthOdd
    ? (noOfDaysInCurrentMonth = 31)
    : (noOfDaysInCurrentMonth = 30);
  isLastMonthOdd ? (noOfDaysInLastMonth = 31) : (noOfDaysInLastMonth = 30);

  // checking current month or past month is feb and the year is leap year or not, and adding corresponding no:of days
  isLeapYear = checkLeapYear();
  if (CURRENT_MONTH - 1 === 1) {
    isLeapYear ? (noOfDaysInLastMonth = 29) : (noOfDaysInLastMonth = 28);
  }
  if (CURRENT_MONTH === 1) {
    isLeapYear ? (noOfDaysInCurrentMonth = 29) : (noOfDaysInCurrentMonth = 28);
  }

  // getting first day of current month
  let firstDayOfMonth = new Date(
    `1 ${monthArray[CURRENT_MONTH]}, ${CURRENT_YEAR}`
  );
  let firstDay = firstDayOfMonth.getDay();

  // adding dates of previus month last dates to starting of calendar page
  firstDay === 0
    ? (start = noOfDaysInLastMonth - 6)
    : (start = noOfDaysInLastMonth - (firstDay - 1));

  while (start <= noOfDaysInLastMonth) {
    calendarArray.push({ dateValue: start, currentMonth: false });
    start++;
  }

  // adding date of current month
  let length = 42 - calendarArray.length;
  let activeFlag = true;
  for (let i = 1; i < length; i++) {
    // adding next month fist dates
    if (i > noOfDaysInCurrentMonth) {
      i = 1;
      activeFlag = false;
    }

    if (calendarArray.length >= 42) break;
    calendarArray.push({ dateValue: i, currentMonth: activeFlag });
  }

  calendarPage.innerHTML = `
  <div class="week">
    <div class="text-day">Sun</div>
    <div class="text-day">Mon</div>
    <div class="text-day">Tue</div>
    <div class="text-day">Wed</div>
    <div class="text-day">Thu</div>
    <div class="text-day">Fri</div>
    <div class="text-day">Sat</div>
  </div>
  <div class="date-grid">${generateCalendarPage(calendarArray)}</div>
  `;
  const datesCurrentMonth = document.querySelectorAll(".active-month");
  selectDate(datesCurrentMonth);
}

function generateCalendarPage(month) {
  let htmlForCalender = ``;
  for (let i = 0; i < month.length; i++) {
    htmlForCalender += `<div class="date-num ${
      month[i].currentMonth ? "active-month" : ""
    } ${
      month[i].dateValue === CURRENT_DATE && month[i].currentMonth
        ? " today"
        : ""
    }">${month[i].dateValue}</div>`;
  }
  return htmlForCalender;
}

function checkLeapYear() {
  return CURRENT_YEAR % 4 === 0 ? true : false;
}

function incrementYear() {
  CURRENT_YEAR++;
  updateCalendar();
  updateInput();
}

function decrementYear() {
  CURRENT_YEAR--;
  updateCalendar();
  updateInput();
}

function updateCalendar() {
  let changedYear = new Date(
    `${CURRENT_DATE}, ${monthArray[CURRENT_MONTH]}, ${CURRENT_YEAR}`
  );
  CURRENT_MONTH = changedYear.getMonth();
  CURRENT_YEAR = changedYear.getFullYear();
  CURRENT_DATE = changedYear.getDate();
  CURRENT_DAY = changedYear.getDay();
  displayDate();
  displayCalendarPage();
}

function formatNumber(num) {
  return num < 10 ? `0${num}` : num;
}

function updateInput() {
  inputEl.value = `${formatNumber(CURRENT_DATE)}-${formatNumber(
    CURRENT_MONTH + 1
  )}-${CURRENT_YEAR}`;
}

function findEnterdDate(event) {
  console.log(event.keyCode, event.shiftKey);

  if (isValidKey(event.keyCode, event.shiftKey)) {
    event.preventDefault();
  }
  // if (event.key === "Enter") {
  //   let enterdDate = event.target.value;
  //   let enterdDateArray = enterdDate.split("-");
  //   CURRENT_DATE = +enterdDateArray[0];
  //   CURRENT_MONTH = +enterdDateArray[1] - 1;
  //   CURRENT_YEAR = +enterdDateArray[2];
  //   updateCalendar();
  // }
}

function selectDate(nodeList) {
  nodeList.forEach((element) => {
    element.addEventListener("click", () => {
      clearSelection(nodeList);
      element.classList.add("selected");
      CURRENT_DATE = +element.innerText;
      updateInput();
    });
  });
}

function clearSelection(list) {
  list.forEach((elem) => {
    elem.classList.remove("selected");
  });
}

function validate(event) {}

function isValidKey(key, isShift) {
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
