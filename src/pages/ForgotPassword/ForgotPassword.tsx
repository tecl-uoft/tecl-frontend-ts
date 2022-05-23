
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ForgotPassword() {

	const history = useHistory();
	const auth = useAuth();
	const [emailInput, setEmailInput] = useState<string>("");

	const handleForgotPassword = () => {
		if (auth) {
			auth
				.forgotPassword(emailInput)
				.then(() => {
					toast.success("Login Sucessful!");
				})
				.then(() => {
					history.push("/scheduling");
				});
		}
	};

	return (
		<div
			className="w-full max-w-md px-4 pt-16 mx-auto"
		>
			<div className="mb-4"> Please enter your email below and you will receive a link to reset your password in your email. </div>
			<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
				<div className="mb-4">
					<label className="block mb-2 text-sm font-bold text-gray-700">
						Email
					</label>
					<input
						className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline"
						id="email"
						value={emailInput}
						onChange={(e) => setEmailInput(e.currentTarget.value)}
						type="email"
						placeholder="jane.doe@teclmail.com"
					/>
				</div>

				<div className="flex items-center justify-center">
					<button
						className="px-4 py-2 font-bold text-white bg-gray-800 rounded hover:text-orange-500 focus:shadow-outline"
						type="button"
						onClick={(e) => {

						}}
					>
					Reset Password
					</button>

				</div>
			</form>
		</div>
	)
}

export default ForgotPassword