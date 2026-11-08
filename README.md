# TONE LAB - Dummy for GA4

GA4・GTM・BigQuery・Looker Studio の学習用に作った、架空のECサイトです。
サーバー側の処理は一切なく、GitHub Pages(無料)でそのまま公開できます。

- 計測: **Googleタグマネージャー(GTM-KVGTX6H4)** → GA4(測定ID `G-BQ4DZSXQY0`)
- 各ページは gtag.js を直接読み込みません。GA4への送信は、すべてGTMのタグが行います。

---

## 1. 計測のしくみ(GTM)

1. 各HTMLの `<head>` に、同意モードの既定値 → GTMスニペットの順で入っています。`<body>` 直後には noscript 版が入っています。
2. サイトのJS(`js/analytics.js`)が、イベントを `dataLayer.push()` で送ります。
   - eコマース系: `{ event: "purchase", ecommerce: { ... } }`(GA4標準の形)
   - それ以外: `{ event: "scroll_depth", percent_scrolled: 25, ... }`(パラメータを平らに置く)
3. GTM側で、イベントごとにトリガーとGA4タグを用意して、GA4へ送ります。
   設定方法は `gtm/GTM設定ガイド.md` を見てください(JSONのインポートでも、手作業でも設定できます)。
4. 設定したら、必ずGTMの「プレビュー」で動作を確認してから「公開」します。

`gtm/` フォルダは、手元で使う資料です。GitHubにアップロードしなくて大丈夫です。

---

## 2. ページ構成

| ファイル | 内容 |
|---|---|
| index.html | トップ(ヒーロー、コンセプト、ピックアップ商品6点、カタログ、ジャーナル、FAQ) |
| products.html | 商品一覧(全12点とカテゴリ絞り込み) |
| product.html | 商品詳細(カラー・サイズ選択、カートに追加、お気に入り、関連商品) |
| cart.html / checkout.html / thanks.html | カート → 購入手続き → 完了 |
| wishlist.html | お気に入り |
| journal.html | ジャーナル記事(動画記事は視聴計測つき) |
| search.html | サイト内検索 |
| contact.html | お問い合わせ(generate_lead) |
| 404.html | ページが見つからないとき(page_not_found) |
| simulate.html | **イベントシミュレーター**(ECイベントをまとめて自動送信、UTM付きリンク集) |

データの置き場所:
- 商品: `js/products.js`(12点。色・サイズも、ここで設定)
- ジャーナル記事: `js/journal.js`(新しい記事ほど上に追加)
- 配色: `css/style.css` の先頭の `:root`(ナチュラルカラー)

---

## 3. 画像・PDFの置き場所(assets/)

`assets/images/`
- `hero.jpg` … トップのヒーロー画像
- `product-1.jpg` 〜 `product-12.jpg` … 商品画像
- `journal-1.jpg` 初回購入特典 / `journal-2.jpg` リボンブラウス再入荷 / `journal-3.jpg` 新作予約開始 / `journal-4.jpg` 年末年始休業 / `journal-5.jpg` サイトリニューアル
- `favicon.png` … ファビコン
- `contact-hero.jpg`(または `.png`)、`404-image.jpg`(または `.png`) … どちらの拡張子でも表示されます

`assets/pdf/catalog.pdf` … カタログ(CATALOGリンク・file_downloadイベントの確認に使います)

※ 実在の人物・住所・電話番号・地名などが写り込んだ画像は使わないでください。

---

## 4. GitHub Pagesでの公開

1. Settings → Pages で、Branch を `main` / `/ (root)` に設定します。
2. ファイルは、リポジトリの直下に置きます(`js/`、`css/`、`assets/` はフォルダごと)。
3. 更新後は、スーパーリロード(Shift+再読み込み)で、古いキャッシュを消して確認します。

---

## 5. セキュリティ・プライバシーのチェックリスト

- [ ] 本番のGA4プロパティと混同しない(テスト専用プロパティで使う)
- [ ] `robots.txt` と各ページの `noindex,nofollow` で、検索エンジンにインデックスされない設定にしてある
- [ ] フォームには、実在の個人情報を入力しない(架空の情報を使う)
- [ ] 画像・PDFは、自分で作ったもの、または利用許諾のあるものだけを使う。他サイトの画像は直接リンクしない
- [ ] リポジトリに、APIキー・Measurement Protocolのシークレットなどを入れない
- [ ] GA4で「Googleシグナル」は有効にしない
- [ ] GTMのコンテナに、本番サイトの計測タグを入れない

---

## 6. 計測しているイベント

### eコマース(GA4推奨イベント)
view_item_list / select_item / view_item / add_to_cart / add_to_wishlist / remove_from_cart /
view_cart / begin_checkout / add_shipping_info / add_payment_info / purchase / refund

商品ページで選んだカラー・サイズは、`item_variant`(例: `ダスティブルー / M`)で送ります。
購入時は、`coupon`(WELCOME10)と、送料 `shipping` も送ります。

### 回遊・その他
| イベント | タイミング | 主なパラメータ |
|---|---|---|
| page_view | ページ表示(GTMのGoogleタグ) | page_location, page_title |
| scroll_depth | スクロール 25/50/75/90% | percent_scrolled, page_path |
| click | 外部リンクのクリック | link_url, link_domain, outbound |
| file_download | PDF等のクリック | file_name, link_url |
| faq_open | FAQの開閉 | question |
| select_content | ジャーナル記事のクリック・閲覧 | content_type, item_id, content_title |
| view_search_results | サイト内検索 | search_term, results_count |
| filter_select | ラインナップのカテゴリ絞り込み | filter_name, filter_value |
| generate_lead / form_start | お問い合わせ | lead_type, form_name |
| consent_choice | Cookie同意バナーの選択 | consent_choice |
| video_start / video_progress / video_complete | 動画記事の視聴 | video_title, video_percent など |
| page_not_found | 404の表示 | page_path, page_referrer |

### シミュレーター(simulate.html)が付けるパラメータ
`simulated=true`、`sim_run_id`(1人分の買い物ごとのID)。
GA4の「カスタム定義」で、イベントスコープのカスタムディメンションとして登録すると、レポートで使えます。
(すべて、このブラウザ1台から送るため、ユーザー数は増えず、イベント数・購入数・売上が増えます)

---

## 7. 同意モード(Consent Mode)

- 既定値は、すべて `denied`(同意前は、計測を制限)。バナーで「同意する」を選ぶと `granted` に更新されます。
- 選択は、ブラウザの localStorage に保存され、次回以降は、最初から反映されます。
- 試したいときは、開発者ツールで `closetlab_consent_v1` を削除して、再読み込みしてください。
