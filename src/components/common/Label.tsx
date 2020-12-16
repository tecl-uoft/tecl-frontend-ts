import React from "react";

function Label(props: { text: string }) {
  return (
    <label className="block mb-1 text-xs font-bold tracking-wide text-gray-700 uppercase">
      {props.text}
    </label>
  );
}

export default Label;
