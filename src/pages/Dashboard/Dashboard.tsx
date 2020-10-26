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

function Dashboard() {
  const authCtx = useAuth();
  const studyCtx = useStudy();
  const [showModal, setShowModal] = useState(false);
  const [showAddStudyModal, setShowAddStudyModal] = useState(false);
  const [userStudyList, setUserStudyList] = useState<IStudy[] | undefined>(
    undefined
  );

  useEffect(() => {
    StudyService.list(true)
      .then((studyList) => {
        console.log(studyList, "dash");
        setUserStudyList(studyList);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className="container flex flex-col px-8 pt-4 mx-auto">
      <h1 className="mx-auto text-3xl font-bold">
        {authCtx?.authState &&
          authCtx.authState.user?.firstName &&
          authCtx.authState.isAuthenticated &&
          `Hello ${authCtx.authState.user.firstName}!`}
      </h1>
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold">Current Studies</h2>
        <div>
          <button
            onClick={() => setShowAddStudyModal(true)}
            className="p-2 py-2 ml-4 text-white bg-gray-800 rounded hover:text-orange-500 focus:outline-none focus:shadow-outline"
          >
            + Add Study
          </button>
          <button className="p-2 ml-4 text-white bg-orange-800 rounded hover:text-orange-300 focus:outline-none focus:shadow-outline">
            Sync Google Calendar
          </button>
        </div>
      </div>
      {userStudyList &&
        userStudyList.map((study, idx) => {
          return (
            <div key={idx}>
              <h3 className="py-1 mt-4 text-2xl font-semibold rounded">
                <div>{study.studyName} Study</div>
              </h3>

              <div className="flex mt-2">
                <div
                  className="block p-2 text-white rounded"
                  style={{ backgroundColor: study.keyColor }}
                >
                  {" "}
                  Key Color{" "}
                </div>

                {studyCtx && (
                  <button
                    onClick={() => {
                      studyCtx.findAndSetStudy(study.studyName);
                      setShowModal(true);
                    }}
                    className="h-10 px-2 ml-4 text-white bg-orange-500 rounded hover:bg-orange-800 focus:outline-none focus:shadow-outline"
                  >
                    Modifiy Availability
                  </button>
                )}
              </div>
              <AppointmentPanel study={study} />
            </div>
          );
        })}

      {showModal && <StudyHoursSetterModal setShowModal={setShowModal} />}
      {showAddStudyModal && (
        <FocusedModal setShowModal={setShowAddStudyModal}>
          <AddStudyForm
            windowClose={() => {
              setShowAddStudyModal(false);
            }}
          />
        </FocusedModal>
      )}
    </div>
  );
}

interface IAppointmentPanelProps {
  study: IStudy;
}

function AppointmentPanel(props: IAppointmentPanelProps) {
  const { study } = props;
  const [bookedList, setBookedList] = useState({
    isLoaded: false,
    scheduledEvents: [] as IBookedScheduleEvent[],
  });
  useEffect(() => {
    if (study.studyName) {
      ScheduleEventService.listBooked(study.studyName)
        .then((scheduledEvents) => {
          console.log(scheduledEvents);
          setBookedList({ isLoaded: true, scheduledEvents });
        })
        .catch((err) => alert(err));
    }
  }, [study.studyName]);

  function findAge(dobDate: string): string {
    const currTime = DateTime.local();
    const dobTime = DateTime.fromISO(dobDate);
    const diffTimeYears = Math.floor(currTime.diff(dobTime, "years").years);
    const diffTimeMonths = Math.floor(
      currTime.diff(dobTime, "months").months % 12
    );
    const diffTimeDays = Math.floor(
      currTime.diff(dobTime, "days").days % 12
    );

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

  const [showBookedCalendar, setShowBookedCalendar] = useState(false);

  return (
    <div className="w-full py-2 md:p-4">
      {showBookedCalendar && (
        <BookedCalendar scheduledEvents={bookedList.scheduledEvents} exitFunc={() => setShowBookedCalendar(false)} />
      )}
      <div className="flex justify-between">
        <h4 className="my-auto text-xl">Upcoming Appointments</h4>
        <button
          onClick={() => setShowBookedCalendar(true)}
          className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-800 focus:outline-none focus:shadow-outline"
        >
          All Booked Appointments
        </button>
      </div>
      <div className="h-64 mx-2 my-4 overflow-auto bg-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="font-semibold text-white bg-gray-700 text-md">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Parent</th>
              <th className="px-4 py-2 text-left">Appointment Date</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Child Age</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {bookedList.isLoaded &&
              bookedList.scheduledEvents.map((event, idx) => {
                return (
                  <tr
                    key={idx}
                    className={`hover:shadow-md hover:text-red-800 cursor-pointer ${
                      idx % 2 === 0 && "bg-orange-200"
                    }`}
                  >
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
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
