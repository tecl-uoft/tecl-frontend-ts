import React, { useEffect } from "react";
import { FocusedModal } from "../FocusedModal";

interface IEventInfoModal {
  setShowModal(showModal: boolean): void;
  eventId: string;
}

function EventInfoModal(props: IEventInfoModal) {
  const { setShowModal } = props;
    
  useEffect(() => {
      
      return () => {
          
      }
  }, [])
  return (
    <div>
      <FocusedModal setShowModal={setShowModal}>
        <div className="flex justify-end -mb-4">
          <div
            className="h-6 px-2 text-white bg-red-300 rounded cursor-pointer hover:bg-red-500"
            onClick={() => setShowModal(false)}
          >
            exit
          </div>
        </div>
        <h1 className="flex justify-center mx-2 mb-1 text-xl">
          {" "}
          Join study:{" "}
          <div className="mx-2 text-xl font-bold">
            
          </div>
          lead by:{" "}
          <div className="mx-2 text-xl font-bold"> </div>
        </h1>

        <form className="max-w-lg">
          <h2 className="block mb-2 text-xl text-gray-700">
            {" "}
            Date:
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

          <div className="w-32 px-3 mx-auto mt-2">
            <input
              className="px-4 py-2 font-bold text-white bg-gray-800 rounded cursor-pointer hover:text-orange-500"
              type="button"
              value="Submit"
              
            />
          </div>
        </form>
      </FocusedModal>
    </div>
  );
}

export default EventInfoModal;
