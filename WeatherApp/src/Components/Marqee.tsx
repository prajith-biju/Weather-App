import { useState, useEffect } from "react";
import axios from "axios";

export const Marquee = () => {
  const [text, setText] = useState("");

  const getText = () => {
    axios.get("https://dummyjson.com/quotes/random").then((res) => {
      const { quote } = res.data;
      setText(quote);
    });
  };

  useEffect(() => {
    getText()
    const IntervalId = setInterval(() => {
      getText();
    }, 5000);
    return () => {
      clearInterval(IntervalId);
    };
  }, []);

  return (
    <div
      className={`mb-[40px] text-[#fff] text-[40px] text-center tracking-[1px] animate-marqueeText`}
    >
      {text}
    </div>
  );
};
