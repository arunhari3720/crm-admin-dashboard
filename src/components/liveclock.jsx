import {
  useEffect,
  useState,
} from "react";

export default function LiveClock() {

  const [time, setTime] =
    useState(new Date());

  useEffect(() => {

    const interval =
      setInterval(() => {

        setTime(new Date());

      }, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-6 text-white shadow-lg">

      {/* TIME */}

      <h1 className="text-4xl md:text-6xl font-bold tracking-wide">

        {time.toLocaleTimeString()}

      </h1>

      {/* DATE */}

      <p className="mt-2 text-sm md:text-lg text-blue-100">

        {time.toDateString()}

      </p>

    </div>
  );
}