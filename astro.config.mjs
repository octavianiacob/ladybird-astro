// @ts-check
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	env: {
		schema: {
			PUBLIC_BREVO_API_KEY: envField.string({
				context: "server",
				access: "secret",
			}),
			PUBLIC_BREVO_LIST_ID: envField.string({
				context: "server",
				access: "secret",
			}),
		},
	},
});
