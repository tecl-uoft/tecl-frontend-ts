import { EventApi } from "@fullcalendar/react";
import { DateTime } from "luxon";
import React, { MouseEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ScheduleEventService, { IScheduleEvent } from "../../services/ScheduleEventService";
import { IStudy } from "../../services/StudyService";
import { AddExtraChildModal } from "../AddExtraChildModal";
import Input from "../common/Input";
import Label from "../common/Label";
import { FocusedModal } from "../FocusedModal";

interface IAddSEventModalProps {
  setShowAddSEventModal: React.Dispatch<React.SetStateAction<boolean>>;
  eventClick: EventApi | undefined;
  studyState: IStudy | undefined;
  timeEvents: IScheduleEvent[];
}
export interface IRegisterChild {
  firstName: string;
  lastName: string;
  dob: string;
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
  const [showExtraChildModal, setExtraChildShowModal] = useState(false);
  const [isInGta, setIsInGta] = useState(false);
  const [registerChildern, setRegisterChildern] = useState<IRegisterChild[]>([
    { firstName: "", lastName: "", dob: "" },
  ]);
  const [eventClickSEId, setEventClickSEId] = useState<string | undefined>()

  const { setShowAddSEventModal, eventClick, studyState, timeEvents } = props;

  useEffect(() => {
    setEventClickSEId(props.eventClick?.id)
  }, [props.eventClick?.id])


  useEffect(() => {
    setChildDob(DateTime.fromJSDate(new Date()).toFormat("yyyy-MM-dd"));
  }, []);

  const darkToastError = (msg: string) => {
    toast.error(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const submitJoinStudy = async (e: MouseEvent<HTMLInputElement>) => {

    const childAgeInDays =
      Math.floor(DateTime.fromISO(childDob).diffNow("days").days) * -1;

    if (
      !firstNameField ||
      !lastNameField ||
      !emailField ||
      !childFirstNameField ||
      !childLastNameField ||
      !childDob
    ) {
      darkToastError("Please make sure you complete all non-optional fields.");
      return;
    }


    if (
      studyState &&
      (studyState.minAgeDays > childAgeInDays ||
        studyState.maxAgeDays < childAgeInDays)
    ) {
      darkToastError(
        "Unfortunately, due to your child's age, they cannot be part of this study."
      );
      return;
    }

    debugger
    /* Set event as background when it is booked */
    if (
      eventClick &&
      eventClickSEId &&
      studyState &&
      studyState.minAgeDays <= childAgeInDays &&
      studyState.maxAgeDays >= childAgeInDays
    ) {
      const additionalCSCChildren =
        registerChildern[0].firstName && registerChildern[0].dob
          ? registerChildern
          : [];

      try {
        const updateScheduleEventPromise =
          ScheduleEventService.updateParticipantInfo({
            participantInfo: {
              calId: eventClickSEId,
              firstName: firstNameField,
              lastName: lastNameField,
              email: emailField,
              phoneNum,
              child: {
                firstName: childFirstNameField,
                lastName: childLastNameField,
                dob: childDob,
              },
              addToSharedDB: canAddInfo,
              isInGta,
            },
            additionalCSCChildren,
          });
        toast.promise(updateScheduleEventPromise, {
          loading: "Loading...",
          success:
            "Your appointment has been recived. We will contact you via email shortly.",
          error: "Error when updating, please contact the staff.",
        });
        eventClick?.remove();
      } catch (err) {
        console.log("EERR", err)
        toast.error("Failed to updated. Please contact staff.", {
          duration: 3000,
        });
      }
      setShowAddSEventModal(false);
    }
  };

  const onCheckAddInfo = () => setCanAddInfo(!canAddInfo);
  const onCheckAnotherChildRd = () => setAnotherChildRd(!anotherChildRd);
  const onAddAttionalChildren = () => setExtraChildShowModal(true);
  const onFormCancel = () => setShowAddSEventModal(false);
  const onCheckIsInGta = () => setIsInGta(!isInGta);

  return (
    <div>
      <FocusedModal setShowModal={setShowAddSEventModal}>
        <h1 className="flex flex-col justify-center mx-2 mb-1 text-xl md:flex-row">
          {" "}
          Join Study:{" "}
          <div className="mx-2 text-xl font-bold">
            {studyState && studyState.studyName},{" "}
          </div>
          Lead By:{" "}
          {timeEvents.length === 1 ?
            <div className="px-3 mx-2 bg-gray-200 rounded-md text-md">{eventClick?.extendedProps.owner} </div>
            : <select onChange={(e) => { setEventClickSEId(e.currentTarget.value); console.log(e.currentTarget.value) }} className="px-1 mx-2 rounded-md cursor-pointer text-md" >
              {timeEvents.map(e => (<option className="cursor-pointer text-md" value={e.id}>{e.title}</option>))}
            </select>
          }

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

          <h2 className="block py-1 mb-2 text-lg font-bold text-gray-700 bg-orange-300 rounded">
            Parent Information
          </h2>

          <div className="flex flex-wrap mb-1 -mx-3">
            <div className="w-full px-3 md:w-1/2 md:mb-0">
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
            <div className="w-full px-3 md:w-7/12">
              <Label text={"Email"} />
              <Input
                valueSetter={setEmailField}
                value={emailField}
                type={"email"}
                placeholder={"bob@joemail.com"}
              />
            </div>
            <div className="w-full px-3 mb-2 md:w-5/12">
              <Label text={"Phone (Optional)"} />
              <Input
                valueSetter={setPhoneNum}
                value={phoneNum}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                type={"tel"}
                placeholder={"647-111-1111"}
              />
            </div>
          </div>
          <h3 className="flex justify-between block px-4 py-1 mb-2 text-lg font-bold text-gray-700 bg-orange-300 rounded">
            <div className="mx-auto my-auto">Child Information</div>
          </h3>
          <div className="mb-2">
            <div className="flex flex-wrap mb-2 -mx-3">
              <div className="w-full px-3 md:w-1/2 md:mb-0">
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

              <div
                className="flex justify-between w-full px-3 mt-2 mb-4 cursor-pointer md:mt-0 md:mb-2 hover:bg-gray-200"
                onClick={onCheckAddInfo}
              >
                <label className="block text-sm text-left text-gray-700 cursor-pointer select-none">
                  I would like to be added to the Child Study Center (CSC)
                  Database <br /> so I can hear about more fun online studies
                  for my child!
                </label>
                <input
                  checked={canAddInfo}
                  onChange={onCheckAddInfo}
                  className="w-8 h-8 mt-2 cursor-pointer md:w-4 md:h-4"
                  type="checkbox"
                />
              </div>
              <div
                className="flex justify-between w-full px-3 py-1 mt-2 mb-4 cursor-pointer md:mt-0 md:mb-2 hover:bg-gray-200"
                onClick={onCheckIsInGta}
              >
                <label className="block text-sm text-left text-gray-700 cursor-pointer select-none">
                  I live the Greater Toronto Area (GTA).
                </label>
                <input
                  checked={isInGta}
                  onChange={onCheckIsInGta}
                  className="w-8 h-8 mt-1 cursor-pointer md:w-4 md:h-4"
                  type="checkbox"
                />
              </div>
              <div
                className="flex justify-between w-full px-3"
                onClick={onCheckAnotherChildRd}
              >
                <label className="block text-sm text-left text-gray-700 select-none">
                  I would like to add siblings to the CSC Database.
                </label>
                <input
                  className="h-8 px-2 text-sm font-bold text-white bg-orange-600 rounded cursor-pointer md:h-full md:py-1 hover:bg-orange-700"
                  type="button"
                  value="Add another child"
                  onClick={onAddAttionalChildren}
                />
              </div>
            </div>
          </div>

          <span className="flex text-xs font-bold text-left text-gray-700 select-none ">
            *The Child Study Center (CSC) at the University of Toronto St.
            George campus is a group of research labs devoted to studying
            various aspects of developmental psychology.
          </span>
          <span className="flex text-xs font-bold text-left text-gray-700 select-none ">
            **Please note: if you have previously signed up for one of our
            studies please use the same email address. Appointment confirmation
            details and reminders will be sent to this address. If you would
            like to add a secondary email or change the email address we have on
            file please email tecl.psychology@utoronto.ca
          </span>
          <br />
          <div className="flex justify-center mx-2 mt-2 space-x-4">
            <div className="w-32 px-3">
              <input
                className="px-4 py-2 font-bold text-gray-800 bg-white border-2 border-gray-800 border-opacity-75 rounded cursor-pointer hover:border-orange-500 hover:text-orange-500"
                type="button"
                value="Cancel"
                onClick={onFormCancel}
              />
            </div>
            <div className="w-32 px-3">
              {<input
                className="px-4 py-2 font-bold text-white bg-gray-800 rounded cursor-pointer hover:text-orange-500"
                type="button"
                value="Submit"
                onClick={submitJoinStudy}
              />}
            </div>
          </div>
        </form>
        {showExtraChildModal && (
          <AddExtraChildModal
            registerChildern={registerChildern}
            setRegisterChildern={setRegisterChildern}
            setShowModal={setExtraChildShowModal}
          />
        )}
      </FocusedModal>
    </div>
  );
}

export default AddSEventModal;
