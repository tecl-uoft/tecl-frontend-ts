import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { notify } from "../../components/Notification";
import ScheduleEventService, {
  ICompleteScheduleEvent,
} from "../../services/ScheduleEventService";
import { findAge } from "../Dashboard/Dashboard";

function EventCancelation() {
  const [scheduleEvent, setScheduleEvent] = useState<
    undefined | ICompleteScheduleEvent
  >(undefined);
  const history = useHistory();

  const remove = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const eventId = urlParams.get("eventId");
    const eventHash = urlParams.get("eventHash");
    if (eventId && eventHash) {
      ScheduleEventService.openRemove(eventId, eventHash)
        .then((res) => {
          notify.success("Removed your appointment successfully");
          history.push("/scheduling");
        })
        .catch((err) =>
          notify.error("Remove failed, contact study leader for next steps")
        );
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const eventId = urlParams.get("eventId");
    const eventHash = urlParams.get("eventHash");

    if (eventId && eventHash) {
      ScheduleEventService.read(eventId)
        .then((scheduleEvent) => {
          setScheduleEvent(scheduleEvent);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, []);

  return (
    <div className="flex w-full">
      {scheduleEvent && (
        <div className="mx-auto">
          <h1 className="flex justify-center m-2 text-2xl font-bold">
            Information Review
          </h1>
          <form className="w-full">
            <h3 className="flex justify-between block px-4 py-1 my-2 text-lg font-bold text-gray-700 bg-orange-300 rounded">
              <div className="mx-auto my-auto">Parent Information</div>
            </h3>

            <div className="flex flex-wrap -mx-3">
              <div className="w-full px-3 mb-4 md:w-1/2 md:mb-0">
                <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                  First Name
                </label>
                <div className="block w-full p-1 mb-2 text-xl text-gray-700 bg-gray-200 rounded">
                  {" "}
                  {scheduleEvent.participantInfo.firstName}{" "}
                </div>
              </div>
              <div className="w-full px-3 mb-4 md:w-1/2 md:mb-0">
                <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                  Last Name
                </label>
                <div className="block w-full p-1 mb-2 text-xl text-gray-700 bg-gray-200 rounded">
                  {" "}
                  {scheduleEvent.participantInfo.lastName}{" "}
                </div>
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                  Email
                </label>
                <div className="block w-full p-1 mb-4 text-xl text-gray-700 bg-gray-200 rounded">
                  {" "}
                  {scheduleEvent.participantInfo.email}{" "}
                </div>
              </div>
            </div>

            <h3 className="flex justify-between block px-4 py-1 my-2 text-lg font-bold text-gray-700 bg-orange-300 rounded">
              <div className="mx-auto my-auto">Child Information</div>
            </h3>

            <div className="mb-4">
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                    First Name
                  </label>
                  <div className="block w-full p-1 mb-2 text-xl text-gray-700 bg-gray-200 rounded">
                    {" "}
                    {scheduleEvent.participantInfo.child.firstName}{" "}
                  </div>
                </div>
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                    Last Name
                  </label>
                  <div className="block w-full p-1 mb-2 text-xl text-gray-700 bg-gray-200 rounded">
                    {" "}
                    {scheduleEvent.participantInfo.child.lastName}{" "}
                  </div>
                </div>
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                    Date of Birth
                  </label>
                  <div className="block w-full p-1 mb-1 text-xl text-gray-700 bg-gray-200 rounded">
                    {" "}
                    {DateTime.fromISO(
                      scheduleEvent.participantInfo.child.dob
                    ).toFormat("DDD")}{" "}
                  </div>
                </div>
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                    Age
                  </label>
                  <div className="block w-full p-1 mb-1 text-xl text-gray-700 bg-gray-200 rounded">
                    {" "}
                    {findAge(scheduleEvent.participantInfo.child.dob) +
                      " old"}{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center px-4 py-3 mx-auto sm:px-6 ">
              <Link to="/scheduling">
                <span className="flex mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    type="button"
                    className="inline-flex justify-center w-32 px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                  >
                    Go Back
                  </button>
                </span>
              </Link>
              <span className="flex rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  onClick={remove}
                  className="inline-flex justify-center w-32 px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
                >
                  Remove Me
                </button>
              </span>
            </div>
          </form>{" "}
        </div>
      )}
    </div>
  );
}

export default EventCancelation;
