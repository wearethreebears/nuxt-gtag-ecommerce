/**
 * GA4 Item representation used across ecommerce events.
 * At least one of `item_id` or `item_name` should be provided by GA4 guidance.
 */
export interface IGA4Item {
  /** SKU or product ID */
  item_id?: string;
  /** Item name (required if `item_id` is not provided) */
  item_name?: string;
  affiliation?: string;
  coupon?: string;
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_id?: string;
  item_list_name?: string;
  item_variant?: string;
  location_id?: string;
  price?: number;
  quantity?: number;
  /** Allowed at item-level in GA4 but typically provided at event-level */
  currency?: string;
}

/**
 * GA4 Purchase/Order payload.
 */
export interface IGA4Order {
  /** Required. The unique transaction/order ID. */
  transaction_id: string;
  /** Required. Total revenue including tax and shipping. */
  value: number;
  /** Required. ISO currency code, e.g. 'USD'. */
  currency: string;
  tax?: number;
  shipping?: number;
  coupon?: string;
  items: IGA4Item[];
}

// --- Event parameter contracts ---

/** Parameters for GA4 `view_item`. Must wrap a single item in `items`. */
export interface IViewItemParams {
  currency: string;
  value: number;
  /** Single item wrapped in array */
  items: [IGA4Item];
}

/** Parameters for GA4 `view_item_list`. */
export interface IViewItemListParams {
  items: IGA4Item[];
  item_list_id?: string;
  item_list_name?: string;
}

/** Parameters for GA4 `select_item`. Should include a single selected item. */
export interface ISelectItemParams {
  /** Single item wrapped in array */
  items: [IGA4Item];
  item_list_id?: string;
  item_list_name?: string;
}

/** Parameters for GA4 `add_to_cart`. */
export interface IAddToCartParams {
  currency: string;
  value: number;
  items: IGA4Item[];
}

/** Parameters for GA4 `remove_from_cart`. */
export interface IRemoveFromCartParams {
  currency: string;
  value: number;
  items: IGA4Item[];
}

/** Parameters for GA4 `view_cart`. */
export interface IViewCartParams {
  currency: string;
  value: number;
  items: IGA4Item[];
}

/** Parameters for GA4 `begin_checkout`. */
export interface IBeginCheckoutParams {
  currency: string;
  value: number;
  items: IGA4Item[];
  coupon?: string;
}

/** Parameters for GA4 `add_payment_info`. */
export interface IAddPaymentInfoParams {
  currency: string;
  value: number;
  items: IGA4Item[];
  payment_type?: string;
  coupon?: string;
}

/** Parameters for GA4 `add_shipping_info`. */
export interface IAddShippingInfoParams {
  currency: string;
  value: number;
  items: IGA4Item[];
  shipping_tier?: string;
  coupon?: string;
}

/** Parameters for GA4 `purchase`. */
export interface IPurchaseParams extends IGA4Order {}

/** Parameters for GA4 `refund`. */
export interface IRefundParams {
  transaction_id: string;
  currency?: string;
  value?: number;
  items?: IGA4Item[];
}

// --- Tracker ---

/**
 * Public ecommerce tracker API injected as `$trackCommerce`.
 */
export interface ITrackCommerce {
  /** GA4 `view_item` */
  viewItem: (params: IViewItemParams) => void;
  /** GA4 `view_item_list` */
  viewItemList: (params: IViewItemListParams) => void;
  /** GA4 `select_item` */
  selectItem: (params: ISelectItemParams) => void;
  /** GA4 `add_to_cart` */
  addToCart: (params: IAddToCartParams) => void;
  /** GA4 `remove_from_cart` */
  removeFromCart: (params: IRemoveFromCartParams) => void;
  /** GA4 `view_cart` */
  viewCart: (params: IViewCartParams) => void;
  /** GA4 `begin_checkout` */
  beginCheckout: (params: IBeginCheckoutParams) => void;
  /** GA4 `add_payment_info` */
  addPaymentInfo: (params: IAddPaymentInfoParams) => void;
  /** GA4 `add_shipping_info` */
  addShippingInfo: (params: IAddShippingInfoParams) => void;
  /** GA4 `purchase` */
  purchase: (params: IPurchaseParams) => void;
  /** GA4 `refund` */
  refund: (params: IRefundParams) => void;
}

declare module "#app" {
  interface NuxtApp {
    /**
     * Ecommerce tracker helpers for GA4 events.
     * Usage: `const { $trackCommerce } = useNuxtApp()`
     */
    $trackCommerce: ITrackCommerce;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    /** Available as `this.$trackCommerce` in Options API components */
    $trackCommerce: ITrackCommerce;
  }
}

export {};
