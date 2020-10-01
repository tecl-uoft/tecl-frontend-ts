import React, { useState } from "react";
import { MeetingCalendar } from "../../components/MeetingCalendar";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mx-auto px-8 pt-4 flex flex-col">
      {showModal && <StudyHoursModal setShowModal={setShowModal} />}
      <h1 className="text-3xl font-bold mx-auto">
        Hello {`${auth?.authState.user?.firstName}!`}
      </h1>
      <AppointmentPanel setShowModal={setShowModal} />
      <RAPanel />
    </div>
  );
}

function StudyHoursModal(props: any) {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity cursor-pointer"
          onClick={() => props.setShowModal(false)}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block w-10/12 p-6 align-bottom bg-white rounded-lg transform transition-all my-8 align-middle "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          
          <MeetingCalendar />
        </div>
      </div>
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
    <div className="py-4 w-full">
      <div className="flex">
        <h2 className="text-3xl font-semibold">Current Studies</h2>
        <button className="bg-gray-800 hover:text-orange-500 text-white px-2 ml-4 rounded focus:outline-none focus:shadow-outline">
          Add Study
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <h3 className="text-2xl font-semibold">Frogger Study:</h3>
        <button
          onClick={() => props.setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-800 text-white px-4 rounded focus:outline-none focus:shadow-outline"
        >
          + Set Study Hours
        </button>
      </div>
      <div className="rounded my-4 mx-2 h-64 overflow-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-700 text-white text-md font-semibold">
            <tr>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Parent</th>
              <th className="text-left py-2 px-4">Appointment</th>
              <th className="text-left py-2 px-4">Email</th>
              <th className="text-left py-2 px-4"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {appointments.map((apmnt, idx) => {
              return (
                <tr key={idx} className={`${idx % 2 === 0 && "bg-orange-200"}`}>
                  <td className="text-left py-2 px-4">{apmnt.name}</td>
                  <td className="text-left py-2 px-4">{apmnt.name}</td>

                  <td className="text-left py-2 px-4">
                    {apmnt.date + ", " + apmnt.time}
                  </td>
                  <td className="text-left py-2 px-4">{apmnt.email}</td>
                  <td className="text-left py-2 px-4">{"see notes"}</td>
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
    <div>
      <div className="rounded my-4 mx-2 h-64 overflow-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-700 text-white text-md font-semibold">
            <tr>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Role</th>
              <th className="text-left py-2 px-4">Last Appointment Date</th>
              <th className="text-left py-2 px-4">Next Appointment Date</th>
              <th className="text-left py-2 px-4"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {researchAssistants.map((ra, idx) => {
              return (
                <tr key={idx} className={`${idx % 2 === 1 && "bg-gray-200"}`}>
                  <td className="text-left py-2 px-4">{ra.name}</td>
                  <td className="text-left py-2 px-4">{ra.role}</td>
                  <td className="text-left py-2 px-4">
                    {ra.lastAppointmentBooked}
                  </td>
                  <td className="text-left py-2 px-4">
                    {ra.nextAppointmentBooked}
                  </td>
                  <td className="text-left py-2 px-4">
                    {"link"}
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
