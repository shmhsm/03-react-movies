import { useState, useEffect } from 'react';

export default function Timer() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>TimerBox - {time.toLocaleTimeString()}</div>
  );
}