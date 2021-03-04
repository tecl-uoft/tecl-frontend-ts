import React from "react";

function NoStudiesAvailable() {
  return (
    <div className="container flex flex-col px-4 pt-4 mx-auto">
      <h3 className="w-3/4 mx-auto mt-32 text-2xl font-bold text-center ">
        There are no studies availabe for you right now. <br /> Sign up to hear
        when new and fun online studies come out for your child at{" "}
        <a
          className="text-blue-600 no-underline hover:underline"
          href="https://www.tecl.ca/sign-up"
          target="_blank"
          rel="noopener noreferrer"
        >
          tecl.ca/sign-up
        </a>{" "}
        or get back to us later!
      </h3>
    </div>
  );
}

export default NoStudiesAvailable;
