import { color } from "snapsvg-cjs-ts";

export const textList = [
	"Call by call",
	"inCall",
	"Answers and collects your details",
	"Books your appointment for you",
	"The practice reviews and approves everything",
	"All by call",
	"inCall",
	"Saves your time and skips the wait",
	"inCall",
	"Where calls meet care",
];

export const tabItems = ["Patients", "Practices"];
export const fullNames = [
	"Sarah Johnson",
	"John Doe",
	"Jane Doe",
	"Walter White",
	"Jesse Pinkman",
	"Will Graham",
	"Hannibal Lecter",
	"John Wick",
	"Neo",
	"Bruce Wayne",
	"Tony Stark",
	"Peter Parker",
	"Clark Kent",
];

export const patientConvo_pt1 = [
	{ speaker: "AI", text: "Hello, you’ve reached the GP Centre." },
	{ speaker: "AI", text: "Could you confirm your full name, please?" },
	{ speaker: "Patient", text: "Sarah Johnson" },
	{ speaker: "AI", text: "Thank you, Sarah." },
	{ speaker: "AI", text: "And your date of birth, please?" },
	{ speaker: "Patient", text: "15th of March, 1985" },
];

export const patientConvo_pt2 = [
	{ speaker: "AI", text: "Thanks, Sarah." },
	{ speaker: "AI", text: "How can I help?" },
	{ speaker: "Patient", text: "I’ve been having headaches on and off" },
	{ speaker: "Patient", text: "For the past few weeks." },
];

export const patientConvo_pt3 = [
	{ speaker: "AI", text: "I'm sorry to hear that, Sarah." },
	{ speaker: "AI", text: "Let's see if we can get you an appointment" },
	{ speaker: "AI", text: "With Dr. Adams as soon as possible." },
	{ speaker: "AI", text: "How does Wednesday at 11:00 AM sound?" },
	{ speaker: "Patient", text: "Yes, that works." },
	{ speaker: "AI", text: "Great I’ll book you in." },
];

export const patientConvo_pt4 = [
	{ speaker: "AI", text: "Alright, Sarah." },
	{ speaker: "AI", text: "You'll receive a confirmation text." },
	{ speaker: "AI", text: "And a feedback form shortly." },
	{ speaker: "Patient", text: "Thank you." },
];

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
	["Analysing……", ""],
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

export const dashCards = [
	{
		title: "Today's Calls",
		value: "71",
		percent: 24.91,
		icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M20 15.51c-1.24 0-2.45-.2-3.57-.57a.84.84 0 0 0-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.149 15.149 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1zM5.03 5h1.5a13 13 0 0 0 .46 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79zM19 18.97c-1.32-.09-2.59-.35-3.8-.75l1.19-1.19c.85.24 1.72.39 2.6.45v1.49zM18 9h-2.59l5.02-5.02-1.41-1.41L14 7.59V5h-2v6h6z"></path></svg>`,
		color: "#ff0000",
	},
	{
		title: "Cost Saved",
		value: "£238.23",
		percent: 79.41,
		icon: `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15 11v.01"></path><path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377"></path><path d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z"></path></svg>`,
		color: "#09122C",
	},
	{
		title: "Time Saved",
		value: "11h 50m",
		percent: 28.91,
		icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128,42a94,94,0,1,0,94,94A94.11,94.11,0,0,0,128,42Zm0,176a82,82,0,1,1,82-82A82.1,82.1,0,0,1,128,218ZM172.24,91.76a6,6,0,0,1,0,8.48l-40,40a6,6,0,1,1-8.48-8.48l40-40A6,6,0,0,1,172.24,91.76ZM98,16a6,6,0,0,1,6-6h48a6,6,0,0,1,0,12H104A6,6,0,0,1,98,16Z"></path></svg>`,
		color: "#384B70",
	},
];

