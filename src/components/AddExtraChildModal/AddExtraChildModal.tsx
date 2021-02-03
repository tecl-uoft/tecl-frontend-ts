import React from "react";
import Input from "../common/Input";
import Label from "../common/Label";
import { FocusedModal } from "../FocusedModal";
import { IRegisterChild } from "../AddSEventModal/AddSEventModal";

function AddExtraChildModal({
  setShowModal,
  registerChildern,
  setRegisterChildern,
}: {
  setShowModal: (showModal: boolean) => void;
  registerChildern: IRegisterChild[];
  setRegisterChildern: React.Dispatch<React.SetStateAction<IRegisterChild[]>>;
}) {
  const setFirstName = (idx: number) => (fName: string) => {
    const prevRegisterChildren = [...registerChildern];
    prevRegisterChildren[idx].firstName = fName;
    setRegisterChildern(prevRegisterChildren);
  };

  const setLastName = (idx: number) => (lName: string) => {
    const prevRegisterChildren = [...registerChildern];
    prevRegisterChildren[idx].lastName = lName;
    setRegisterChildern(prevRegisterChildren);
  };

  const setDob = (idx: number) => (dob: string) => {
    const prevRegisterChildren = [...registerChildern];
    prevRegisterChildren[idx].dob = dob;
    setRegisterChildern(prevRegisterChildren);
  };

  const addChild = () => {
    setRegisterChildern([
      ...registerChildern,
      { firstName: "", lastName: "", dob: "" },
    ]);
  };

  const removeChild = (idx: number) => () => {
    const prevRegisterChildren = [...registerChildern];
    prevRegisterChildren.splice(idx, 1);
    setRegisterChildern([...prevRegisterChildren]);
  };

  const onFinish = () => {
    setShowModal(false);
  };
  const onExit = () => setShowModal(false)

  return (
    <FocusedModal setShowModal={setShowModal}>
      <div className="flex justify-end">
        <div
          className="h-8 px-4 py-1 -mt-2 -mr-2 text-white bg-red-300 rounded cursor-pointer hover:bg-red-500"
          onClick={onExit}
        >
          Exit
        </div>
      </div>
      <form className="max-w-lg">
        <h2 className="block mb-4 text-lg font-bold text-gray-700">
          Additional children to add to the CSC Database.
        </h2>
        {registerChildern.map((child, idx) => {
          return (
            <div key={idx} className="mb-2">
              <h3 className="flex justify-between block py-1 pl-4 my-2 text-lg font-bold text-gray-700 bg-orange-300 rounded">
                <div className="mx-auto my-auto">
                  Information for Additional Child #{idx + 1}{" "}
                </div>
                {idx >= 1 && (
                  <input
                    className="px-2 py-1 mr-1 text-sm font-bold text-white bg-red-600 rounded cursor-pointer hover:bg-red-700"
                    type="button"
                    value="Remove"
                    onClick={removeChild(idx)}
                  />
                )}
              </h3>
              <div className="mb-2">
                <div className="flex flex-wrap mb-2 -mx-3">
                  <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <Label text={"First Name"} />
                    <Input
                      valueSetter={setFirstName(idx)}
                      value={child.firstName}
                      type="text"
                    />
                  </div>
                  <div className="w-full px-3 md:w-1/2">
                    <Label text={"Last Name"} />
                    <Input
                      valueSetter={setLastName(idx)}
                      value={child.lastName}
                      type="text"
                    />
                  </div>
                  <div className="w-full px-3">
                    <Label text={"Date of Birth"} />
                    <Input
                      valueSetter={setDob(idx)}
                      value={child.dob}
                      type="date"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-end w-full -mt-2">
          <input
            className="px-2 py-1 text-sm font-bold text-white bg-orange-600 rounded cursor-pointer hover:bg-orange-700"
            type="button"
            value="Add Another Child"
            onClick={addChild}
          />
        </div>
        <div className="w-32 px-3 mx-auto mt-2">
          <input
            onClick={onFinish}
            className="px-4 py-2 font-bold text-white bg-gray-800 rounded cursor-pointer hover:text-orange-500"
            type="button"
            value="Finish"
          />
        </div>
      </form>
    </FocusedModal>
  );
}

export default AddExtraChildModal;
