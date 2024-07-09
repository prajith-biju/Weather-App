import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { CityContext } from "../App";
import { Marquee } from "./Marqee";

export const LandingPage = () => {
  const navigate = useNavigate();
  const Cntxt = useContext(CityContext);
  const [value, setValue] = useState("");

  const displayWeater = () => {
    navigate("display");
  };

  const handleSubmit = () => {
    displayWeater();
    Cntxt?.setCityName(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="container max-w-full  w-full h-screen bg-[#222] p-0 flex items-center justify-center overflow-hidden">
      <h1 className="text-[#fff] text-[70px] tracking-[1.5px] absolute top-[20px] font-bold opacity-[.8]">
        Weather App
      </h1>
      <div className="flex flex-col  p-[40px] z-10">
        <Marquee />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[24px] items-center"
        >
          <input
            type="text"
            onChange={handleChange}
            className="px-[40px] py-[15px] rounded-[70px] text-xl placeholder: text-center placeholder: text-[32px] placeholder: tracking-[2px] focus:outline-none"
            placeholder="Enter City name"
          />
          <button
            type="submit"
            className="bg-[#808080] py-[10px] rounded-[50px] w-[200px] text-[#fff] text-[18px] hover:opacity-[.7] focus:outline-none active:scale-[.98]"
          >
            See Weather
          </button>
        </form>
      </div>
    </div>
  );
};
