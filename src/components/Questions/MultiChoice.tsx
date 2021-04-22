import React, { useEffect, useState } from "react";
import { IQuestionProps } from "./IQuestionProps";

type MultiChoiceProps = IQuestionProps<{ num: number; select: string }> & {
  choices: string[];
};

/**
 *
 *
 * A Likert scale component
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

  useEffect(() => {
    if (!response) {
      return;
    }
    responseSetter(response);
  }, [response, responseSetter]);
  return (
    <div>
      <div className="px-2 pt-4 my-8 mb-2 text-lg text-gray-800">
        <p className="flex mb-2 text-2xl "> {question} </p>
        <div className="flex flex-col justify-around p-4 space-y-4 bg-blue-200 rounded-lg">
          {choices.map((value, index: number) => {
            if (value.startsWith("@text")) {
              return (
                <div className="w-full space-x-4 font-bold tracking-wider">
                  <label>{value.replace("@text", "")}:</label>
                  <div>
                    <input
                      type="text"
                      key={index}
                      onChange={(e) =>
                        setResponse({
                          num: index + 1,
                          select: e.currentTarget.value,
                        })
                      }
                      value={response?.select || ""}
                      className={`bg-gray-100 hover:shadow-lg hover:bg-gray-200 rounded-lg w-full py-2 px-4 ${
                        value === response?.select
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
                onClick={() => setResponse({ num: index + 1, select: value })}
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
