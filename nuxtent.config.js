module.exports = {
    content: {
    page: '/_post',
    permalink: ':year/:slug',
    generate: [
      // assets to generate static build
      'get',
      'getAll'
    ]
  }
}
