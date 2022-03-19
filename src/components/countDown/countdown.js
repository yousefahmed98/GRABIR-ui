import React from "react";
import CountdownTimer from "./CountdownTimer";

import "./count.css";

export default function DealCountDown(props) {
  const NOW_IN_MS = new Date().getTime();
  const date = new Date(props.date);

  const diffDays = (date - NOW_IN_MS) / (1000 * 60 * 60 * 24);

  const THREE_DAYS_IN_MS = diffDays * 24 * 60 * 60 * 1000;

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div>
      {/* <h1>Countdown Timer</h1> */}
      <CountdownTimer targetDate={dateTimeAfterThreeDays} />
    </div>
  );
}
