import { useContext, useEffect, useState } from "react";
import { DetailsContext } from "../App";
import { NotFoundPopulation } from "./NotFoundPopulation";

export const DaysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thusday",
  "Friday",
  "Saturday",
];

export const CityDetails = () => {
  const DetailsCtx = useContext(DetailsContext);
  const [dateObjet, setDateObject] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAvilable, setIsAvilable] = useState(false);
  const [noData, setNoData] = useState(false);

  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatTime = (hour: number, minute: number) => {
    let str = ``;
    if (hour > 12) {
      str = `${hour}:${minute} PM`;
    } else {
      str = `${hour}:${minute} AM`;
    }
    return str;
  };

  const setData = () => {
    if (DetailsCtx?.details) {
      const objDay = new Date(`${DetailsCtx.details.time.slice(0, 11)}`);
      const date = objDay.getDate();
      const month = objDay.getMonth();
      const day = objDay.getDay();
      const year = objDay.getFullYear();
      const time = formatTime(
        +DetailsCtx.details.time.slice(11, 12),
        +DetailsCtx.details.time.slice(14, 17)
      );
      return `${DaysArray[day]}, ${date < 10 ? "0" + date : date} ${
        Months[month]
      } ${year} | ${time}`;
    }
  };

  useEffect(() => {
    setDateObject(setData() || "");
  }, []);

  useEffect(() => {
    if (
      typeof DetailsCtx?.details?.count === "number" ||
      typeof DetailsCtx?.details?.year === "number"
    ) {
      setIsLoading(false);
      setIsAvilable(false);
      setNoData(false);

      if (
        isNaN(Number(DetailsCtx?.details?.count)) ||
        isNaN(Number(DetailsCtx?.details?.year))
      ) {
        setIsAvilable(false);
        // setIsLoading(false);
        setNoData(true);
      } else {
        setNoData(false);
        // setIsLoading(false);
        setIsAvilable(true);
      }
    }
    return () => {
      setIsAvilable(false);
      setNoData(false);
      setIsLoading(true);
    };
  }, [DetailsCtx?.details?.count, DetailsCtx?.details?.year]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[55px] font-bold tracking-[-0.5px]">
        {DetailsCtx?.details?.cityName}
      </h1>
      <span className="">{dateObjet}</span>
      {isLoading && <h1 className="text-[24px] text-bold">Loading</h1>}
      {isAvilable && (
        <div className="flex flex-col items-center ">
          <h2 className="text-[30px] font-bold">
            Population Count: {DetailsCtx?.details?.count}
          </h2>
          <p className="font-[600]">in {DetailsCtx?.details?.year}</p>
        </div>
      )}
      {noData && (
        <NotFoundPopulation cityName={DetailsCtx?.details?.cityName} />
      )}
    </div>
  );
};
