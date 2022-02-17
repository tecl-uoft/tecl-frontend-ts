import React from "react";
import { Link } from "react-router-dom";

function ParticipationSelection() {
  return (
    <div className="flex flex-col py-4">
      <h2 className="mt-6 text-2xl font-bold text-center">
        Select a method to schedule an online study session.
      </h2>
      <div className="flex flex-col justify-center w-full md:flex-row md:px-12">
        <div className="w-full m-2">
          <Link to={"/scheduling?askAge=true"}>
            <div className="p-4 pb-8 border-2 border-gray-500 rounded-lg shadow hover:bg-gray-200 hover:text-orange-500">
              <img
                className="h-64 mx-auto"
                src={
                  process.env.PUBLIC_URL + "/assets/participant_self_signup.svg"
                }
                alt={"participant self signup"}
              />

              <p className="mt-4 text-xl text-center text-gray-600">
                <b>Book a study session by yourself!</b>
              </p>
              <p className="mt-2 text-center text-gray-600 md:h-64">
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
        <div className="w-full m-2 border-2 border-gray-500 rounded-lg">
          <a
            // to="/participation/signup"
            href="https://www.tecl.ca/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 no-underline"
          >
            <div className="p-4 pb-8 rounded-lg shadow hover:bg-gray-200 hover:text-orange-500">
              <img
                className="h-64 mx-auto"
                src={
                  process.env.PUBLIC_URL + "/assets/participant_tecl_signup.svg"
                }
                alt={"participant tecl signup"}
              />

              <p className="mt-4 text-xl text-center text-gray-600">
                <b>Let a staff member book your study session!</b>
              </p>
              <p className="mt-2 text-center text-gray-600 md:h-64">
                In this option, you will be able to allow a staff member to book
                a study session for you. Selecting this box will redirect to a
                form where you can put in minimal information and a staff for
                our lab will be in contact with you through email to help book
                you in.
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ParticipationSelection;
