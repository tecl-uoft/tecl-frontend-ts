import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect, useState } from "react";
import { useStudy } from "../../context/StudyContext";
import { CalendarRemoveModal } from "../CalendarRemoveModal";
import { CalendarEventModal } from "../CalendarEventModal";

interface IStudyHoursSetterModalProps {
  setShowModal(showModal: boolean): void;
}

function StudyHoursSetterModal(props: IStudyHoursSetterModalProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventClick, setEventClick] = useState<EventApi | undefined>(undefined);
  const [selectInfo, setSelectInfo] = useState<DateSelectArg | undefined>(
    undefined
  );
  const studyCtx = useStudy();

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setShowEventModal(true);
    setSelectInfo(selectInfo);
  };
  const handleEventClick = (clickInfo: EventClickArg) => {
    setShowDeleteModal(true);
    setEventClick(clickInfo.event);
  };

  useEffect(() => {
    console.log("hoursetter", studyCtx?.studyState);
  }, [studyCtx]);

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity cursor-pointer"
          onClick={() => props.setShowModal(false)}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block w-10/12 p-6 my-8 align-middle align-bottom transition-all transform bg-white rounded-lg "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="pb-6">
            {studyCtx && (
              <FullCalendar
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek",
                }}
                initialEvents={studyCtx?.studyState.scheduleEvents}
                selectable
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                select={handleDateSelect}
                eventClick={handleEventClick}
              />
            )}
            {showDeleteModal && (
              <CalendarRemoveModal
                onCancel={() => setShowDeleteModal(false)}
                onDelete={eventClick}
              />
            )}
            {showEventModal && (
              <CalendarEventModal
                createEventFunc={() => {}}
                selectInfo={selectInfo}
                setShowEventModal={setShowEventModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyHoursSetterModal;