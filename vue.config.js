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
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/, /manifest\.json$/],
      runtimeCaching: [{
        urlPattern: /(https?:\/\/.*\.(?:png|jpg))/i,
        handler: 'networkFirst',
        options: {
          networkTimeoutSeconds: 20,
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