import React from "react";
import { Link } from "react-router-dom";

function SignupButton() {
  return (
    <Link to="/signup">
      <button
        className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Signup
      </button>
    </Link>
  );
}

export default SignupButton;
