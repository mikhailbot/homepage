<template>
  <div class="md:pt-8">
    <h1 class="text-5xl text-black font-black pt-8">Hi there, I'm Mikhail.</h1>
    <p class="text-xl mt-4 pb-2">
      I'm a sysadmin and developer currently working in higher education.
    </p>
    <p class="text-xl pb-2">
      When I'm not enjoying the outdoors with my wife and our <a href="https://www.instagram.com/winter_shepherd/">puppy</a> you can usually find me breaking servers, building things in Elixir and Vue, or producing and editing podcasts for <a href="https://spec.fm/">SpecFM</a>.
    </p>
    <p class="text-xl pb-8">
      Come chat with me on <a href="https://twitter.com/_mikhailbot">Twitter</a> or lets work on something together on <a href="https://github.com/mikhailbot">GitHub</a>!
    </p>

    <div class="border-t-4 border-grey-lighter my-8"></div>

    <h2 class="text-5xl text-black font-black uppercase pt-8">Projects</h2>

    <div class="mx-auto pt-8">
      <section v-for="project in projects" v-bind:key="project.title" class="pb-8">
        <a :href="project.url" class="text-3xl text-black font-black no-underline hover:text-indigo-dark uppercase">
          {{ project.name }}
          <span class="inline-block align-top bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker ml-2"> {{ project.status }}</span>
          <br>
          <span class="text-xl text-grey-darkest font-normal normal-case">{{ project.description }}</span>
        </a>
      </section>
    </div>

    <div class="border-t-4 border-grey-lighter my-8"></div>

    <h2 class="text-5xl text-black font-black uppercase pt-8">Writing</h2>

    <div class="mx-auto pt-8">
      <section v-for="post in posts" v-bind:key="post.title" class="pb-8">
        <div class="text-xs font-mono">{{ post.date }}</div>
        <nuxt-link :to="post.permalink" class="text-3xl text-black font-black no-underline hover:text-indigo-dark uppercase">{{ post.title }}</nuxt-link>
      </section>
    </div>

    <div class="border-t-4 border-grey-lighter my-8"></div>

    <div class="text-xs font-mono pt-8 pb-4">
      &copy; {{ new Date().getFullYear() }} | Mikhail Delport
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ app }) {
    return {
      posts: await app.$content('/').getAll(),
      projects: [
        {
          name: 'Ukulesa',
          url: 'https://delport.ca/',
          description: 'Get an email when a GitHub AMA question gets answered.',
          status: 'sunset'
        },
        {
          name: 'BudgetSimple',
          url : 'https://budgetsimple.delport.ca/',
          description: 'Simple shared budgeting, done right.',
          status: 'alpha'
        },
        {
          name: 'MeetSilver',
          url: 'http://meetsilver.com/',
          description: 'Scheduling meetings, done simply!',
          status: 'on-hold'
        }
      ]
    }
  },

  head () {
    return {
      title: 'Hi!'
    }
  }
}
</script>
