import React from "react";
import { Link } from "react-router-dom";

interface IStudyInfoBlockProps {
  /* Title of the study */
  studyTitle: string;

  /* Age range of the study */
  ageRange: string;

  /* Long  desription of the study */
  studyDesc: string;

  /* A description of how the study works */
  studyWorkDesc: string | React.ReactNode;

  /* A URI of the actual study */
  studyTrialURI: string;

  /* A URI of the study image preview */
  studyImgURI: string;

  /* Alternitive text for the image */
  studyImgAlt: string;

  onClickPic?: () => void;
}

function StudyEntryBlock(props: IStudyInfoBlockProps) {
  return (
    <div className="container px-2 pt-4 mx-auto">
      <h2 className="text-4xl font-bold text-center text-gray-800">
        Study: {props.studyTitle}
      </h2>
      <h3 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Information
      </h3>
      <div className="flex flex-wrap mb-16 text-gray-800 fair-study">
        <div className="w-full md:w-1/2">
          <p className="mb-8 text-xl text-gray-600">
            <b>Participant Ages: {props.ageRange} </b> <br />
            {props.studyDesc}
          </p>
          <h4 className="mb-3 text-3xl font-bold"> How does it work? </h4>
          <p className="mb-8 text-xl text-gray-600">{props.studyWorkDesc}</p>
        </div>
        <div onClick={props.onClickPic} className="w-full h-full px-2 text-gray-800 bg-white rounded-lg md:w-1/2 hover:bg-gray-100 focus:outline-none hover:text-orange-500">
          <Link className="" to={props.studyTrialURI}>
           
            <img
              className="px-6 pt-2 py-auto"
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
