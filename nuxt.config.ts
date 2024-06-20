// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["trpc-nuxt"],
  },
  modules: [
    'nuxt-scheduler'
  ],
  ssr: false,

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: "https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css"
        }
      ]
    }
  }
})