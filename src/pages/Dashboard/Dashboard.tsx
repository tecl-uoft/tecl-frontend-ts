import React, { useEffect, useState } from "react";
import { AddStudyForm } from "../../components/AddStudyForm";
import { FocusedModal } from "../../components/FocusedModal";
import { StudyHoursSetterModal } from "../../components/StudyHoursSetterModal";
import { useAuth } from "../../context/AuthContext";
import { useStudy } from "../../context/StudyContext";
import ScheduleEventService, {
  IBookedScheduleEvent,
} from "../../services/ScheduleEventService";
import StudyService, { IStudy } from "../../services/StudyService";
import { BookedCalendar } from "../../components/BookedCalendar";
import { DateTime } from "luxon";
import Input from "../../components/common/Input";
import { useHistory } from "react-router-dom";

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
              alert(
                "You must be logged in to access the dashboard. Redirecting to login..."
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
        <h2 className="text-3xl font-semibold">Current Studies</h2>
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
          return (
            <div className="mb-2" key={idx}>
              <StudyTitlePanel study={study} />
              <AppointmentPanel study={study} />
              <CoordinatorsPanel studyName={study.studyName} />
              <ul className="mb-4 text-lg">
                {study.leadResearchers.map((researcher, idx) => {
                  return (
                    <li className="flex" key={idx}>{`${idx + 1}. ${
                      researcher.email
                    } (${researcher.firstName} ${
                      researcher.lastName ? researcher.lastName : ""
                    }) `}</li>
                  );
                })}
              </ul>
              <StatisticsPanel study={study} />
            </div>
          );
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

function StudyTitlePanel({ study }: { study: IStudy }) {
  return (
    <div className="flex flex-col md:flex-row">
      <div
        className="h-2 my-auto flex-grow mx-6 text-white rounded select-none"
        style={{ backgroundColor: study.keyColor }}
      />
      <div className="pt-1 inline-block text-2xl font-semibold rounded ">
        {study.studyName} Study
      </div>
      <div
        className="h-2 my-auto flex-grow mx-6 text-white rounded select-none"
        style={{ backgroundColor: study.keyColor }}
      />
    </div>
  );
}

function StatisticsPanel({ study }: { study: IStudy }) {
  return (
    <div className="flex flex-col mt-2">
      <h4 className="my-auto text-xl">Statistics:</h4>
      <p className="">Appointment Goals: {study.apptGoals} Appointments</p>
    </div>
  );
}

function CoordinatorsPanel({ studyName }: { studyName: string }) {
  const [participantAddText, setParticipantAddText] = useState("");
  const studyCtx = useStudy();
  const addCurrentCoordinator = () => {
    studyCtx?.addCoordinators({
      studyName,
      leadResearchers: [participantAddText],
    });
    window.location.reload();
  };

  const onCoordinatorEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      if (participantAddText === "") {
        alert("Empty box");
        return;
      }
      // Cancel the default action, if needed
      e.preventDefault();
      // Trigger the button element with a click
      addCurrentCoordinator();
    }
  };

  return (
    <div className="mt-2">
      <h4 className="my-auto text-xl">Add Additional RAs:</h4>
      <div
        className="flex w-1/3 mt-2 space-x-2"
        onKeyPress={onCoordinatorEnter}
      >
        {" "}
        <Input
          value={participantAddText}
          valueSetter={setParticipantAddText}
          type="email"
          placeholder="janedoe@testmail.com"
        />{" "}
        <button
          onClick={addCurrentCoordinator}
          className="px-4 mb-2 text-white bg-orange-600 rounded hover:bg-orange-800 focus:outline-none focus:shadow-outline"
        >
          <p className="">Add</p>
        </button>
      </div>
    </div>
  );
}

function AppointmentPanel({ study }: { study: IStudy }) {
  const [bookedList, setBookedList] = useState({
    isLoaded: false,
    scheduledEvents: [] as IBookedScheduleEvent[],
  });
  useEffect(() => {
    if (study.studyName) {
      ScheduleEventService.listBooked(study.studyName)
        .then((scheduledEvents) => {
          setBookedList({ isLoaded: true, scheduledEvents });
        })
        .catch((err) => alert(err));
    }
  }, [study.studyName]);
  const studyCtx = useStudy();

  const [showBookedCalendar, setShowBookedCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onModifyAvailability = (study: IStudy) => () => {
    if (studyCtx) {
      studyCtx.findAndSetStudy(study.studyName);
      setShowModal(true);
    }
  };

  return (
    <div className="w-full">
      {showBookedCalendar && (
        <BookedCalendar
          scheduledEvents={bookedList.scheduledEvents}
          exitFunc={() => setShowBookedCalendar(false)}
        />
      )}
      <div className="flex justify-between">
        <h4 className="my-auto text-xl">Upcoming Appointments:</h4>
        <div className="flex space-x-2">
          {studyCtx && (
            <button
              onClick={onModifyAvailability(study)}
              className="px-2 text-white bg-orange-500 rounded hover:bg-orange-800 focus:outline-none focus:shadow-outline"
            >
              Modify Availability
            </button>
          )}

          <button
            onClick={() => setShowBookedCalendar(true)}
            className="p-2 text-white bg-orange-500 rounded hover:bg-orange-800 focus:outline-none focus:shadow-outline"
          >
            All Booked
          </button>
        </div>
      </div>
      {showModal && <StudyHoursSetterModal setShowModal={setShowModal} />}
      <div className="h-64 m-2 overflow-auto bg-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="font-semibold text-white bg-gray-700 text-md">
            <tr>
              <th className="px-4 py-2 text-left">Booked By</th>
              <th className="px-4 py-2 text-left">Child Name</th>
              <th className="px-4 py-2 text-left">Parent Name</th>
              <th className="px-4 py-2 text-left">Appointment Date</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Child Age</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {bookedList.isLoaded &&
              bookedList.scheduledEvents.map((event, idx) => {
                return (
                  new Date(event.start) >= new Date() && (
                    <tr
                      key={idx}
                      className={`hover:shadow-md hover:text-red-800 cursor-pointer ${
                        idx % 2 === 0 && "bg-orange-200"
                      }`}
                    >
                      <td className="px-4 py-2 text-left">
                        {event.bookedBy
                          ? event.bookedBy.firstName +
                            " " +
                            event.bookedBy.lastName
                          : "Parent"}
                      </td>
                      <td className="px-4 py-2 text-left">
                        {event.participantInfo.child.firstName +
                          " " +
                          event.participantInfo.child.lastName}
                      </td>
                      <td className="px-4 py-2 text-left">
                        {event.participantInfo.firstName +
                          " " +
                          event.participantInfo.lastName}
                      </td>

                      <td className="px-4 py-2 text-left">
                        {DateTime.fromISO(event.end).toFormat("fff")}
                      </td>
                      <td className="px-4 py-2 text-left">
                        {event.participantInfo.email}
                      </td>
                      <td className="px-4 py-2 text-left">
                        {findAge(event.participantInfo.child.dob)}
                      </td>
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
      </div>
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
