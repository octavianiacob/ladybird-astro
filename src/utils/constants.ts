export const textList = [
	"Call by call",
	"inCall",
	// "Answers and collects your details",
	// "Books your appointment for you",
	// "The practice reviews and approves everything",
	// "All by call",
	// "inCall",
	// "Saves your time and skips the wait",
	// "inCall",
	// "Where calls meet care",
];

export const tabItems = ["Patients", "Practices"];

// export const patientConvo_pt1 = [
// 	{
// 		speaker: "AI",
// 		text: "Hello, you’ve reached the GP ",
// 	},
// 	{ speaker: "AI", text: "Centre. Could you confirm" },
// 	{ speaker: "AI", text: "your full name, please?" },
// 	{ speaker: "Patient", text: "Sarah Johnson" },
// 	{ speaker: "AI", text: "Thank you, Sarah." },
// 	{ speaker: "AI", text: "And your date of birth, please?" },
// 	{ speaker: "Patient", text: "15th of March, 1985" },
// ];
export const patientConvo_pt1 = [
	{ speaker: "AI", text: "Hello, you’ve reached the GP Centre." },
	{ speaker: "AI", text: "Could you confirm your full name, please?" },
	{ speaker: "Patient", text: "Sarah Johnson" },
	{ speaker: "AI", text: "Thank you, Sarah." },
	{ speaker: "AI", text: "And your date of birth, please?" },
	{ speaker: "Patient", text: "15th of March, 1985" },
];

// export const patientConvo_pt2 = [
// 	{ speaker: "AI", text: "Thanks, Sarah." },
// 	{ speaker: "AI", text: "How can I help?" },
// 	{ speaker: "Patient", text: "I’ve been having headaches" },
// 	{ speaker: "Patient", text: "on and off" },
// 	{ speaker: "Patient", text: "For the past few weeks." },
// ];
export const patientConvo_pt2 = [
	{ speaker: "AI", text: "Thanks, Sarah." },
	{ speaker: "AI", text: "How can I help?" },
	{ speaker: "Patient", text: "I’ve been having headaches on and off" },
	{ speaker: "Patient", text: "For the past few weeks." },
];

// export const patientConvo_pt3 = [
// 	{
// 		speaker: "AI",
// 		text: "I'm sorry to hear that, Sarah.",
// 	},
// 	{
// 		speaker: "AI",
// 		text: "Let's see if we",
// 	},
// 	{
// 		speaker: "AI",
// 		text: "can get you an appointment",
// 	},
// 	{
// 		speaker: "AI",
// 		text: "with Dr. Adams ",
// 	},
// 	{
// 		speaker: "AI",
// 		text: "as soon as possible. How does",
// 	},
// 	{
// 		speaker: "AI",
// 		text: "Wednesday at 11:00 AM sound?",
// 	},
// 	{ speaker: "Patient", text: "Yes, that works." },
// 	{ speaker: "AI", text: "Great I’ll book you in." },
// ];
export const patientConvo_pt3 = [
	{ speaker: "AI", text: "I'm sorry to hear that, Sarah." },
	{ speaker: "AI", text: "Let's see if we can get you an appointment" },
	{ speaker: "AI", text: "With Dr. Adams as soon as possible." },
	{ speaker: "AI", text: "How does Wednesday at 11:00 AM sound?" },
	{ speaker: "Patient", text: "Yes, that works." },
	{ speaker: "AI", text: "Great I’ll book you in." },
];

// export const patientConvo_pt4 = [
// 	{ speaker: "AI", text: "Alright, Sarah." },
// 	{ speaker: "AI", text: "You'll receive a confirmation text." },
// 	{ speaker: "AI", text: "And a feedback form shortly." },
// 	{ speaker: "Patient", text: "Thank you." },
// ];
export const patientConvo_pt4 = [
	{ speaker: "AI", text: "Alright, Sarah." },
	{ speaker: "AI", text: "You'll receive a confirmation text." },
	{ speaker: "AI", text: "And a feedback form shortly." },
	{ speaker: "Patient", text: "Thank you." },
];

// export const patientConvo_pt5 = [
// 	{ speaker: "AI", text: "Thanks, Sarah." },
// 	{ speaker: "AI", text: "Is there anything else" },
// 	{ speaker: "AI", text: "I can help you with?" },
// 	{ speaker: "Patient", text: "No, that was all." },
// 	{ speaker: "Patient", text: "Thank you." },
// 	{ speaker: "AI", text: "Take care, Sarah." },
// 	{ speaker: "AI", text: "Bye" },
// 	{ speaker: "Patient", text: "Bye" },
// ];
export const patientConvo_pt5 = [
	{ speaker: "AI", text: "Thanks, Sarah." },
	{ speaker: "AI", text: "Is there anything else I can help you with?" },
	{ speaker: "Patient", text: "No, that was all." },
	{ speaker: "Patient", text: "Thank you." },
	{ speaker: "AI", text: "Take care, Sarah." },
	{ speaker: "AI", text: "Bye" },
	{ speaker: "Patient", text: "Bye" },
];

export const convoLoadingText = [
	["Verifying…", "Verified"],
	["Analaysing…", ""],
	["Booking…", "Booked"],
	["Sending…", "Sent"],
];

export const brandList = [
	{
		name: "Microsoft",
		logo: "/images/microsoft.jpg",
	},
	{
		name: "Cisco",
		logo: "/images/cisco.png",
	},
	{
		name: "Manchester Metroplitan University",
		logo: "/images/machester-metro.svg",
	},
	{
		name: "Health Innovation Manchester",
		logo: "/images/health-innovation.png",
	},
	{
		name: "University of Manchester",
		logo: "/images/university-of-manchester.png",
	},
];

export const dashCards = [
	{
		title: "Today's Calls",
		value: "71",
		percent: "+24.91%",
	},
	{
		title: "Cost Savings",
		value: "£238.23",
		percent: "+79.41%",
	},
	{
		title: "Time Savings",
		value: "11h 50m",
		percent: "+28.91%",
	},
];

export const callLogs = [
	{ name: "Sarah Johnson", time: "11:00 AM", date: "Mar 15, 2021" },
	{ name: "John Doe", time: "10:00 AM", date: "Aug 14, 2021" },
	{ name: "Jane Doe", time: "09:00 AM", date: "Jul 13, 2021" },
];

export const fakeConvoList = [
	[
		"Hello, you’ve reached the GP Centre.",
		"Could you confirm your full name, please?",
	],
	["Thank you, Sarah.", "And your date of birth, please?"],
	["Thanks, Sarah.", "How can I help?"],
	[
		"I'm sorry to hear that, Sarah.",
		"Let's see if we can get you an appointment with Dr. Adams as soon as possible",
	],
	["Booking an appointment at 11AM"],
];
