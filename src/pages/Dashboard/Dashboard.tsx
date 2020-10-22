import React, { useState } from "react";
import { AddStudyForm } from "../../components/AddStudyForm";
import { FocusedModal } from "../../components/FocusedModal";
import { StudyHoursSetterModal } from "../../components/StudyHoursSetterModal";
import { useAuth } from "../../context/AuthContext";
import { useStudy } from "../../context/StudyContext";

function Dashboard() {
  const auth = useAuth();
  const studyCtx = useStudy();
  const [showModal, setShowModal] = useState(false);
  const [showAddStudyModal, setShowAddStudyModal] = useState(false);

  return (
    <div className="container flex flex-col px-8 pt-4 mx-auto">
      {showModal && <StudyHoursSetterModal setShowModal={setShowModal} />}
      <h1 className="mx-auto text-3xl font-bold">
        Hello {`${auth?.authState.user?.firstName}!`}
      </h1>
      <div className="flex">
        <h2 className="text-3xl font-semibold">Current Studies</h2>
        <button
          onClick={() => setShowAddStudyModal(true)}
          className="px-2 ml-4 text-white bg-gray-800 rounded hover:text-orange-500 focus:outline-none focus:shadow-outline"
        >
          + Add Study
        </button>
        <button className="px-2 ml-4 text-white bg-orange-800 rounded hover:text-orange-300 focus:outline-none focus:shadow-outline">
          Sync Google Calendar
        </button>
        {showAddStudyModal && (
          <FocusedModal setShowModal={setShowAddStudyModal}>
            <AddStudyForm
              addStudySubmitFunc={() => {
                setShowAddStudyModal(false);
              }}
            />
          </FocusedModal>
        )}
      </div>

      {auth?.authState.user?.studies &&
        auth?.authState.user?.studies
          .slice(0)
          .reverse()
          .map((study, idx) => {
            return (
              <div key={idx}>
                <h3 className="mt-4 text-2xl font-semibold">
                  {study.studyName} Study:
                </h3>

                <div className="flex mt-2">
                  <div
                    className="block p-2 text-white rounded"
                    style={{ backgroundColor: study.keyColor }}
                  >
                    {" "}
                    Key Color{" "}
                  </div>

                  <button
                    onClick={() => {
                      setShowModal(true);
                      if (studyCtx) {
                        studyCtx.setStudyState(study);
                      }
                    }}
                    className="h-10 px-2 ml-4 text-white bg-orange-500 rounded hover:bg-orange-800 focus:outline-none focus:shadow-outline"
                  >
                    Set Study Times
                  </button>
                </div>
                <AppointmentPanel setShowModal={setShowModal} />
                <RAPanel />
              </div>
            );
          })}
    </div>
  );
}

function AppointmentPanel(props: any) {
  const appointments = [
    {
      name: "asda",
      time: "11:30",
      date: "Monday, September 28, 2020",
      email: "jonsmith@mail.com",
    },
    {
      name: "asda",
      time: "11:30",
      date: "Monday, September 28, 2020",
      email: "jonsmith@mail.com",
    },
    {
      name: "asda",
      time: "11:30",
      date: "Monday, September 28, 2020",
      email: "jonsmith@mail.com",
    },
    {
      name: "asda",
      time: "11:30",
      date: "Monday, September 28, 2020",
      email: "jonsmith@mail.com",
    },
    {
      name: "asda",
      time: "11:30",
      date: "Monday, September 28, 2020",
      email: "jonsmith@mail.com",
    },
  ];
  return (
    <div className="w-full py-4 md:p-4">
      <div className="flex justify-between">
        <h4 className="text-xl">Upcoming Appointments</h4>
        <button
          onClick={() => props.setShowModal(true)}
          className="px-4 text-white bg-orange-500 rounded hover:bg-orange-800 focus:outline-none focus:shadow-outline"
        >
          + Add Appointment
        </button>
      </div>
      <div className="mx-2 my-4 overflow-auto rounded max-h-64">
        <table className="min-w-full bg-white">
          <thead className="font-semibold text-white bg-gray-700 text-md">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Parent</th>
              <th className="px-4 py-2 text-left">Appointment Date</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Date of Birth</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {appointments.map((apmnt, idx) => {
              return (
                <tr key={idx} className={`${idx % 2 === 0 && "bg-orange-200"}`}>
                  <td className="px-4 py-2 text-left">{apmnt.name}</td>
                  <td className="px-4 py-2 text-left">{apmnt.name}</td>

                  <td className="px-4 py-2 text-left">
                    {apmnt.date + ", " + apmnt.time}
                  </td>
                  <td className="px-4 py-2 text-left">{apmnt.email}</td>
                  <td className="px-4 py-2 text-left">{"see notes"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RAPanel() {
  const researchAssistants = [
    {
      name: "Test1 Test2",
      role: "Admin",
      lastAppointmentBooked: "Monday, September 28, 2020, 11:30",
      nextAppointmentBooked: "Monday, September 28, 2020, 11:30",
    },
    {
      name: "Test1 Test2",
      role: "Admin",
      lastAppointmentBooked: "Monday, September 28, 2020, 11:30",
      nextAppointmentBooked: "Monday, September 28, 2020, 11:30",
    },
    {
      name: "Test1 Test2",
      role: "Admin",
      lastAppointmentBooked: "Monday, September 28, 2020, 11:30",
      nextAppointmentBooked: "Monday, September 28, 2020, 11:30",
    },
  ];

  return (
    <div className="w-full py-4 md:p-4">
      <div className="flex justify-between">
        <h4 className="text-xl">Members</h4>
        <button
          /* onClick={() => props.setShowModal(true)} */
          className="px-4 text-white bg-orange-500 rounded hover:bg-orange-800 focus:outline-none focus:shadow-outline"
        >
          + Add Members
        </button>
      </div>
      <div className="mx-2 my-4 overflow-auto rounded max-h-64">
        <table className="min-w-full bg-white">
          <thead className="font-semibold text-white bg-gray-700 text-md">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Last Appointment Date</th>
              <th className="px-4 py-2 text-left">Next Appointment Date</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {researchAssistants.map((ra, idx) => {
              return (
                <tr key={idx} className={`${idx % 2 === 1 && "bg-gray-200"}`}>
                  <td className="px-4 py-2 text-left">{ra.name}</td>
                  <td className="px-4 py-2 text-left">{ra.role}</td>
                  <td className="px-4 py-2 text-left">
                    {ra.lastAppointmentBooked}
                  </td>
                  <td className="px-4 py-2 text-left">
                    {ra.nextAppointmentBooked}
                  </td>
                  <td className="px-4 py-2 text-left">{"link"}</td>
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
