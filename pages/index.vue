<template>
  <div class="md:pt-8">
    <h1 class="text-5xl text-black font-black pt-8">Hi there, I'm Mikhail.</h1>
    <p class="text-xl mt-4 pb-2">
      I'm a developer, designer, and sysadmin currently working in higher education.
    </p>
    <p class="text-xl pb-2">
      You can usually find me building things in Elixir and Vue, when not enjoying the outdoors with my wife and our <a href="https://www.instagram.com/winter_shepherd/">puppy</a>.
    </p>
    <p class="text-xl pb-8">
      Come chat with me on <a href="https://twitter.com/_mikhailbot">Twitter</a> or lets work on something together on <a href="https://github.com/mikhailbot">GitHub</a>!
    </p>

    <div class="border-t-4 border-grey-lighter my-8"></div>

    <div class="mx-auto pt-8">
      <section v-for="post in posts" v-bind:key="post.title" class="pb-8">
        <div class="text-xs font-mono">{{ post.date }}</div>
        <nuxt-link :to="post.permalink" class="text-4xl text-black font-black no-underline hover:text-indigo-dark uppercase">{{ post.title }}</nuxt-link>
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
