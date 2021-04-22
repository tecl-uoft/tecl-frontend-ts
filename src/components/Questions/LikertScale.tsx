import React, { useEffect, useState } from "react";

/**
 *
 * A Likert scale component
 *
 * @param props scale number or string array
 * @param question question to as the responder
 * @param responseSetter a setter function to set the answered response
 * @returns
 */
interface ILikertScaleProps {
  scale: number[] | string[];
  question: string;
  responseSetter: (response: number | string) => void;
}

/**
 *
 * A Likert scale component
 *
 * @param props
 * @param props.scale number or string array
 * @param props.question question to as the responder
 * @param props.responseSetter a setter function to set the answered response
 * @returns
 */
function LikertScale(props: ILikertScaleProps) {
  const { scale, question, responseSetter } = props;
  const [response, setResponse] = useState<string | number | undefined>(
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
      <div className="px-2 my-4 text-lg text-gray-800">
        <p className="flex mb-2 text-lg font-bold "> {question} </p>
        <div className="flex justify-around space-x-12 bg-orange-100 rounded-full">
          {(scale as number[]).map((value, index: number) => {
            return (
              <button
                key={index}
                onClick={() => setResponse(value)}
                className={` bg-orange-100 hover:shadow-lg hover:bg-orange-200  font-bold rounded-lg focus:outline-none  tracking-wider w-16 py-2 uppercase"}
              ${value === response ? "bg-orange-400 hover:bg-orange-400" : ""}`}
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

export default LikertScale;
