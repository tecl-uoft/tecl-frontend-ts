import React from "react";
import { FocusedModal } from "../FocusedModal";

interface IAddSEventModalProps {
  setShowAddSEventModal(showModal: boolean): void;
}

function AddSEventModal(props: IAddSEventModalProps) {
  const { setShowAddSEventModal } = props;
  return (
    <div>
      <FocusedModal setShowModal={setShowAddSEventModal}>
        <h1 className="text-3xl mb-4"> Join Study </h1>

        <form className="max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Start Date
              </label>
              <input
                id="end-date"
                className="appearance-none block select-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="date"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Start Time
              </label>
              <input
                id="end-time"
                className=" appearance-none block select-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="time"
              ></input>
            </div>
          </div>
          <h2 className="block text-gray-700 text-xl font-bold mb-2">
            Parent Information
          </h2>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                First Name
              </label>
              <input
                id="start-date"
                className="appearance-none block select-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Last Name
              </label>
              <input
                id="start-time"
                className=" appearance-none block select-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
              ></input>
            </div>
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <input
                id="start-time"
                className=" appearance-none block select-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                value="bob@joe.com"
              ></input>
            </div>
          </div>
          <h2 className="block text-gray-700 text-xl font-bold mb-2">
            Child Information
          </h2>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                First Name
              </label>
              <input
                id="start-date"
                className="appearance-none block select-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Last Name
              </label>
              <input
                min="11:30"
                id="start-time"
                className=" appearance-none block select-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
              ></input>
            </div>
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date of birth
              </label>
              <input
                id="start-tim1e"
                className=" appearance-none block select-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="date"
              ></input>
            </div>
          </div>

          <div className="w-32 mx-auto px-3 mt-2">
            <input
              className="bg-gray-800 cursor-pointer hover:text-orange-500 text-white font-bold py-2 px-4 rounded"
              type="button"
              value="Submit"
              onClick={() => {}}
            />
          </div>
        </form>
      </FocusedModal>
    </div>
  );
}

export default AddSEventModal;
