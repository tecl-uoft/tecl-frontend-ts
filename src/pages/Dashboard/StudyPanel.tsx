import React, { useEffect, useState } from "react";
import { StudyHoursSetterModal } from "../../components/StudyHoursSetterModal";
import { useStudy } from "../../context/StudyContext";
import ScheduleEventService, {
  IBookedScheduleEvent,
} from "../../services/ScheduleEventService";
import { IStudy } from "../../services/StudyService";
import { BookedCalendar } from "../../components/BookedCalendar";
import { DateTime } from "luxon";
import Input from "../../components/common/Input";
import { findAge } from "./Dashboard";

interface IStudyPanelProps {
  study: IStudy;
}

function StudyPanel(props: IStudyPanelProps) {
  const [showPanel, setShowPanel] = useState(true);

  const { study } = props;

  return (
    <div className="">
      <StudyTitlePanel
        study={study}
        showPanel={showPanel}
        setShowPanel={setShowPanel}
      />
      {showPanel && (
        <div>
          <AppointmentPanel study={study} />
          <h5 className="mt-4">Current Research Assistants:</h5>
          <ul className="h-32 p-4 mt-2 mb-4 overflow-y-scroll bg-gray-100 rounded-lg">
            {study.leadResearchers.map((researcher, idx) => {
              return (
                <li key={researcher.email}>{`${idx + 1}. ${researcher.email} (${
                  researcher.firstName
                } ${researcher.lastName ? researcher.lastName : ""}) `}</li>
              );
            })}
          </ul>
          <CoordinatorsPanel studyName={study.studyName} />
          <StatisticsPanel study={study} />
        </div>
      )}
    </div>
  );
}

function StudyTitlePanel({
  study,
  showPanel,
  setShowPanel,
}: {
  study: IStudy;
  showPanel: boolean;
  setShowPanel: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const onClickHidePanels = () => setShowPanel(!showPanel);

  return (
    <div
      onClick={onClickHidePanels}
      className="flex flex-col text-lg cursor-pointer md:flex-row md:mt-6 hover:text-gray-600"
    >
      <div
        className="flex-grow h-2 mx-6 my-auto text-white rounded select-none"
        style={{ backgroundColor: study.keyColor }}
      />
      <div className="inline-block pt-4 font-semibold rounded ">
        {study.studyName} Study
      </div>
      <div
        className="flex-grow h-2 mx-6 my-auto text-white rounded select-none"
        style={{ backgroundColor: study.keyColor }}
      />
      <button
        className="w-12 m-4 ml-0 text-white no-underline rounded-lg"
        style={{ backgroundColor: study.keyColor }}
      >
        {showPanel ? "-" : "+"}
      </button>
    </div>
  );
}

function StatisticsPanel({ study }: { study: IStudy }) {
  return (
    <div className="flex flex-col mt-2">
      <h4 className="my-auto text-xl">Statistics:</h4>
      <p className="">
        Weekly Appointment Goals: {study.apptGoals} Appointments
      </p>
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
    <div className="flex justify-end space-x-4">
      {/* <h4 className="my-auto align-center text-md">Add Additional Research Assistants:</h4> */}
      <div
        className="flex w-1/3 space-x-2 text-md"
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
          className="px-4 mb-2 text-white bg-orange-600 rounded hover:bg-orange-800   focus:shadow-outline"
        >
          <p className="w-12 text-sm">Add RA</p>
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
    <div className="w-full ">
      {showBookedCalendar && (
        <BookedCalendar
          scheduledEvents={bookedList.scheduledEvents}
          exitFunc={() => setShowBookedCalendar(false)}
        />
      )}
      <div className="flex justify-between">
        <h4 className="my-auto text-md">Upcoming Appointments:</h4>
        <div className="flex space-x-2 text-sm">
          {studyCtx && (
            <button
              onClick={onModifyAvailability(study)}
              className="px-2 text-white bg-orange-500 rounded hover:bg-orange-800   focus:shadow-outline"
            >
              Modify Availability
            </button>
          )}

          <button
            onClick={() => setShowBookedCalendar(true)}
            className="p-2 text-white bg-orange-500 rounded hover:bg-orange-800   focus:shadow-outline"
          >
            All Booked
          </button>
        </div>
      </div>
      {showModal && <StudyHoursSetterModal setShowModal={setShowModal} />}
      <div className="h-64 m-2 overflow-auto bg-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="text-sm font-semibold text-white bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Booked By</th>
              <th className="px-4 py-2 text-left">Child Name</th>
              <th className="px-4 py-2 text-left">Parent Name</th>
              <th className="px-4 py-2 text-left">Appointment Date</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Child Age</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
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

export default StudyPanel;
