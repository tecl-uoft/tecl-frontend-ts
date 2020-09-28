import React from "react";
import { MeetingCalendar } from "../../components/MeetingCalendar";

function Scheduling() {
  return (
    <div className="container mx-auto px-8 pt-4 flex flex-col">
      <StudyNav />
      <MeetingCalendar />
    </div>
  );
}

function StudyNav() {
  const studies = [
    {
      studyName: "Frogger",
    },
    {
      studyName: "Tecl Live",
    },
  ];
  return (
    <div className="flex mb-3 flex-col">
      <h3 className="text-4xl font-bold mx-auto underline">{"Frogger"} Schedule</h3>
      <nav className="space-x-2 mt-2 mx-auto">
        {studies.map((study, idx) => {
          return (
            <button
              className="bg-orange-500 text-white text-md rounded p-1 px-2 outline"
              key={idx}
            >
              {study.studyName}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Scheduling;
