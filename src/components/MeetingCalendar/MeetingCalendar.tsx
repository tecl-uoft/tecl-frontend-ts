import React, { useEffect, useLayoutEffect, useState } from "react";
import "./meetingCalendar.css";
import FullCalendar, { EventApi, EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AddSEventModal } from "../AddSEventModal";
import StudyService, { IStudy } from "../../services/StudyService";
import listPlugin from "@fullcalendar/list";
import { notify } from "../Notification";

interface IMeetingCalendarProps {
  studyState: IStudy | undefined;
  studyName?: string;
}

function MeetingCalendar(props: IMeetingCalendarProps) {
  const [showAddSEventModal, setShowAddSEventModal] = useState(false);
  const [eventClick, setEventClick] = useState<undefined | EventApi>(undefined);
  const [studyState, setStudyState] = useState<{
    isLoaded: boolean;
    study: IStudy | undefined;
  }>({
    isLoaded: false,
    study: undefined,
  });

  const [defaultView, setDefaultView] = useState<"timeGridWeek" | "listWeek">(
    "timeGridWeek"
  );

  useEffect(() => {
    if (props.studyName) {
      StudyService.read(props.studyName)
        .then((study) => {
          setStudyState({ isLoaded: true, study });
        })
        .catch((err) => notify.error(err.message));
    } else if (props.studyState) {
      setStudyState({ isLoaded: true, study: props.studyState });
    }
  }, [props.studyName, props.studyState]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    setShowAddSEventModal(true);
    setEventClick(clickInfo.event);
  };
  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      setDefaultView("listWeek");
    }
  }, []);

  if (!studyState.isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-6">
      {studyState.study && (
        <div
          className="meeting-cal"
          key={studyState.study.studyName + defaultView}
        >
          <FullCalendar
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,listWeek",
            }}
            initialEvents={studyState.study.scheduleEvents}
            allDaySlot={false}
            slotDuration={"00:30:00"}
            nowIndicator={true}
            dayMaxEventRows={5}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView={defaultView}
            eventClick={handleEventClick}
          />
        </div>
      )}

      {showAddSEventModal && (
        <AddSEventModal
          studyState={studyState.study}
          eventClick={eventClick}
          setShowAddSEventModal={setShowAddSEventModal}
        />
      )}
    </div>
  );
}

export default MeetingCalendar;
