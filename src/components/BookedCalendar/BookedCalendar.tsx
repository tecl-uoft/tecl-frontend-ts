import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState } from "react";
import { IBookedScheduleEvent } from "../../services/ScheduleEventService";
import { EventInfoModal } from "../EventInfoModal";
import { HeadExitButton } from "../HeadExitButton";

interface IBookedCalendarProps {
  exitFunc(): void;
  scheduledEvents: IBookedScheduleEvent[];
}
function BookedCalendar(props: IBookedCalendarProps) {
  const { exitFunc, scheduledEvents } = props;
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [eventId, setEventId] = useState<string>("");

  function infoClickEvent(arg: EventClickArg) {
    setEventId(arg.event.id);
    setShowEventDetails(true);
  }

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {showEventDetails && (
        <EventInfoModal eventId={eventId} setShowModal={setShowEventDetails} />
      )}
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity cursor-pointer"
          onClick={() => exitFunc()}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block w-10/12 p-4 pt-2 my-4 align-top align-middle transition-all transform bg-white rounded-lg "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="pb-2">
            <div className="flex justify-end -mb-8">
              <HeadExitButton onClick={() => exitFunc()} />
            </div>
            <h2 className="mr-8 text-3xl font-bold underline">
              Study Bookings
            </h2>
            <FullCalendar
              headerToolbar={{
                left: "today",
                center: "title",
                right: "prev next",
              }}
              events={[
                ...scheduledEvents,
                {
                  groupId: "testGroupId",
                  start: Date.now(),
                  end: Date.now(),
                  display: "inverse-background",
                  color: "#cbd5e0",
                  allDay: true,
                },
              ]}
              selectable
              allDaySlot={false}
              eventClick={infoClickEvent}
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookedCalendar;
