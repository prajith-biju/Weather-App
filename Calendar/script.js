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

// declerations
let CURRENT_MONTH;
let CURRENT_YEAR;
let CURRENT_DAY;
let CURRENT_DATE;
let isLeapYear = false;
let isOddMonth = false;

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
  displayCalendarPage();
  displayDate();
}

function decrementMonth() {
  CURRENT_MONTH--;
  CURRENT_MONTH < 0 ? ((CURRENT_MONTH = 11), CURRENT_YEAR--) : CURRENT_MONTH;
  displayDate();
}

function checkOddMonth() {
  isOddMonth = [0, 2, 4, 6, 7, 9, 11].includes(CURRENT_MONTH);
}



function displayCalendarPage() {
  let noOfDays = 30;
  checkOddMonth();
  isOddMonth ? (noOfDays = 31) : noOfDays;
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
  <div class="date-grid"></div>
  `;
}
