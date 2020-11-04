import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const history = useHistory();
  const authCtx = useAuth();

  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState<string>("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstNameInput || !emailInput || !passwordInput) {
      alert("Do not leave the starred (*) values blank");
    } else if (passwordInput !== passwordConfirmInput) {
      alert("Your password and password confirmation do not match");
    } else if (passwordInput.length < 6) {
      alert("Please put atleast 6 characters in your password");
    } else {
      const user = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        password: passwordInput,
        passwordConfirm: passwordConfirmInput,
      };

      if (authCtx) {
        authCtx.register(user).then((res) => {
          history.push("/login");
        });
      }

      /*  UserService.signup(user).then(() => {
        console.log("onsignup");
        if (history) {
          alert("Signup is successful!");
          history.push("/login");
        }
      }).catch(err => {
        alert(err)
      }); */
    }
  };

  return (
    <div className="w-full max-w-4xl px-4 mx-auto">
      <h2 className="my-4 text-4xl font-bold text-center text-gray-800">
        Account Sign Up
      </h2>
      <form
        onSubmit={handleRegister}
        className="px-8 py-6 bg-white rounded shadow-md"
      >
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700">
              First Name *
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
              type="text"
              value={firstNameInput}
              onChange={(e) => {
                setFirstNameInput(e.currentTarget.value);
              }}
              id="firstName"
              placeholder="Jane"
            />
          </div>
          <div className="px-3 w-fulnl md:w-1/2">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700">
              Last Name
            </label>
            <input
              className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              value={lastNameInput}
              onChange={(e) => {
                setLastNameInput(e.currentTarget.value);
              }}
              id="lastName"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="flex flex-wrap my-2 -mx-3">
          <div className="w-full px-3">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700">
              Email *
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.currentTarget.value);
              }}
              id="email"
              type="email"
              placeholder="test@test.ca"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700">
              Password *
            </label>
            <input
              className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.currentTarget.value);
              }}
              type="password"
              id="password"
              placeholder="****************"
            />
            <p className="block text-xs font-bold tracking-wide text-gray-700">
              Must be more than 6 characters
            </p>
            <p className="block mb-2 text-xs font-bold tracking-wide text-gray-700">
              Currently: {passwordInput.length}
            </p>
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700">
              Confirm Password *
            </label>
            <input
              className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              value={passwordConfirmInput}
              onChange={(e) => {
                setPasswordConfirmInput(e.currentTarget.value);
              }}
              type="password"
              id="passwordConfirm"
              placeholder="****************"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <input
            className="w-full px-4 py-2 font-bold text-white bg-orange-500 rounded cursor-pointer hover:bg-orange-700 focus:outline-none focus:shadow-outline"
            type="submit"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
}

export default Signup;
