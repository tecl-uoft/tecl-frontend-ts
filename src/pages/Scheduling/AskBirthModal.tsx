import { DateTime } from "luxon";
import React, { useState, useEffect } from "react";
import Input from "../../components/common/Input";
import { FocusedModal } from "../../components/FocusedModal";

interface IAskBirthModalProps {
  setShowModal(showModal: boolean): void;
  setGivenAge(givenAge: number | undefined): void;
}

function AskBirthModal(props: IAskBirthModalProps) {
  const { setShowModal, setGivenAge } = props;
  const [birthDay, setBirthDay] = useState<string>("");

  useEffect(() => {
    setBirthDay(DateTime.local().toFormat("yyyy-MM-dd"));
  }, []);

  const onSubmitFunc = () => {
    setShowModal(false);
    const givenDate = DateTime.fromJSDate(new Date(birthDay));
    const currDate = DateTime.local();
    setGivenAge(Math.round(currDate.diff(givenDate, "days").days));
  };

  return (
    <div>
      <FocusedModal setShowModal={setShowModal}>
        <h1 className="mb-4 text-3xl">
          {" "}
          Enter the date of birth of your Child.{" "}
        </h1>
        <form className="max-w-lg">
          <div className="flex flex-wrap mb-2 -mx-3">
            <div className="w-full px-3">
              <label className="block mb-2 font-bold tracking-wide text-gray-700 text-md">
                {" "}
                This will help check which studies they are eligbile for.
              </label>
              <Input value={birthDay} valueSetter={setBirthDay} type="date" />
            </div>
          </div>
          <div>
            <input
              className="w-32 px-4 py-2 font-bold text-white bg-gray-800 rounded cursor-pointer hover:text-orange-500"
              type="button"
              value="Submit"
              onClick={onSubmitFunc}
            />
          </div>
        </form>
      </FocusedModal>
    </div>
  );
}

export default AskBirthModal;
