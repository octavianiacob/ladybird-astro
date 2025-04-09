import { FaCheck, FaChevronRight } from "react-icons/fa6";
import "../styles/FloatingForm.scss";
import { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";

const FloatingForm = () => {
	const [email, setEmail] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
	const [done, setDone] = useState(false);
	const [isActive, setIsActive] = useState(false);

	const submitFunc = async () => {
		setLoading(true);
		try {
			const res = await fetch(
				"https://ladybird-subscription.fly.dev/subscribe",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				}
			);
			const data = await res.json();
			console.log(data);

			// if (data.success) {
			setTimeout(() => {
				setLoading(false);
				setDone(true);
			}, 1000);
			// }
		} catch (error) {
		} finally {
			setTimeout(() => {
				setLoading(false);
				setDone(false);
				setEmail("");
			}, 2000);
		}
	};

	useEffect(() => {
		const submitBtn = document.querySelector(
			".FloatingForm__button"
		) as HTMLButtonElement;

		console.log("submitBtn", submitBtn);

		// submitBtn.addEventListener("click", () => {
		// 	console.log("jejkj");

		// 	submitFunc();
		// });
	}, []);

	return (
		<form
			className={`FloatingForm FloatingForm--${isActive ? "active" : ""}`}
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<label
				className={`FloatingForm__label FloatingForm__label--${
					isActive ? "active" : ""
				}`}
			>
				Email or Phone number
			</label>
			<input
				className=""
				type="email"
				name="email"
				id=""
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				onFocus={() => {
					setIsActive(true);
					// if ("vibrate" in navigator)

					try {
						navigator.vibrate(300);
					} catch (error) {
						console.log("error", error);
						// document.body.innerHTML = error as string;
					}
				}}
				onBlur={() => {
					if (email === "") {
						setIsActive(false);
					}
				}}
			/>
			<div className="FloatingForm__span"></div>
			<button
				className="FloatingForm__button"
				type="button"
				onClick={() => {
					submitFunc();
				}}
			>
				{done ? (
					<FaCheck />
				) : loading ? (
					<LuLoaderCircle className="spinner" />
				) : (
					<FaChevronRight
						className={`chevron chevron--${isActive ? "active" : ""}`}
					/>
				)}
			</button>
		</form>
	);
};

export default FloatingForm;
