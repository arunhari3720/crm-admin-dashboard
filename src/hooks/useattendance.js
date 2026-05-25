import { useEffect, useState } from "react";

import axios from "../services/api";

export default function Useattendance() {
  const [summary, setsummary] = useState({});

  const [attendance, setattendance] = useState([]);

  const [loading, setloading] = useState(true);

  const [livetime, setlivetime] = useState("00:00:00");

  const [ischeckedin, setischeckedin] = useState(false);

  // ======================================================
  // FETCH SUMMARY
  // ======================================================

  const fetchsummary = async () => {
    try {
      const res = await axios.get("/attendance/summary");

      setsummary(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ======================================================
  // FETCH ATTENDANCE
  // ======================================================

  const fetchattendance = async () => {
    try {
      const res = await axios.get("/attendance/my-attendance");

      setattendance(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  // ======================================================
  // INITIAL LOAD
  // ======================================================

  useEffect(() => {
    fetchsummary();

    fetchattendance();
  }, []);

  // ======================================================
  // AUTO REFRESH
  // ======================================================

  useEffect(() => {
    const interval = setInterval(() => {
      fetchsummary();

      fetchattendance();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ======================================================
  // LIVE TIMER
  // ======================================================

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date().toISOString().split("T")[0];

      const todayattendance = attendance.find(
        (item) => item.date === today
      );

      if (!todayattendance) {
        setlivetime("00:00:00");

        setischeckedin(false);

        return;
      }

      let totalseconds = 0;

      let activesession = false;

      todayattendance.sessions?.forEach((session) => {
        const checkin = new Date(session.check_in);

        // ACTIVE SESSION

        if (!session.check_out) {
          activesession = true;

          totalseconds += Math.floor(
            (new Date() - checkin) / 1000
          );
        }

        // CLOSED SESSION

        else {
          const checkout = new Date(session.check_out);

          totalseconds += Math.floor(
            (checkout - checkin) / 1000
          );
        }
      });

      setischeckedin(activesession);

      const hours = String(
        Math.floor(totalseconds / 3600)
      ).padStart(2, "0");

      const minutes = String(
        Math.floor((totalseconds % 3600) / 60)
      ).padStart(2, "0");

      const seconds = String(
        totalseconds % 60
      ).padStart(2, "0");

      setlivetime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [attendance]);

  return {
    summary,
    attendance,
    loading,
    livetime,
    ischeckedin,
  };
}