<template>
  <div class="pt-8">
    <h1 class="text-5xl text-black font-black pt-8">Hi there, I'm Mikhail.</h1>
    <p class="text-xl mt-4 mb-2">
      I'm a developer, designer, and tinkerer currently working in higher education.
    </p>
    <p class="text-xl mb-2">
      You can usually find me building things in Elixir and Vue, when not enjoying the outdoors with my wife and <a href="https://www.instagram.com/winter_shepherd/" class="text-black hover:text-orange-dark font-bold">dog</a>.
    </p>
    <p class="text-xl pb-8">
      Come chat with me on <a href="https://twitter.com/_mikhailbot" class="text-black hover:text-orange-dark font-bold">Twitter</a> or lets work on something together on <a href="https://github.com/mikhailbot" class="text-black hover:text-orange-dark font-bold">GitHub</a>!
    </p>

    <div class="border-t-4 border-grey-lighter my-8"></div>

    <div class="mx-auto pt-8">
      <section v-for="post in posts" v-bind:key="post.title" class="pb-8">
        <p class="text-xs font-mono">{{ post.date }}</p>
        <nuxt-link :to="post.permalink" class="text-4xl text-black font-black no-underline hover:text-orange-dark uppercase">{{ post.title }}</nuxt-link>
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
      title: 'Hi!'
    }
  }
}
</script>
