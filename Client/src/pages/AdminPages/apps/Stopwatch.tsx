import { useEffect, useState } from "react";
import Sidebar from "../../../components/AdminComponents/Sidebar";

const formatTime = (timeInSecond: number) => {
  const hours = Math.floor(timeInSecond / 36000);
  const minute = Math.floor((timeInSecond % 36000) / 600);
  const second = Math.floor((timeInSecond % 600) / 10);

  const hoursInString = hours.toString().padStart(2, "0");
  const minuteInString = minute.toString().padStart(2, "0");
  const secondInString = second.toString().padStart(2, "0");

  return `${hoursInString}:${minuteInString}:${secondInString}`;
};

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalID: NodeJS.Timeout;
    if (isRunning) {
      intervalID = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 100);
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning]);

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="dashboard-app-container">
        <h1>Stop Watch</h1>
        <section>
          <div className="stopwatch">
            <h2>{formatTime(time)}</h2>
            <button onClick={() => setIsRunning((prev) => !prev)}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stopwatch;
