import React from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

function MeetingCalendar() {
  const localizer = momentLocalizer(moment);
  
  return (
    <div className="">
      <Calendar
        selectable
        localizer={localizer}
        events={[]}
        defaultView={"week"}
        onSelectEvent={(event) => alert()}
      />
    </div>
  );
}

export default MeetingCalendar;
