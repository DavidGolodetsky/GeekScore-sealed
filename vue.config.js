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
      exclude: [/\.map$/, /_redirects/]
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

            runtimeCaching: [{
              urlPattern: /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg))/g,
              handler: 'fastest',
            }],
            stripPrefix: "/"
          })
        ]
      }
    }
  }
}