// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	css: ['~/assets/style.sass'],

	runtimeConfig: {
		public: {
			appUrl: process.env.APP_URL
		}
	},

	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxtjs/supabase'
	],

	supabase: {
		url: process.env.SUPABASE_URL,
		key: process.env.SUPABASE_KEY,
		redirectOptions: {
			login: '/auth',
			callback: '/confirm',
			exclude: ['/']
		}
	}
})