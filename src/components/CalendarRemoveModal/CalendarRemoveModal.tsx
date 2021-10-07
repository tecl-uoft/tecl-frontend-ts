import { EventApi } from "@fullcalendar/react";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useStudy } from "../../context/StudyContext";
import ScheduleEventService from "../../services/ScheduleEventService";

interface ICalendarRemoveModalProps {
  onCancel(): void;
  eventClick: undefined | EventApi;
}

function CalendarRemoveModal(props: ICalendarRemoveModalProps) {
  const { onCancel, eventClick } = props;
  const studyCtx = useStudy();
  const [bookedDate, setBookedDate] = useState("");

  useEffect(() => {
    if (eventClick) {
      ScheduleEventService.read(eventClick.id)
        .then((event) => {
          setBookedDate(event.dateBooked ? event.dateBooked : "");
        })
        .catch(() => {
          alert("Could not find event");
        });
    }
  }, [eventClick]);

  const onClickDelete = () => {
    /* eventClick?.setProp("display", "background"); */
    const calId = eventClick?.id;
    if (calId) {
      studyCtx?.removeScheduleEvent(calId);
      eventClick?.remove();
    }

    onCancel();
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
        {/*  <!--
            Modal panel, show/hide based on modal state.
      
            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          --> */}
        <div
          className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                {/* <!-- Heroicon name: exclamation --> */}
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                {eventClick?.start && eventClick?.end ? <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-headline"
                >
                  Delete event at: <br /> { DateTime.fromJSDate(eventClick.start).toFormat("ff") + " - " +  DateTime.fromJSDate(eventClick.end).toFormat("t") }?
                </h3> : null}
                <div className="mt-2">
                  {bookedDate ? (
                    <div className="leading-5 text-gray-800 text-md">
                      <span className="font-bold">
                        Warning! This appointment is already booked for:{" "}
                      </span>
                      <br /> {DateTime.fromISO(bookedDate).toFormat("DDD")}. <br />
                    </div>
                  ) : null}
                  <p className="text-sm leading-5 text-gray-500">
                    Are you sure you want to delete this event? All of your data
                    will be permanently removed. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                onClick={onClickDelete}
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
              >
                Delete
              </button>
            </span>
            <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                type="button"
                onClick={props.onCancel}
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
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

export default CalendarRemoveModal;
