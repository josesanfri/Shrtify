// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: false },
	css: ['~/assets/style.sass'],

	app: {
		head: {
			title: "Shrtify",
			htmlAttrs: {
				lang: "es",
			},
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ name: "author", content: "Shrtify" },
				{ name: "description", content: "Shrtify el mejor acortador de links" },
				{ name: "format-detection", content: "telephone=no" },
				{ name: "theme-color", content: "#93C5FD" },
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		},
		pageTransition: { name: 'page', mode: 'out-in' }
	},

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
	},
	nitro: {
		externals: {
		  inline: ['geoip-lite']
		}
	},
	hooks: {
		'nitro:config': (nitroConfig) => {
			if (nitroConfig.dev) return
				nitroConfig.serverAssets = nitroConfig.serverAssets || []
				nitroConfig.serverAssets.push({
				baseName: 'geoip-data',
				dir: './node_modules/geoip-lite/data'
			})
		}
	}
})