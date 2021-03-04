import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { MeetingCalendar } from "../../components/MeetingCalendar";
import { notify } from "../../components/Notification";
import StudyService, { IStudyName } from "../../services/StudyService";
import { InstructionNav, Instructions } from "./Instructions";

function SchedulingV2() {
  const [studyHeaders, setStudyHeaders] = useState({
    isLoaded: false,
    studies: [] as IStudyName[],
  });
  const [currentStudy, setCurrentStudy] = useState<IStudyName>();

  useEffect(() => {
    StudyService.listNames({ ownedByUser: false })
      .then((studies) => {
        setStudyHeaders({ isLoaded: true, studies });
      })
      .catch((err) => notify.error(err.message));
  }, []);

  if (!studyHeaders.isLoaded) {
    return <div>Loading...</div>;
  }

  const NavPanels = studyHeaders.studies.map(
    (study: IStudyName, idx: number) => {
      return (
        <React.Fragment key={idx}>
          {idx + (1 % 4) === 0 ? <br /> : null}
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
        </React.Fragment>
      );
    }
  );
  NavPanels.unshift(
    <InstructionNav
      key={-1}
      setCurrentStudy={setCurrentStudy}
      currentStudy={currentStudy}
    />
  );

  return (
    <div className="container flex flex-col px-4 mx-auto">
      <nav className="mx-auto mt-2 md:pl-12 md:space-x-2">{NavPanels}</nav>
      <div>
        {currentStudy ? (
          <>
            <MeetingCalHeader currentStudy={currentStudy} />
            <MeetingCalendar
              studyState={undefined}
              studyName={currentStudy.studyName}
            />
          </>
        ) : (
          <Instructions />
        )}
      </div>
    </div>
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
        <h3 className="text-center md:h-32 md:text-xl">
          <div className="w-full text-lg md:px-4">
            {currentStudy.description}
          </div>
        </h3>
        <h3 className="flex flex-col text-lg text-center md:text-left">
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

export default SchedulingV2;
