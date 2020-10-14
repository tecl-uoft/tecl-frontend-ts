import React, { useEffect, useState } from "react";
import { MeetingCalendar } from "../../components/MeetingCalendar";
import { useStudy } from "../../context/StudyContext";
import StudyService from "../../services/StudyService";

function Scheduling() {
  const [studyList, setStudyList] = useState<any>(undefined);
  const [currentStudy, setCurrentStudy] = useState<any>(undefined);
  const studyCtx = useStudy();

  useEffect(() => {
    StudyService.list().then((listObject) => {
      console.log("", listObject);
      setStudyList(listObject.study);
      const default_study = listObject.study[0];
      setCurrentStudy(default_study);
      studyCtx?.setStudyState(default_study);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {}, [currentStudy]);

  return (
    <div className="container flex flex-col px-8 pt-4 mx-auto">

      <div className="flex flex-col mb-3">
        <h3 className="mx-auto text-4xl font-bold underline">
          {currentStudy && currentStudy.studyName} Schedule
        </h3>
        <nav className="mx-auto mt-2 space-x-2">
          {studyList && currentStudy
            ? studyList.map((study: any, idx: number) => {
                return (
                  <button
                    onClick={() => {
                      setCurrentStudy(study);
                      studyCtx?.setStudyState(study);
                    }}
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
/* 
function instructions() {
  
}
 */
export default Scheduling;
