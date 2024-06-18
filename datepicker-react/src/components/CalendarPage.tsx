import { useContext, useEffect, useState, useRef } from "react";
import { DateStringContext } from "./Input";
import { DateValuesContext } from "./Input";
import { checkNumberOfDay31 } from "../Utils/Functions";
import { checkLeapYear } from "../Utils/Functions";
import { MonthArray } from "../Utils/MonthArray";
import { generateCalendarPage } from "../Utils/Functions";

type DateType = {
  id: number;
  isCurrentMonth: string;
  isToday: string;
  value: number;
}[];

type SelectedDateType = {
  id: number;
  isCurrentMonth: string;
  isToday: string;
  value: number;
};

export const CalendarPage = () => {
  const dateString = useContext(DateStringContext);
  const dateObject = useContext(DateValuesContext);
  const [dates, setDates] = useState<DateType>();
  const [nodeList, setNodeList] = useState<NodeListOf<HTMLElement> | null>();
  const [selectedDate, setSelectedDate] = useState<SelectedDateType>();

  // let nodeList: NodeListOf<HTMLElement> | [];
  const handleSelectDate = (selectedDate: {
    id: number;
    isCurrentMonth: string;
    isToday: string;
    value: number;
  }) => {
    setNodeList(document.querySelectorAll(".active-month"));
    setSelectedDate(selectedDate);
  };

  useEffect(() => {
    if (selectedDate) {
      if (selectedDate.isCurrentMonth !== "") {
        nodeList?.forEach((node) => {
          node.classList.remove("selected");
        });

        if (nodeList) {
          nodeList[selectedDate.value - 1].classList.add("selected");
        }
      }
    }
  }, [selectedDate]);

  const displayCalendarPage = () => {
    nodeList?.forEach((node) => {
      node.classList.remove("selected");
    });

    let calendarArray = [];
    let start;
    let monthNo = dateObject?.dateValue?.currentMonth
      ? dateObject?.dateValue?.currentMonth
      : 0;
    let isCurrentMonthOdd = checkNumberOfDay31(monthNo);
    let isLastMonthOdd = checkNumberOfDay31(monthNo - 1);

    let noOfDaysInCurrentMonth;
    let noOfDaysInLastMonth;
    isCurrentMonthOdd
      ? (noOfDaysInCurrentMonth = 31)
      : (noOfDaysInCurrentMonth = 30);
    isLastMonthOdd ? (noOfDaysInLastMonth = 31) : (noOfDaysInLastMonth = 30);

    let year = dateObject?.dateValue?.currentYear
      ? dateObject?.dateValue?.currentYear
      : 0;
    let isLeapYear = checkLeapYear(year);
    if (monthNo - 1 === 1) {
      isLeapYear ? (noOfDaysInLastMonth = 29) : (noOfDaysInLastMonth = 28);
    }
    if (monthNo === 1) {
      isLeapYear
        ? (noOfDaysInCurrentMonth = 29)
        : (noOfDaysInCurrentMonth = 28);
    }

    let firstDayOfMonth = new Date(`1 ${MonthArray[monthNo]}, ${year}`);
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
    const date = dateObject?.dateValue?.currentDate
      ? dateObject?.dateValue?.currentDate
      : 0;
    setDates(generateCalendarPage(calendarArray, date));
  };

  useEffect(() => {
    displayCalendarPage();
  }, [dateString?.updateCalendar, dateObject?.dateValue]);

  return (
    <div className="week">
      <div className="text-day">Sun</div>
      <div className="text-day">Mon</div>
      <div className="text-day">Tue</div>
      <div className="text-day">Wed</div>
      <div className="text-day">Thu</div>
      <div className="text-day">Fri</div>
      <div className="text-day">Sat</div>
      {dates?.map((items) => (
        <div
          key={items.id}
          className={`date-num ${items.isCurrentMonth} ${items.isToday}`}
          onClick={() => handleSelectDate(items)}
        >
          {items.value}
        </div>
      ))}
    </div>
  );
};
