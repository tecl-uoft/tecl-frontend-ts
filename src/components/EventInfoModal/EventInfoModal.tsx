import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import ScheduleEventService, {
  ICompleteScheduleEvent,
} from "../../services/ScheduleEventService";
import { FocusedModal } from "../FocusedModal";
import { findAge } from "../../pages/Dashboard/Dashboard";

interface IEventInfoModal {
  setShowModal(showModal: boolean): void;
  eventId: string;
}

function EventInfoModal(props: IEventInfoModal) {
  const { setShowModal, eventId } = props;
  const [scheduleEvent, setScheduleEvent] = useState<
    undefined | ICompleteScheduleEvent
  >(undefined);

  useEffect(() => {
    if (eventId) {
      ScheduleEventService.read(eventId)
        .then((scheduleEvent) => {
          setScheduleEvent(scheduleEvent);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [eventId]);
  return (
    <div>
      <FocusedModal setShowModal={setShowModal}>
        {scheduleEvent && (
          <>
            <h1 className="flex justify-center mx-2 mb-1 text-2xl font-bold">
              Appointment Review
            </h1>
            <h2 className="flex mx-2 mb-2 text-xl">
              {`Occuring: 
              ${DateTime.fromISO(scheduleEvent.start).toFormat("ff")} to 
              ${DateTime.fromISO(scheduleEvent.end).toFormat("t ZZZZ")}`}
            </h2>
            <div className="w-full px-1 mb-4 md:mb-0">
              <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                Created By
              </label>
              <div className="w-full p-1 mb-2 text-gray-700 bg-gray-200 rounded text-md">
                {" "}
                {scheduleEvent.createdBy.firstName +
                  " " +
                  scheduleEvent.createdBy.lastName +
                  " (" +
                  scheduleEvent.createdBy.email +
                  ")"}{" "}
              </div>
            </div>
            <div className="w-full px-1 mb-4 md:mb-0">
              <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                Date Booked
              </label>
              <div className="w-full p-1 mb-2 text-gray-700 bg-gray-200 rounded text-md">
                {" "}
                {scheduleEvent.dateBooked
                  ? DateTime.fromISO(scheduleEvent.dateBooked).toFormat("DDDD")
                  : "Invalid"}{" "}
              </div>
            </div>
            <div className="w-full px-1 mb-4 md:mb-0">
              <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                Parent Information
              </label>
              <div className="w-full p-1 mb-2 text-gray-700 bg-gray-200 rounded text-md">
                {" "}
                {scheduleEvent.participantInfo.firstName +
                  " " +
                  scheduleEvent.participantInfo.lastName +
                  " (" +
                  scheduleEvent.participantInfo.email +
                  ")"}{" "}
              </div>
            </div>
            <div className="flex">
              <div className="w-full px-1 mb-4 md:w-1/2 md:mb-0">
                <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                  Child Name
                </label>
                <div className="w-full p-1 mb-2 text-gray-700 bg-gray-200 rounded text-md">
                  {" "}
                  {scheduleEvent.participantInfo.child.firstName +
                    " " +
                    scheduleEvent.participantInfo.child.lastName}{" "}
                </div>
              </div>
              <div className="w-full px-1 mb-4 md:w-1/2 md:mb-0">
                <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                  Child Age
                </label>
                <div className="w-full p-1 mb-2 text-gray-700 bg-gray-200 rounded text-md">
                  {findAge(scheduleEvent.participantInfo.child.dob)}
                </div>
              </div>
            </div>
            <div className="w-32 px-3 mx-auto mt-2">
              <input
                className="px-4 py-2 font-bold text-white bg-gray-800 rounded cursor-pointer hover:text-orange-500"
                type="button"
                value="Cancel"
                onClick={() => setShowModal(false)}
              />
            </div>
          </>
        )}
      </FocusedModal>
    </div>
  );
}

export default EventInfoModal;
