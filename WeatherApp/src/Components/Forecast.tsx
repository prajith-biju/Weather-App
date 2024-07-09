import { Days } from "./Days";
import { DetailsContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { DaysArray } from "./CityDetails";

type ElemType = {
  date: string;
  maxtemp: number;
  mintemp: number;
  text: string;
  icon: string;
};

export const Forecast = () => {
  const DTxt = useContext(DetailsContext);
  const [propsData, setPropsData] = useState<ElemType[]>();

  const dateDay = (date: string) => {
    const objDay = new Date(date);
    return DaysArray[objDay.getDay()]; //
  };

  const renderDay = () => {
    let temp = [];
    if (DTxt?.details?.forecastArray) {
      DTxt.details.forecastArray.map((elem: ElemType) => {
        const date = dateDay(elem.date);
        temp.push({
          date,
          maxtemp: elem.maxtemp,
          mintemp: elem.mintemp,
          text: elem.text,
          icon: `http:${elem.icon}`,
        });
        setPropsData(temp);
      });
    }
  };

  useEffect(() => {
    renderDay();
  }, []);

  return (
    <div className="max-w-[900px] w-full bg-black/[0.2] flex items-center justify-between  py-[20px] px-[50px] rounded-[30px] mt-[40px] z-[100]">
      {propsData?.map((elem: ElemType) => (
        <Days
          date={elem.date}
          maxtemp={elem.maxtemp}
          mintemp={elem.mintemp}
          text={elem.text}
          icon={elem.icon}
        />
      ))}
    </div>
  );
};
