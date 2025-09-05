import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@ohto/nuxt-gtag-ecommerce",
    configKey: "trackCommerce",
  },
  setup(_, nuxt) {
    if (!nuxt.options.modules.includes("nuxt-gtag")) {
      console.warn(
        "⚠️ @ohto/nuxt-gtag-ecommerce: nuxt/gtag is required. Please add it to your nuxt.config.ts"
      );
    }

    const resolver = createResolver(import.meta.url);
    addPlugin({
      src: resolver.resolve("./runtime/plugins/track-commerce.client"),
      mode: "client",
    });
  },
});
