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
let isLeapYear = false;

// eventLisreners
inputEl.addEventListener("click", () => showCalendar());
incrementMonthBtn.addEventListener("click", () => incrementMonth());
decrementMonthBtn.addEventListener("click", () => decrementMonth());

// functions
function showCalendar() {
  getDate();
  displayDate();
  calendarMainEl.style.display = "block";
  displayCalendarPage();
}

function getDate() {
  const date = new Date();
  CURRENT_MONTH = date.getMonth();
  CURRENT_YEAR = date.getFullYear();
  CURRENT_DATE = date.getDate();
  CURRENT_DAY = date.getDay();
  // console.log(CURRENT_DATE);
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
}

function decrementMonth() {
  CURRENT_MONTH--;
  CURRENT_MONTH < 0 ? ((CURRENT_MONTH = 11), CURRENT_YEAR--) : CURRENT_MONTH;
  displayDate();
  displayCalendarPage();
}

function checkOddMonth(monthNumber) {
  return [0, 2, 4, 6, 7, 9, 11].includes(monthNumber);
}

function displayCalendarPage() {
  let calendarArray = [];
  let start;
  let isCurrentMonthOdd = checkOddMonth(CURRENT_MONTH);
  let isLastMonthOdd = checkOddMonth(CURRENT_MONTH - 1);
  let noOfDaysInCurrentMonth;
  let noOfDaysInLastMonth;
  isCurrentMonthOdd
    ? (noOfDaysInCurrentMonth = 31)
    : (noOfDaysInCurrentMonth = 30);
  isLastMonthOdd ? (noOfDaysInLastMonth = 31) : (noOfDaysInLastMonth = 30);

  let firstDayOfMonth = new Date(
    `1 ${monthArray[CURRENT_MONTH]}, ${CURRENT_YEAR}`
  );
  let firstDay = firstDayOfMonth.getDay();

  firstDay === 0
    ? (start = noOfDaysInLastMonth - 6)
    : (start = noOfDaysInLastMonth - (firstDay - 1));

  while (start <= noOfDaysInLastMonth) {
    calendarArray.push({ dateValue: start, currentMonth: false });
    start++;
  }

  let length = 42 - calendarArray.length;
  let activeFlag = true;
  for (let i = 1; i < length; i++) {
    if (i > noOfDaysInCurrentMonth) {
      i = 1;
      activeFlag = false;
    }

    if (calendarArray.length >= 42) break;
    calendarArray.push({ dateValue: i, currentMonth: activeFlag });
  }
  console.log(calendarArray);
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
  <div class="date-grid">${generateCalerndarPage(calendarArray)}</div>
  `;
}

function generateCalerndarPage(month) {
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
