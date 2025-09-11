"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!hydrated) {
    return (
      <div className="text-center text-white">
        <Skeleton className="h-8 w-48 mx-auto mb-1 bg-white" />
        <Skeleton className="h-24 w-96 mx-auto bg-white" />
      </div>
    );
  }

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
