import MeetingCalHeader, { MeetingCalNav } from "./MeetingCalHeader";
import React, { useEffect, useState } from "react";
import { MeetingCalendar } from "../../components/MeetingCalendar";
import { notify } from "../../components/Notification";
import StudyService, { IStudyName } from "../../services/StudyService";
import { InstructionNav, Instructions } from "./Instructions";
import AskBirthModal from "./AskBirthModal";
import NoStudiesAvailable from "./NoStudiesAvailable";
import { useAuth } from "../../context/AuthContext";

function SchedulingV2() {
  const [studyHeaders, setStudyHeaders] = useState({
    isLoaded: false,
    studies: [] as IStudyName[],
  });
  const [currentStudy, setCurrentStudy] = useState<IStudyName>();
  const [showAskBirth, setShowAskBirth] = useState(false);
  const [givenAge, setGivenAge] = useState<number | undefined>(undefined);
  const [navPanels, setNavPanels] = useState<JSX.Element[]>([]);
  const [showNotAvailable, setShowNotAvailable] = useState(true);
  const authCtx = useAuth();

  useEffect(() => {
    StudyService.listNames({ ownedByUser: false })
      .then((studies) => {
        setStudyHeaders({ isLoaded: true, studies });
      })
      .catch((err) => notify.error(err.message));
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get("askAge") === "true") {
      setShowAskBirth(true);
    }
  }, []);

  useEffect(() => {
    let NavPanels = studyHeaders.studies.map(
      (study: IStudyName, idx: number) => {
        return (
          <MeetingCalNav
            study={study}
            currentStudy={currentStudy}
            setCurrentStudy={setCurrentStudy}
            order={idx}
            key={idx}
          />
        );
      }
    );
    if (givenAge) {
      NavPanels = studyHeaders.studies.map((study: IStudyName, idx: number) => {
        if (
          givenAge &&
          givenAge >= study.minAgeDays &&
          givenAge <= study.maxAgeDays
        ) {
          setShowNotAvailable(false);
          return (
            <MeetingCalNav
              study={study}
              currentStudy={currentStudy}
              setCurrentStudy={setCurrentStudy}
              order={idx}
              key={idx}
            />
          );
        } else {
          return <> </>;
        }
      });
    }
    NavPanels.unshift(
      <InstructionNav
        key={-1}
        setCurrentStudy={setCurrentStudy}
        currentStudy={currentStudy}
      />
    );

    setNavPanels(NavPanels);
  }, [givenAge, currentStudy, studyHeaders.studies]);

  if (!studyHeaders.isLoaded) {
    return <div>Loading...</div>;
  }
  if (
    !showAskBirth &&
    showNotAvailable &&
    !authCtx?.authState?.isAuthenticated
  ) {
    return <NoStudiesAvailable />;
  }

  return (
    <div className="container flex flex-col px-4 mx-auto">
      {showAskBirth && (
        <AskBirthModal
          setShowModal={setShowAskBirth}
          setGivenAge={setGivenAge}
        />
      )}
      <nav className="mx-auto mt-2 md:pl-12 md:space-x-2">{navPanels}</nav>
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

export default SchedulingV2;