export const bottomTabs = [
	{
		label: "Home",
		icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.03 2.59a1.501 1.501 0 0 1 1.94 0l7.5 6.363a1.5 1.5 0 0 1 .53 1.144V19.5a1.5 1.5 0 0 1-1.5 1.5h-5.75a.75.75 0 0 1-.75-.75V14h-2v6.25a.75.75 0 0 1-.75.75H4.5A1.5 1.5 0 0 1 3 19.5v-9.403c0-.44.194-.859.53-1.144ZM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v6.25h5v-9.403Z"></path></svg>`,
	},
	{
		label: "Calls",
		icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M20 15.51c-1.24 0-2.45-.2-3.57-.57a.84.84 0 0 0-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.149 15.149 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1zM5.03 5h1.5a13 13 0 0 0 .46 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79zM19 18.97c-1.32-.09-2.59-.35-3.8-.75l1.19-1.19c.85.24 1.72.39 2.6.45v1.49zM18 9h-2.59l5.02-5.02-1.41-1.41L14 7.59V5h-2v6h6z"></path></svg>`,
	},
	{
		label: "Messages",
		icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><rect width="416" height="320" x="48" y="96" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" rx="40" ry="40"></rect><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m112 160 144 112 144-112"></path></svg>`,
	},
	{
		label: "Locations",
		icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-width="2" d="M12,22 C12,22 4,16 4,10 C4,5 8,2 12,2 C16,2 20,5 20,10 C20,16 12,22 12,22 Z M12,13 C13.657,13 15,11.657 15,10 C15,8.343 13.657,7 12,7 C10.343,7 9,8.343 9,10 C9,11.657 10.343,13 12,13 L12,13 Z"></path></svg>`,
	},
	{
		label: "Settings",
		icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M262.29 192.31a64 64 0 1 0 57.4 57.4 64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22 155.3 155.3 0 0 1-21.46-12.57 16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22 155.3 155.3 0 0 1 21.46 12.57 16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z"></path></svg>`,
	},
];

export const medicalActions = [
	"ordered a CT scan",
	"ordered an MRI scan",
	"ordered an X-ray",
	"ordered a blood test",
	"prescribed medication to Sarah",
	"referred Sarah to a specialist",
	"referred Sarah to a mental health specialist",
	"referred Sarah to a physiotherapist",
	"referred Sarah to a dietitian",
	"referred Sarah to a podiatrist",
	"referred Sarah to a dermatologist",
];

export const callerList = [
	{ name: "John Doe", type: "Action" },
	{ name: "Jane Doe", type: "Query" },
	{ name: "John Smith", type: "Query" },
	{ name: "Jane Smith", type: "Action" },
	{ name: "Sarah Johnson", type: "Query" },
	{ name: "Kobe Crawford", type: "Action" },
];

export const queryCallTranscript = [
	{
		speaker: "AI",
		text: "Good morning, Jane. How can I assist you today?",
	},
	{
		speaker: "Patient",
		text: "Hi, I had a blood test done last week, and I just wanted to check my results.",
	},
	{
		speaker: "AI",
		text: "Let me check that for you… [brief pause]… Your latest blood test results were received on 14 March 2025. No further action is required. Your cholesterol levels are normal, and there are no abnormalities detected.",
	},
	{
		speaker: "Patient",
		text: "Oh, that's great! So, I don't need to book an appointment?",
	},
	{
		speaker: "AI",
		text: "That's correct. However, if you have any concerns, you can schedule a follow-up with your GP at your convenience.",
	},
	{
		speaker: "Patient",
		text: "Perfect, thanks!",
	},
	{
		speaker: "AI",
		text: "You're welcome, Jane. Have a great day!",
	},
];

export const queryTrafficLights = [
	{
		action: "AI checked blood pressure",
		color: "green",
		time: "10:00 AM",
	},
];

export const actionCallTranscript = [
	{
		speaker: "AI",
		text: "Good afternoon, Mark. How can I assist you today?",
	},
	{
		speaker: "Patient",
		text: "Hey, I need a refill for my hypertension meds. My prescription is about to run out.",
	},
	{
		speaker: "AI",
		text: "I can assist with that. [brief pause] I see that your last prescription was issued 30 days ago. I’ll need to get approval from a pharmacist before we can proceed.",
	},
	{
		speaker: "Patient",
		text: "Okay, how long will that take?",
	},
	{
		speaker: "AI",
		text: "Typically, it takes a few hours. Would you like me to notify you via text once it’s approved?",
	},
	{
		speaker: "Patient",
		text: "Yes, please. That’d be great.",
	},
	{
		speaker: "AI",
		text: "Got it. I’ve forwarded your request to Dr. Emily Carter, the on-duty pharmacist. You’ll receive an update soon.",
	},
	{
		speaker: "Patient",
		text: "Alright, thanks!",
	},
	{
		speaker: "AI",
		text: "You’re welcome, Mark. Have a good day!",
	},
];

