import React, { useState } from "react";
import { AddExtraChildModal } from "../../components/AddExtraChildModal";
import { IRegisterChild } from "../../components/AddSEventModal/AddSEventModal";
import Input from "../../components/common/Input";
import Label from "../../components/common/Label";

function ParticipationSignup() {
  const [firstNameField, setFirstNameField] = useState("");
  const [lastNameField, setLastNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [childFirstNameField, setChildFirstNameField] = useState("");
  const [childLastNameField, setChildLastNameField] = useState("");
  const [childDob, setChildDob] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [canAddInfo, setCanAddInfo] = useState(false);
  const [anotherChildRd, setAnotherChildRd] = useState(false);
  const [showExtraChildModal, setExtraChildShowModal] = useState(false);
  const [registerChildern, setRegisterChildern] = useState<IRegisterChild[]>([
    { firstName: "", lastName: "", dob: "" },
  ]);

  const onCheckAddInfo = () => setCanAddInfo(!canAddInfo);
  const onCheckAnotherChildRd = () => setAnotherChildRd(!anotherChildRd);
  const onAddAttionalChildren = () => setExtraChildShowModal(true);

  return (
    <div className="container px-4 mx-auto my-10 space-y-4 text-md">
      <h1 className="flex justify-center text-xl font-bold md:text-3xl">
        Sign up to participate! <br /> (Ages 1 to 10 years old)
      </h1>
      <p className="mt-8">We’d love to hear from you!</p>
      <p>
        Let us know you’re interested and our researchers will email you back
        shortly to let you know which online studies your child is the perfect
        age for!
      </p>{" "}
      <p className="font-bold">
        {" "}
        Note: If you have signed up in the past, we have your information so
        there is no need to sign up again. We will be in contact with you when
        your child is the right age for our studies!
      </p>
      <form className="flex flex-col py-4 mx-auto space-y-4 md:w-3/4">
        <h2 className="block py-1 mb-2 text-lg font-bold text-center text-gray-700 bg-orange-300 rounded">
          Parent Information
        </h2>

        <div className="flex flex-wrap mb-1 -mx-3">
          <div className="w-full px-3 md:w-1/2 md:mb-0">
            <Label text={"First Name"} />
            <Input
              value={firstNameField}
              valueSetter={setFirstNameField}
              type={"text"}
              placeholder={"Jane"}
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <Label text={"Last Name"} />
            <Input
              valueSetter={setLastNameField}
              value={lastNameField}
              type={"text"}
              placeholder={"Doe"}
            />
          </div>
          <div className="w-full px-3 md:w-7/12">
            <Label text={"Email"} />
            <Input
              valueSetter={setEmailField}
              value={emailField}
              type={"email"}
              placeholder={"bob@joemail.com"}
            />
          </div>
          <div className="w-full px-3 mb-2 md:w-5/12">
            <Label text={"Phone (Optional)"} />
            <Input
              valueSetter={setPhoneNum}
              value={phoneNum}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              type={"tel"}
              placeholder={"647-111-1111"}
            />
          </div>
        </div>
        <h3 className="flex justify-between block px-4 py-1 mb-2 text-lg font-bold text-gray-700 bg-orange-300 rounded">
          <div className="mx-auto my-auto">Child Information</div>
        </h3>
        <div className="mb-2">
          <div className="flex flex-wrap mb-2 -mx-3">
            <div className="w-full px-3 md:w-1/2 md:mb-0">
              <Label text={"First Name"} />
              <Input
                valueSetter={setChildFirstNameField}
                value={childFirstNameField}
                type="text"
              />
            </div>
            <div className="w-full px-3 md:w-1/2">
              <Label text={"Last Name"} />
              <Input
                valueSetter={setChildLastNameField}
                value={childLastNameField}
                type="text"
              />
            </div>

            <div className="w-full px-3">
              <Label text={"Date of Birth"} />
              <Input valueSetter={setChildDob} value={childDob} type="date" />
            </div>

            <div
              className="flex justify-between w-full px-3 mt-2 mb-4 cursor-pointer md:mt-0 md:mb-2"
              onClick={onCheckAddInfo}
            >
              <label className="block text-sm text-left text-gray-700 cursor-pointer select-none">
                I would like to be added to the Child Study Center (CSC)
                Database <br /> so I can hear about more fun online studies for
                my child!
              </label>
              <input
                checked={canAddInfo}
                onChange={onCheckAddInfo}
                className="w-8 h-8 mt-2 cursor-pointer md:w-4 md:h-4"
                type="checkbox"
              />
            </div>
            <div
              className="flex justify-between w-full px-3"
              onClick={onCheckAnotherChildRd}
            >
              <label className="block text-sm text-left text-gray-700 select-none">
                I would like to add siblings to the CSC Database.
              </label>
              <input
                className="h-8 px-2 text-sm font-bold text-white bg-orange-600 rounded cursor-pointer md:h-full md:py-1 hover:bg-orange-700"
                type="button"
                value="Add another child"
                onClick={onAddAttionalChildren}
              />
            </div>
          </div>
        </div>

        <label className="flex text-xs font-bold text-left text-gray-700 select-none ">
          *The Child Study Center (CSC) at the University of Toronto St. George
          campus is a group of research labs devoted to studying various aspects
          of developmental psychology.
        </label>
        <div className="flex justify-center mx-2 mt-2 space-x-4">
          <div className="w-32 px-3">
            <input
              className="px-4 py-2 font-bold text-white bg-gray-800 rounded cursor-pointer hover:text-orange-500"
              type="button"
              value="Submit"
            />
          </div>
        </div>
      </form>
      {showExtraChildModal && (
        <AddExtraChildModal
          registerChildern={registerChildern}
          setRegisterChildern={setRegisterChildern}
          setShowModal={setExtraChildShowModal}
        />
      )}
    </div>
  );
}

export default ParticipationSignup;
