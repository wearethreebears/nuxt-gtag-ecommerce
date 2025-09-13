import { defineNuxtPlugin } from "#app";
import { useTrackEvent } from "#imports";
import type {
  IViewItemParams,
  IViewItemListParams,
  ISelectItemParams,
  IAddToCartParams,
  IRemoveFromCartParams,
  IViewCartParams,
  IBeginCheckoutParams,
  IAddPaymentInfoParams,
  IAddShippingInfoParams,
  IPurchaseParams,
  IRefundParams,
  ITrackCommerce,
} from "../types";

export default defineNuxtPlugin({
  name: "nuxt-gtag-ecommerce",
  dependsOn: ["nuxt-gtag"],
  setup(nuxtApp) {
    /**
     * Typed helpers for Google Analytics 4 (GA4) Ecommerce events.
     *
     * Each method delegates to `useTrackEvent(eventName, params)` provided by `nuxt-gtag`.
     * All payloads are typed according to GA4 ecommerce event parameter contracts.
     *
     * See also:
     * - https://developers.google.com/analytics/devguides/collection/ga4/reference/events
     */
    const trackCommerce: ITrackCommerce = {
      /**
       * Track when a user views a single product.
       * GA4 event: `view_item`.
       * @param params - Parameters for a single item view. Must contain exactly one item in `items`.
       * @returns void
       * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item
       */
      viewItem: (params: IViewItemParams) => useTrackEvent("view_item", params),

      /**
       * Track when a user views a list of products.
       * GA4 event: `view_item_list`.
       * @param params - Parameters for a list view, including `items` and optional `item_list_id`/`item_list_name`.
       * @returns void
       * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item_list
       */
      viewItemList: (params: IViewItemListParams) =>
        useTrackEvent("view_item_list", params),

      /**
       * Track when a user selects a product from a list.
       * GA4 event: `select_item`.
       * @param params - Parameters for a selected item, including `items` and optional `item_list_id`/`item_list_name`.
       * @returns void
       * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_item
       */
      selectItem: (params: ISelectItemParams) =>
        useTrackEvent("select_item", params),

      /**
       * Track when a product is added to the cart.
       * GA4 event: `add_to_cart`.
       * @param params - Parameters including `currency`, `value`, and cart `items`.
       * @returns void
       * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_cart
       */
      addToCart: (params: IAddToCartParams) =>
        useTrackEvent("add_to_cart", params),

      /**
       * Track when a product is removed from the cart.
       * GA4 event: `remove_from_cart`.
       * @param params - Parameters including `currency`, `value`, and cart `items` to remove.
       * @returns void
       * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#remove_from_cart
       */
      removeFromCart: (params: IRemoveFromCartParams) =>
        useTrackEvent("remove_from_cart", params),

      /**
       * Track when the user views their shopping cart.
       * GA4 event: `view_cart`.
       * @param params - Parameters including `currency`, `value`, and current cart `items`.
       * @returns void
       * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_cart
       */
      viewCart: (params: IViewCartParams) => useTrackEvent("view_cart", params),

      /**
       * Track when checkout begins.
       * GA4 event: `begin_checkout`.
       * @param params - Parameters including `currency`, `value`, selected `items`, and optional `coupon`.
       * @returns void
       * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout
       */
      beginCheckout: (params: IBeginCheckoutParams) =>
        useTrackEvent("begin_checkout", params),

      /**
       * Track when payment info is added during checkout.
       * GA4 event: `add_payment_info`.
       * @param params - Parameters including `currency`, `value`, `items`, and optional `payment_type`/`coupon`.
       * @returns void
       * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_payment_info
       */
      addPaymentInfo: (params: IAddPaymentInfoParams) =>
        useTrackEvent("add_payment_info", params),

      /**
       * Track when shipping info is added during checkout.
       * GA4 event: `add_shipping_info`.
       * @param params - Parameters including `currency`, `value`, `items`, and optional `shipping_tier`/`coupon`.
       * @returns void
       * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_shipping_info
       */
      addShippingInfo: (params: IAddShippingInfoParams) =>
        useTrackEvent("add_shipping_info", params),

      /**
       * Track when a purchase is completed.
       * GA4 event: `purchase`.
       * @param params - Completed order details including `transaction_id`, `value`, `currency`, and `items`.
       * @returns void
       * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase
       */
      purchase: (params: IPurchaseParams) => useTrackEvent("purchase", params),

      /**
       * Track when a purchase is refunded.
       * GA4 event: `refund`.
       * @param params - Refund details for a transaction via `transaction_id`, with optional `value` and `items`.
       * @returns void
       * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#refund
       */
      refund: (params: IRefundParams) => useTrackEvent("refund", params),
    };

    nuxtApp.provide("trackCommerce", trackCommerce);
  },
});
