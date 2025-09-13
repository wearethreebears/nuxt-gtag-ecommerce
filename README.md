# @ohto/nuxt-gtag-ecommerce

A Nuxt 3 module that extends [`nuxt-gtag`](https://nuxt.com/modules/gtag) with a typed API for Google Analytics 4 (GA4) ecommerce events.

- Typed helpers for all GA4 ecommerce events
- Powered by `useTrackEvent` from `nuxt-gtag`
- TypeScript-first (works great with JavaScript too)

Client-only plugin: events are sent from the browser.

---

## Installation

Use your preferred package manager:

```bash
npm install nuxt-gtag @ohto/nuxt-gtag-ecommerce
# or
pnpm add nuxt-gtag @ohto/nuxt-gtag-ecommerce
# or
yarn add nuxt-gtag @ohto/nuxt-gtag-ecommerce
```

Peer requirements:

- nuxt >= 3
- nuxt-gtag >= 4

---

## Setup

Add both modules to `nuxt.config.ts` in this order (gtag first):

```ts
export default defineNuxtConfig({
  modules: [
    "nuxt-gtag", // must be before the ecommerce module
    "@ohto/nuxt-gtag-ecommerce",
  ],
  gtag: {
    id: "G-XXXXXXXXXX",
  },
});
```

$trackCommerce is injected into the app context and component instance:

- Composition API: `const { $trackCommerce } = useNuxtApp()`
- Options API: `this.$trackCommerce`

---

## Types

All payloads are typed. You can import the types if you want explicit annotations:

```ts
import type {
  IGA4Item,
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
} from "@ohto/nuxt-gtag-ecommerce";
```

Notes:

- GA4 expects `items` arrays. For single-item events like `viewItem` and `selectItem`, pass a single-element array.
- Provide `currency` and `value` at the event level where required by GA4.

---

## API Reference and Examples

Each method calls the matching GA4 ecommerce event under the hood.

### viewItem — `view_item`

```vue
<script setup lang="ts">
import type { IGA4Item, IViewItemParams } from "@ohto/nuxt-gtag-ecommerce";
const { $trackCommerce } = useNuxtApp();

const item: IGA4Item = {
  item_id: "SKU123",
  item_name: "Hat",
  price: 25,
  quantity: 1,
};
const payload: IViewItemParams = { currency: "USD", value: 25, items: [item] };

$trackCommerce.viewItem(payload);
</script>
```

### viewItemList — `view_item_list`

```vue
<script setup lang="ts">
import type { IGA4Item, IViewItemListParams } from "@ohto/nuxt-gtag-ecommerce";
const { $trackCommerce } = useNuxtApp();

const items: IGA4Item[] = [
  { item_id: "SKU123", item_name: "Hat", price: 25, quantity: 1 },
  { item_id: "SKU456", item_name: "Scarf", price: 15, quantity: 1 },
];
const payload: IViewItemListParams = {
  items,
  item_list_id: "home_rec_1",
  item_list_name: "Recommended",
};

$trackCommerce.viewItemList(payload);
</script>
```

### selectItem — `select_item`

```vue
<script setup lang="ts">
import type { IGA4Item, ISelectItemParams } from "@ohto/nuxt-gtag-ecommerce";
const { $trackCommerce } = useNuxtApp();

const selected: IGA4Item = {
  item_id: "SKU456",
  item_name: "Scarf",
  price: 15,
  quantity: 1,
};
const payload: ISelectItemParams = {
  items: [selected],
  item_list_id: "home_rec_1",
  item_list_name: "Recommended",
};

$trackCommerce.selectItem(payload);
</script>
```

### addToCart — `add_to_cart`

```vue
<script setup lang="ts">
import type { IGA4Item, IAddToCartParams } from "@ohto/nuxt-gtag-ecommerce";
const { $trackCommerce } = useNuxtApp();

const item: IGA4Item = {
  item_id: "SKU123",
  item_name: "Hat",
  price: 25,
  quantity: 1,
};
const payload: IAddToCartParams = { currency: "USD", value: 25, items: [item] };

$trackCommerce.addToCart(payload);
</script>
```

### removeFromCart — `remove_from_cart`

```vue
<script setup lang="ts">
import type {
  IGA4Item,
  IRemoveFromCartParams,
} from "@ohto/nuxt-gtag-ecommerce";
const { $trackCommerce } = useNuxtApp();

const item: IGA4Item = {
  item_id: "SKU123",
  item_name: "Hat",
  price: 25,
  quantity: 1,
};
const payload: IRemoveFromCartParams = {
  currency: "USD",
  value: 25,
  items: [item],
};

$trackCommerce.removeFromCart(payload);
</script>
```

### viewCart — `view_cart`

```vue
<script setup lang="ts">
import type { IGA4Item, IViewCartParams } from "@ohto/nuxt-gtag-ecommerce";
const { $trackCommerce } = useNuxtApp();

const items: IGA4Item[] = [
  { item_id: "SKU123", item_name: "Hat", price: 25, quantity: 1 },
  { item_id: "SKU456", item_name: "Scarf", price: 15, quantity: 2 },
];
const payload: IViewCartParams = { currency: "USD", value: 55, items };

$trackCommerce.viewCart(payload);
</script>
```

### beginCheckout — `begin_checkout`

```vue
<script setup lang="ts">
import type { IGA4Item, IBeginCheckoutParams } from "@ohto/nuxt-gtag-ecommerce";
const { $trackCommerce } = useNuxtApp();

const items: IGA4Item[] = [
  { item_id: "SKU123", item_name: "Hat", price: 25, quantity: 1 },
];
const payload: IBeginCheckoutParams = {
  currency: "USD",
  value: 25,
  items,
  coupon: "WELCOME10",
};

$trackCommerce.beginCheckout(payload);
</script>
```

### addPaymentInfo — `add_payment_info`

```vue
<script setup lang="ts">
import type {
  IGA4Item,
  IAddPaymentInfoParams,
} from "@ohto/nuxt-gtag-ecommerce";
const { $trackCommerce } = useNuxtApp();

const items: IGA4Item[] = [
  { item_id: "SKU123", item_name: "Hat", price: 25, quantity: 1 },
];
const payload: IAddPaymentInfoParams = {
  currency: "USD",
  value: 25,
  items,
  payment_type: "card",
};

$trackCommerce.addPaymentInfo(payload);
</script>
```

### addShippingInfo — `add_shipping_info`

```vue
<script setup lang="ts">
import type {
  IGA4Item,
  IAddShippingInfoParams,
} from "@ohto/nuxt-gtag-ecommerce";
const { $trackCommerce } = useNuxtApp();

const items: IGA4Item[] = [
  { item_id: "SKU123", item_name: "Hat", price: 25, quantity: 1 },
];
const payload: IAddShippingInfoParams = {
  currency: "USD",
  value: 30,
  items,
  shipping_tier: "express",
};

$trackCommerce.addShippingInfo(payload);
</script>
```

### purchase — `purchase`

```vue
<script setup lang="ts">
import type { IPurchaseParams } from "@ohto/nuxt-gtag-ecommerce";
const { $trackCommerce } = useNuxtApp();

const payload: IPurchaseParams = {
  transaction_id: "T12345",
  value: 100,
  currency: "USD",
  tax: 8,
  shipping: 5,
  items: [
    { item_id: "SKU123", item_name: "Hat", price: 25, quantity: 2 },
    { item_id: "SKU456", item_name: "Scarf", price: 15, quantity: 2 },
  ],
};

$trackCommerce.purchase(payload);
</script>
```

### refund — `refund`

```vue
<script setup lang="ts">
import type { IRefundParams } from "@ohto/nuxt-gtag-ecommerce";
const { $trackCommerce } = useNuxtApp();

const payload: IRefundParams = {
  transaction_id: "T12345",
  // optional: value, currency, items
};

$trackCommerce.refund(payload);
</script>
```

---

## Notes

- The module logs a console warning if `nuxt-gtag` isn’t found in your modules list, but still registers client helpers in case `gtag` is available via another path.
- Events are only sent client-side (plugin is `mode: 'client'`).

---

## License

MIT
