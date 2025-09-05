import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-track-commerce',
    configKey: 'trackCommerce',
  },
  setup(_, nuxt) {
    if (!nuxt.options.modules.includes('@nuxtjs/gtag')) {
      console.warn(
        '⚠️ nuxt-track-commerce: @nuxtjs/gtag is required. Please add it to your nuxt.config.ts'
      )
    }

    const resolver = createResolver(import.meta.url)
    addPlugin({
      src: resolver.resolve('./runtime/plugins/track-commerce.client'),
      mode: 'client',
    })
  },
})
