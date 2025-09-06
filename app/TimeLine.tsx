"use client";

import React, { useState } from "react";
import { OverlayTrigger, Tooltip, Popover } from "react-bootstrap";
import styles from "./TimeLine.module.css";

type Event = {
  year: number;
  text: string;
};

interface TimeLineProps {
  startYear: number;
  endYear: number;  
  events: Event[];
}

export default function TimeLine({ startYear, endYear, events }: TimeLineProps) {
  const totalYears = endYear - startYear;
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  const getPosition = (year: number) => ((year - startYear) / totalYears) * 100;

  // tacche ogni 50 anni
  const ticks: number[] = [];
  for (let y = startYear; y <= endYear; y += 50) {
    ticks.push(y);
  }

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineBar}>
        {/* Tacche ogni 50 anni */}
        {ticks.map((year, i) => (
          <div
            key={i}
            className={styles.tick}
            style={{ left: `${getPosition(year)}%` }}
          >
            <span className={styles.tickLabel}>{year}</span>
          </div>
        ))}

        {/* Eventi */}
        {events.map((event, i) => (
          <OverlayTrigger
            key={i}
            placement="top"
            overlay={<Tooltip>{event.text} ({event.year})</Tooltip>}
          >
            <div
              className={`${styles.eventDot} ${event.year === endYear ? styles.today : ""}`}
              style={{ left: `${getPosition(event.year)}%` }}
              onClick={() => setActiveEvent(i)}
            />
          </OverlayTrigger>
        ))}
      </div>

      {/* Mostra evento selezionato sotto la linea */}
      {activeEvent !== null && (
        <div className={styles.eventInfo}>
          <strong>{events[activeEvent].year}:</strong> {events[activeEvent].text}
        </div>
      )}
    </div>
  );
}
