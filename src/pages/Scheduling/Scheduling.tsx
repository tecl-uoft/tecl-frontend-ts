import React, { useEffect, useState } from "react";
import { MeetingCalendar } from "../../components/MeetingCalendar";
import StudyService from "../../services/StudyService";

function Scheduling() {
  const [studyList, setStudyList] = useState<any>(undefined);
  const [currentStudy, setCurrentStudy] = useState<any>(undefined);

  useEffect(() => {
    StudyService.list().then((listObject) => {
      setStudyList(listObject.study);
      setCurrentStudy(listObject.study[0]);
    });
  }, []);

  return (
    <div className="container mx-auto px-8 pt-4 flex flex-col">
      {studyList ? studyList.map((study: any) => study.studyName) : null}
      <div className="flex mb-3 flex-col">
        <h3 className="text-4xl font-bold mx-auto underline">
          {currentStudy && currentStudy.studyName} Schedule
        </h3>
        <nav className="space-x-2 mt-2 mx-auto">
          {studyList && currentStudy
            ? studyList.map((study: any, idx: number) => {
                return (
                  <button
                    onClick={() => setCurrentStudy(study)}
                    style={{ backgroundColor: study.keyColor }}
                    className={`text-md font-semibold rounded p-1 px-2 text-white
                ${
                  currentStudy.studyName === study.studyName
                    ? "border-gray-800 border-4"
                    : "border-white"
                }`}
                    key={idx}
                  >
                    {study.studyName}
                  </button>
                );
              })
            : null}
        </nav>
      </div>
      <MeetingCalendar />
    </div>
  );
}

export default Scheduling;
