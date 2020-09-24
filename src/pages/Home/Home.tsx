import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import StudyDesc from "../../components/StudyDesc";
import studyInfo from "./studyInfo.json";

function Home() {
  return (
    <div id="home">
      <HeroBlock />
      <FeatureBlock />
    </div>
  );
}

function FeatureBlock() {
  const currentStudies = studyInfo.currentStudies;
  return (
    <section className="container mx-auto pb-24 px-10 pt-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Current Online Studies
      </h2>
      <div className="flex flex-col sm:flex-row">
        {currentStudies.map((currentStudyDesc, idx) => {
          return (
            <StudyDesc
              key={idx}
              studyTitle={currentStudyDesc.studyTitle}
              studyDesc={currentStudyDesc.studyDesc}
              imgURI={currentStudyDesc.imgURI}
              imgAlt={currentStudyDesc.imgAlt}
              ageRange={currentStudyDesc.ageRange}
              studyInfoURI={currentStudyDesc.studyInfoURI}
            />
          );
        })}
      </div>
    </section>
  );
}

function HeroBlock() {
  return (
    <div id="hero-block" className="py-16">
      <div className="container mx-auto px-6 text-gray-800">
        <h2 className="text-3xl font-bold mb-2">
          Join us for our online studies!
        </h2>
        <h3 className="text-xl mb-4">
          Help our team investigate social, cognitive, and moral development in
          infants and young children.
        </h3>
       
        <Link to="/signup">
          <button className="bg-orange-500 focus:outline-none hover:bg-orange-700 font-bold text-white rounded py-3 px-6 shadow-lg tracking-wider">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
