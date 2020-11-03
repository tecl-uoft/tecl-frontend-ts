import React from "react";
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
    <section className="container px-10 pt-6 pb-24 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
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
      <div className="container px-6 mx-auto text-gray-800">
        <h2 className="mb-2 text-3xl font-bold">
          Join us for our online studies!
        </h2>
        <h3 className="mb-4 text-xl">
          Help our team investigate social, cognitive, and moral development in
          infants and young children.
        </h3>
       
        {/* <Link to="/signup">
          <button className="px-6 py-3 font-bold tracking-wider text-white bg-orange-500 rounded shadow-lg focus:outline-none hover:bg-orange-700">
            Sign Up
          </button>
        </Link> */}
      </div>
    </div>
  );
}

export default Home;
