import { DateSelectArg } from "@fullcalendar/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useStudy } from "../../context/StudyContext";
import { ICreateScheduleEventProps } from "../../services/ScheduleEventService";
import { DateTime } from "luxon";

interface ICalendarEventModalProps {
  selectInfo: DateSelectArg | undefined;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
  createEventFunc(): void;
}

function CalendarEventModal(props: ICalendarEventModalProps) {
  const studyCtx = useStudy();
  const authCtx = useAuth();
  const { selectInfo } = props;
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingPassword, setMeetingPassword] = useState("");

  const onAdd = () => {
    const selectInfo = props.selectInfo;

    if (selectInfo && studyCtx) {
      const calendarApi = selectInfo.view.calendar;
      if (!authCtx || !authCtx.authState.user) {
        alert("Must be logged in to make a change");
      } else if (studyCtx?.studyState) {
        const eventTitle = `${authCtx?.authState.user?.firstName}`;
        const event = {
          title: eventTitle,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          color: studyCtx.studyState.keyColor,
        };
        /* Add study state locally to calendar */
        calendarApi.addEvent(event);
        /* Send request to add state to database */
        const availability: ICreateScheduleEventProps = {
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          title: eventTitle,
          meetingLink,
          meetingPassword
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
        <div className="fixed inset-0 transition-opacity cursor-pointer">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={() => props.setShowEventModal(false)}
          ></div>
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
          <div className="px-4 pt-4 bg-white">
            <div className="sm:flex sm:items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 border-2 border-green-600 rounded-full sm:mx-0 sm:h-10 sm:w-10">
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
              <div className="w-full text-2xl text-center sm:ml-4 sm:text-left">
                <h3 className="mx-auto mt-1 font-medium text-center text-gray-900 px-auto">
                  Add Time Availability
                </h3>
                <h4 className="py-2 mx-auto text-center">
                  {selectInfo && (
                    <>
                      <p className="my-1 text-2xl">
                      {DateTime.fromISO(selectInfo.startStr).toFormat("DDDD")} </p>
                      <p className="text-xl">{DateTime.fromISO(selectInfo.startStr).toFormat("t ZZZZ")}
                      {" "}to{" "}
                      {DateTime.fromISO(selectInfo.endStr).toFormat("t ZZZZ")}</p>
                    </>
                  )}
                </h4>
              </div>
            </div>

            <form className="p-2 space-y-4 text-sm">
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="block mb-1 font-bold tracking-wide text-gray-700">
                    Video Meeting Link *
                  </label>
                  <input
                    className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded focus:outline-none focus:bg-white"
                    type="text"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.currentTarget.value)}
                    placeholder="ex. https://boom.us/j/12345678910"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label className="block mb-1 font-bold tracking-wide text-gray-700">
                    Video Meeting Passcode
                  </label>
                  <input
                    className="block w-full px-4 py-2 mb-3 text-gray-700 bg-gray-200 border rounded focus:outline-none focus:bg-white"
                    type="text"
                    value={meetingPassword}
                    onChange={(e) => setMeetingPassword(e.currentTarget.value)}
                    placeholder="leave blank if no password"
                  />
                </div>
              </div>
              <div className="block text-gray-700 texl-xs">* = required</div>
            </form>
          </div>
          <div className="flex justify-center px-4 pb-4 space-x-4">
            <span className="flex w-24 mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                onClick={() => props.setShowEventModal(false)}
                type="button"
                className="inline-flex justify-center w-24 px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
              >
                Cancel
              </button>
            </span>
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                onClick={() => {
                  onAdd();
                }}
                type="button"
                className="inline-flex justify-center w-24 px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green sm:text-sm sm:leading-5"
              >
                Add
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarEventModal;
