import { EventApi } from "@fullcalendar/react";
import { DateTime } from "luxon";
import React, { MouseEvent, useState } from "react";
import ScheduleEventService from "../../services/ScheduleEventService";
import { IStudy } from "../../services/StudyService";
import Input from "../common/Input";
import Label from "../common/Label";
import { FocusedModal } from "../FocusedModal";

interface IAddSEventModalProps {
  setShowAddSEventModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [phoneNum, setPhoneNum] = useState("");
  const [canAddInfo, setCanAddInfo] = useState(false);
  const [anotherChildRd, setAnotherChildRd] = useState(false);

  const { setShowAddSEventModal, eventClick, studyState } = props;

  const submitJoinStudy = (e: MouseEvent<HTMLInputElement>) => {
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
          addToSharedDB: canAddInfo,
        },
      })
        .then(() => {
          eventClick.setProp("title", "BOOKED");
          eventClick.setProp("display", "background");
          eventClick.setProp("textColor", "#000000");
        }).then(() => setShowAddSEventModal(false))
        .catch((err) => alert(err));
    }
    
  };

  const onCheckAddInfo = () => setCanAddInfo(!canAddInfo);
  const onCheckAnotherChildRd = () => setAnotherChildRd(!anotherChildRd);

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
            {eventClick?.start &&
              eventClick?.end &&
              DateTime.fromJSDate(eventClick.start).toFormat("ff") +
                " - " +
                DateTime.fromJSDate(eventClick.end).toFormat("t ZZZZ")}
          </h2>

          <h2 className="block mb-2 text-lg font-bold text-gray-700">
            Parent Information
          </h2>

          <div className="flex flex-wrap mb-2 -mx-3">
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <Label text={"First Name"} />
              <Input
                value={firstNameField}
                valueSetter={setFirstNameField}
                type={"text"}
                placeholder={"Jane"}
              />
            </div>
            <div className="w-full px-3 md:w-1/2">
              <Label text={"Last Name"} />
              <Input
                valueSetter={setLastNameField}
                value={lastNameField}
                type={"text"}
                placeholder={"Doe"}
              />
            </div>
            <div className="w-7/12 px-3">
              <Label text={"Email"} />
              <Input
                valueSetter={setEmailField}
                value={emailField}
                type={"email"}
                placeholder={"bob@joemail.com"}
              />
            </div>
            <div className="w-5/12 px-3 mb-4">
              <Label text={"Phone Number (Optional)"} />
              <Input
                valueSetter={setPhoneNum}
                value={phoneNum}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                type={"tel"}
                placeholder={"647-111-1111"}
              />
            </div>
          </div>
          <h3 className="flex justify-between block px-4 py-1 my-2 text-lg font-bold text-gray-700 bg-orange-300 rounded">
            <div className="mx-auto my-auto">Child Information</div>
          </h3>
          <div className="mb-2">
            <div className="flex flex-wrap mb-2 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <Label text={"First Name"} />
                <Input
                  valueSetter={setChildFirstNameField}
                  value={childFirstNameField}
                  type="text"
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <Label text={"Last Name"} />
                <Input
                  valueSetter={setChildLastNameField}
                  value={childLastNameField}
                  type="text"
                />
              </div>
              <div className="w-full px-3">
                <Label text={"Date of Birth"} />
                <Input valueSetter={setChildDob} value={childDob} type="date" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="flex justify-between block px-4 text-lg font-bold text-gray-700 ">
              <div className="mx-auto my-auto">
                Want to join similar studies?
              </div>
            </h3>
            <div
              className="flex justify-between w-full cursor-pointer"
              onClick={onCheckAddInfo}
            >
              <label className="block text-gray-700 cursor-pointer select-none text-md">
                Add this information to the Child Study Center (CSC) database.
              </label>
              <input
                checked={canAddInfo}
                onChange={onCheckAddInfo}
                className="w-4 h-4 mt-1 cursor-pointer"
                type="checkbox"
              />
            </div>
            <div
              className="flex justify-between w-full mb-6 cursor-pointer"
              onClick={onCheckAnotherChildRd}
            >
              <label className="block text-gray-700 cursor-pointer select-none text-md">
                Redirect me so I can add another child to the CSC database.
              </label>
              <input
                onChange={onCheckAnotherChildRd}
                checked={anotherChildRd}
                className="w-4 h-4 mt-1 cursor-pointer"
                type="checkbox"
              />
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
