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
    const trackCommerce: ITrackCommerce = {
      /**
       * Track when a user views a single product.
       */
      viewItem: (params: IViewItemParams) => useTrackEvent("view_item", params),

      /**
       * Track when a user views a list of products.
       */
      viewItemList: (params: IViewItemListParams) =>
        useTrackEvent("view_item_list", params),

      /**
       * Track when a user selects a product from a list.
       */
      selectItem: (params: ISelectItemParams) =>
        useTrackEvent("select_item", params),

      /**
       * Track when a product is added to the cart.
       */
      addToCart: (params: IAddToCartParams) =>
        useTrackEvent("add_to_cart", params),

      /**
       * Track when a product is removed from the cart.
       */
      removeFromCart: (params: IRemoveFromCartParams) =>
        useTrackEvent("remove_from_cart", params),

      /**
       * Track when the user views their shopping cart.
       */
      viewCart: (params: IViewCartParams) => useTrackEvent("view_cart", params),

      /**
       * Track when checkout begins.
       */
      beginCheckout: (params: IBeginCheckoutParams) =>
        useTrackEvent("begin_checkout", params),

      /**
       * Track when payment info is added during checkout.
       */
      addPaymentInfo: (params: IAddPaymentInfoParams) =>
        useTrackEvent("add_payment_info", params),

      /**
       * Track when shipping info is added during checkout.
       */
      addShippingInfo: (params: IAddShippingInfoParams) =>
        useTrackEvent("add_shipping_info", params),

      /**
       * Track when a purchase is completed.
       */
      purchase: (params: IPurchaseParams) => useTrackEvent("purchase", params),

      /**
       * Track when a purchase is refunded.
       */
      refund: (params: IRefundParams) => useTrackEvent("refund", params),
    };

    nuxtApp.provide("trackCommerce", trackCommerce);
  },
});
