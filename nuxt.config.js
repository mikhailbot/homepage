const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

class TailwindExtractor {
  static extract (content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || []
  }
}

module.exports = {
  modules: ['nuxtent', '@nuxtjs/google-analytics'],

  head: {
    titleTemplate: '%s - Mikhail Delport',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Developer | Designer | Sysadmin - Making things in Elixir and Vue' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ]
  },

  'google-analytics': {
    id: 'UA-92051316-5'
  },

  css: ['~/assets/css/main.css'],

  build: {
    /*
     ** Extract CSS
     */
    extractCSS: true,
    extend (config, { isDev, isClient }) {
      /*
      ** Cleanup CSS with PurgeCSS
      */
      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            extractors: [{
              extractor: TailwindExtractor,
              extensions: ['vue']
            }],
            whitelist: ['html', 'body']
          })
        )
      }
    }
  }
}
