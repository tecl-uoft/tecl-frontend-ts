import React, { useState } from "react";
import "./meetingCalendar.css";
import FullCalendar, { EventApi, EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AddSEventModal } from "../AddSEventModal";
import { IStudy } from "../../services/StudyService";

interface IMeetingCalendarProps {
  studyState: IStudy | undefined;
}

function MeetingCalendar(props: IMeetingCalendarProps) {
  const [showAddSEventModal, setShowAddSEventModal] = useState(false);
  const [eventClick, setEventClick] = useState<undefined | EventApi>(undefined);
  const { studyState } = props;

  const handleEventClick = (clickInfo: EventClickArg) => {
    setShowAddSEventModal(true);
    setEventClick(clickInfo.event);
  };

  return (
    <div className="pb-6">
      {console.log(studyState)}
      {studyState && (
        <div key={studyState.studyName}>
          <FullCalendar
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            initialEvents={[
              ...studyState.scheduleEvents,
              {
                groupId: "testGroupId",
                start: Date.now(),
                end: Date.now(),
                display: "inverse-background",
                color: "#cbd5e0",
                allDay: true,
              },
            ]}
            allDaySlot={false}
            nowIndicator={true}
            selectable
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            eventClick={handleEventClick}
          />
        </div>
      )}

      {showAddSEventModal && (
        <AddSEventModal
          studyState={studyState}
          eventClick={eventClick}
          setShowAddSEventModal={setShowAddSEventModal}
        />
      )}
    </div>
  );
}

export default MeetingCalendar;
