import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import StudyDesc from "../../components/StudyDesc";

function Home() {
  return (
    <div id="home">
      <HeroBlock />
      <FeatureBlock />
    </div>
  );
}

function FeatureBlock() {
  return (
    <section className="container mx-auto pb-24 px-10 pt-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Current Online Studies
      </h2>
      <div className="flex flex-col sm:flex-row">
        <StudyDesc
          studyTitle="Teams"
          studyDesc="We’re interested in how kids understand social exclusion, and how 
        belonging to social groups changes how they reason about when exclusion 
        is or isn't okay."
          imgURI="/assets/fair_study.svg"
          imgAlt="fairness study"
          ageRange="4 to 7 years old"
          studyInfoURI="/study/fairness"
        />
        <StudyDesc
          studyTitle="Frogger"
          studyDesc="This study investigates how social context affects children’s 
        attempts to solve a puzzle, as well as how these attempts may differ 
        from adults."
          imgURI="/assets/frogger_study.svg"
          imgAlt="frogger study"
          ageRange="7 to 10 years old"
          studyInfoURI="/study/frogger"
        />
        <StudyDesc
          studyTitle="Eye tracking"
          studyDesc="This study tracks the eyes and which area of the screen they are looking at."
          imgURI="/assets/eye_tracking_study.svg"
          imgAlt="eye tracking study"
          ageRange="0 to 2 years old"
          studyInfoURI="/study/eyetracking"
        />
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
          <button className="bg-white focus:outline-none hover:bg-orange-400 font-bold text-gray-800 rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
            Sign Up!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
