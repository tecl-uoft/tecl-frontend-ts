import { DateSelectArg, EventApi } from "@fullcalendar/react";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../../context/AuthContext";
import { useStudy } from "../../context/StudyContext";
import { ICreateScheduleEventProps } from "../../services/ScheduleEventService";
import { DateTime } from "luxon";
import Label from "../common/Label";
import { AddSEventModal } from "../AddSEventModal";
import Input from "../common/Input";
import toast from "react-hot-toast";

interface ICalendarEventModalProps {
  selectInfo: DateSelectArg | undefined;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
  createEventFunc(): void;
  eventAPI?: EventApi;
}

function CalendarEventModal(props: ICalendarEventModalProps) {
  const studyCtx = useStudy();
  const authCtx = useAuth();
  const { selectInfo, eventAPI } = props;
  const [repeatUntilWeeks, setRepeatUntilWeeks] = useState("0");
  const [interval, setInterval] = useState("0");
  const [startTime, setStartTime] = useState("");
  const [addParticipant, setAddParticipant] = useState(false);
  const [bookingDeadline, setBookingDeadline] = useState("");
  const [showAddSEventModal, setShowAddSEventModal] = useState(false);
  const [endTime, setEndTime] = useState("");
  const [endRepeat, setEndRepeat] = useState<DateTime | undefined>(undefined);

  /* Sets the shown time interval as study default time interval */
  useEffect(() => {
    if (studyCtx?.studyState) {
      setInterval(String(studyCtx.studyState.defaultTimeInterval));
    }
  }, [studyCtx]);

  /* Updates Date ISO string for repeating weeks */
  useEffect(() => {
    if (selectInfo) {
      setEndRepeat(
        DateTime.fromISO(selectInfo.startStr).plus({
          weeks: parseInt(repeatUntilWeeks),
        })
      );
    }
  }, [repeatUntilWeeks, selectInfo]);

  /* Updates end time display string as interval changes */
  useEffect(() => {
    if (startTime) {
      const endDateTime = DateTime.local()
        .set({
          hour: parseInt(startTime.substring(0, 2)),
          minute: parseInt(startTime.substring(3, 5)),
        })
        .plus({ minute: parseInt(interval) });
      setEndTime(endDateTime.toFormat("HH:mm"));
    }
  }, [startTime, interval]);

  /* Set inital booking deadline and start time on launch */
  useEffect(() => {
    if (props.selectInfo?.endStr) {
      setBookingDeadline(
        DateTime.fromJSDate(props.selectInfo.end)
          .minus({ days: 2 })
          .toFormat("yyyy-MM-dd")
      );
    }

    if (props.selectInfo) {
      const startTime = DateTime.fromISO(props.selectInfo.startStr).toFormat(
        "T"
      );
      setStartTime(startTime);
    }
  }, [props.selectInfo]);

  const onCheckAddParticipant = () => setAddParticipant(!addParticipant);

  const onStartTimeChange = (e: ChangeEvent<HTMLInputElement>) =>
    setStartTime(e.currentTarget.value);

  const updateBookingDeadline = (e: ChangeEvent<HTMLSelectElement>) =>
    setBookingDeadline(e.currentTarget.value);

  const onAdd = () => {
    const selectInfo = props.selectInfo;
    if (!selectInfo || !studyCtx || !authCtx || !authCtx.authState.user) {
      toast.error(
        "Something has crashed in add an availability. Please contact the admin."
      );
      return;
    }
    if (!endRepeat) {
      toast.error("Repeat datetime not set. Report to admin.");
      return;
    }

    const eventTitle = `${authCtx.authState.user?.firstName}`;
    const startTimeStr = new Date(selectInfo.startStr).setHours(
      parseInt(startTime.slice(0, 2)),
      parseInt(startTime.slice(3, 5))
    );
    const endTimeStr = new Date(selectInfo.startStr).setHours(
      parseInt(endTime.slice(0, 2)),
      parseInt(endTime.slice(3, 5))
    );

    /* Send request to add state to database */
    const availability: ICreateScheduleEventProps = {
      start: new Date(startTimeStr).toISOString(),
      end: new Date(endTimeStr).toISOString(),
      title: eventTitle,
      isRecurring: true,
      endRecurringDate: endRepeat.toISO(),
      recurringInterval: parseInt(interval),
      bookingDeadline,
    };
    new Promise((res, rej) => {
      res(studyCtx.createScheduleEvent(availability));
    })
      .then(() => {
        props.setShowEventModal(false);
      })
      .then(() => {
        if (addParticipant) {
          setShowAddSEventModal(false);
          window.location.pathname = "scheduling";
        } else {
          if (!studyCtx.studyState) {
            return;
          }
          studyCtx.findAndSetStudy(studyCtx.studyState.studyName);
        }
      });
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity cursor-pointer">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={() => props.setShowEventModal(false)}
            ></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <div
            className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="px-4 pt-4 bg-white">
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 border-2 border-green-600 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-green-600"
                    height="24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z"
                      fill="#282828"
                    ></path>
                  </svg>
                </div>
                <div className="w-full text-2xl text-center sm:ml-4 sm:text-left">
                  <h4 className="mx-auto text-center ">
                    {selectInfo && (
                      <>
                        <p className="my-1 text-2xl">
                          {DateTime.fromISO(selectInfo.startStr).toFormat(
                            "EEEE, MMMM dd, yyyy"
                          )}{" "}
                        </p>
                      </>
                    )}
                  </h4>
                </div>
              </div>

              <form className="px-2 pb-4 space-y-4 text-sm text-center">
                <div className="flex -mx-3 ">
                  <div className="flex flex-col w-full px-3 mb-2 md:mb-0">
                    <label className="w-full mb-4 text-lg tracking-wide text-gray-700">
                      Add time availability as needed.
                    </label>
                    {selectInfo && (
                      <div className="flex items-end justify-center w-full">
                        <div className="w-1/3">
                          <Label text={"start time"} />
                          <input
                            value={startTime}
                            onChange={onStartTimeChange}
                            type="time"
                            step={300}
                            className="block w-full p-2 text-gray-700 bg-gray-200 border rounded cursor-text focus:outline-none focus:bg-white"
                          />
                        </div>
                        {props.selectInfo && (
                          <div className="px-3 mb-6 md:mb-0">
                            <Label text={"Parent booking deadline:"} />
                            <select
                              className="block w-full p-2 mx-auto text-gray-700 bg-gray-200 border rounded cursor-pointer focus:outline-none focus:bg-white"
                              value={bookingDeadline}
                              onChange={updateBookingDeadline}
                            >
                              {[1, 2, 3, 4, 5, 6, 7].map((days) => {
                                return (
                                  props.selectInfo?.startStr && (
                                    <option
                                      key={days}
                                      value={DateTime.fromISO(
                                        props.selectInfo.startStr
                                      )
                                        .minus({ days })
                                        .toFormat("yyyy-MM-dd")}
                                    >
                                      {days} days before availability
                                    </option>
                                  )
                                );
                              })}
                            </select>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {studyCtx?.studyState && (
                  <div className="flex items-start justify-center">
                    <div className="px-1 mx-6 mb-6 align-bottom md:w-1/2 md:mb-0">
                      <Label text={"Appointment Length"} />
                      <div className="flex justify-center px-2">
                        <Input
                          value={interval}
                          type="number"
                          valueSetter={setInterval}
                        />
                        <p className="mx-2 my-auto">min.</p>
                      </div>
                      <span className="w-full mx-2 my-auto">
                        ({startTime + " to " + endTime})
                      </span>
                    </div>
                    <div className="px-3 mb-6 align-bottom md:mb-0">
                      <div>
                        <Label text={"Repeat for: "} />
                        <div className="flex justify-center px-4">
                          <div className="w-1/3">
                            <Input
                              min={0}
                              value={repeatUntilWeeks}
                              type="number"
                              valueSetter={setRepeatUntilWeeks}
                            />
                          </div>
                          <span className="mx-2 my-auto">weeks</span>
                        </div>
                        <span className="mx-2 my-auto">
                          Until{" " + endRepeat?.toFormat("EEE, MMM dd, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className="flex justify-between px-8 mt-2 cursor-pointer"
                  onClick={onCheckAddParticipant}
                >
                  <label className="block text-gray-700 cursor-pointer select-none text-md bold">
                    Assign a participant to this availability myself.
                  </label>
                  <input
                    checked={addParticipant}
                    onChange={onCheckAddParticipant}
                    className="w-4 h-4 mt-1 cursor-pointer"
                    type="checkbox"
                  />
                </div>
              </form>
            </div>
            <div className="flex justify-center px-4 py-4 space-x-4">
              <span className="flex w-24 mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  onClick={() => props.setShowEventModal(false)}
                  type="button"
                  className="inline-flex justify-center w-24 px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                >
                  Cancel
                </button>
              </span>
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  onClick={onAdd}
                  type="button"
                  className="inline-flex justify-center w-24 px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green sm:text-sm sm:leading-5"
                >
                  Add
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      {eventAPI && showAddSEventModal && (
        <AddSEventModal
          setShowAddSEventModal={props.setShowEventModal}
          studyState={studyCtx?.studyState}
          eventClick={eventAPI}
        />
      )}
    </>
  );
}

export default CalendarEventModal;
