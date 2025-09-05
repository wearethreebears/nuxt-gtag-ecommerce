import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@ohto/nuxt-gtag-ecommerce",
    configKey: "trackCommerce",
  },
  setup(_, nuxt) {
    // More robust check for nuxt-gtag - check multiple possible ways it might be registered
    const hasNuxtGtag = nuxt.options.modules.some((module) => {
      if (typeof module === "string") {
        return module === "nuxt-gtag";
      }
      if (Array.isArray(module)) {
        return module[0] === "nuxt-gtag";
      }
      return false;
    });

    if (!hasNuxtGtag) {
      console.warn(
        "⚠️ @ohto/nuxt-gtag-ecommerce: nuxt-gtag is required. Please add it to your nuxt.config.ts"
      );
      // Don't return early - still try to load the plugin as gtag might be available
    }

    const resolver = createResolver(import.meta.url);
    addPlugin({
      src: resolver.resolve("./runtime/plugins/track-commerce.client"),
      mode: "client",
    });
  },
});
