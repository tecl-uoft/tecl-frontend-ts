import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React from "react";
import { IBookedScheduleEvent } from "../../services/ScheduleEventService";

interface IBookedCalendarProps {
  exitFunc(): void;
  scheduledEvents: IBookedScheduleEvent[];
}
function BookedCalendar(props: IBookedCalendarProps) {
  const { exitFunc, scheduledEvents } = props;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
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
            <h2 className="text-3xl font-bold underline">Study Bookings</h2>
            <FullCalendar
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek",
              }}
              events={scheduledEvents}
              selectable
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookedCalendar;
