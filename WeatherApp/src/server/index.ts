import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import axios from "axios";

dotenv.config();

let cityName = "";
type KeyType = {
  city: string;
  country: string;
  populationCounts: {
    year: string;
    value: string;
    sex: string;
    reliabilty: string;
  }[];
};

const app: Express = express();

app.use(express.json());
app.use(cors());

const capitalise = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};

const findData = (array: Array<KeyType>) => {
  let obj = {};
  array.map((key: KeyType) => {
    if (key.city === capitalise(cityName)) {
      const year = key.populationCounts[key.populationCounts.length - 1].year;
      const value = key.populationCounts[key.populationCounts.length - 1].value;
      obj = { year, value };
    }
  });
  return obj;
};

app.get("/", async (req: Request, res: Response) => {
  if (req.query.city) {
    try {
      cityName = capitalise(req.query.city.toString());
      const resp = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?q=${req.query.city}&key=cb95c5fb28c1496f8e7133822240207&days=5`
      );
      const { current, location, forecast } = resp.data;
      const {
        feelslike_c: feelslike,
        humidity,
        wind_kph: wind,
        pressure_mb: pressure,
        precip_mm: precip,
        heatindex_c: heat_c,
        heatindex_f: heat_f,
        condition,
      } = current;
      const { localtime: time } = location;
      const { text, icon } = condition;
      const { forecastday } = forecast;
      let forecastArray = [];

      for (let i = 0; i < forecastday.length; i++) {
        let { date, day } = forecastday[i];
        let { maxtemp_c, mintemp_c, condition } = day;
        let { text, icon } = condition;
        let temp = { date, mintemp: mintemp_c, maxtemp: maxtemp_c, text, icon };
        forecastArray.push(temp);
      }

      res.json({
        feelslike,
        humidity,
        wind,
        pressure,
        precip,
        heat_c,
        heat_f,
        time,
        text,
        icon,
        forecastArray,
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error,
      });
    }
  }
});

app.get("/population", async (req: Request, res: Response) => {
  try {
    const resPopu = await axios.get(
      `https://countriesnow.space/api/v0.1/countries/population/cities`
    );
    const { data } = resPopu.data;
    res.json(findData(data));
  } catch (error) {
    res.json({
      status: 404,
      message: error,
    });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
