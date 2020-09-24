import React, { useState } from "react";
import "./meetingCalendar.css";
import FullCalendar, { DateSelectArg, EventApi, EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarRemoveModal } from "../CalendarRemoveModal";
import { CalendarEventModal } from "../CalendarEventModal";

function MeetingCalendar() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventClick, setEventClick] = useState<EventApi | undefined>(undefined)
  const [selectInfo, setSelectInfo] = useState<DateSelectArg | undefined>(undefined)

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectInfo(selectInfo);
    setShowEventModal(true)
    /* const title = prompt("Event Title:");
    const calendarApi = selectInfo.view.calendar;
    if (title) {
      calendarApi.addEvent({
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
    calendarApi.unselect(); */
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    setShowDeleteModal(true)
    setEventClick(clickInfo.event)
    /* if (prompt(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
     clic kInfo.event.remove()
    } */
  }

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
        select={handleDateSelect}
        eventClick={handleEventClick}
      />
      {showDeleteModal && <CalendarRemoveModal onCancel={() => setShowDeleteModal(false)} onDelete={eventClick} />}
      {showEventModal && <CalendarEventModal selectInfo={selectInfo} setShowEventModal={setShowEventModal} />}
    </div>
  );
}

export default MeetingCalendar;
