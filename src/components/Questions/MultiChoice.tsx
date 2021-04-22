import React, { useEffect, useState } from "react";
import { IQuestionProps } from "./IQuestionProps";

type MultiChoiceProps = IQuestionProps<{ num: number; select: string }> & {
  choices: string[];
};

/**
 *
 *
 * A multiple choice component
 *
 * @param props
 * @param props.choices list of all possible choices
 * @param props.question question to as the responder
 * @param props.responseSetter a setter function to set the answered response
 * @returns
 */
function MultiChoice(props: MultiChoiceProps) {
  const { choices, question, responseSetter } = props;
  const [response, setResponse] = useState<
    { num: number; select: string } | undefined
  >(undefined);
  const [otherOption, setOtherOption] = useState("");

  useEffect(() => {
    if (!response) {
      return;
    }
    responseSetter(response);
  }, [response, responseSetter]);
  return (
    <div>
      <div className="p-4 my-8 mb-2 text-lg text-gray-800 bg-blue-200 rounded-md">
        <p className="flex mb-2 text-2xl "> {question} </p>
        <div className="flex flex-col justify-around space-y-4 bg-blue-200 rounded-lg">
          {choices.map((value, index: number) => {
            if (value.startsWith("@text")) {
              return (
                <div className="w-full space-x-4 font-bold tracking-wider">
                  <label>{value.replace("@text", "")}:</label>
                  <div>
                    <input
                      type="text"
                      key={index}
                      onChange={(e) => {
                        setResponse({
                          num: index + 1,
                          select: e.currentTarget.value,
                        });
                        setOtherOption(e.currentTarget.value);
                      }}
                      placeholder={"Write your other choice here."}
                      value={otherOption}
                      className={`bg-gray-100 hover:shadow-lg hover:bg-gray-200 rounded-lg w-full py-2 px-4 ${
                        value === otherOption
                          ? "bg-orange-400 hover:bg-orange-400"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              );
            }

            return (
              <button
                key={index}
                onClick={() => {
                  setResponse({ num: index + 1, select: value });
                  setOtherOption("");
                }}
                className={` bg-orange-100 hover:shadow-lg hover:bg-orange-200  font-bold rounded-lg focus:outline-none  tracking-wider py-2 uppercase"}
              ${
                value === response?.select
                  ? "bg-orange-400 hover:bg-orange-400"
                  : ""
              }`}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MultiChoice;
