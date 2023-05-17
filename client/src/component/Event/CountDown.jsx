import React, { useState } from "react";
import { useEffect } from "react";

function CountDown() {
  const [timeleft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeleft]);

  function calculateTimeLeft() {
    const difference = +new Date("2023-05-19") - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        second: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }
  const timerComponents = Object.keys(timeleft).map((interval, index) => {
    if (!timeleft[interval]) {
      return null;
    }
    //    console.log(timeleft[interval]);
    return (
      <span key={index}>
        <span className="bg-[#f53131] rounded-sm  text-[#ffffff]  px-1 py-0.5 md:px-2  text-[14px] sm:text-[20px] ">
          {timeleft[interval]}{" "}
        </span>
        <span className="text-[#ea6f6f] inline-block mx-auto ">
          {index < Object.keys(timeleft).length - 1 ? " : " : ""}
        </span>
        {/* {timeleft[interval]} {interval.charAt(0).toUpperCase() + interval.slice(1)}{" "} */}
        {/* <span>{interval < 10 ? `0${interval}` : interval}:</span> */}
      </span>
    );
  });

  return (
    <div className="ml-20">
      <span className="text-gray-500 text-[13px] sm:text-[17px] mr-2 mt-2">
        {" "}
        Ending in
      </span>{" "}
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]  "> Time's over!</span>
      )}
    </div>
  );
}

export default CountDown;
