module.exports = {
  modules: ['nuxtent'],

  head: {
    titleTemplate: '%s - Mikhail Delport',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Developer | Designer | Sysadmin - Making things in Elixir and Vue' }
    ]
  },

  nuxtent: {
    content: {
      page: '/_post',
      permalink: 'blog/:year/:slug',
      generate: [
        // assets to generate static build
        'get',
        'getAll'
      ]
    }
  },

  css: ['~/assets/css//main.css']
}
