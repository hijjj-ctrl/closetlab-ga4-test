// ============================================================
// イベント送信 共通モジュール(GTM版)
// ------------------------------------------------------------
// ・すべてのイベントはこのファイルの sendEvent() 経由で、
//   Googleタグマネージャー(GTM-KVGTX6H4)のdataLayerへ送ります。
//   GA4への送信は、GTM側のタグ(GA4イベントタグ)が行います。
// ・eコマース系イベントは、GA4標準の ecommerce オブジェクト形式で送ります。
//     dataLayer.push({ ecommerce: null });
//     dataLayer.push({ event: "purchase", ecommerce: { ... } });
// ・それ以外のイベントは、パラメータをdataLayerの直下に平らに置いて送ります。
//     dataLayer.push({ event: "scroll_depth", percent_scrolled: 25, ... });
// ・新しいイベントを試したいときは、下に関数を追加するだけでOKです。
//   (GTM側にも、そのイベント用のトリガーとタグが必要です)
// ・ANALYTICS_DEBUG = true にすると、送信内容がコンソールに表示されます
//   (GTMのプレビューモードやGA4のDebugViewと合わせて確認すると分かりやすいです)。
// ============================================================

const ANALYTICS_DEBUG = true;

// ecommerceオブジェクトで送るイベント名(GA4推奨のeコマースイベント)
const ECOMMERCE_EVENTS = [
  "view_item_list", "select_item", "view_item", "add_to_cart", "add_to_wishlist",
  "remove_from_cart", "view_cart", "begin_checkout", "add_shipping_info",
  "add_payment_info", "purchase", "refund"
];

// ここに入れたパラメータは、すべてのイベントに自動で付与されます。
// (シミュレーションページが simulated=true などを入れるために使います)
window.ANALYTICS_EXTRA_PARAMS = window.ANALYTICS_EXTRA_PARAMS || {};

function sendEvent(eventName, params) {
  params = params || {};
  const extra = window.ANALYTICS_EXTRA_PARAMS;
  window.dataLayer = window.dataLayer || [];

  if (ECOMMERCE_EVENTS.indexOf(eventName) !== -1) {
    // 直前のecommerce情報が残らないよう、いったん空にしてから送る
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push(Object.assign({ event: eventName, ecommerce: params }, extra));
  } else {
    window.dataLayer.push(Object.assign({ event: eventName }, params, extra));
  }

  if (ANALYTICS_DEBUG) {
    console.log("[dataLayer event]", eventName, params, extra);
  }
}

// ---------- eコマース系イベント(GA4推奨イベント名に準拠) ----------

function trackViewItemList(products, listName) {
  sendEvent("view_item_list", {
    item_list_name: listName,
    items: products.map(p => toGA4Item(p))
  });
}

function trackSelectItem(product, listName) {
  sendEvent("select_item", {
    item_list_name: listName,
    items: [toGA4Item(product)]
  });
}

function trackViewItem(product) {
  sendEvent("view_item", {
    currency: "JPY",
    value: product.price,
    items: [toGA4Item(product)]
  });
}

function trackAddToCart(product, quantity, variant) {
  sendEvent("add_to_cart", {
    currency: "JPY",
    value: product.price * quantity,
    items: [Object.assign(toGA4Item(product, quantity), variant ? { item_variant: variant } : {})]
  });
}

function trackAddToWishlist(product) {
  sendEvent("add_to_wishlist", {
    currency: "JPY",
    value: product.price,
    items: [toGA4Item(product, 1)]
  });
}

function trackRemoveFromCart(product, quantity) {
  sendEvent("remove_from_cart", {
    currency: "JPY",
    value: product.price * quantity,
    items: [toGA4Item(product, quantity)]
  });
}

function trackViewCart(cartItems) {
  const value = cartItems.reduce((sum, c) => sum + c.price * c.qty, 0);
  sendEvent("view_cart", {
    currency: "JPY",
    value: value,
    items: cartItems.map(c => ({
      item_id: c.sku,
      item_name: c.name,
      item_category: c.category,
      item_brand: "TONE LAB",
      item_variant: c.variant || undefined,
      price: c.price,
      quantity: c.qty
    }))
  });
}

