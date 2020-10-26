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
        <h3 className="pl-12 mx-auto text-4xl font-bold underline md:-mb-6 md:mt-4">
          {currentStudy && `${currentStudy.studyName}`} Schedule
        </h3>
        <div className="flex justify-between w-full">
          <h3 className="w-1/3 h-32 text-xl">
            <div className="underline ">Study Information </div>
            <div>{currentStudy?.description}</div>
          </h3>
          <h3 className="flex flex-col text-xl">
            <div className="underline max-w-1/3">Age Range</div>
            <div className="">
              {" "}
              {currentStudy &&
                `${
                  currentStudy.minAgeDays % 30 === 0
                    ? currentStudy.minAgeDays / 30
                    : Math.floor(currentStudy.minAgeDays / 30)
                } months to `}
              {currentStudy &&
                `${
                  currentStudy.maxAgeDays % 30 === 0
                    ? currentStudy.maxAgeDays / 30
                    : Math.floor(currentStudy.maxAgeDays / 30)
                } months`}
              {/*  {currentStudy?.minAgeDays &&
                currentStudy?.maxAgeDays &&
                ` to ${currentStudy?.maxAgeDays} days`}{" "} */}
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
