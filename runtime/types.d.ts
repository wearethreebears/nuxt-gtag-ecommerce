export interface IGA4Item {
  item_id?: string; // SKU or product ID
  item_name?: string; // Required if item_id not set
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
  currency?: string; // Allowed at item-level but usually event-level
}

export interface IGA4Order {
  transaction_id: string; // Required
  value: number; // Required: total revenue including tax+shipping
  currency: string; // Required
  tax?: number;
  shipping?: number;
  coupon?: string;
  items: IGA4Item[];
}

// --- Event parameter contracts ---

export interface IViewItemParams {
  currency: string;
  value: number;
  items: [IGA4Item]; // single item wrapped in array
}

export interface IViewItemListParams {
  items: IGA4Item[];
  item_list_id?: string;
  item_list_name?: string;
}

export interface ISelectItemParams {
  items: [IGA4Item];
  item_list_id?: string;
  item_list_name?: string;
}

export interface IAddToCartParams {
  currency: string;
  value: number;
  items: IGA4Item[];
}

export interface IRemoveFromCartParams {
  currency: string;
  value: number;
  items: IGA4Item[];
}

export interface IViewCartParams {
  currency: string;
  value: number;
  items: IGA4Item[];
}

export interface IBeginCheckoutParams {
  currency: string;
  value: number;
  items: IGA4Item[];
  coupon?: string;
}

export interface IAddPaymentInfoParams {
  currency: string;
  value: number;
  items: IGA4Item[];
  payment_type?: string;
  coupon?: string;
}

export interface IAddShippingInfoParams {
  currency: string;
  value: number;
  items: IGA4Item[];
  shipping_tier?: string;
  coupon?: string;
}

export interface IPurchaseParams extends IGA4Order {}

export interface IRefundParams {
  transaction_id: string;
  currency?: string;
  value?: number;
  items?: IGA4Item[];
}

// --- Tracker ---

export interface ITrackCommerce {
  viewItem: (params: IViewItemParams) => void;
  viewItemList: (params: IViewItemListParams) => void;
  selectItem: (params: ISelectItemParams) => void;
  addToCart: (params: IAddToCartParams) => void;
  removeFromCart: (params: IRemoveFromCartParams) => void;
  viewCart: (params: IViewCartParams) => void;
  beginCheckout: (params: IBeginCheckoutParams) => void;
  addPaymentInfo: (params: IAddPaymentInfoParams) => void;
  addShippingInfo: (params: IAddShippingInfoParams) => void;
  purchase: (params: IPurchaseParams) => void;
  refund: (params: IRefundParams) => void;
}

declare module "#app" {
  interface NuxtApp {
    $trackCommerce: ITrackCommerce;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $trackCommerce: ITrackCommerce;
  }
}

export {};
