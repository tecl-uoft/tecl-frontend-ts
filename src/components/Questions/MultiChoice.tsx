import React, { useEffect, useState } from "react";
import Input from "../common/Input";
import { IQuestionProps } from "./IQuestionProps";
import Slider from "./Slider";

type MultiChoiceProps = IQuestionProps<{ num: number; select: string }> & {
  choices: string[];
  selectMultiple?: boolean;
  responseSetter: (res: any) => void;
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
  const { choices, question, responseSetter, selectMultiple } = props;
  const [response, setResponse] = useState<{ num: number; select: string }[]>(
    []
  );
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedCustomItems, setCustomSelectedItems] = useState<{
    [key: number]: string;
  }>({});

  const [otherOption, setOtherOption] = useState("");

  // set default indicies to 0
  useEffect(() => {
    choices.forEach((key, idx) => {
      setSelectedItems((m) => {
        m[idx] = false;
        return m;
      });
    });
  }, [choices]);

  const onTextChange = (index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!selectMultiple) {
      let obj = { ...selectedItems };
      choices.forEach((key, idx) => {
        obj[idx] = false;
      });
      setSelectedItems(obj);
      responseSetter({ selectedItems: obj, otherOption, selectedCustomItems });
    } else {
      let obj = { ...selectedCustomItems };
      obj[index] = e.currentTarget.value;
      onChoiceChange(index);
      setCustomSelectedItems(obj);
      responseSetter({ date: obj, otherOption, selectedCustomItems, selectedItems });
    }

    setOtherOption(e.currentTarget.value);
    responseSetter({ otherOption: e.currentTarget.value, selectedItems, selectedCustomItems });
  };

  const onChoiceChange = (index: number) => () => {
    let obj = { ...selectedItems };
    obj[index] = !selectedItems[index];
    if (!selectMultiple) {
      choices.forEach((key, idx) => {
        obj[idx] = idx === index;
      });
      setOtherOption("");
    }
    responseSetter({ selectedItems: obj, otherOption, selectedCustomItems });
    setSelectedItems(obj);
  };

  const onCustomChange = (res: string) => {
    //console.log(res)
  };

  const onSliderChange = (index: number) => (res: string) => {
    let obj = { ...selectedCustomItems };
    obj[index] = res;
    onChoiceChange(index);
    setCustomSelectedItems(obj);
  };

  return (
    <div>
      <div className="p-4 my-4 mb-2 text-gray-800 rounded-md text-md ">
        <p className="flex mb-2 text-lg font-bold"> {question} </p>
        <div className="flex flex-col justify-around space-y-4 rounded-lg">
          {choices.map((value, index: number) => {
            if (value.startsWith("@text")) {
              return (
                <div
                  key={index}
                  className="w-full space-x-4 font-bold tracking-wider align-middle"
                >
                  <label className="inline-block align-middle">
                    {value.replace("@text", "")}:
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      key={index}
                      onChange={onTextChange(index)}
                      placeholder={"Write your choice for this option here."}
                      value={otherOption}
                      className={`bg-gray-100 hover:shadow-lg hover:bg-gray-200 rounded-lg w-full py-2 px-4 ${
                        "" !== otherOption
                          ? "bg-orange-300 hover:bg-orange-300 font-bold tracking-wider"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              );
            } else if (value.startsWith("@slider")) {
              return (
                <Slider
                  key={index}
                  question={value.replace("@slider", "")}
                  responseSetter={onCustomChange}
                />
              );
            } else if (value.includes("@date")) {
              return (
                <Input
                  key={index}
                  type="date"
                  value={selectedCustomItems[index]}
                  valueSetter={onSliderChange(index)}
                />
              );
            }

            return (
              <button
                key={index}
                onClick={onChoiceChange(index)}
                className={` bg-orange-100 hover:shadow-lg hover:bg-orange-200  font-bold rounded-lg  tracking-wider py-2 
              ${
                selectedItems[index] ? "bg-orange-300 hover:bg-orange-300" : ""
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
