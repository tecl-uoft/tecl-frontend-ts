import React, { useState } from "react";
import StudyService from "../../services/StudyService";
import { HeadExitButton } from "../HeadExitButton";

interface IAddStudyFormProps {
  windowClose(): void;
}

function AddStudyForm(props: IAddStudyFormProps) {
    const [defaultInterval, setDefaultInterval] = useState("30");

  function submitStudy() {
    const minDays = document.querySelector<HTMLInputElement>("#min-day")?.value;
    const minMonths = document.querySelector<HTMLInputElement>("#min-month")
      ?.value;
    const minYears = document.querySelector<HTMLInputElement>("#min-year")
      ?.value;
    const maxDays = document.querySelector<HTMLInputElement>("#max-day")?.value;
    const maxMonths = document.querySelector<HTMLInputElement>("#max-month")
      ?.value;
    const maxYears = document.querySelector<HTMLInputElement>("#max-year")
      ?.value;
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

    const studyName = document.querySelector<HTMLInputElement>("#study-name")
      ?.value;
    const startDate = document.querySelector<HTMLInputElement>("#start-date")
      ?.value;
    const endDate = document.querySelector<HTMLInputElement>("#end-date")
      ?.value;
    const keyColor = document.querySelector<HTMLInputElement>("#key-color")
      ?.value;
    const description = document.querySelector<HTMLInputElement>(
      "#study-description"
    )?.value;
    const defaultIntervalInt = parseInt(defaultInterval)

    /* Check if inputs have valid values and send request to create the study  */
    if (studyName && startDate && endDate && keyColor && description && defaultIntervalInt) {
      StudyService.create({
        studyName,
        startDate,
        endDate,
        keyColor,
        minAgeDays: minTotalDays,
        maxAgeDays: maxTotalDays,
        description,
        defaultTimeInterval: defaultIntervalInt
      });
    }
    props.windowClose();
  }

  return (
    <div className="">
      <div className="flex justify-end -mb-10">
        <HeadExitButton onClick={props.windowClose} />
      </div>
      <h1 className="mb-4 text-3xl"> Create New Study </h1>
      <form className="max-w-lg">
        <div className="flex mb-2 -mx-3">
          <div className="flex w-5/6">
            <div className="w-full px-1 mb-6 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                {" "}
                Study Name
              </label>
              <input
                id="study-name"
                className="block w-full p-2 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Give a name to your study..."
              />
            </div>
          </div>
          <div className="w-1/6 h-full px-1 mb-6 md:mb-0">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Color
            </label>
            <input
              id="key-color"
              className="block w-full h-10 px-2 py-1 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg appearance-none cursor-pointer select-none focus:outline-none focus:bg-white"
              type="color"
              defaultValue="#ed8936"
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
              className="w-full p-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none resize-y focus:outline-none focus:bg-white focus:border-gray-500"
            ></textarea>
          </div>
        </div>
        {/* <div className="flex flex-wrap mb-2 -mx-3">
          <div className="w-full px-3">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              {" "}
              Consent Form Link
            </label>
            <input
              id="study-name"
              className="block w-full p-2 mx-auto mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="https://teclonline.ca/some_consent_form_to_go_to"
            />
          </div>
        </div> */}
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
          Select Study Time Frame
        </h2>
        <div className="flex flex-wrap mb-2 -mx-3">
          <div className="w-full px-1 md:w-1/3">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Time Interval
            </label>
            <div className="flex align-bottom">
              <input
                className="block w-2/3 px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                defaultValue="30"
                value={defaultInterval}
                onChange={(e) => setDefaultInterval(e.currentTarget.value)}
              />{" "} <p className="mx-2 mt-5 text-xl">min.</p>
            </div>
          </div>
          <div className="w-full px-1 mb-6 md:w-1/3 md:mb-0">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Start Date
            </label>
            <input
              id="start-date"
              className="block w-full px-2 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
              type="date"
            />
          </div>
          <div className="w-full px-1 md:w-1/3">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              End Date
            </label>
            <input
              id="end-date"
              className="block w-full px-2 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
              type="date"
            ></input>
          </div>
        </div>

        <div className="w-32 px-3 mx-auto ">
          <input
            className="px-4 py-2 font-bold text-white bg-gray-800 rounded cursor-pointer hover:text-orange-500"
            type="button"
            value="Submit"
            onClick={() => {
              submitStudy();
            }}
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
        <input
          id={yearId}
          className="block w-full px-2 py-1 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
          min="0"
          defaultValue="0"
          type="number"
        />
        <div className="text-xs">Year(s)</div>
      </div>
      <div>
        <input
          id={monthId}
          className="block w-full px-2 py-1 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
          min="0"
          defaultValue="0"
          type="number"
        />
        <div className="text-xs">Month(s)</div>
      </div>
      <div>
        <input
          id={dayId}
          className="block w-full px-2 py-1 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
          min="0"
          defaultValue="0"
          type="number"
        />
        <div className="text-xs">Day(s)</div>
      </div>
    </div>
  );
}

export default AddStudyForm;
