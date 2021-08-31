import React from "react";
import { Link } from "react-router-dom";
import IStudyEntryBlockProps from "./IStudyEntryBlockProps";

function StudyEntryBlock(props: IStudyEntryBlockProps) {
  return (
    <div className="container px-2 pt-4 mx-auto">
      <h2 className="text-4xl font-bold text-center text-gray-800">
        Study: {props.studyTitle}
      </h2>
      <h3 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Information
      </h3>
      <div className="flex flex-wrap mb-16 text-gray-800 fair-study">
        <div className="w-full  md:w-1/2">
          <p className="mb-8 text-xl text-gray-600">
            <b>Participant Ages: {props.ageRange} </b> <br />
            {props.studyDesc}
          </p>
          <h4 className="mb-3 text-3xl font-bold"> How does it work? </h4>
          <p className="mb-8 text-xl text-gray-600">{props.studyWorkDesc}</p>
        </div>
        <div className="w-full px-2 text-gray-800 bg-white rounded-lg md:w-1/2 hover:bg-gray-100 focus:outline-none hover:text-orange-500">
          <Link to={props.studyTrialURI}>
            <img
              className="px-6 pt-2"
              src={process.env.PUBLIC_URL + props.studyImgURI}
              alt={props.studyImgAlt}
            />
            <button className="w-full px-8 py-4 font-bold tracking-wider uppercase rounded-lg shadow-lg ">
              Start!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudyEntryBlock;
