import React, { ChangeEvent, useState } from "react";
import StudyService from "../../services/StudyService";
import Input from "../common/Input";
import { HeadExitButton } from "../HeadExitButton";

interface IAddStudyFormProps {
  windowClose(): void;
}

function AddStudyForm(props: IAddStudyFormProps) {
  const [defaultInterval, setDefaultInterval] = useState(60);
  const [apptGoals, setApptGoals] = useState(0);
  const [gcalId, setGcalId] = useState("");
  const [sendgridId, setSendgridId] = useState("");
  const [sendgridConfirmId, setSendgridConfirmId] = useState("");
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const onGcalIdChange = (e: ChangeEvent<HTMLInputElement>) =>
    setGcalId(e.currentTarget.value);
  const onSendgridIdChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSendgridId(e.currentTarget.value);
  const onSendgridConfirmIdChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSendgridConfirmId(e.currentTarget.value);

  const onDefaultIntervalChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDefaultInterval(parseInt(e.currentTarget.value));

  const submitStudy = async () => {
    const minDays = document.querySelector<HTMLInputElement>("#min-day")?.value;
    const minMonths =
      document.querySelector<HTMLInputElement>("#min-month")?.value;
    const minYears =
      document.querySelector<HTMLInputElement>("#min-year")?.value;
    const maxDays = document.querySelector<HTMLInputElement>("#max-day")?.value;
    const maxMonths =
      document.querySelector<HTMLInputElement>("#max-month")?.value;
    const maxYears =
      document.querySelector<HTMLInputElement>("#max-year")?.value;

    /*  Conver min and max ages into total days the represent */
    /* Since default input is set to 0, input is always defined */
    const minTotalDays =
      parseInt(minDays as string) +
      parseInt(minMonths as string) * 30 +
      parseInt(minYears as string) * 365;
    const maxTotalDays =
      parseInt(maxDays as string) +
      parseInt(maxMonths as string) * 30 +
      parseInt(maxYears as string) * 365;

    const studyName =
      document.querySelector<HTMLInputElement>("#study-name")?.value;
    // const startDate =
    //   document.querySelector<HTMLInputElement>("#start-date")?.value;
    // const endDate =
    //   document.querySelector<HTMLInputElement>("#end-date")?.value;
    const keyColor =
      document.querySelector<HTMLInputElement>("#key-color")?.value;
    const description =
      document.querySelector<HTMLInputElement>("#study-description")?.value;
    const defaultIntervalInt = defaultInterval;

    /* Check if inputs have valid values and send request to create the study  */
    if (
      studyName &&
      startDate &&
      endDate &&
      keyColor &&
      description &&
      defaultIntervalInt
    ) {
      StudyService.create({
        studyName,
        startDate,
        endDate,
        keyColor,
        gcalId,
        sendgridId,
        sendgridConfirmId,
        minAgeDays: minTotalDays,
        maxAgeDays: maxTotalDays,
        description,
        defaultTimeInterval: defaultIntervalInt,
        apptGoals,
      });
    }
    props.windowClose();
  };

  return (
    <div className="">
      <div className="flex justify-end -mb-10">
        <HeadExitButton onClick={props.windowClose} />
      </div>
      <h1 className="mb-4 text-3xl"> New Study Form </h1>
      <form className="max-w-lg">
        <div className="flex w-full">
          <div className="w-full px-1 mb-6 md:mb-0">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              {" "}
              Study Name
            </label>
            <input
              id="study-name"
              className="block w-full p-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="ex. TECL Funtime"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-2 -mx-3">
          <div className="w-full px-3">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              {" "}
              Study Description
            </label>
            <textarea
              id="study-description"
              minLength={3}
              rows={3}
              placeholder="ex. TECL Funtime teaches kids how to have fun!"
              className="w-full p-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none resize-y focus:bg-white focus:border-gray-500"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-around mb-2 -mx-3">
          <div className="flex items-center">
            <label className="block mr-4 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Weekly Appointment Goals:{" "}
            </label>
            <input
              className="block w-16 p-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:bg-white focus:border-gray-500"
              type="number"
              value={apptGoals}
              onChange={(e) => setApptGoals(parseInt(e.currentTarget.value))}
            />
          </div>
          <div className="flex items-center">
            <label className="block mr-4 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Study Key Color:
            </label>
            <input
              id="key-color"
              className="block w-16 h-10 p-1 leading-tight text-gray-700 bg-gray-200 rounded-lg cursor-pointer select-none focus:bg-white"
              type="color"
              defaultValue="#ed8936"
            />
          </div>
        </div>
        <h2 className="block mb-2 text-xl font-bold text-gray-700">
          Age Range
        </h2>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-1 mb-6 md:w-1/2">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Minimum Age
            </label>
            <AgeBoxes yearId="min-year" monthId="min-month" dayId="min-day" />
          </div>
          <div className="w-full px-1 md:w-1/2">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Maximum Age
            </label>
            <AgeBoxes yearId="max-year" monthId="max-month" dayId="max-day" />
          </div>
        </div>
        <h2 className="block mb-2 text-xl font-bold text-gray-700">
          Time Frame
        </h2>
        <div className="flex flex-wrap mb-2 -mx-3">
          <div className="w-full px-1 md:w-1/3">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Appointment Length
            </label>
            <div className="flex items-end justify-center">
              <input
                className="block w-20 p-2 mb-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:bg-white focus:border-gray-500"
                type="number"
                value={defaultInterval}
                onChange={onDefaultIntervalChange}
              />{" "}
              <p className="mx-1 mb-1 text-lg">min.</p>
            </div>
          </div>
          <div className="w-full px-1 mb-6 md:w-1/3 md:mb-0">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Start Date
            </label>
             <Input valueSetter={setStartDate} value={startDate} type="date" />
            {/* <input
              id="start-date"
              className="block w-full p-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:bg-white"
              type="date"
            /> */}
          </div>
          <div className="w-full px-1 md:w-1/3">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              End Date
            </label>
             <Input valueSetter={setEndDate} value={endDate} type="date" />
            {/* <input
              id="end-date"
              className="block w-full p-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:bg-white focus:border-gray-500"
              type="date"
            ></input> */}
          </div>
        </div>
        <div className="mb-4 space-y-2">
          <h3>TECL Google Calendar ID:</h3>
          <div className="w-full px-1 ">
            <input
              value={gcalId}
              onChange={onGcalIdChange}
              placeholder="ex. an13jnd1jjwndbr3g@group.calendar.google.com"
              className="block w-full p-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:bg-white focus:border-gray-500"
              type="text"
            />
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <h3>Participant Sendgrid Confirmation Email ID:</h3>
          <div className="w-full px-1 ">
            <input
              value={sendgridId}
              onChange={onSendgridIdChange}
              placeholder="ex. alnd1jwndbr3jnd1wndn1ndbr3"
              className="block w-full p-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:bg-white focus:border-gray-500"
              type="text"
            />
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <h3>Participant Sendgrid Reminder Email ID:</h3>
          <div className="w-full px-1 ">
            <input
              value={sendgridConfirmId}
              onChange={onSendgridConfirmIdChange}
              placeholder="ex. alnd1jwndbr3jnd1wndn1ndbr3"
              className="block w-full p-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:bg-white focus:border-gray-500"
              type="text"
            />
          </div>
        </div>

        <div className="px-3 mx-auto ">
          <input
            className="w-64 px-4 py-2 font-bold text-white bg-gray-800 rounded cursor-pointer hover:text-orange-500"
            type="button"
            value="Create New Study"
            onClick={submitStudy}
          />
        </div>
      </form>
    </div>
  );
}

function AgeBoxes(props: { yearId: string; monthId: string; dayId: string }) {
  const { yearId, monthId, dayId } = props;

  return (
    <div className="flex mx-4 space-x-2">
      <div>
        <div className="text-xs">Years</div>
        <input
          id={yearId}
          className="block w-full px-2 py-1 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:bg-white"
          min="0"
          defaultValue="0"
          type="number"
        />
      </div>
      <div>
        <div className="text-xs">Months</div>
        <input
          id={monthId}
          className="block w-full px-2 py-1 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:bg-white"
          min="0"
          defaultValue="0"
          type="number"
        />
      </div>
      <div>
        <div className="text-xs">Days</div>
        <input
          id={dayId}
          className="block w-full px-2 py-1 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:bg-white"
          min="0"
          defaultValue="0"
          type="number"
        />
      </div>
    </div>
  );
}

export default AddStudyForm;