function trackBeginCheckout(cartItems) {
  const value = cartItems.reduce((sum, c) => sum + c.price * c.qty, 0);
  sendEvent("begin_checkout", {
    currency: "JPY",
    value: value,
    items: cartItems.map(c => ({
      item_id: c.sku,
      item_name: c.name,
      item_category: c.category,
      item_brand: "TONE LAB",
      item_variant: c.variant || undefined,
      price: c.price,
      quantity: c.qty
    }))
  });
}

function trackAddShippingInfo(cartItems, shippingTier) {
  const value = cartItems.reduce((sum, c) => sum + c.price * c.qty, 0);
  sendEvent("add_shipping_info", {
    currency: "JPY",
    value: value,
    shipping_tier: shippingTier,
    items: cartItems.map(c => ({
      item_id: c.sku, item_name: c.name, price: c.price, quantity: c.qty
    }))
  });
}

function trackAddPaymentInfo(cartItems, paymentType) {
  const value = cartItems.reduce((sum, c) => sum + c.price * c.qty, 0);
  sendEvent("add_payment_info", {
    currency: "JPY",
    value: value,
    payment_type: paymentType,
    items: cartItems.map(c => ({
      item_id: c.sku, item_name: c.name, price: c.price, quantity: c.qty
    }))
  });
}

function trackPurchase(transactionId, cartItems, shippingFee, coupon, discount) {
  const itemsValue = cartItems.reduce((sum, c) => sum + c.price * c.qty, 0);
  const params = {
    transaction_id: transactionId,
    currency: "JPY",
    value: itemsValue + (shippingFee || 0) - (discount || 0),
    shipping: shippingFee || 0,
    items: cartItems.map(c => ({
      item_id: c.sku, item_name: c.name, item_category: c.category,
      item_brand: "TONE LAB", item_variant: c.variant || undefined,
      price: c.price, quantity: c.qty
    }))
  };
  if (coupon) {
    params.coupon = coupon;
  }
  sendEvent("purchase", params);
}

function trackRefund(transactionId, value, cartItems) {
  sendEvent("refund", {
    transaction_id: transactionId,
    currency: "JPY",
    value: value,
    items: (cartItems || []).map(c => ({
      item_id: c.sku, item_name: c.name, price: c.price, quantity: c.qty
    }))
  });
}

// ---------- サイト回遊系イベント(幅広くシミュレーションするための独自イベント) ----------

// スクロール到達率(25/50/75/90%)
function initScrollTracking() {
  const thresholds = [25, 50, 75, 90];
  const fired = {};
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const percent = Math.round((scrollTop / docHeight) * 100);
    thresholds.forEach(t => {
      if (percent >= t && !fired[t]) {
        fired[t] = true;
        sendEvent("scroll_depth", { percent_scrolled: t, page_path: location.pathname });
      }
    });
  }, { passive: true });
}

// サイト外リンクのクリック(アウトバウンドリンク)
function initOutboundLinkTracking() {
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a[href]");
    if (!link) return;
    let url;
    try { url = new URL(link.href, location.href); } catch (err) { return; }
    if (url.hostname && url.hostname !== location.hostname) {
      sendEvent("click", {
        link_url: url.href,
        link_domain: url.hostname,
        outbound: true
      });
    }
  });
}

// PDF等のファイルダウンロードクリック
function initFileDownloadTracking() {
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (/\.(pdf|zip|docx?|xlsx?)$/i.test(href)) {
      sendEvent("file_download", {
        file_name: href.split("/").pop(),
        link_url: href
      });
    }
  });
}

// FAQの開閉(独自イベントの例)
function initFaqTracking() {
  document.querySelectorAll(".faq-item").forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        sendEvent("faq_open", {
          question: item.querySelector("summary").textContent.trim()
        });
      }
    });
  });
}

// 各ページ共通で読み込む初期化
function initCommonTracking() {
  initScrollTracking();
  initOutboundLinkTracking();
  initFileDownloadTracking();
  initFaqTracking();
}

document.addEventListener("DOMContentLoaded", initCommonTracking);
