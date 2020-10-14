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
        <h1 className="mb-4 text-3xl"> Join Study </h1>

        <form className="max-w-lg">
          <div className="flex flex-wrap mb-2 -mx-3">
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Start Date
              </label>
              <input
                id="end-date"
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
                type="date"
              />
            </div>
            <div className="w-full px-3 md:w-1/2">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Start Time
              </label>
              <input
                id="end-time"
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none  focus:outline-none focus:bg-white focus:border-gray-500"
                type="time"
              ></input>
            </div>
          </div>
          <h2 className="block mb-2 text-xl font-bold text-gray-700">
            Parent Information
          </h2>

          <div className="flex flex-wrap mb-2 -mx-3">
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                First Name
              </label>
              <input
                id="start-date"
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
                type="text"
              />
            </div>
            <div className="w-full px-3 md:w-1/2">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Last Name
              </label>
              <input
                id="start-time"
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none  focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
              ></input>
            </div>
            <div className="w-full px-3">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Email
              </label>
              <input
                id="start-time"
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none  focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                value="bob@joe.com"
              ></input>
            </div>
          </div>
          <h2 className="block mb-2 text-xl font-bold text-gray-700">
            Child Information
          </h2>
          <div className="flex flex-wrap mb-2 -mx-3">
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                First Name
              </label>
              <input
                id="start-date"
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
                type="text"
              />
            </div>
            <div className="w-full px-3 md:w-1/2">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Last Name
              </label>
              <input
                min="11:30"
                id="start-time"
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none  focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
              ></input>
            </div>
            <div className="w-full px-3">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Date of birth
              </label>
              <input
                id="start-tim1e"
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none  focus:outline-none focus:bg-white focus:border-gray-500"
                type="date"
              ></input>
            </div>
          </div>

          <div className="w-32 px-3 mx-auto mt-2">
            <input
              className="px-4 py-2 font-bold text-white bg-gray-800 rounded cursor-pointer hover:text-orange-500"
              type="button"
              value="Submit"
              onClick={() => {
                setShowAddSEventModal(false);
              }}
            />
          </div>
        </form>
      </FocusedModal>
    </div>
  );
}

export default AddSEventModal;
