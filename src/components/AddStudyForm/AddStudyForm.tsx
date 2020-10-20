import React from "react";

interface IAddStudyFormProps {
  addStudySubmitFunc(): void;
  studyCreateFunc: ((study: any) => void) | undefined;
}

function AddStudyForm(props: IAddStudyFormProps) {
  function submitStudy() {
    const studyName = document.querySelector<HTMLInputElement>("#study-name")
      ?.value;
    const startDate = document.querySelector<HTMLInputElement>("#start-date")
      ?.value;
    const endDate = document.querySelector<HTMLInputElement>("#end-date")
      ?.value;
    const keyColor = document.querySelector<HTMLInputElement>("#key-color")
      ?.value;
    if (
      studyName &&
      startDate &&
      endDate &&
      keyColor &&
      props.studyCreateFunc
    ) {
      props.studyCreateFunc({ studyName, startDate, endDate, keyColor });
    }
  }

  return (
    <div>
      <h1 className="mb-4 text-3xl"> Add Study </h1>
      <form className="max-w-lg">
        <div className="flex flex-wrap mb-2 -mx-3">
          <div className="w-full px-3">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              {" "}
              Study Name
            </label>
            <input
              id="study-name"
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Give a name to your study..."
            />
          </div>
        </div>
        <h2 className="block mb-2 text-xl font-bold text-gray-700">
          Age Range
        </h2>
        <div className="flex flex-wrap mb-2 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Min. Birth Date
            </label>
            <input
              id="min-birth-date"
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
              type="date"
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Max. Birth Date
            </label>
            <input
              id="end-date"
              className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
              type="date"
            ></input>
          </div>
        </div>
        <h2 className="block mb-2 text-xl font-bold text-gray-700">
          Select Study Time Frame
        </h2>
        <div className="flex flex-wrap mb-2 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Start Date
            </label>
            <input
              id="start-date"
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
              type="date"
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              End Date
            </label>
            <input
              id="end-date"
              className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
              type="date"
            ></input>
          </div>
        </div>
        <div className="flex flex-wrap mb-2 -mx-3">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Key Color
            </label>
            <input
              id="key-color"
              className="block w-full mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
              type="color"
              defaultValue="#ed8936"
            />
          </div>
        </div>
        <div className="w-32 px-3 mx-auto">
          <input
            className="px-4 py-2 font-bold text-white bg-gray-800 rounded cursor-pointer hover:text-orange-500"
            type="button"
            value="Submit"
            onClick={() => {
              props.addStudySubmitFunc();
              submitStudy();
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default AddStudyForm;
