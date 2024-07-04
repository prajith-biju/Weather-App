import { useContext, useEffect } from "react";
import { CityContext } from "../App";
import axios from "axios";
import { WeatherCondition } from "./WeatherCondition";
import { WeatherDetails } from "./WeatherDetails";
import { CityDetails } from "./CityDetails";

export const WeatherDisplay = () => {
  const Cntxt = useContext(CityContext);

  const getData = (city: string) => {
    axios
      .get(
        // `https://api.weatherapi.com/v1/current.json?q=${city}&key=cb95c5fb28c1496f8e7133822240207`
        "https://countriesnow.space/api/v0.1/countries/population/cities"
      )
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    getData(Cntxt?.cityName || "");
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-[#178ab6] to-[#70A672]">
        <div className="max-w-screen-lg w-full h-[880px] bg-night bg-cover bg-no-repeat rounded-[30px] p-[15px]">
          <div className="flex flex-col justify-center items-center gap-[40px] h-full">
            <div className="second flex items-center justify-between w-full px-[80px]">
              <WeatherCondition />
              <WeatherDetails />
            </div>
            <div className="first text-[#fff]">
              <CityDetails />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
