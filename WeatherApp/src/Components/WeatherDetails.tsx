import { useContext } from "react";
import { DetailsContext } from "../App";

export const WeatherDetails = () => {
  const DetailsCtx = useContext(DetailsContext);

  return (
    <div className="flex items-center">
      <div className="flex h-[200px] ">
        <img src={`http:${DetailsCtx?.details?.icon}`} />
      </div>
      <div className="flex flex-col text-[18px]">
        <span className="">
          <i className="mr-[8px] fa-solid fa-temperature-three-quarters"></i>
          Feels like: {DetailsCtx?.details?.feelslike}°C
        </span>
        <span className="">
          <i className="mr-[8px] fa-solid fa-droplet">°</i> Humidity:{" "}
          {DetailsCtx?.details?.humidity}%
        </span>
        <span className="">
          <i className="mr-[8px] fa-solid fa-wind"></i> Wind:{" "}
          {DetailsCtx?.details?.wind} km/h
        </span>
        <span className="">
          <i className="mr-[8px] fa-solid fa-cloud-rain"></i> Precipitation:{" "}
          {DetailsCtx?.details?.precip}mm
        </span>
        <span className="">
          <i className="mr-[8px] fa-solid fa-gauge-simple-high"></i>Pressuer:{" "}
          {DetailsCtx?.details?.pressure}MB
        </span>
      </div>
    </div>
  );
};
