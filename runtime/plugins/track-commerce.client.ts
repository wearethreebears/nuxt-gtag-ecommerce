import { defineNuxtPlugin } from "#app";
import { useTrackEvent } from "#imports";
import type { GA4Item, GA4Order } from "../types";

export default defineNuxtPlugin({
  name: "nuxt-gtag-ecommerce",
  dependsOn: ["nuxt-gtag"],
  setup(nuxtApp: any) {
    const trackCommerce = {
      /**
       * Track when a user views a single product.
       * @param item - The product being viewed
       */
      viewItem: (item: GA4Item) =>
        useTrackEvent("view_item", { items: [item] }),

      /**
       * Track when a user views a list of products.
       * @param items - Array of products
       * @param listId - Optional list ID (e.g., "related_products")
       * @param listName - Optional list name (e.g., "Related Products")
       */
      viewItemList: (items: GA4Item[], listId?: string, listName?: string) =>
        useTrackEvent("view_item_list", {
          item_list_id: listId,
          item_list_name: listName,
          items,
        }),

      /**
       * Track when a user selects a product from a list.
       * @param item - The product selected
       * @param listId - Optional list ID
       * @param listName - Optional list name
       */
      selectItem: (item: GA4Item, listId?: string, listName?: string) =>
        useTrackEvent("select_item", {
          item_list_id: listId,
          item_list_name: listName,
          items: [item],
        }),

      /**
       * Track when a product is added to the cart.
       * @param item - The product added
       */
      addToCart: (item: GA4Item) =>
        useTrackEvent("add_to_cart", { items: [item] }),

      /**
       * Track when a product is removed from the cart.
       * @param item - The product removed
       */
      removeFromCart: (item: GA4Item) =>
        useTrackEvent("remove_from_cart", { items: [item] }),

      /**
       * Track when the user views their shopping cart.
       * @param items - All items currently in the cart
       */
      viewCart: (items: GA4Item[]) => useTrackEvent("view_cart", { items }),

      /**
       * Track when checkout begins.
       * @param items - Items being purchased
       * @param coupon - Optional coupon code
       */
      beginCheckout: (items: GA4Item[], coupon?: string) =>
        useTrackEvent("begin_checkout", { coupon, items }),

      /**
       * Track when payment info is added during checkout.
       * @param items - Items being purchased
       * @param paymentType - Payment method (e.g., "Credit Card")
       * @param coupon - Optional coupon code
       */
      addPaymentInfo: (
        items: GA4Item[],
        paymentType: string,
        coupon?: string
      ) =>
        useTrackEvent("add_payment_info", {
          payment_type: paymentType,
          coupon,
          items,
        }),

      /**
       * Track when shipping info is added during checkout.
       * @param items - Items being purchased
       * @param shippingTier - Shipping method (e.g., "Express", "Standard")
       * @param coupon - Optional coupon code
       */
      addShippingInfo: (
        items: GA4Item[],
        shippingTier: string,
        coupon?: string
      ) =>
        useTrackEvent("add_shipping_info", {
          shipping_tier: shippingTier,
          coupon,
          items,
        }),

      /**
       * Track when a purchase is completed.
       * @param order - Order details (transaction ID, total, currency, etc.)
       */
      purchase: (order: GA4Order) =>
        useTrackEvent("purchase", {
          transaction_id: order.id,
          value: order.total,
          currency: order.currency,
          tax: order.tax,
          shipping: order.shipping,
          coupon: order.coupon,
          items: order.items,
        }),

      /**
       * Track when a purchase is refunded.
       * @param orderId - Transaction ID
       * @param items - Optional list of refunded items
       */
      refund: (orderId: string, items?: GA4Item[]) =>
        useTrackEvent("refund", {
          transaction_id: orderId,
          items,
        }),
    };

    nuxtApp.provide("trackCommerce", trackCommerce);
  },
});
