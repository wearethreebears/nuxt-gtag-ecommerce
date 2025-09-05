import { defineNuxtPlugin } from "#app";
import type { GA4Item, GA4Order } from "../types";

// Type for the trackEvent function
type TrackEventFunction = (
  eventName: string,
  parameters?: Record<string, any>
) => void;

export default defineNuxtPlugin({
  name: "nuxt-gtag-ecommerce",
  dependsOn: ["nuxt-gtag"],
  setup(nuxtApp: any) {
    // Try to get useTrackEvent - handle both auto-import enabled/disabled scenarios
    let trackEvent: (
      eventName: string,
      parameters?: Record<string, any>
    ) => void;

    try {
      // First try: assume auto-imports are enabled (default Nuxt 3 behavior)
      trackEvent = useTrackEvent();
    } catch (error) {
      // Fallback: try to get it from nuxtApp context or import manually
      try {
        // Try to access from nuxtApp (in case it's available there)
        const { useTrackEvent: useTrackEventFn } = nuxtApp.$nuxtGtag || {};
        if (useTrackEventFn) {
          trackEvent = useTrackEventFn();
        } else {
          // Last resort: use direct gtag if available
          trackEvent = (
            eventName: string,
            parameters?: Record<string, any>
          ) => {
            if (typeof window !== "undefined" && (window as any).gtag) {
              (window as any).gtag("event", eventName, parameters);
            } else {
              console.warn(
                "Google Analytics tracking is not available. Make sure nuxt-gtag is properly configured."
              );
            }
          };
        }
      } catch (fallbackError) {
        console.warn(
          "Failed to initialize tracking. Falling back to direct gtag implementation."
        );
        trackEvent = (eventName: string, parameters?: Record<string, any>) => {
          if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", eventName, parameters);
          } else {
            console.warn("Google Analytics tracking is not available.");
          }
        };
      }
    }

    const trackCommerce = {
      /**
       * Track when a user views a single product.
       * @param item - The product being viewed
       */
      viewItem: (item: GA4Item) => trackEvent("view_item", { items: [item] }),

      /**
       * Track when a user views a list of products.
       * @param items - Array of products
       * @param listId - Optional list ID (e.g., "related_products")
       * @param listName - Optional list name (e.g., "Related Products")
       */
      viewItemList: (items: GA4Item[], listId?: string, listName?: string) =>
        trackEvent("view_item_list", {
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
        trackEvent("select_item", {
          item_list_id: listId,
          item_list_name: listName,
          items: [item],
        }),

      /**
       * Track when a product is added to the cart.
       * @param item - The product added
       */
      addToCart: (item: GA4Item) =>
        trackEvent("add_to_cart", { items: [item] }),

      /**
       * Track when a product is removed from the cart.
       * @param item - The product removed
       */
      removeFromCart: (item: GA4Item) =>
        trackEvent("remove_from_cart", { items: [item] }),

      /**
       * Track when the user views their shopping cart.
       * @param items - All items currently in the cart
       */
      viewCart: (items: GA4Item[]) => trackEvent("view_cart", { items }),

      /**
       * Track when checkout begins.
       * @param items - Items being purchased
       * @param coupon - Optional coupon code
       */
      beginCheckout: (items: GA4Item[], coupon?: string) =>
        trackEvent("begin_checkout", { coupon, items }),

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
        trackEvent("add_payment_info", {
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
        trackEvent("add_shipping_info", {
          shipping_tier: shippingTier,
          coupon,
          items,
        }),

      /**
       * Track when a purchase is completed.
       * @param order - Order details (transaction ID, total, currency, etc.)
       */
      purchase: (order: GA4Order) =>
        trackEvent("purchase", {
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
        trackEvent("refund", {
          transaction_id: orderId,
          items,
        }),
    };

    nuxtApp.provide("trackCommerce", trackCommerce);
  },
});
