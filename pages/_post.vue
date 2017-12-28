<template>
<div>
    <h1>{{ post.title }}</h1>
		<div v-html="post.body" />
</div>
</template>

<script>
export default {
  async asyncData ({ app, route }) {
    return {
      post: await app.$content('/').get(route.path)
    }
  },

  head () {
    return {
      title: this.post.title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.description }
      ]
    }
  }
}
</script>
