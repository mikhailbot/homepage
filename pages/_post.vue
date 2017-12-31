<template>
  <div class="pt-8">
    <nuxt-link to="/" class="text-orange py-8 block">
      <svg width="50px" height="50px" viewBox="188 113 174 175" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch -->
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(198.000000, 123.000000)" stroke-linecap="round">
          <path d="M139.3,117.5 L152.85,104 M0.85,56 L29.85,26.95 M54.85,0.95 L54.85,1.95 M102.85,153.95 L102.25,153.55 M2.1,104.7 L2.3,104.5 M21.65,135.1 L49.3,107.5 M29.3,77.5 L103.65,3.1 M52.65,154.1 L153.15,53.6 M76.3,80.5 L134.1,22.7" id="logo-stroke" stroke="#000000" stroke-width="20"></path>
        </g>
      </svg>
    </nuxt-link>

    <div class="text-xs font-mono">{{ post.date }}</div>
    <h1 class="text-5xl text-black font-black mb-4">{{ post.title }}</h1>
    <div v-html="post.body" class="pb-8" />
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
