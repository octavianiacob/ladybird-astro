// @ts-check
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import awsAmplify from "astro-aws-amplify";

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	output: "server",
	adapter: awsAmplify(),
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
