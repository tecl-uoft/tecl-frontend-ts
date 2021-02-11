import { DateTime } from "luxon";
import React, { Dispatch, SetStateAction } from "react";
import DatePicker from "react-date-picker";
import "./input.css";

function Input(props: {
  value: string;
  valueSetter: Dispatch<SetStateAction<string>> | ((value: string) => void);
  type: "number" | "text" | "email" | "date" | "tel";
  placeholder?: string;
  pattern?: string;
  min?: string | number;
  max?: string | number;
}) {
  if (props.type === "date") {
    return (
      <DatePicker
        className={
          "w-full block p-2 mb-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
        }
        clearIcon={null}
        value={
          props.value ? DateTime.fromISO(props.value).toJSDate() : new Date()
        }
        onChange={(e) =>
          props.valueSetter(
            DateTime.fromJSDate(new Date(e.toString())).toFormat("yyyy-MM-dd")
          )
        }
      />
    );
  }

  return (
    <input
      className={
        "w-full block p-2 mb-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
      }
      type={props.type}
      value={props.value}
      onChange={(e) => props.valueSetter(e.target.value)}
      placeholder={props.placeholder}
      min={props.min}
      max={props.max}
    />
  );
}

export default Input;
