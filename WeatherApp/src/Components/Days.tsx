import React from "react";

export type Props = {
  date: string;
  maxtemp: number;
  mintemp: number;
  text: string;
  icon: string;
};

export const Days: React.FC<Props> = ({
  date,
  maxtemp,
  mintemp,
  text,
  icon,
}) => {
  return (
    <div className="text-[20px] flex flex-col items-center justify-center">
      <div>{date}</div>
      <div className="w-[80px] h-[50px]">
        <img src={icon} className="h-full w-full object-contain" alt="image" />
      </div>
      <div>
        {mintemp}° - {maxtemp}°
      </div>
      <div className="text-[16px]">{text}</div>
    </div>
  );
};
