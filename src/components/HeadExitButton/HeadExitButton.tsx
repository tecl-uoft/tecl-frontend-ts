import React from "react";

function HeadExitButton(props: {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <button
      onClick={props.onClick}
      className="px-4 py-1 text-white bg-red-500 rounded text-md hover:bg-red-700"
    >
      Exit
    </button>
  );
}

export default HeadExitButton;
