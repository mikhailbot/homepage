---
title: Vue CLI 3, TailwindCSS, and PurgeCSS
date: 2018-08-14
description: Using PurgeCSS to generate tiny TailwindCSS bundles in your Vue CLI 3 projects.
---

The new [Vue CLI](https://cli.vuejs.org/) just came out and I was itching to give it a go. Our wedding website needed a fresh coat of paint so decided to move it from Nuxt to just a plain Vue app. It's two pages so there was really no need to bring Nuxt in.

The new Vue CLI is awesome and got things up and running in no time. Add in my new favourite CSS framework, [TailwindCSS](https://tailwindcss.com/), and things were soaring along. Until I decided the decrease my bundle size.

Because of home TailwindCSS works, by default the entire framework gets included. You can add some configuration options to add or removes colours, responsive states, and such. However, an even easier way to handle things is with [PurgeCSS](https://github.com/FullHuman/purgecss). It'll go over through your HTML (Vue in my case) files and see what CSS selectors you use, and remove all the others from your CSS. This should cause your TailwindCSS output to be tiny, just the classes you use!

A new project with Vue CLI 3 uses [postcss-load-config](https://github.com/michael-ciniawsky/postcss-load-config) to handle PostCSS plugins. However, the default way of using your `package.json` to configure plugins doesn't appear to work with the PostCSS PurgeCSS [plugin](https://github.com/FullHuman/postcss-purgecss). Thankfully, postcss-load-config allows you to use numerous different type of configuration files. Switching to a JavaScript one (`.postcssrc.js`) gave me the below config that allows you to use TailwindCSS in your Vue files, but also removes unused CSS from the generated bundle.

```js
const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')

module.exports = {
  plugins: [
    postcssImport,
    tailwindcss('./tailwind.js'),
    purgecss({
      content: ['./src/**/*.vue'],
      extractors: [
        {
            extractor: class TailwindExtractor {
                static extract(content) {
                    return content.match(/[A-z0-9-:\/]+/g) || [];
                }
            },
            extensions: ['vue']
        }
      ]
    }),
    autoprefixer
  ]
}
```

This took me far too long to figure out, but the benefits are profound! Before adding PurgeCSS my CSS bundle was 50.12 kb Gzipped, after PurgeCSS it was only 2.33 kb--over a 20 times reduction in size!

**Update:** The custom extrator is required for Tailwind's responsive classes which get stripped out by default!