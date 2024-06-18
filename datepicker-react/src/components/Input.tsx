import React, { useEffect, useRef, useState } from "react";
import { CalendarContainer } from "./CalendarContainer";
import { formatNumber, isValidKey, isValidDate } from "../Utils/Functions";

type DateValues = {
  currentMonth: number;
  currentYear: number;
  currentDate: number;
  currentDay: number;
};

type ValueContextType = {
  setDateValues: React.Dispatch<React.SetStateAction<DateValues | null>>;
  dateValue: DateValues | null;
};

type DateContextType = {
  setDateString: React.Dispatch<React.SetStateAction<string>>;
  dateString: string;
  updateCalendar: boolean;
  setUpdateCalendar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DateValuesContext = React.createContext<ValueContextType | null>(
  null
);
export const DateStringContext = React.createContext<DateContextType | null>(
  null
);

export const Input = () => {
  const [dateValue, setDateValues] = useState<DateValues | null>(null);
  const [dateString, setDateString] = useState(String);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [updateCalendar, setUpdateCalendar] = useState<boolean>(false);
  const inpurRef = useRef<HTMLInputElement>(null);

  const showCalendar = () => {
    inpurRef.current?.classList.remove("invalid");
    const date = new Date();
    setDateValues({
      currentMonth: date.getMonth(),
      currentYear: date.getFullYear(),
      currentDate: date.getDate(),
      currentDay: date.getDay(),
    });
    setOpenCalendar(!openCalendar);
  };

  const validate = (userInput: string[]) => {
    let inputDate = +userInput[0];
    let inputMonth = +userInput[1] - 1;
    let inputYear = +userInput[2];

    if (isValidDate(inputDate, inputMonth, inputYear)) {
      setDateValues(
        (prev) =>
          prev && {
            ...prev,
            currentDate: inputDate,
            currentMonth: inputMonth,
            currentYear: inputYear,
          }
      );
      inpurRef.current?.classList.remove("invalid");
      setUpdateCalendar(!updateCalendar);
    } else {
      inpurRef.current?.classList.add("invalid");
    }
  };

  useEffect(() => {
    if ( openCalendar ) {
      setDateString(
        dateValue
          ? `${formatNumber(dateValue?.currentDate)}-${formatNumber(
              dateValue?.currentMonth + 1
            )}-${dateValue?.currentYear}`
          : ""
      );
    } else {
      setDateString('')
    }
  }, [dateValue]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    inpurRef.current?.classList.remove("invalid");
    setDateString(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isValidKey(event.keyCode, event.shiftKey)) {
      event.preventDefault();
    }
    if (event.key === "Enter") {
      if (dateString.split("-").length - 1 > 2) {
        inpurRef.current?.classList.add("invalid");
        return;
      }
      let enterdDateArray = dateString.split("-");
      validate(enterdDateArray);
    }
  };

  return (
    <div>
      <div>
        <input
          value={dateString}
          onClick={showCalendar}
          type="text"
          maxLength={12}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          ref={inpurRef}
        />
      </div>
      {openCalendar && (
        <DateValuesContext.Provider value={{ setDateValues, dateValue }}>
          <DateStringContext.Provider
            value={{
              setDateString,
              dateString,
              updateCalendar,
              setUpdateCalendar,
            }}
          >
            <CalendarContainer />
          </DateStringContext.Provider>
        </DateValuesContext.Provider>
      )}
    </div>
  );
};
