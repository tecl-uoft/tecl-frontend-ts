import React, { FormEvent } from "react";
import UserService from "../../services/UserService";

function Signup() {
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstName = document.querySelector<HTMLInputElement>("#firstName")
      ?.value;
    const lastName = document.querySelector<HTMLInputElement>("#lastName")
      ?.value;
    const email = document.querySelector<HTMLInputElement>("#email")?.value;
    const password = document.querySelector<HTMLInputElement>("#password")
      ?.value;
    const passwordConfirm = document.querySelector<HTMLInputElement>(
      "#passwordConfirm"
    )?.value;

    if (!firstName || !email || !password) {
      alert("Do not leave the starred (*) values blank");
    } else if (password !== passwordConfirm) {
      alert("Your passwords do not match");
    } else {
      const user = {
        firstName,
        lastName: "",
        email,
        password,
        passwordConfirm
      };
      if (lastName) {
        user.lastName = lastName;
      }
      await UserService.signup(user);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 my-4">
        Account Sign Up
      </h2>
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded px-8 py-6"
      >
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name *
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              id="firstName"
              placeholder="Jane"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              id="lastName"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 my-2">
          <div className="w-full px-3">
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email *
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              placeholder="test@test.ca"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
              Password *
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="password"
              id="password"
              placeholder="****************"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
              Confirm Password *
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              id="passwordConfirm"
              placeholder="****************"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <input
            className="w-full cursor-pointer bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
}

export default Signup;