export const loadingText = [
	["Verifying…", "Verified"],
	["Analysing…", "Analysed"],
	["Booking…", "Booked"],
	["Sending…", "Sent"],
];

export const actionCallTranscript2 = [
	{
		speaker: "AI",
		text: "Hello, you’ve reached the GP Centre. Could you confirm your full name, please?",
		time: "09:28",
	},

	{
		speaker: "Patient",
		text: "Sarah Johnson",
		time: "10:01",
	},
	{
		speaker: "AI",
		text: "Thank you, Sarah. And your date of birth, please?",
		time: "10:03",
	},
	{
		speaker: "Patient",
		text: "15th of March, 1985",
		time: "10:06",
	},

	// ----------------------------
	{
		type: "action",
		color: "green",
		speaker: "action",
		text: "Verifying…",
		time: "10:07",
	},
	// ----------------------------

	{
		speaker: "AI",
		text: "Thanks, Sarah. How can I help?",
		time: "10:07",
		type: "after-action",
	},
	{
		speaker: "Patient",
		text: "I’ve been having headaches on and off for the past few weeks.",
		time: "10:08",
	},

	// ----------------------------
	{
		type: "action",
		color: "amber",
		speaker: "action",
		text: "Analysing…",
		time: "10:07",
	},
	// ----------------------------

	{
		speaker: "AI",
		text: "I'm sorry to hear that, Sarah. Let's see if we can get you an appointment with Dr. Adams as soon as possible. How does Wednesday at 11:00 AM sound?",
		time: "10:09",
		type: "after-action",
	},
	{
		speaker: "Patient",
		text: "Yes, that works.",
		time: "10:10",
	},
	{
		speaker: "AI",
		text: "Great I’ll book you in.",
		time: "10:11",
	},

	// ----------------------------
	{
		type: "action",
		color: "red",
		speaker: "action",
		text: "Booking…",
		time: "10:11",
	},
	// ----------------------------

	{
		speaker: "AI",
		text: "Alright, Sarah. You'll receive a confirmation text and a feedback form shortly.",
		time: "10:12",
		type: "after-action",
	},
	{
		speaker: "Patient",
		text: "Thank you.",
		time: "10:13",
	},

	// ----------------------------
	{
		type: "action",
		color: "green",
		speaker: "action",
		text: "Sending…",
		time: "10:13",
	},
	// ----------------------------

	{
		speaker: "AI",
		text: "Thanks, Sarah. Is there anything else I can help you with?",
		time: "10:14",
		type: "after-action",
	},
	{
		speaker: "Patient",
		text: "No, that was all. Thank you.",
		time: "10:15",
	},
	{
		speaker: "AI",
		text: "Take care, Sarah. Bye",
		time: "10:16",
	},
	{
		speaker: "Patient",
		text: "Bye",
		time: "10:17",
	},

	// ----------------------------
];

export const actionTrafficLights = [
	{
		action: "AI referred Sarah to Dr. Emily Carter (pharmacist) for a refill",
		color: "amber",
		time: "11:00",
	},
];

export const actionTrafficLights2 = [
	{
		action: "AI referred Sarah to Dr Emily for further assessment",
		color: "red",
		time: "10:00",
	},
	{
		action: "Dr Emily ordered an MRI scan for Sarah",
		color: "red",
		time: "10:30",
	},
	{
		action: "Dr Emily ordered a CT scan for Sarah",
		color: "red",
		time: "11:02",
	},
	{
		action: "Dr Emily conducted an MRI on Sarah",
		color: "red",
		time: "12:00",
	},
];
