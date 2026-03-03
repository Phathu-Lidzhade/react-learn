import { useState, useEffect } from "react";
import dayjs from "dayjs";

function Clock() {
  const [time, settime] = useState(dayjs().format("HH:mm:ss"));

  useEffect(() => {
    setInterval(() => {
      settime(dayjs().format("HH:mm:ss"));
      console.log("run code");
    }, 1000);
  }, []);

  return <p>Current time: {time}</p>;
}

export default Clock;