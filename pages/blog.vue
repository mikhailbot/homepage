<template>
  <div class="mx-auto px-4">
    <div class="">
      <section v-for="post in latestPosts">
        <nuxt-link :to="post.permalink" class="text-5xl text-black font-black no-underline hover:text-orange-dark uppercase">{{ post.title }}</nuxt-link>
        <p class="text-xs py-4 font-mono">{{ post.date }}</p>
        <p class="text-black text-lg leading-normal max-w-md">
          {{ post.description }}
          <nuxt-link :to="post.permalink" class="text-sm font-semibold text-black hover:text-orange-dark uppercase">Read More</nuxt-link>
        </p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ app }) {
    return {
      posts: await app.$content('/').getAll()
    }
  },

  head () {
    return {
      title: 'Blog'
    }
  },

  computed: {
    latestPosts () {
      return this.posts.slice(0, 3)
    }
  }
}
</script>
