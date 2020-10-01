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
      <h1 className="text-3xl mb-4"> Add Study </h1>
      <form className="max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              {" "}
              Study Name
            </label>
            <input
              id="study-name"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Give a name to your study..."
            />
          </div>
        </div>
        <h2 className="block text-gray-700 text-xl font-bold mb-2">
          Select Availbility
        </h2>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Start Date
            </label>
            <input
              id="start-date"
              className="appearance-none block select-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="date"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              End Date
            </label>
            <input
              id="end-date"
              className=" appearance-none block select-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="date"
            ></input>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Key Color
            </label>
            <input
              id="key-color"
              className="appearance-none block select-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded mb-3 leading-tight focus:outline-none focus:bg-white"
              type="color"
              defaultValue="#ed8936"
            />
          </div>
        </div>
        <div className="w-32 mx-auto px-3">
          <input
            className="bg-gray-800 cursor-pointer hover:text-orange-500 text-white font-bold py-2 px-4 rounded"
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
