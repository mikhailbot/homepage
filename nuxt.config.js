module.exports = {
  modules: ['nuxtent'],

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

  css: ['~/assets/css//main.css']
}
