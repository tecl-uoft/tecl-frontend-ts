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
            <h1 className="flex justify-center m-2 text-2xl font-bold">
              {`Information Review`}
            </h1>
            <h1 className="flex m-2 text-xl">
              {`Date: 
              ${DateTime.fromISO(scheduleEvent.start).toFormat("ff")} to 
              ${DateTime.fromISO(scheduleEvent.end).toFormat("t ZZZZ")}`}
            </h1>
            <form className="max-w-lg">
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
                      ).toFormat("DD")}{" "}
                    </div>
                  </div>
                  <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <label className="block text-xs font-bold tracking-wide text-gray-700 uppercase">
                      Age
                    </label>
                    <div className="block w-full p-1 mb-1 text-xl text-gray-700 bg-gray-200 rounded">
                      {" "}
                      {findAge(scheduleEvent.participantInfo.child.dob)}{" "}
                    </div>
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
            </form>{" "}
          </>
        )}
      </FocusedModal>
    </div>
  );
}

export default EventInfoModal;
