# nuxt-track-commerce

A Nuxt 3 module that extends [`@nuxtjs/gtag`](https://github.com/nuxt-modules/gtag) with a **typed API for Google Analytics 4 (GA4) ecommerce events**.

✔️ Easy-to-use helpers for all GA4 ecommerce events  
✔️ Internally powered by `useTrackEvent` from `@nuxtjs/gtag`  
✔️ TypeScript support with autocompletion  
✔️ Works with JavaScript too  
✔️ Enforces `@nuxtjs/gtag` as a dependency  

---

## 🚀 Installation

```bash
npm install @nuxtjs/gtag nuxt-track-commerce
```

---

## ⚙️ Setup

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/gtag',
    'nuxt-track-commerce'
  ],
  gtag: {
    id: 'G-XXXXXXXXXX',
  }
})
```

---

## 📖 Usage

Injects `$trackCommerce` into the Nuxt app.

```vue
<script setup>
const { $trackCommerce } = useNuxtApp()

$trackCommerce.addToCart({
  item_id: 'SKU123',
  item_name: 'Hat',
  price: 25,
  quantity: 1,
})
</script>
```

---

## 🛒 API Reference

| Method | Event | Description |
|--------|-------|-------------|
| **`viewItem(item)`** | `view_item` | Track when a user views a single product. |
| **`viewItemList(items, listId?, listName?)`** | `view_item_list` | Track when a user views a list of products. |
| **`selectItem(item, listId?, listName?)`** | `select_item` | Track when a user selects a product from a list. |
| **`addToCart(item)`** | `add_to_cart` | Track when a product is added to the cart. |
| **`removeFromCart(item)`** | `remove_from_cart` | Track when a product is removed from the cart. |
| **`viewCart(items)`** | `view_cart` | Track when the user views their shopping cart. |
| **`beginCheckout(items, coupon?)`** | `begin_checkout` | Track when checkout begins. |
| **`addPaymentInfo(items, paymentType, coupon?)`** | `add_payment_info` | Track when payment info is added during checkout. |
| **`addShippingInfo(items, shippingTier, coupon?)`** | `add_shipping_info` | Track when shipping info is added during checkout. |
| **`purchase(order)`** | `purchase` | Track when a purchase is completed. |
| **`refund(orderId, items?)`** | `refund` | Track when a purchase is refunded. |

---

## 🍳 Cookbook Examples

### Add to Cart

```vue
<script setup>
const { $trackCommerce } = useNuxtApp()

$trackCommerce.addToCart({
  item_id: 'SKU123',
  item_name: 'Hat',
  price: 25,
  quantity: 1,
})
</script>
```

### Purchase

```vue
<script setup>
const { $trackCommerce } = useNuxtApp()

$trackCommerce.purchase({
  id: 'T12345',
  total: 100,
  currency: 'USD',
  tax: 8,
  shipping: 5,
  items: [
    { item_id: 'SKU123', item_name: 'Hat', price: 25, quantity: 2 }
  ],
})
</script>
```

(See full cookbook for all event types.)
