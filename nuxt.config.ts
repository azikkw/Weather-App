// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'nuxt-swiper',
    '@nuxt/image'
  ],

  app: {
    head: {
      title: "Weather Forecast",
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ],
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          name: 'description',
          content: 'A web application for displaying real-time weather in user-selected cities.'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        }
      ]
    }
  },

  css: [
    '~/assets/css/tailwind.css',
  ],

  image: {
    dir: 'assets/images'
  },

  runtimeConfig: {
    weatherKey: process.env.WEATHER_API_KEY
  },

  compatibilityDate: '2024-07-12'
});