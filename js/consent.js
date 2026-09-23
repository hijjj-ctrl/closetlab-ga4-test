// ============================================================
// Cookie同意バナー(学習用ダミー) + Google Consent Mode
// ------------------------------------------------------------
// ・各HTMLの<head>で、gtag('consent','default', {...}) により
//   「同意するまでは計測を制限する」状態を先に宣言しています。
// ・このスクリプトは、訪問者が「同意する/拒否する」を選んだタイミングで
//   gtag('consent','update', {...}) を呼び、状態を更新します。
// ・選択結果はlocalStorageに保存し、次回以降はバナーを出しません。
// ============================================================

const CONSENT_KEY = "closetlab_consent_v1";

function getStoredConsent() {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY));
  } catch (e) {
    return null;
  }
}

function applyConsent(choice) {
  // choice: "granted" または "denied"
  const consentState = {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice
  };

  if (typeof gtag === "function") {
    gtag("consent", "update", consentState);
  }

  localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice: choice, at: new Date().toISOString() }));

  // GA4上で同意状況の変化そのものを確認できるよう、独自イベントとしても送信
  sendEvent("consent_choice", { consent_choice: choice });

  hideConsentBanner();
}

function hideConsentBanner() {
  const banner = document.getElementById("consent-banner");
  if (banner) banner.remove();
}

function showConsentBanner() {
  if (document.getElementById("consent-banner")) return;

  const banner = document.createElement("div");
  banner.id = "consent-banner";
  banner.style.cssText =
    "position:fixed;left:0;right:0;bottom:0;z-index:80;background:var(--text);color:#fff;" +
    "padding:16px 20px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;" +
    "font-size:13px;box-shadow:0 -2px 12px rgba(0,0,0,0.15);";

  banner.innerHTML =
    '<span style="flex:1;min-width:220px;line-height:1.6">' +
      'このサイトでは、アクセス解析(GA4)のためCookieを使用します。これは学習用のダミーサイトの同意モード体験機能です。' +
    '</span>' +
    '<span style="display:flex;gap:8px;flex-shrink:0">' +
      '<button id="consent-decline" style="padding:10px 18px;border:1px solid #fff;background:transparent;color:#fff;border-radius:2px;font-size:13px;cursor:pointer">拒否する</button>' +
      '<button id="consent-accept" style="padding:10px 18px;border:none;background:#fff;color:var(--text);border-radius:2px;font-size:13px;cursor:pointer">同意する</button>' +
    '</span>';

  document.body.appendChild(banner);

  document.getElementById("consent-accept").addEventListener("click", () => applyConsent("granted"));
  document.getElementById("consent-decline").addEventListener("click", () => applyConsent("denied"));
}

document.addEventListener("DOMContentLoaded", function () {
  const stored = getStoredConsent();
  if (stored && stored.choice) {
    // 既に選択済みなら、その内容を再度gtagに反映してバナーは出さない
    applyConsentSilently(stored.choice);
  } else {
    showConsentBanner();
  }
});

function applyConsentSilently(choice) {
  const consentState = {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice
  };
  if (typeof gtag === "function") {
    gtag("consent", "update", consentState);
  }
}
