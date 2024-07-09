import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CityContext } from "../App";
import { DetailsContext } from "../App";
import axios from "axios";
import { WeatherCondition } from "./WeatherCondition";
import { WeatherDetails } from "./WeatherDetails";
import { CityDetails } from "./CityDetails";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { Forecast } from "./Forecast";

export const WeatherDisplay = () => {
  const Cntxt = useContext(CityContext);
  const DTxt = useContext(DetailsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isComplete, setIsCompleter] = useState(false);
  const [isDay, setIsDay] = useState(false);
  const navigate = useNavigate();

  const getData = (city: string) => {
    axios
      .get(`http://localhost:8080/?city=${city}`)
      .then((res) => {
        const { data } = res;
        if (data.status === 404) {
          console.log("**********************************");
          setIsLoading(false);
          setIsError(true);
        } else {
          // console.log(data);
          if (DTxt?.setDetails) {
            const obj = {
              cityName: city,
              feelslike: data.feelslike,
              humidity: data.humidity,
              wind: data.wind,
              pressure: data.pressure,
              precip: data.precip,
              heat_c: data.heat_c,
              heat_f: data.heat_f,
              time: data.time,
              text: data.text,
              icon: data.icon,
              count: undefined,
              year: undefined,
              forecastArray: data.forecastArray,
            };
            DTxt.setDetails(obj);
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.log(err);
      });
  };

  const getPop = () => {
    axios
      .get(`http://localhost:8080/population`)
      .then((res) => {
        if (res.data.status === 404) {
          setIsLoading(false);
          setIsError(true);
        } else {
          const { year, value } = res.data;
          if (DTxt?.setDetails) {
            DTxt.setDetails(
              (prev) => prev && { ...prev, count: +value, year: +year }
            );
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.log(err);
      });
  };

  const checkDay = () => {
    if (DTxt?.details?.time) {
      const currentHour = +DTxt?.details.time.slice(
        10,
        DTxt.details.time.length - 3
      );
      currentHour > 4 && currentHour < 18 ? setIsDay(true) : setIsDay(false);
    }
  };

  useEffect(() => {
    getData(Cntxt?.cityName || "");
    getPop();
    //
  }, []);

  useEffect(() => {
    if (DTxt?.details) {
      checkDay();
      setIsLoading(false);
      setIsCompleter(true);
    }
  }, [getData]);

  return (
    <>
      {isLoading && <Loading />}
      {isError && <Error message="Something wend wrong...!" code={404} />}
      {isComplete && (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-[#178ab6] to-[#70A672] relative">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center bg-white/[0.5] px-[20px] py-[10px] rounded absolute top-[45px] left-[45px] active:bg-[#fff] active:scale-[0.96] hover:bg-[#fff]"
          >
            <i className="fa-solid fa-arrow-left mr-[10px]"></i>Go back
          </button>
          <div
            className={`max-w-screen-lg w-full h-[880px] ${
              isDay ? "bg-day text-[#1976D2]" : "bg-night text-[#fff]"
            } bg-cover bg-no-repeat rounded-[30px] p-[15px] {}`}
          >
            <div className="flex flex-col justify-center items-center gap-[40px] h-full">
              <div className="second flex items-center justify-between w-full px-[80px]">
                <WeatherCondition />
                <WeatherDetails />
              </div>
              <div className="first">
                <CityDetails />
              </div>
              <Forecast />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
