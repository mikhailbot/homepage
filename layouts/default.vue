<template>
  <div class="font-sans">
    <div class=" py-6 flex items-center justify-between">
      <div class="text-black font-bold uppercase px-8">
        MD
      </div>
      <nav class="uppercase font-bold">
        <ul>
          <li class="list-reset">
            <nuxt-link :to="'/'" class="text-black no-underline border-b-4 border-white hover:border-orange-dark pb-1 px-8">Home</nuxt-link>
            <nuxt-link :to="'/blog'" class="text-black no-underline border-b-4 border-white hover:border-orange-dark pb-1 px-8">Blog</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="max-w-xl mx-auto pt-8">
      <nuxt/>
    </div>
  </div>
</template>
