import { useState } from "react";
import BottomBar from "../components/dash/BottomBar/BottomBar";
import DashCards from "../components/dash/DashCards";
import ReBarChart from "../components/dash/ReBarChart";
import ReLineChart from "../components/dash/ReLineChart";
import RePieChart from "../components/dash/RePieChart";
import RMDPDatePicker from "../components/dash/RMDPDatePicker";
import TranscriptPage from "../components/dash/TranscriptPage";
import "../styles/FakeDashboard.scss";

const FakeDashboard = () => {
	const [callCount, setCallCount] = useState(71);
	const [showPopup, setShowPopup] = useState(true);

	return (
		<div className="FakeDashboard">
			<div className="FakeDashboard__home">
				<div className="FakeDashboard__main">
					<div className="FakeDashboard__greeting">
						<h2>Hello, Ria</h2>
						<p>Take a look at the latest stats</p>
					</div>

					<DashCards callCount={callCount} />

					<div className="FakeDashboard__bottomCards">
						{/* <div>
							<RMDPDatePicker />
						</div> */}
						<div className="FakeDashboard__rightBar__whiteCard">
							<div className="FakeDashboard__rightBar__headTop">
								<h3>Average Queue Times</h3>
								<div className="FakeDashboard__rightBar__headTop__right">
									<p>+43.12%</p>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M8.45488 5.60777L14 4L12.6198 9.6061L10.898 7.9532L8.12069 10.8463C8.02641 10.9445 7.89615 11 7.76 11C7.62385 11 7.49359 10.9445 7.39931 10.8463L5.36 8.72199L2.36069 11.8463C2.16946 12.0455 1.85294 12.0519 1.65373 11.8607C1.45453 11.6695 1.44807 11.3529 1.63931 11.1537L4.99931 7.65373C5.09359 7.55552 5.22385 7.5 5.36 7.5C5.49615 7.5 5.62641 7.55552 5.72069 7.65373L7.76 9.77801L10.1766 7.26067L8.45488 5.60777Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div>
							<ReLineChart />
						</div>
						<div className="FakeDashboard__rightBar__whiteCard">
							<div className="FakeDashboard__rightBar__headTop">
								<h3>Call Types</h3>
								<div className="FakeDashboard__rightBar__headTop__right">
									<p>+43.12%</p>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M8.45488 5.60777L14 4L12.6198 9.6061L10.898 7.9532L8.12069 10.8463C8.02641 10.9445 7.89615 11 7.76 11C7.62385 11 7.49359 10.9445 7.39931 10.8463L5.36 8.72199L2.36069 11.8463C2.16946 12.0455 1.85294 12.0519 1.65373 11.8607C1.45453 11.6695 1.44807 11.3529 1.63931 11.1537L4.99931 7.65373C5.09359 7.55552 5.22385 7.5 5.36 7.5C5.49615 7.5 5.62641 7.55552 5.72069 7.65373L7.76 9.77801L10.1766 7.26067L8.45488 5.60777Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div>
							<RePieChart />
						</div>
					</div>
				</div>
				<div className="FakeDashboard__transcript">
					<TranscriptPage />
					{/* <ActionsPage /> */}
				</div>
				<div className="FakeDashboard__rightBar">
					<div className="FakeDashboard__rightBar__callList">
						<h3>Recent Calls</h3>

						<div className="FakeDashboard__rightBar__callList__calls__item FakeDashboard__rightBar__callList__calls__item--AI">
							<div className="FakeDashboard__rightBar__callList__calls__item__content">
								<p className="name">AI Stacy</p>
								<p className="">How can I help you?</p>
							</div>

							<div className="FakeDashboard__rightBar__callList__calls__item__right">
								<svg
									width="24"
									height="25"
									viewBox="0 0 24 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M22.3066 10.9025C22.2857 10.7969 22.2423 10.697 22.1794 10.6096C22.1164 10.5223 22.0354 10.4495 21.9419 10.3962L19.1453 8.80248L19.1341 5.65061C19.1337 5.54206 19.1098 5.43488 19.064 5.33646C19.0182 5.23805 18.9516 5.15076 18.8688 5.08061C17.8543 4.22251 16.6861 3.56492 15.4263 3.14279C15.327 3.10921 15.2219 3.09679 15.1176 3.10631C15.0133 3.11584 14.9121 3.14711 14.8206 3.19811L11.9997 4.77498L9.17594 3.19529C9.0844 3.14401 8.98311 3.1125 8.87863 3.10281C8.77414 3.09312 8.66879 3.10547 8.56938 3.13904C7.31029 3.56388 6.14335 4.22402 5.13063 5.08436C5.04791 5.1544 4.98136 5.24155 4.93556 5.33979C4.88975 5.43803 4.86579 5.54503 4.86532 5.65342L4.85125 8.80811L2.05469 10.4019C1.96113 10.4551 1.88013 10.5279 1.8172 10.6153C1.75428 10.7026 1.71089 10.8025 1.69 10.9081C1.43406 12.1942 1.43406 13.5182 1.69 14.8044C1.71089 14.91 1.75428 15.0098 1.8172 15.0972C1.88013 15.1846 1.96113 15.2573 2.05469 15.3106L4.85125 16.9044L4.8625 20.0572C4.86284 20.1657 4.88674 20.2729 4.93255 20.3713C4.97835 20.4697 5.04498 20.557 5.12782 20.6272C6.14226 21.4853 7.31046 22.1429 8.57031 22.565C8.66953 22.5986 8.77468 22.611 8.87899 22.6015C8.98329 22.5919 9.08445 22.5607 9.17594 22.5097L11.9997 20.9281L14.8234 22.5078C14.9352 22.5701 15.0611 22.6024 15.1891 22.6015C15.271 22.6015 15.3523 22.5882 15.43 22.5622C16.6888 22.1375 17.8556 21.4781 18.8688 20.6187C18.9515 20.5487 19.018 20.4615 19.0638 20.3633C19.1096 20.2651 19.1336 20.1581 19.1341 20.0497L19.1481 16.895L21.9447 15.3012C22.0383 15.248 22.1192 15.1752 22.1822 15.0878C22.2451 15.0005 22.2885 14.9006 22.3094 14.795C22.5639 13.5099 22.5629 12.1872 22.3066 10.9025ZM11.9997 16.6015C11.258 16.6015 10.533 16.3816 9.9163 15.9696C9.29962 15.5575 8.81897 14.9718 8.53514 14.2866C8.25131 13.6014 8.17705 12.8474 8.32174 12.12C8.46644 11.3925 8.82359 10.7243 9.34804 10.1999C9.87249 9.67545 10.5407 9.31829 11.2681 9.1736C11.9955 9.0289 12.7495 9.10317 13.4348 9.387C14.12 9.67082 14.7056 10.1515 15.1177 10.7682C15.5298 11.3848 15.7497 12.1099 15.7497 12.8515C15.7497 13.8461 15.3546 14.7999 14.6513 15.5032C13.9481 16.2065 12.9943 16.6015 11.9997 16.6015Z"
										fill="white"
									></path>
								</svg>
							</div>
						</div>

						{["Sarah Johnson", "Kobe Crawford"].map(
							(item: string, ind: number) => (
								<div
									className="FakeDashboard__rightBar__callList__calls__item"
									key={ind}
								>
									<div className="FakeDashboard__rightBar__callList__calls__item__content">
										<p className="name">{item}</p>
										<p className="">Aug 16, 2024, 2:12 pm</p>
									</div>

									<div className="FakeDashboard__rightBar__callList__calls__item__right">
										<p className="FakeDashboard__rightBar__callList__calls__item__duration">
											{" "}
											30m
										</p>
										<div className="FakeDashboard__rightBar__callList__calls__item__right__icons">
											{/* <svg
                                                width="35"
                                                height="35"
                                                viewBox="0 0 35 35"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M11.6667 27.7077V7.29102L27.7084 17.4993L11.6667 27.7077Z"
                                                    fill="currentColor"
                                                />
                                            </svg> */}
											<svg
												width="35"
												height="35"
												viewBox="0 0 35 35"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M13.125 26.25L21.875 17.5L13.125 8.75"
													stroke="currentColor"
													stroke-width="3"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</div>
									</div>
								</div>
							)
						)}
					</div>

					<div className="FakeDashboard__rightBar__callList">
						<div className="FakeDashboard__rightBar__headTop">
							<h3 style={{ marginBottom: 0 }}>Volume</h3>
							<div className="FakeDashboard__rightBar__headTop__right">
								<p>+43.12%</p>
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M8.45488 5.60777L14 4L12.6198 9.6061L10.898 7.9532L8.12069 10.8463C8.02641 10.9445 7.89615 11 7.76 11C7.62385 11 7.49359 10.9445 7.39931 10.8463L5.36 8.72199L2.36069 11.8463C2.16946 12.0455 1.85294 12.0519 1.65373 11.8607C1.45453 11.6695 1.44807 11.3529 1.63931 11.1537L4.99931 7.65373C5.09359 7.55552 5.22385 7.5 5.36 7.5C5.49615 7.5 5.62641 7.55552 5.72069 7.65373L7.76 9.77801L10.1766 7.26067L8.45488 5.60777Z"
										fill="currentColor"
									></path>
								</svg>
							</div>
						</div>

						<ReBarChart />
					</div>
				</div>

				<div className="FakeDashboard__bottom">
					<BottomBar setCallCount={setCallCount} setShowPopup={setShowPopup} />
					<div
						className={`FakeDashboard__popup FakeDashboard__popup--${
							showPopup ? "show" : ""
						}`}
					>
						<p>
							Click the{" "}
							<span style={{ color: "#04db00" }}>green phone icon</span> to
							accept a phone call and view its live transcript
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FakeDashboard;
