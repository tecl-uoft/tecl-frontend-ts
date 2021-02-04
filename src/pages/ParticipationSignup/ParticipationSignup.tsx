import React from "react";
import { Link } from "react-router-dom";

function ParticipationSignup() {
  return (
    <div className="flex flex-col py-4">
      <h2 className="text-2xl font-bold text-center mt-6">
        Select a method to schedule an online study session.
      </h2>
      <div className="flex flex-col md:flex-row w-full justify-center md:px-12 ">
        <div className="w-full m-2">
          <Link to={"/scheduling?askAge=true"}>
            <div className="p-4 pb-8 hover:bg-gray-200 hover:text-orange-500 rounded-lg shadow">
              <img
                className="h-64 mx-auto"
                src={
                  process.env.PUBLIC_URL + "/assets/participant_self_signup.svg"
                }
                alt={"participant self signup"}
              />

              <p className="text-gray-600 text-xl text-center mt-4">
                <b>Book a study session by youself!</b>
              </p>
              <p className="text-gray-600 mt-2 md:h-64 text-center">
                In this option, you will be able to select a study based on your
                child's age and choose a time slot where both you and one of our
                staff members are free to video chat online. Selecting on this
                box will redirect you to teclonline.ca/scheduling?askAge=true
                where you will enter your child's age, select a time slot from
                the given studies, and enter the relevant information.
              </p>
            </div>
          </Link>
        </div>
        <div className="w-full m-2">
          <a
            href="https://tecl.ca/sign-up"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-4 pb-8 hover:bg-gray-200 hover:text-orange-500 rounded-lg shadow">
              <img
                className="h-64 mx-auto"
                src={
                  process.env.PUBLIC_URL + "/assets/participant_tecl_signup.svg"
                }
                alt={"participant tecl signup"}
              />

              <p className="text-gray-600 text-xl text-center mt-4">
                <b>Let a staff member book your study session!</b>
              </p>
              <p className="text-gray-600 mt-2 md:h-64 text-center">
                In this option, you will be able to allow a staff member to book
                a study session for you. Selecting this box will redirect you to
                tecl.ca/sign-up where you can put in minimal information and a
                staff for our lab will be in contact with you through email to
                help book you in.
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ParticipationSignup;
