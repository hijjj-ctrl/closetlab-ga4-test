// ============================================================
// GA4イベント送信 共通モジュール
// ------------------------------------------------------------
// ・すべてのGA4イベントはこのファイルの sendEvent() 経由で送信します。
// ・新しいイベントを試したいときは、下に関数を追加するだけでOKです。
// ・DEBUG = true にすると、送信内容がコンソールに表示されます
//   (GA4のDebugViewと合わせて確認すると分かりやすいです)。
// ============================================================

const ANALYTICS_DEBUG = true;

function sendEvent(eventName, params) {
  params = params || {};
  if (ANALYTICS_DEBUG) {
    console.log("[GA4 event]", eventName, params);
  }
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
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

function trackAddToCart(product, quantity) {
  sendEvent("add_to_cart", {
    currency: "JPY",
    value: product.price * quantity,
    items: [toGA4Item(product, quantity)]
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

function trackPurchase(transactionId, cartItems, shippingFee) {
  const itemsValue = cartItems.reduce((sum, c) => sum + c.price * c.qty, 0);
  sendEvent("purchase", {
    transaction_id: transactionId,
    currency: "JPY",
    value: itemsValue + (shippingFee || 0),
    shipping: shippingFee || 0,
    items: cartItems.map(c => ({
      item_id: c.sku, item_name: c.name, item_category: c.category,
      item_brand: "TONE LAB", price: c.price, quantity: c.qty
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
