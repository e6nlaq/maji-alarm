"use client";

import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    weekday: "short",
    timeZone: "Asia/Tokyo",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo",
  };

  const formattedDate = time.toLocaleDateString("ja-JP", dateOptions);
  const formattedTime = time.toLocaleTimeString("ja-JP", timeOptions);

  return (
    <div className="text-center text-white">
      <div className="text-xl sm:text-2xl mb-1">{formattedDate}</div>
      <div className="font-mono text-7xl md:text-8xl lg:text-9xl">
        {formattedTime.split(":")[0]}
        <span className="animate-blink">:</span>
        {formattedTime.split(":")[1]}
      </div>
    </div>
  );
};

export default Clock;
