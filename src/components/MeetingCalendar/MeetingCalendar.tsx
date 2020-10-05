import React, { useState } from "react";
import "./meetingCalendar.css";
import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarRemoveModal } from "../CalendarRemoveModal";
import { CalendarEventModal } from "../CalendarEventModal";
import { AddSEventModal } from "../AddSEventModal";

function MeetingCalendar(props: any) {
  const [showAddSEventModal, setShowAddSEventModal] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventClick, setEventClick] = useState<EventApi | undefined>(undefined);
  const [selectInfo, setSelectInfo] = useState<DateSelectArg | undefined>(
    undefined
  );
  const { isMainCal } = props;

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectInfo(selectInfo);
    setShowEventModal(true);

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
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (isMainCal) {
      setShowDeleteModal(true);
    } else {
      setShowAddSEventModal(true);
    }

    setEventClick(clickInfo.event);
  };

  return (
    <div className="pb-6">
      <FullCalendar
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        selectable
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        select={handleDateSelect}
        eventClick={handleEventClick}
      />
      {showDeleteModal && (
        <CalendarRemoveModal
          onCancel={() => setShowDeleteModal(false)}
          onDelete={eventClick}
        />
      )}
      {showEventModal && (
        <CalendarEventModal
          selectInfo={selectInfo}
          setShowEventModal={setShowEventModal}
        />
      )}
      {showAddSEventModal && (
        <AddSEventModal setShowAddSEventModal={setShowAddSEventModal} />
      )}
    </div>
  );
}

export default MeetingCalendar;
