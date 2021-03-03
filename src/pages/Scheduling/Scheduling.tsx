import React, { useEffect, useState } from "react";
import { MeetingCalendar } from "../../components/MeetingCalendar";
import StudyService, { IStudy } from "../../services/StudyService";
import { DateTime } from "luxon";
import { AskBirthModal } from "../../components/AskBirthModal";

function Scheduling() {
  const [allStudyList, setAllStudyList] = useState<IStudy[] | undefined>(
    undefined
  );
  const [currentStudy, setCurrentStudy] = useState<IStudy | undefined>(
    undefined
  );
  const [showAskBirth, setShowAskBirth] = useState(false);
  const [givenAge, setGivenAge] = useState<number | undefined>(undefined);
  const [showNoMessage, setShowNoMessage] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get("askAge") === "true") {
      setShowAskBirth(true);
    }
  }, []);

  useEffect(() => {
    StudyService.list(false)
      .then((studyList) => {
        setAllStudyList(studyList);
        setCurrentStudy(undefined);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let showBool = true;
    if (urlParams.get("askAge") === "true" && !givenAge) {
      showBool = false;
    }
    if (!urlParams.get("askAge")) {
      showBool = false;
    }

    /* Check if there is a study that works with the age range */
    allStudyList?.forEach((study: IStudy, idx: number) => {
      if (
        givenAge &&
        givenAge >= study.minAgeDays &&
        givenAge <= study.maxAgeDays
      ) {
        showBool = false;
      }
    });
    setShowNoMessage(showBool);
  }, [givenAge, allStudyList]);

  return (
    <div className="container flex flex-col px-4 pt-4 mx-auto">
      {showAskBirth && (
        <AskBirthModal
          setShowModal={setShowAskBirth}
          setGivenAge={setGivenAge}
        />
      )}
      <nav className="mx-auto mt-2 md:pl-12 md:space-x-2">
        {!showNoMessage && (
          <button
            onClick={() => {
              setCurrentStudy(undefined);
            }}
            className={`text-md font-semibold mb-1 rounded-lg text-white bg-orange-500 border-4 focus:outline-none ${currentStudy === undefined && !showNoMessage
              ? "border-gray-800"
              : "border-white"
              }`}
          >
            <div className="w-full px-2 py-1 border-2 border-white rounded-lg">
              Instructions
            </div>
          </button>
        )}
        {allStudyList
          ? allStudyList.map((study: IStudy, idx: number) => {
            if (
              givenAge &&
              (givenAge < study.minAgeDays || givenAge > study.maxAgeDays)
            ) {
              return null;
            }

            return (
              <React.Fragment key={idx}>
                {(idx + 1) % 4 === 0 ? <br /> : null}

                <button
                  onClick={() => {
                    setCurrentStudy(study);
                  }}
                  style={{ backgroundColor: study.keyColor }}
                  className={`text-md font-semibold rounded-lg text-white border-4 focus:outline-none
                ${currentStudy && currentStudy.studyName === study.studyName
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
          })
          : null}
      </nav>
      {currentStudy && (
        <>
          <div className="flex flex-col md:mb-3">
            <h3 className="text-4xl font-bold text-center underline md:pl-12">
              {`${currentStudy.studyName}`} Schedule
            </h3>
            <div className="flex flex-col justify-between w-full pb-4 space-y-4 md:flex-row md:space-y-0 md:py-0">
              <div className="w-64 text-xl md:h-32"></div>
              <h3 className="overflow-scroll text-center md:h-32 md:text-xl">
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
                      <div> <strong>From</strong>: {getAgeFormat(currentStudy.minAgeDays)} </div>
                      <div> <strong>To</strong>: {"  "}
                        {getAgeFormat(currentStudy.maxAgeDays)}{" "}</div>
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
          <div className="-mx-3">
            <MeetingCalendar studyState={currentStudy} />
          </div>
        </>
      )}
      {showNoMessage && (
        <h3 className="w-3/4 mx-auto mt-32 text-2xl font-bold text-center ">
          There are no studies availabe for you right now. <br /> Sign up to
          hear when new and fun online studies come out for your child at{" "}
          <a
            className="text-blue-600 no-underline hover:underline"
            href="https://www.tecl.ca/sign-up"
            target="_blank"
            rel="noopener noreferrer"
          >
            tecl.ca/sign-up
          </a>{" "}
          or get back to us later!
        </h3>
      )}
      {!showNoMessage && !currentStudy && <Instructions />}
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
  return ageString;
}

function Instructions() {
  return (
    <>
      <h1 className="ml-4 text-4xl font-bold text-center text-gray-800 underline">
        {" "}
        Instructions{" "}
      </h1>
      <ol className="flex flex-col my-4 space-y-2 text-xl">
        <li>
          <strong>Step 1.</strong> Click on one the colored buttons at the top,
          depending on the study you want to pick.
        </li>
        <li>
          <strong>Step 2.</strong> Read the age requirements and study
          description before signing up for the study.{" "}
        </li>
        <li>
          <strong>Step 3.</strong> Scroll or leaf through the interactive
          calendar and find available spots for the study. The time intervals
          should have the same color as the button selected in step 1.
        </li>
        <li>
          <strong>Step 4. </strong>Click on the time interval that best suits
          you needs and fill out the information asked within the form!
        </li>
        <li>
          <strong>Step 5. </strong> Wait for an email with the link to your
          online meetup!
        </li>
        <li>
          <strong className="text-2xl">
            Sign up to hear when new and fun online studies come out for your
            child at{" "}
            <a
              className="text-blue-600 no-underline hover:underline"
              href="https://www.tecl.ca/sign-up"
              target="_blank"
              rel="noopener noreferrer"
            >
              tecl.ca/sign-up
            </a>
            !
          </strong>
        </li>
      </ol>
    </>
  );
}

export default Scheduling;
