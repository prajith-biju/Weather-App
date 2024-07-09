import React, { useState } from "react";
import "./App.css";
import { LandingPage } from "./Components/LandingPage";
import { WeatherDisplay } from "./Components/WeatherDisplay";
import { Error } from "./Components/Error";
import { Route, Routes } from "react-router";

type CityContextType = {
  cityName: string | "";
  setCityName: React.Dispatch<React.SetStateAction<string>>;
};

type Details = {
  cityName: string;
  feelslike: number;
  humidity: number;
  wind: number;
  pressure: number;
  precip: number;
  heat_c: number;
  heat_f: number;
  time: string;
  text: string;
  icon: string;
  count: number | undefined;
  year: number | undefined;
  forecastArray: {
    date: string;
    maxtemp: number;
    mintemp: number;
    text: string;
    icon: string;
  }[];
};

type DetailsContextType = {
  details: Details | undefined;
  setDetails: React.Dispatch<React.SetStateAction<Details | undefined>>;
};

export const CityContext = React.createContext<CityContextType | null>(null);
export const DetailsContext = React.createContext<DetailsContextType | null>(
  null
);

function App() {
  const [cityName, setCityName] = useState("");
  const [details, setDetails] = useState<Details>();

  return (
    <>
      <DetailsContext.Provider value={{ details, setDetails }}>
        <CityContext.Provider value={{ cityName, setCityName }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="display" element={<WeatherDisplay />} />
            <Route path="*" element={<Error message="Page Not Found...!" />} />
          </Routes>
        </CityContext.Provider>
      </DetailsContext.Provider>
    </>
  );
}

export default App;
