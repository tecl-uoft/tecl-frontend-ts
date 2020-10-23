import React, { useEffect, useState } from "react";
import { MeetingCalendar } from "../../components/MeetingCalendar";
import StudyService, { IStudy } from "../../services/StudyService";

function Scheduling() {
  const [allStudyList, setAllStudyList] = useState<IStudy[] | undefined>(
    undefined
  );
  const [currentStudy, setCurrentStudy] = useState<IStudy | undefined>(
    undefined
  );

  useEffect(() => {
    StudyService.list(false)
      .then((studyList) => {
        setAllStudyList(studyList);
        setCurrentStudy(studyList[0]);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className="container flex flex-col px-8 pt-4 mx-auto">
      <nav className="mx-auto mt-2 space-x-2">
        {allStudyList && currentStudy
          ? allStudyList.map((study: any, idx: number) => {
              return (
                <button
                  onClick={() => {
                    setCurrentStudy(study);
                    /* studyCtx?.setStudyState(study); */
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
      <div className="flex flex-col mb-3">
        <h3 className="mx-auto text-4xl font-bold underline">
          {currentStudy && `${currentStudy.studyName}`} Schedule
        </h3>
        <div className="flex justify-between">
          <h3 className="flex flex-col text-xl">
            <div className="underline ">Study Information: </div>
            <div className="mb-6 text-md">{currentStudy?.description}</div>
          </h3>
          <h3 className="flex flex-col pb-2 text-xl">
            <div className="underline ">Age Range</div>
            <div className="">
              {" "}
              {currentStudy?.minAgeDays &&
                currentStudy?.maxAgeDays &&
                `${currentStudy?.minAgeDays}  days to ${currentStudy?.maxAgeDays} days`}{" "}
            </div>
          </h3>
        </div>
      </div>
      <MeetingCalendar studyState={currentStudy} />
    </div>
  );
}
/* 
function instructions() {
  
}
 */
export default Scheduling;
