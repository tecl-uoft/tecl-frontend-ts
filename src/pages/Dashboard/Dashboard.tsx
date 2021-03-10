import React, { useEffect, useState } from "react";
import { AddStudyForm } from "../../components/AddStudyForm";
import { FocusedModal } from "../../components/FocusedModal";
import { useAuth } from "../../context/AuthContext";
import StudyService, { IStudy } from "../../services/StudyService";
import { DateTime } from "luxon";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import StudyPanel from "./StudyPanel";

function Dashboard() {
  const authCtx = useAuth();
  const history = useHistory();

  const [showAddStudyModal, setShowAddStudyModal] = useState(false);
  const [userStudyList, setUserStudyList] = useState<IStudy[] | undefined>(
    undefined
  );
  const [updateList, setUpdateList] = useState(true);

  const onAddStudy = () => {
    setShowAddStudyModal(true);
  };

  useEffect(() => {
    if (updateList) {
      StudyService.list(true)
        .then((studyList) => {
          setUserStudyList(studyList);
        })
        .catch((err) => {
          new Promise((res, rej) => {
            res(
              toast(
                "You are currently logged out. You must be logged in to access the dashboard. Redirecting to login...",
                {
                  icon: "🔒",
                }
              )
            );
          }).then(() => {
            history.push("/login");
          });
        });
      setUpdateList(false);
    }
  }, [updateList, history]);
  if (!authCtx?.authState.user) {
    return <> </>;
  }

  return (
    <div className="container flex flex-col px-8 py-4 mx-auto">
      <h1 className="mx-auto text-3xl font-bold">
        {authCtx.authState.user.firstName &&
          authCtx.authState.isAuthenticated &&
          `Hello ${authCtx.authState.user.firstName}!`}
      </h1>
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold">Your Current Studies</h2>
        <div>
          <button
            onClick={onAddStudy}
            className="p-2 py-2 ml-4 text-white bg-gray-800 rounded hover:text-orange-500 focus:outline-none focus:shadow-outline"
          >
            Create Study
          </button>
          {/* <button className="p-2 ml-4 text-white bg-orange-800 rounded hover:text-orange-300 focus:outline-none focus:shadow-outline">
            Sync Google Calendar
          </button> */}
        </div>
      </div>
      {userStudyList &&
        userStudyList.map((study, idx) => {
          return <StudyPanel key={idx} study={study} />;
        })}

      {showAddStudyModal && (
        <FocusedModal setShowModal={setShowAddStudyModal}>
          <AddStudyForm
            windowClose={() => {
              setUpdateList(true);
              setShowAddStudyModal(false);
            }}
          />
        </FocusedModal>
      )}
    </div>
  );
}

export function findAge(dobDate: string): string {
  const currTime = DateTime.local();
  const dobTime = DateTime.fromISO(dobDate);
  const diffTimeYears = Math.floor(currTime.diff(dobTime, "years").years);
  const diffTimeMonths = Math.floor(
    currTime.diff(dobTime, "months").months % 12
  );
  const diffTimeDays = Math.floor(currTime.diff(dobTime, "days").days % 12);

  let dobStr = "";
  if (diffTimeYears > 1) {
    dobStr += `${diffTimeYears} years`;
  } else if (diffTimeYears && diffTimeYears === 1) {
    dobStr += `${diffTimeYears} year`;
  }
  if (diffTimeYears && diffTimeYears) {
    dobStr += " ";
  }

  if (diffTimeMonths > 1) {
    dobStr += `${diffTimeMonths} months`;
  } else if (diffTimeMonths === 1) {
    dobStr += `${diffTimeMonths} month`;
  }

  if (!diffTimeYears && !diffTimeMonths) {
    if (diffTimeDays > 1) {
      dobStr += `${diffTimeDays} days`;
    } else if (diffTimeDays === 1) {
      dobStr += `${diffTimeDays} day`;
    }
  }

  return dobStr;
}

export default Dashboard;
