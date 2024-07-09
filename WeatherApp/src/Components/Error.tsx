import React from "react";

type Props = {
  message: string;
  code?: number;
};

export const Error: React.FC<Props> = ({ message, code }) => {
  return (
    <div className="max-w-full  w-full h-screen text-[#fff] bg-[#222] p-0 flex flex-col items-center justify-center overflow-hidden">
      <h1 className="text-[180px] font-bold tracking-[20px]">{code}</h1>
      <h2 className="text-[80px] text-center tracking-[5px]">{message}</h2>
    </div>
  );
};
