export interface GA4Item {
  item_id?: string
  item_name?: string
  affiliation?: string
  coupon?: string
  currency?: string
  discount?: number
  index?: number
  item_brand?: string
  item_category?: string
  item_category2?: string
  item_category3?: string
  item_category4?: string
  item_category5?: string
  item_list_id?: string
  item_list_name?: string
  item_variant?: string
  location_id?: string
  price?: number
  quantity?: number
}

export interface GA4Order {
  id: string
  total: number
  currency: string
  tax?: number
  shipping?: number
  coupon?: string
  items: GA4Item[]
}

declare module '#app' {
  interface NuxtApp {
    $trackCommerce: {
      viewItem: (item: GA4Item) => void
      viewItemList: (items: GA4Item[], listId?: string, listName?: string) => void
      selectItem: (item: GA4Item, listId?: string, listName?: string) => void
      addToCart: (item: GA4Item) => void
      removeFromCart: (item: GA4Item) => void
      viewCart: (items: GA4Item[]) => void
      beginCheckout: (items: GA4Item[], coupon?: string) => void
      addPaymentInfo: (items: GA4Item[], paymentType: string, coupon?: string) => void
      addShippingInfo: (items: GA4Item[], shippingTier: string, coupon?: string) => void
      purchase: (order: GA4Order) => void
      refund: (orderId: string, items?: GA4Item[]) => void
    }
  }
}

export {}
