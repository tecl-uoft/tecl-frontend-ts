import React, { useLayoutEffect, useState } from "react";
import "./meetingCalendar.css";
import FullCalendar, { EventApi, EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AddSEventModal } from "../AddSEventModal";
import { IStudy } from "../../services/StudyService";
import listPlugin from "@fullcalendar/list";

interface IMeetingCalendarProps {
  studyState: IStudy | undefined;
}

function MeetingCalendar(props: IMeetingCalendarProps) {
  const [showAddSEventModal, setShowAddSEventModal] = useState(false);
  const [eventClick, setEventClick] = useState<undefined | EventApi>(undefined);
  const { studyState } = props;
  const [defaultView, setDefaultView] = useState<"timeGridWeek" | "listWeek">("timeGridWeek")

  const handleEventClick = (clickInfo: EventClickArg) => {
    setShowAddSEventModal(true);
    setEventClick(clickInfo.event);
  };
  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      setDefaultView("listWeek")
    }
  }, [])

  return (
    <div className="pb-6">
      {studyState && (
        <div className="meeting-cal" key={studyState.studyName + defaultView}>
          <FullCalendar
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,listWeek",
            }}
            initialEvents={studyState.scheduleEvents}
            allDaySlot={false}
            slotDuration={"01:00:00"}
            nowIndicator={true}
            dayMaxEventRows={5}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView={defaultView}
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
