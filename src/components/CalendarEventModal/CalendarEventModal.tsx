import { DateSelectArg } from "@fullcalendar/react";
import React, { Dispatch, SetStateAction } from "react";
import { useAuth } from "../../context/AuthContext";
import { useStudy } from "../../context/StudyContext";
import { ICreateScheduleEventProps } from "../../services/ScheduleEventService";

interface ICalendarEventModalProps {
  selectInfo: DateSelectArg | undefined;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
  createEventFunc(): void;
}

function CalendarEventModal(props: ICalendarEventModalProps) {
  const studyCtx = useStudy();
  const authCtx = useAuth();

  const startDate = new Date(props.selectInfo?.startStr as string);
  const endDate = new Date(props.selectInfo?.endStr as string);
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function formatDate(date: Date) {
    return `${
      date.getHours() < 10
        ? date.getHours() === 0
          ? 12
          : "0" + date.getHours()
        : date.getHours() % 12
    }:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }  ${date.getHours() >= 12 ? "p.m." : "a.m."}, ${
      MONTHS[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()} `;
  }

  const onAdd = () => {
    const selectInfo = props.selectInfo;
    const firstName = document.querySelector<HTMLInputElement>("#firstName")
      ?.value;
    if (selectInfo && firstName && studyCtx) {
      const calendarApi = selectInfo.view.calendar;
      if (!authCtx || !authCtx.authState.user) {
        alert("Must be logged in to make a change");
      } else {
        const eventTitle = `${authCtx?.authState.user?.firstName}`;
        const event = {
          title: eventTitle,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          color: studyCtx.studyState.keyColor,
        };
        calendarApi.addEvent(event);
        const availability: ICreateScheduleEventProps = {
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          title: eventTitle,
        };
        studyCtx.createScheduleEvent(availability);
      }

      calendarApi.unselect();
      props.setShowEventModal(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* <!--
            Background overlay, show/hide based on modal state.
      
            Entering: "ease-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100"
              To: "opacity-0"
          --> */}
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                {/* <!-- Heroicon name: exclamation --> */}
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-green-600"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z"
                    fill="#282828"
                  ></path>
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-headline"
                >
                  Event Date: <br />
                  {formatDate(startDate)} to <br />
                  {formatDate(endDate)}
                </h3>
              </div>
            </div>
            <EventForm />
          </div>
          <div className="px-4 pb-4 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                onClick={() => {
                  onAdd();
                }}
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green sm:text-sm sm:leading-5"
              >
                Add
              </button>
            </span>
            <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                onClick={() => props.setShowEventModal(false)}
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventForm() {
  return (
    <form className="px-8 pt-4">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
          <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700">
            First Name *
          </label>
          <input
            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
            type="text"
            id="firstName"
            placeholder="Jane"
          />
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700">
            Last Name
          </label>
          <input
            className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            id="lastName"
            placeholder="Doe"
          />
        </div>
      </div>
      <div className="flex flex-wrap my-2 -mx-3">
        <div className="w-full px-3">
          <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700">
            Email *
          </label>
          <input
            className="block w-full px-2 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            id="email"
            type="email"
            placeholder="test@test.ca"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700">
            Additional Notes
          </label>
          <input
            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
            type="text"
          />
        </div>
      </div>
    </form>
  );
}

export default CalendarEventModal;
