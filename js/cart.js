// ============================================================
// カート管理(ブラウザのlocalStorageのみで完結・サーバー送信なし)
// 個人情報も外部送信も一切行いません。学習用のダミー実装です。
// ============================================================

const CART_KEY = "closetlab_cart_v1";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product, quantity) {
  const cart = getCart();
  const existing = cart.find(c => c.id === product.id);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({
      id: product.id,
      sku: product.sku,
      name: product.name,
      category: product.category,
      price: product.price,
      qty: quantity
    });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(c => c.id !== productId);
  saveCart(cart);
}

function updateQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(c => c.id === productId);
  if (item) {
    item.qty = Math.max(1, quantity);
  }
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function cartTotal(cart) {
  return cart.reduce((sum, c) => sum + c.price * c.qty, 0);
}

function updateCartBadge() {
  const badge = document.querySelector("[data-cart-badge]");
  if (!badge) return;
  const count = getCart().reduce((sum, c) => sum + c.qty, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-flex" : "none";
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
