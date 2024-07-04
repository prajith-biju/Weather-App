import React, { useState } from "react";
import "./App.css";
import { LandingPage } from "./Components/LandingPage";
import { WeatherDisplay } from "./Components/WeatherDisplay";
import { Route, Routes } from "react-router";

type CityContextType = {
  cityName: string | "";
  setCityName: React.Dispatch<React.SetStateAction<string>>;
};

export const CityContext = React.createContext<CityContextType | null>(null);

function App() {
  const [cityName, setCityName] = useState("");

  return (
    <>
      <CityContext.Provider value={{ cityName, setCityName }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="display" element={<WeatherDisplay />} />
        </Routes>
      </CityContext.Provider>
    </>
  );
}

export default App;
