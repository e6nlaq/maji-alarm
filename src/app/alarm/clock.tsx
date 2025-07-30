'use client';

import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat('ja-JP', dateOptions).format(time);
  const formattedTime = new Intl.DateTimeFormat('ja-JP', timeOptions).format(time);

  return (
    <div className="text-center">
      <div className="text-2xl mb-1">{formattedDate}</div>
      <div className="font-mono text-9xl">
        {formattedTime.split(':')[0]}
        <span className="animate-blink">:</span>
        {formattedTime.split(':')[1]}
      </div>
    </div>
  );
};

export default Clock;
