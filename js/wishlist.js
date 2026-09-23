// ============================================================
// ウィッシュリスト管理(ブラウザのlocalStorageのみで完結)
// カートとは別に「興味はあるが未購入」の商品を保存します。
// ============================================================

const WISHLIST_KEY = "closetlab_wishlist_v1";

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  updateWishlistBadge();
}

function isInWishlist(productId) {
  return getWishlist().some(w => w.id === productId);
}

function addToWishlist(product) {
  const list = getWishlist();
  if (!list.some(w => w.id === product.id)) {
    list.push({
      id: product.id,
      sku: product.sku,
      name: product.name,
      category: product.category,
      price: product.price,
      color: product.color
    });
    saveWishlist(list);
  }
}

function removeFromWishlist(productId) {
  const list = getWishlist().filter(w => w.id !== productId);
  saveWishlist(list);
}

function toggleWishlist(product) {
  if (isInWishlist(product.id)) {
    removeFromWishlist(product.id);
    return false;
  } else {
    addToWishlist(product);
    return true;
  }
}

function updateWishlistBadge() {
  const badge = document.querySelector("[data-wishlist-badge]");
  if (!badge) return;
  const count = getWishlist().length;
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-flex" : "none";
}

document.addEventListener("DOMContentLoaded", updateWishlistBadge);
