const SWPrecache = require('sw-precache-webpack-plugin')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/styles/main.scss";`
      }
    }
  },
  pwa: {
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/],
      runtimeCaching: [{
        urlPattern: /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg))/g,
        handler: 'networkFirst',
        options: {
          networkTimeoutSeconds: 20,
          maxEntries: 5,
          cacheName: 'api-cache',
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      }]
    }
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new SWPrecache({
            cacheId: "geekscore",
            filepath: "service-worker.js",
            staticFileGlobs: [
              "public/index.html",
              "public/site.webmanifest",
              "dist/**/*.{js,css}"
            ],
            stripPrefix: "/"
          })
        ]
      }
    }
  }
}