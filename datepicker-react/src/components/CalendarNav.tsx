import { useContext } from "react";
import { DateStringContext } from "./Input";
import { DateValuesContext } from "./Input";
import { MonthArray } from "../Utils/MonthArray";

export const CalendarNav = () => {
  const dateString = useContext(DateStringContext);
  const dateObject = useContext(DateValuesContext);

  const checkMonthInRange = (month: number, operation: "plus" | "minus") => {
    if (operation === "plus") {
      month++;
      if (month > 11) {
        dateObject?.setDateValues(
          (prev) => prev && { ...prev, currentYear: (prev.currentYear += 1) }
        );
        return 0;
      } else {
        return month;
      }
    } else if (operation === "minus") {
      month--;
      if (month < 0) {
        dateObject?.setDateValues(
          (prev) => prev && { ...prev, currentYear: (prev.currentYear -= 1) }
        );
        return 11;
      } else {
        return month;
      }
    } else {
      return 0;
    }
  };

  const incrementMonth = () => {
    dateObject?.setDateValues(
      (prev) =>
        prev && {
          ...prev,
          currentMonth: (prev.currentMonth = checkMonthInRange(
            prev.currentMonth,
            "plus"
          )),
        }
    );
    dateString?.setUpdateCalendar(!dateString.updateCalendar);
  };

  const decrementMonth = () => {
    dateObject?.setDateValues(
      (prev) =>
        prev && {
          ...prev,
          currentMonth: (prev.currentMonth = checkMonthInRange(
            prev.currentMonth,
            "minus"
          )),
        }
    );
    dateString?.setUpdateCalendar(!dateString.updateCalendar);
  };

  const incrementYear = () => {
    dateObject?.setDateValues(
      (prev) => prev && { ...prev, currentYear: (prev.currentYear += 1) }
    );
    dateString?.setUpdateCalendar(!dateString.updateCalendar);
  };

  const decrementYear = () => {
    dateObject?.setDateValues(
      (prev) => prev && { ...prev, currentYear: (prev.currentYear += 1) }
    );
    dateString?.setUpdateCalendar(!dateString.updateCalendar);
  };

  return (
    <div className="calendar-nav">
      <div className="left-btns">
        <button
          onClick={decrementYear}
          id="decrement-year"
          className="decrement-year"
        >
          <i className="fas fa-angle-double-left"></i>
        </button>
        <button
          onClick={decrementMonth}
          id="decrement-month"
          className="decrement-month"
        >
          <i className="fas fa-angle-left"></i>
        </button>
      </div>
      <div className="nva-text">
        <span id="month" className="month">
          {
            MonthArray[
              dateObject?.dateValue?.currentMonth
                ? dateObject?.dateValue?.currentMonth
                : 0
            ]
          }
        </span>
        <span id="year" className="year">
          {dateObject?.dateValue?.currentYear}
        </span>
      </div>
      <div className="right-btns">
        <button
          onClick={incrementMonth}
          id="increment-month"
          className="increment-month"
        >
          <i className="fas fa-angle-right"></i>
        </button>
        <button
          onClick={incrementYear}
          id="increment-year"
          className="increment-year"
        >
          <i className="fas fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  );
};
