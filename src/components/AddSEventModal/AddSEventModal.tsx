import { EventApi } from "@fullcalendar/react";
import { DateTime } from "luxon";
import React, { MouseEvent, useState } from "react";
import ScheduleEventService from "../../services/ScheduleEventService";
import { IStudy } from "../../services/StudyService";
import { FocusedModal } from "../FocusedModal";

interface IAddSEventModalProps {
  setShowAddSEventModal(showModal: boolean): void;
  eventClick: EventApi | undefined;
  studyState: IStudy | undefined;
}

function AddSEventModal(props: IAddSEventModalProps) {
  const [firstNameField, setFirstNameField] = useState("");
  const [lastNameField, setLastNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [childFirstNameField, setChildFirstNameField] = useState("");
  const [childLastNameField, setChildLastNameField] = useState("");
  const [childDob, setChildDob] = useState("");

  const { setShowAddSEventModal, eventClick, studyState } = props;

  function submitJoinStudy(e: MouseEvent<HTMLInputElement>) {
    /* Set event as background when it is booked */
    if (eventClick) {
      ScheduleEventService.updateParticipantInfo({
        participantInfo: {
          calId: eventClick.id,
          firstName: firstNameField,
          lastName: lastNameField,
          email: emailField,
          child: {
            firstName: childFirstNameField,
            lastName: childLastNameField,
            dob: childDob,
          },
        },
      })
        .then(() => {
          eventClick.setProp("title", "BOOKED");
          eventClick.setProp("display", "background");
          eventClick.setProp("textColor", "#000000");
        })
        .catch((err) => alert(err));
    }
    setShowAddSEventModal(false);
  }

  return (
    <div>
      <FocusedModal setShowModal={setShowAddSEventModal}>
        <div className="flex justify-end -mb-4">
          <div
            className="h-6 px-2 text-white bg-red-300 rounded cursor-pointer hover:bg-red-500"
            onClick={() => setShowAddSEventModal(false)}
          >
            exit
          </div>
        </div>
        <h1 className="flex justify-center mx-2 mb-1 text-xl">
          {" "}
          Join study:{" "}
          <div className="mx-2 text-xl font-bold">
            {studyState && studyState.studyName},{" "}
          </div>
          lead by:{" "}
          <div className="mx-2 text-xl font-bold">{eventClick?.title} </div>
        </h1>

        <form className="max-w-lg">
          <h2 className="block mb-2 text-xl text-gray-700">
            {" "}
            Date:{" "}
            {eventClick?.start && eventClick?.end && 
            DateTime.fromJSDate(eventClick.start).toFormat("ff") +
              " - " +
              DateTime.fromJSDate(eventClick.end).toFormat("t ZZZZ")}
          </h2>

          <h2 className="block mb-2 text-lg font-bold text-gray-700">
            Parent Information
          </h2>

          <div className="flex flex-wrap mb-2 -mx-3">
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                First Name
              </label>
              <input
                onChange={(e) => setFirstNameField(e.target.value)}
                value={firstNameField}
                id="event-first-name"
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
                type="text"
              />
            </div>
            <div className="w-full px-3 md:w-1/2">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Last Name
              </label>
              <input
                onChange={(e) => setLastNameField(e.target.value)}
                value={lastNameField}
                id="event-last-name"
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
              ></input>
            </div>
            <div className="w-full px-3 mb-4">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Email
              </label>
              <input
                onChange={(e) => setEmailField(e.target.value)}
                value={emailField}
                id="event-email"
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                placeholder="bob@joemail.com"
              ></input>
            </div>
          </div>

          <h3 className="flex justify-between block px-4 py-1 my-2 text-lg font-bold text-gray-700 bg-orange-300 rounded">
            <div className="mx-auto my-auto">Child Information</div>
          </h3>

          <div className="mb-4">
            <div className="flex flex-wrap mb-2 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                  First Name
                </label>
                <input
                  onChange={(e) => setChildFirstNameField(e.target.value)}
                  value={childFirstNameField}
                  className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
                  type="text"
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                  Last Name
                </label>
                <input
                  onChange={(e) => setChildLastNameField(e.target.value)}
                  value={childLastNameField}
                  className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                ></input>
              </div>
              <div className="w-full px-3">
                <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                  Date of birth
                </label>
                <input
                  onChange={(e) => setChildDob(e.target.value)}
                  value={childDob}
                  className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
                  type="date"
                ></input>
              </div>
            </div>
          </div>

          <div className="w-32 px-3 mx-auto mt-2">
            <input
              className="px-4 py-2 font-bold text-white bg-gray-800 rounded cursor-pointer hover:text-orange-500"
              type="button"
              value="Submit"
              onClick={submitJoinStudy}
            />
          </div>
        </form>
      </FocusedModal>
    </div>
  );
}

export default AddSEventModal;
