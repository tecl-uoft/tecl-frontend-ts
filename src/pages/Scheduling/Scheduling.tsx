import React, { useState } from "react";
import { MeetingCalendar } from "../../components/MeetingCalendar";

function Scheduling() {
  const studies = [
    {
      studyName: "Frogger",
      color: "blue"
    },
    {
      studyName: "Tecl Live",
      color: "red"
    },
  ];
  const [currentSchedule, setCurrentSchedule] = useState("Frogger");

  return (
    <div className="container mx-auto px-8 pt-4 flex flex-col">
      <div className="flex mb-3 flex-col">
        <h3 className="text-4xl font-bold mx-auto underline">
          {currentSchedule} Schedule
        </h3>
        <nav className="space-x-2 mt-2 mx-auto">
          {studies.map((study, idx) => {
            return (
              <button
                onClick={() => setCurrentSchedule(study.studyName)}
                style={{backgroundColor: study.color}}
                className={`text-md font-semibold rounded p-1 px-2 text-white
                ${
                  currentSchedule === study.studyName
                    ? "border-gray-800 border-4"
                    : "border-white"
                }`}
                key={idx}
              >
                {study.studyName}
              </button>
            );
          })}
        </nav>
      </div>
      <MeetingCalendar />
    </div>
  );
}

export default Scheduling;
