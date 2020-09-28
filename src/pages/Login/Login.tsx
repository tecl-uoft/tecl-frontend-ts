import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const history = useHistory();
  const auth = useAuth();
  const handleLogin = async () => {
    const email = document.querySelector<HTMLInputElement>("#email")?.value;
    const password = document.querySelector<HTMLInputElement>("#password")
      ?.value;
    if (!email || !password) {
      alert("You have not entered your username or password");
    } else {
      const user = {
        email,
        password,
      };
      try {
        const acceptedUser = auth?.login(user);
        console.log(acceptedUser)
        history.push("/");
      } catch (err) {
        console.log(err)
      }
      
    }
  };
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
            className="bg-gray-800 hover:text-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
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
      <Link to="/signup">
        <button
          className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Signup
        </button>
      </Link>
    </div>
  );
}

export default Login;
