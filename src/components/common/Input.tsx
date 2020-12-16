import React, { Dispatch, SetStateAction } from "react";

function Input(props: {
  value: string;
  valueSetter: Dispatch<SetStateAction<string>>;
  type: "number" | "text" | "email" | "date" | "tel";
  placeholder?: string;
  pattern?: string;
}) {
  return (
    <input
      className={
        "w-full block p-2 mb-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-500"
      }
      type={props.type}
      value={props.value}
      onChange={(e) => props.valueSetter(e.target.value)}
      placeholder={props.placeholder}
    />
  );
}

export default Input;
