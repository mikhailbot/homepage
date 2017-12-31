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

  nuxtent: {
    content: {
      page: '/_post',
      permalink: ':year/:slug',
      generate: [
        // assets to generate static build
        'get',
        'getAll'
      ]
    }
  },

  'google-analytics': {
    id: 'UA-92051316-5'
  },

  css: ['~/assets/css//main.css']
}
