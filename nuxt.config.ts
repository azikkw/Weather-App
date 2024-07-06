// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'nuxt-swiper',
    '@nuxt/image'
  ],
  vite: {
    build: {
      sourcemap: true,
    }
  },
  nitro: {
    compressPublicAssets: true,
    minify: true
  },
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
  }
});