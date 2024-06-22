// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["trpc-nuxt"],
  },
  modules: [
    'nuxt-scheduler'
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {}
  },
  nitro: {
    typescript: {
      tsConfig: {
        compilerOptions: {
          noEmit: true,
        },
      },
    },
  },
})