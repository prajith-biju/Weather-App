import { useContext } from "react";
import { DetailsContext } from "../App";

export const WeatherCondition = () => {
  const DetailsCtx = useContext(DetailsContext);

  return (
    <div className="flex items-center">
      <div className="text-[90px] font-[400] mr-[16px]">
        {DetailsCtx?.details?.heat_c}
      </div>
      <div>
        <h3 className="text-[35px]">°C</h3>
        <p className="text-[24px] font-[600]">{DetailsCtx?.details?.text}</p>
      </div>
    </div>
  );
};
