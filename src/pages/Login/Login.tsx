import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="mx-auto pt-16 w-full max-w-md px-4">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="****************"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
          <button className="inline-block cursor-pointer align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            <Link to="/forgot-password">Forgot Password?</Link>
          </button>
        </div>
      </form>

      <label className="block text-gray-700 text-sm font-bold mb-2">
        Don't have an account?
      </label>
      <button
        className="w-full bg-gray-800 hover:text-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Signup
      </button>
    </div>
  );
}

export default Login;