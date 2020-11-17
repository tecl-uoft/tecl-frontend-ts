import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const history = useHistory();
  const auth = useAuth();
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const user = {
      email: emailInput,
      password: passwordInput,
    };
    if (auth) {
      auth.login(user).then(() => {
        history.push("/");
      });
    }
  };
  return (
    <div className="w-full max-w-md px-4 pt-16 mx-auto">
      <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Email
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.currentTarget.value)}
            type="email"
            placeholder="jane.doe@teclmail.com"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.currentTarget.value)}
            placeholder="****************"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 font-bold text-white bg-gray-800 rounded hover:text-orange-500 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <button className="inline-block text-sm font-bold text-blue-500 align-baseline cursor-pointer hover:text-blue-800">
            <Link to="/forgot-password">Forgot Password?</Link>
          </button>
        </div>
      </form>

      <label className="block mb-2 text-sm font-bold text-gray-700">
        Don't have an account?
      </label>
      <Link to="/signup">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-700 focus:outline-none focus:shadow-outline"
          type="button"
        >
          Signup
        </button>
      </Link>

      <label className="block mb-2 text-sm font-bold text-gray-700">
        Please read our privacy policy{" "}
        <Link className="text-blue-600 underline" to="/privacy-policy">
          here
        </Link>
      </label>
    </div>
  );
}

export default Login;
