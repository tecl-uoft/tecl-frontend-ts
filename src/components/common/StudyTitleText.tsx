import React from "react";

interface IStudyTitleTextProps {
  text: string;
}

function StudyTitleText(props: IStudyTitleTextProps) {
  return (
    <h3 className="my-4 text-3xl font-bold text-center text-gray-800">
      {props.text}
    </h3>
  );
}

export default StudyTitleText;
