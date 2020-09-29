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
        <div className="fixed inset-0 transition-opacity cursor-pointer" onClick={() => props.setShowModal(false)}>
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
            <h2>

            </h2>
            <MeetingCalendar />
          
        </div>
      </div>
    </div>
  );
}

function AppointmentPanel(props: any) {
  return (
    <div className="py-4 w-full">
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold underline">Study Appointments</h2>
        <button className="bg-gray-800 hover:text-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          + Add Study
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <h3 className="text-2xl font-semibold">Frogger Study:</h3>
        <button onClick={() => props.setShowModal(true)} className="bg-orange-500 hover:bg-orange-800 text-white px-4 rounded focus:outline-none focus:shadow-outline">
          + Set Study Hours
        </button>
      </div>

      <div className="rounded m-4 h-64 overflow-y-scroll">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-700 text-white text-md font-semibold">
            <tr>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Time</th>
              <th className="text-left py-3 px-4">Appointment</th>
              <th className="text-left py-3 px-4">Email</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td className="text-left py-3 px-4">Lian</td>
              <td className=" text-left py-3 px-4">10:00am</td>
              <td className="text-left py-3 px-4">
                <a className="hover:text-blue-500" href="/">
                  Monday, September 28, 2020
                </a>
              </td>
              <td className="text-left py-3 px-4">
                <a
                  className="hover:text-blue-500"
                  href="mailto:jonsmith@mail.com"
                >
                  jonsmith@mail.com
                </a>
              </td>
            </tr>
            <tr className="bg-orange-200">
              <td className=" py-3 px-4">Emma</td>
              <td className=" py-3 px-4">10:00am</td>
              <td className="text-left py-3 px-4">
                <a className="hover:text-blue-500" href="/">
                  Monday, September 28, 2020
                </a>
              </td>
              <td className="text-left py-3 px-4">
                <a
                  className="hover:text-blue-500"
                  href="mailto:jonsmith@mail.com"
                >
                  jonsmith@mail.com
                </a>
              </td>
            </tr>
            <tr>
              <td className=" py-3 px-4">Oliver</td>
              <td className=" py-3 px-4">10:00am</td>
              <td className="text-left py-3 px-4">
                <a className="hover:text-blue-500" href="/">
                  Monday, September 28, 2020
                </a>
              </td>
              <td className="text-left py-3 px-4">
                <a
                  className="hover:text-blue-500"
                  href="mailto:jonsmith@mail.com"
                >
                  jonsmith@mail.com
                </a>
              </td>
            </tr>
            <tr className="bg-orange-200">
              <td className=" py-3 px-4">Isabella</td>
              <td className=" py-3 px-4">10:00am</td>
              <td className="text-left py-3 px-4">
                <a className="hover:text-blue-500" href="/">
                  Monday, September 28, 2020
                </a>
              </td>
              <td className="text-left py-3 px-4">
                <a
                  className="hover:text-blue-500"
                  href="mailto:jonsmith@mail.com"
                >
                  jonsmith@mail.com
                </a>
              </td>
            </tr>
            <tr className="">
              <td className=" py-3 px-4">Isabella</td>
              <td className=" py-3 px-4">10:00am</td>
              <td className="text-left py-3 px-4">
                <a className="hover:text-blue-500" href="/">
                  Monday, September 28, 2020
                </a>
              </td>
              <td className="text-left py-3 px-4">
                <a
                  className="hover:text-blue-500"
                  href="mailto:jonsmith@mail.com"
                >
                  jonsmith@mail.com
                </a>
              </td>
            </tr>
            <tr className="bg-orange-200">
              <td className=" py-3 px-4">Isabella</td>
              <td className=" py-3 px-4">10:00am</td>
              <td className="text-left py-3 px-4">
                <a className="hover:text-blue-500" href="/">
                  Monday, September 28, 2020
                </a>
              </td>
              <td className="text-left py-3 px-4">
                <a
                  className="hover:text-blue-500"
                  href="mailto:jonsmith@mail.com"
                >
                  jonsmith@mail.com
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RAPanel() {
  return (
    <div>
      <div className="flex justify-between mt-2">
        <h2 className="text-3xl font-semibold underline">
          Research Assistants
        </h2>
        <button className="bg-gray-800 hover:text-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          + Add RA
        </button>
      </div>
      <div className=" px-4 sm:px-8">
        <div className="">
          <div></div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead className="bg-gray-700 text-white text-left text-xs font-semibold  uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">User</th>
                    <th className="px-5 py-3">Role</th>
                    <th className="px-5 py-3">Created at</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Vera Carpenter
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 21, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Activo</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Blake Bowman
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Editor</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 01, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Activo</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Dana Moore
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Editor</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 10, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Suspended</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Alonzo Cox
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                    </td>
                    <td className="px-5 py-5 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 18, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Inactive</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
