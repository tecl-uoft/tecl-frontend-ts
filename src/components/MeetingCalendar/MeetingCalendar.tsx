import React from "react";
import "./meetingCalendar.css";
import FullCalendar, { DateSelectArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function MeetingCalendar() {
  return (
    <div className="pb-6">
      <FullCalendar
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        selectable
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        select={(selectInfo: DateSelectArg) => {
          const title = prompt("Event Title:");
          const calendarApi = selectInfo.view.calendar;
          if (title) {
            calendarApi.addEvent({
              title: title,
              start: selectInfo.startStr,
              end: selectInfo.endStr,
              allDay: selectInfo.allDay,
            });
          }
          calendarApi.unselect();
        }}
      />
    </div>
  );
}

export default MeetingCalendar;
