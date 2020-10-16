import { EventApi } from "@fullcalendar/react";
import React, { MouseEvent, useState } from "react";
import { FocusedModal } from "../FocusedModal";

interface IAddSEventModalProps {
  setShowAddSEventModal(showModal: boolean): void;
  eventClick: EventApi | undefined;
}

function AddSEventModal(props: IAddSEventModalProps) {
  const [showAddChild, setshowAddChild] = useState(1);
  const [childrenInputs, setChildrenInputs] = useState<Object[]>([]);
  const { setShowAddSEventModal, eventClick } = props;

  function submitJoinStudy(e: MouseEvent<HTMLInputElement>) {
    setShowAddSEventModal(false);
    eventClick?.remove();
  }

  const removeChild = (idx: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(childrenInputs.splice(idx, 1));
    setChildrenInputs(childrenInputs.splice(idx, 1));
  };

  return (
    <div>
      <FocusedModal setShowModal={setShowAddSEventModal}>
        <h1 className="mb-2 text-3xl"> Join Study, < br /> Lead by: {eventClick?.title} </h1>
        
        <form className="max-w-lg">
          <h2 className="block mb-2 text-xl text-gray-700">
            {" "}
            {eventClick?.start?.toLocaleString() +
              " - " +
              eventClick?.end?.toLocaleTimeString()}
          </h2>

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
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
              ></input>
            </div>
            <div className="w-full px-3">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Email
              </label>
              <input
                id="start-time"
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                placeholder="bob@joe.com"
              ></input>
            </div>
          </div>
          <h2 className="block mb-2 text-xl font-bold text-gray-700">
            Child Information
          </h2>
          <div key={childrenInputs.length}>
            {childrenInputs &&
              [...Array(showAddChild).keys()].map((obj, idx) => {
                return (
                  <div key={idx} className="mb-4">
                    <h3 className="flex justify-between block px-4 mb-2 text-lg font-bold text-gray-700 bg-orange-300 rounded">
                      <div className="my-auto">Child {idx + 1}</div>
                      <button
                        onClick={removeChild(idx)}
                        className="px-2 py-1 m-1 text-sm font-semibold bg-red-200 rounded"
                      >
                        - Remove
                      </button>
                    </h3>
                    <div className="flex flex-wrap mb-2 -mx-3">
                      <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                        <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                          First Name
                        </label>
                        <input
                          className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white"
                          type="text"
                        />
                      </div>
                      <div className="w-full px-3 md:w-1/2">
                        <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                          Last Name
                        </label>
                        <input
                          className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                        ></input>
                      </div>
                      <div className="w-full px-3">
                        <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                          Date of birth
                        </label>
                        <input
                          className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
                          type="date"
                        ></input>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              const oldchildrenInputs = childrenInputs;
              oldchildrenInputs.push({});
              setChildrenInputs(oldchildrenInputs);
              setshowAddChild(showAddChild + 1);
              console.log(childrenInputs);
            }}
            className="flex justify-between w-full px-4 py-1 bg-orange-200 rounded hover:bg-orange-300 text-md unselect"
          >
            <div>+</div>
            {showAddChild > 0
              ? "Add Another Child's Information"
              : "Add Child Information"}
          </button>
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
