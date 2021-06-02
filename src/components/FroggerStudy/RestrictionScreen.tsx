import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FroggerStudyService from "../../services/FroggerStudyService";
import Input from "../common/Input";
import { notify } from "../Notification";

function RestrictionScreen() {
  const [select, setSelected] = useState<"adult" | "child" | undefined>(
    undefined
  );
  const hist = useHistory();
  const [email, setEmail] = useState("");
  const submitEmail = () => {
    if (select && email) {
      FroggerStudyService.email({ email, type: select })
        .then(() => {
          notify.success("Email is sent!");
          hist.push("/study/frogger/information");
        })
        .catch((err) => {notify.error(err.message) });
    }
  };
  const selectAdult = () => setSelected("adult");
  const selectChild = () => setSelected("child");
  return (
    <div className="flex flex-col py-4">
      <h2 className="mt-6 text-2xl font-bold text-center">
        Please select your age group.
      </h2>
      <div className="flex flex-col justify-center w-full md:flex-row md:px-12">
        <div onClick={selectAdult} className="w-full m-2">
          <div
            className={`p-4 pb-8 rounded-lg shadow border-gray-500 border-2 cursor-pointer ${
              select === "adult"
                ? "bg-blue-100"
                : "hover:bg-gray-200 hover:text-orange-500"
            }`}
          >
            <img
              className="h-64 mx-auto"
              src={
                process.env.PUBLIC_URL + "/assets/frogger/parent.svg"
              }
              alt={"adult"}
            />

            <p className="mt-4 text-xl text-center text-gray-600">
              <b>Adult</b>
            </p>
            <p className="h-12 mt-2 text-center text-gray-600">
              Select this if you are over the age of 18 and can provide consent
              yourself.
            </p>
          </div>
        </div>
        <div
          onClick={selectChild}
          className="w-full m-2 border-2 border-gray-500 rounded-lg cursor-pointer"
        >
          <div
            className={`p-4 pb-8 rounded-lg shadow ${
              select === "child"
                ? "bg-blue-100"
                : "hover:bg-gray-200 hover:text-orange-500"
            }`}
          >
            <img
              className="h-64 mx-auto"
              src={
                process.env.PUBLIC_URL + "/assets/frogger/child.svg"
              }
              alt={"child"}
            />

            <p className="mt-4 text-xl text-center text-gray-600">
              <b>Child</b>
            </p>
            <p className="h-12 mt-2 text-center text-gray-600">
              Select this if you are 7 to 10 years old and have a parent or
              guardian over the age 18 present with you.
            </p>
          </div>
        </div>
      </div>
      {select && (
        <div className="flex justify-center m-12">
          <label className="text-xl font-bold">
            {select === "child" && "Parent/Guardian "} Email Address:
          </label>
          <div className="w-2/4 mx-6">
            <Input
              value={email}
              valueSetter={setEmail}
              placeholder={"joe@joemail.com"}
              type={"email"}
            />
          </div>
        </div>
      )}
      {email && (
        <>
          <label className="mb-2 text-lg text-center">
            <b>Note:</b> After submitting, you will receive a link for the study
            from this email address: tecl.psychology@utoronto.ca.
          </label>
          <button
            onClick={submitEmail}
            className="w-1/2 py-4 mx-auto text-lg font-bold text-center bg-orange-200 rounded-full cursor-pointer hover:bg-orange-300"
          >
            {" "}
            Submit Email
          </button>
        </>
      )}
    </div>
  );
}

export default RestrictionScreen;
