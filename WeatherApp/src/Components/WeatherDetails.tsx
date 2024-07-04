// import React from 'react'

export const WeatherDetails = () => {
  return (
    <div className="text-[#fff] flex items-center">
      <div className="flex h-[200px] ">
        <img src="src/assets/cloud.png" />
      </div>
      <div className="flex flex-col">
        <span className="font-[24px]">
          <i className="mr-[8px] fa-solid fa-temperature-three-quarters"></i>
          Feels like:31C
        </span>
        <span className="font-[24px]">
          <i className="mr-[8px] fa-solid fa-droplet">°</i> Humidity: 15%
        </span>
        <span className="font-[24px]">
          <i className="mr-[8px] fa-solid fa-wind"></i> Wind: 14 km/h
        </span>
        <span className="font-[24px]">
          <i className="mr-[8px] fa-solid fa-cloud-rain"></i> Precipitation: 70%
        </span>
        <span className="font-[24px]">
          <i className="mr-[8px] fa-solid fa-gauge-simple-high"></i>Pressuer: 1017.0MB
        </span>
      </div>
    </div>
  );
};
