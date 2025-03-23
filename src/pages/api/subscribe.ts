// import { defineEventHandler, readBody } from "astro/server";
import type { APIRoute } from "astro";
import { PUBLIC_BREVO_API_KEY, PUBLIC_BREVO_LIST_ID } from "astro:env/server";

export const POST: APIRoute = async ({ request }) => {
	if (request.headers.get("Content-Type") === "application/json") {
		let email;
		try {
			({ email } = await request.json());
		} catch {
			return new Response(JSON.stringify({ error: "Invalid JSON" }), {
				status: 400,
			});
		}

		if (!email) {
			return new Response(JSON.stringify({ error: "Email is required" }), {
				status: 400,
			});
		}

		try {
			const API_KEY = PUBLIC_BREVO_API_KEY;
			const LIST_ID = PUBLIC_BREVO_LIST_ID;

			const response = await fetch("https://api.brevo.com/v3/contacts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"api-key": API_KEY,
				},
				body: JSON.stringify({
					email,
					listIds: [Number(LIST_ID)],
				}),
			});

			if (!response.ok) {
				return new Response(JSON.stringify({ error: "Failed to subscribe" }), {
					status: 400,
				});
			}

			return new Response(
				JSON.stringify({ success: true, message: "Success!" }),
				{
					status: 201,
				}
			);
		} catch (error) {
			return new Response(JSON.stringify({ error: "Server error" }), {
				status: 500,
			});
		}
	}
	return new Response(
		JSON.stringify({
			error: request.headers,
		}),
		{
			status: 400,
		}
	);
};
