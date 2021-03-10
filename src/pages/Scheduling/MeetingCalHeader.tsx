import { DateTime } from "luxon";
import { IStudyName } from "../../services/StudyService";
import React from "react";

interface IMeetingCalNavProps {
  study: IStudyName;
  currentStudy: IStudyName | undefined;
  setCurrentStudy: React.Dispatch<React.SetStateAction<IStudyName | undefined>>;
  order: number;
}

export function MeetingCalNav(props: IMeetingCalNavProps) {
  const { study, currentStudy, setCurrentStudy, order } = props;
  return (
    <>
      {order + (1 % 4) === 0 ? <br /> : null}
      <button
        onClick={() => {
          setCurrentStudy(study);
        }}
        style={{ backgroundColor: study.keyColor }}
        className={`text-md font-semibold rounded-lg text-white border-4 focus:outline-none
        ${
          currentStudy && currentStudy.studyName === study.studyName
            ? "border-gray-800"
            : "border-white"
        }`}
      >
        <div className="w-full px-2 py-1 border-2 border-white rounded-lg">
          {study.studyName + " Study"}
        </div>
      </button>
    </>
  );
}

function MeetingCalHeader({ currentStudy }: { currentStudy: IStudyName }) {
  return (
    <div className="flex flex-col md:mb-3">
      <h3 className="text-4xl font-bold text-center underline md:pl-12">
        {`${currentStudy.studyName}`} Schedule
      </h3>
      <div className="flex flex-col justify-between w-full pb-4 space-y-4 md:flex-row md:space-y-0 md:py-0">
        <div className="w-64 text-xl md:h-32"></div>
        <h3 className="w-full h-32 text-center md:text-xl">
          <div className="h-40 overflow-y-auto text-lg bg-gray-200 rounded-lg md:px-2">
            {currentStudy.description}
          </div>
        </h3>
        <h3 className="flex flex-col h-40 p-2 mx-2 text-lg text-center bg-gray-200 rounded-lg md:text-left">
          <div className="underline max-w-1/3">Required Age Range</div>
          <div className="w-64 mx-auto text-lg">
            {" "}
            {
              <div className="flex flex-col text-left md:ml-4">
                {" "}
                <div>
                  {" "}
                  <strong>From</strong>: {getAgeFormat(currentStudy.minAgeDays)}{" "}
                </div>
                <div>
                  {" "}
                  <strong>To</strong>: {"  "}
                  {getAgeFormat(currentStudy.maxAgeDays)}{" "}
                </div>
              </div>
            }
          </div>
          <div className="mt-1 underline">Current Time Zone</div>
          <div className="block w-full text-lg md:pl-4">
            {DateTime.local().toFormat("ZZZZZ (ZZZZ)")}
          </div>
        </h3>
      </div>
    </div>
  );
}

function getAgeFormat(ageDays: number) {
  let totalDays = ageDays;
  let ageString = "";

  if (ageDays / 365 >= 1) {
    const ageYears = Math.floor(ageDays / 365);
    ageString += ageYears;
    ageString += ageYears === 1 ? " year " : " years ";
    totalDays -= ageYears * 365;
  }
  if (totalDays / 30 >= 1) {
    const ageMonths = Math.floor(totalDays / 30);
    ageString += ageMonths;
    ageString += ageMonths === 1 ? " month " : " months ";
    totalDays -= ageMonths * 30;
  }
  if (totalDays >= 1) {
    ageString += totalDays;
    ageString += totalDays === 1 ? " day" : " days";
  }
  if (ageDays === 0) {
    ageString = "Birth";
  }
  return ageString;
}

export default MeetingCalHeader;
