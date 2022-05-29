import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
} from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState } from "react";
import { useStudy } from "../../context/StudyContext";
import { CalendarRemoveModal } from "../CalendarRemoveModal";
import { CalendarEventModal } from "../CalendarEventModal";
import { HeadExitButton } from "../HeadExitButton";
import listPlugin from "@fullcalendar/list";

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

  /* TODO: Add key so refresh the comonent on study add */

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
          className="inline-block w-10/12 p-4 pt-2 my-4 align-top align-middle transition-all transform bg-white rounded-lg "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="pb-2 study-setter-cal">
            {studyCtx?.studyState && (
              <>
                <div className="flex justify-end -mb-6">
                  <HeadExitButton onClick={() => props.setShowModal(false)} />
                </div>

                <h2 className="text-3xl font-bold underline">
                  Set {studyCtx?.studyState && studyCtx.studyState.studyName}{" "}
                  Study Availability
                </h2>
                <FullCalendar
                  headerToolbar={{
                    left: "today,timeGridWeek,listWeek",
                    center: "title",
                    right: "prev next",
                  }}
                  events={studyCtx.studyState.scheduleEvents}
                  selectable
                  slotDuration={
                    // "00:" + studyCtx.studyState.defaultTimeInterval + ":00"
                    "00:30:00"
                  }
                  nowIndicator={true}
                  plugins={[timeGridPlugin, interactionPlugin, listPlugin]}
                  initialView="timeGridWeek"
                  select={handleDateSelect}
                  allDaySlot={false}
                  eventClick={handleEventClick}
                />
              </>
            )}
            {showDeleteModal && (
              <CalendarRemoveModal
                onCancel={() => setShowDeleteModal(false)}
                eventClick={eventClick}
              />
            )}
            {showEventModal && (
              <CalendarEventModal
                createEventFunc={() => {}}
                selectInfo={selectInfo}
                eventAPI={eventClick}
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
