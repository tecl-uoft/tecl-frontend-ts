import React, { useEffect, useState } from 'react'
import {IQuestionProps} from "./IQuestionProps"

type MultiChoiceProps = IQuestionProps<{num: number, select: string}> & {
    choices: string[]
}

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
  const [response, setResponse] = useState<{num: number, select: string} | undefined>(
    undefined
  );

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
        <div className="flex flex-col justify-around space-y-12 bg-orange-100 rounded-full">
          {choices.map((value, index: number) => {
            return (
              <button
                key={index}
                onClick={() => setResponse({num: index + 1, select: value})}
                className={` bg-orange-100 hover:shadow-lg hover:bg-orange-200  font-bold rounded-lg focus:outline-none  tracking-wider w-16 py-2 uppercase"}
              ${value === response?.select ? "bg-orange-400 hover:bg-orange-400" : ""}`}
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

export default MultiChoice
