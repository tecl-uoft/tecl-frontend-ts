import React from "react";
import { Link } from "react-router-dom";
import IStudyDescProps from "./IStudyDescProps";

function StudyDesc(props: IStudyDescProps) {
  return (
    <div className="sm:w-1/3 w-full m-2">
      <Link to={props.studyInfoURI}>
        <div className="p-4 pb-8 hover:bg-gray-200 hover:text-orange-500 rounded-lg shadow">
          <h4 className="text-2xl font-bold mb-3 text-center">
            {props.studyTitle}
          </h4>

          <img
            className="h-64 mx-auto"
            src={process.env.PUBLIC_URL + props.imgURI}
            alt={props.imgAlt}
          />

          <p className="text-gray-600 text-md text-center mt-4">
            <b>Participant Ages: {props.ageRange}</b>
          </p>
          <p className="text-gray-600 mt-2 h-24 text-center">
            {props.studyDesc}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default StudyDesc;
