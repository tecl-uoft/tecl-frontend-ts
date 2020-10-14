import React, { useState } from "react";
import "./meetingCalendar.css";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AddSEventModal } from "../AddSEventModal";
import { useStudy } from "../../context/StudyContext";

function MeetingCalendar() {
  const [showAddSEventModal, setShowAddSEventModal] = useState(false);

  const studyCtx = useStudy();

  const handleEventClick = (clickInfo: EventClickArg) => {
    setShowAddSEventModal(true);
    /* setEventClick(clickInfo.event); */
  };

  return (
    <div className="pb-6">
      {studyCtx?.studyState && (
        <div key={studyCtx?.studyState.studyName}>
          <FullCalendar
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            initialEvents={studyCtx?.studyState.availableTimeSlots}
            selectable
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            eventClick={handleEventClick}
          />
        </div>
      )}

      {showAddSEventModal && (
        <AddSEventModal setShowAddSEventModal={setShowAddSEventModal} />
      )}
    </div>
  );
}

export default MeetingCalendar;
