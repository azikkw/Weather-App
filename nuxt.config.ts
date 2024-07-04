// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'nuxt-swiper'
  ],
  app: {
    head: {
      title: "Weather Forecast",
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ]
    }
  },
  css: [
    '~/assets/css/tailwind.css',
  ]
})