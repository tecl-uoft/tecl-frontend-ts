import React from "react";
import { Link } from "react-router-dom";
import IStudyEntryBlockProps from "./IStudyEntryBlockProps";

function StudyEntryBlock(props: IStudyEntryBlockProps) {
  return (
    <div className="container mx-auto px-2 pt-4">
      <h2 className="text-4xl font-bold text-center text-gray-800">
        Study: {props.studyTitle}
      </h2>
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Information
      </h3>
      <div className="fair-study text-gray-800 flex flex-wrap mb-16">
        <div className=" w-full md:w-1/2">
          <p className="text-gray-600 mb-8 text-xl">
            <b>Participant Ages: {props.ageRange} </b> <br />
            {props.studyDesc}
          </p>
          <h4 className="text-3xl font-bold mb-3"> How does it work? </h4>
          <p className="text-gray-600 mb-8 text-xl">{props.studyWorkDesc}</p>
        </div>
        <div className="w-full md:w-1/2 bg-white rounded-lg hover:bg-gray-100 focus:outline-none text-gray-800 hover:text-orange-500">
          <Link to={props.studyTrialURI}>
            <img
              className="px-6 pt-2"
              src={process.env.PUBLIC_URL + props.studyImgURI}
              alt={props.studyImgAlt}
            />
            <button className=" w-full font-bold rounded-lg py-4 px-8 shadow-lg uppercase tracking-wider">
              Start!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudyEntryBlock;
