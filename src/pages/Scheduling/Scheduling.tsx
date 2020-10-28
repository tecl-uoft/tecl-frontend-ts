import React, { useEffect, useState } from "react";
import { MeetingCalendar } from "../../components/MeetingCalendar";
import StudyService, { IStudy } from "../../services/StudyService";
import { DateTime } from "luxon";

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
    <div className="container flex flex-col px-4 pt-4 mx-auto">
      <nav className="pl-12 mx-auto mt-2 space-x-2">
        {allStudyList && currentStudy
          ? allStudyList.map((study: any, idx: number) => {
              return (
                <button
                  onClick={() => {
                    setCurrentStudy(study);
                  }}
                  style={{ backgroundColor: study.keyColor }}
                  className={`text-md font-semibold rounded-lg py-1 px-2 text-white border-4 focus:outline-none
                ${
                  currentStudy.studyName === study.studyName
                    ? "border-gray-800"
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
        <h3 className="pl-12 mx-auto text-4xl font-bold underline md:-mb-6 ">
          {currentStudy && `${currentStudy.studyName}`} Schedule
        </h3>
        <div className="flex justify-between w-full">
          <h3 className="h-32 text-xl">
            <div className="underline ">Study Information </div>
            <div className="w-6/12 text-lg">{currentStudy?.description}</div>
          </h3>
          <h3 className="flex flex-col text-xl">
            <div className="underline max-w-1/3">Age Range</div>
            <div className="w-64 pl-4 text-lg">
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
            </div>
            <div className="mt-1 underline">
              Current Time Zone
            </div>
            <div className="block w-full pl-4 text-lg">{DateTime.local().toFormat("ZZZZZ (ZZZZ)")}</div>
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
