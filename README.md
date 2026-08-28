# Closet Lab - Dummy for GA4

GA4学習・イベントシミュレーション用のダミーECサイトです。
サーバーサイド処理は一切なく、GitHub Pages(無料)でそのまま公開できます。

---

## 1. GA4測定IDの設定(必須)

以下の5ファイルすべてに `G-XXXXXXXXXX` が2箇所ずつ(scriptタグのsrcと`gtag('config', ...)`)あります。
ご自身のGA4測定IDに置き換えてください。

- index.html
- product.html
- cart.html
- checkout.html
- thanks.html

置き換え例(Macのターミナル/GitHub CodespacesなどLinux系シェルの場合):

```
grep -rl "G-XXXXXXXXXX" . | xargs sed -i '' 's/G-XXXXXXXXXX/G-あなたの測定ID/g'
```

(Linuxの場合は `sed -i` の後の `''` は不要です)

---

## 2. GitHub Pagesでの公開手順

1. GitHubで新しいリポジトリを作成(Public / Privateどちらでも可。Privateの場合は無料プランだとGitHub Pagesが使えないプランもあるため、学習用途ならPublic推奨。ただし中身は公開されます)
2. このフォルダの中身一式をリポジトリにアップロード(GitHub Desktop、`git push`、またはWeb UIのドラッグ&ドロップでOK)
3. リポジトリの Settings → Pages を開く
4. 「Branch」を `main` / フォルダを `/root(または/docs)` に設定してSave
5. 数分後、`https://ユーザー名.github.io/リポジトリ名/` で公開されます

---

## 3. セキュリティ・プライバシーのチェックリスト

- [ ] GA4測定IDを置き換えた(本番プロパティと混同しないよう、テスト専用プロパティ推奨)
- [ ] `robots.txt` と各ページの `<meta name="robots" content="noindex,nofollow">` により検索エンジンにインデックスされない設定にしてある(すでに設定済み)
- [ ] チェックアウトページのフォームには実在の個人情報を入力しない(架空の情報を使う)
- [ ] 商品画像・カタログPDFはご自身の著作物(ChatGPT生成物など)のみを使用し、他サイトの画像を直接リンクしない
- [ ] リポジトリに `.env` やAPIキー、Measurement Protocolの「APIシークレット」などは絶対に含めない(本サイトはgtag.jsのみのクライアント計測なので、そもそも不要です)
- [ ] GA4の管理画面で「内部トラフィックの定義」を設定し、自分のアクセスを本番集計から除外する運用にする(テスト専用プロパティなら不要)

---

## 4. 実装済みのGA4イベント一覧

| イベント名 | 発生タイミング | 主なパラメータ |
|---|---|---|
| page_view | 全ページ表示時(gtag.js自動) | page_location, page_title |
| view_item_list | トップページのラインナップ表示時 | item_list_name, items[] |
| select_item | 商品カードの「詳細を見る」クリック時 | item_list_name, items[] |
| view_item | 商品詳細ページ表示時 | value, items[] |
| add_to_cart | 「カートに追加」クリック時(トップ/詳細ページ両方) | value, items[] |
| remove_from_cart | カートページで商品削除時 | value, items[] |
| view_cart | カートページ表示時(商品がある場合) | value, items[] |
| begin_checkout | 「購入手続きへ進む」クリック時 | value, items[] |
| add_shipping_info | 配送方法選択時 | shipping_tier, value |
| add_payment_info | 支払い方法選択時 | payment_type, value |
| purchase | 「注文を確定する」クリック時 | transaction_id, value, shipping, items[] |
| scroll_depth(独自) | ページを25/50/75/90%スクロール時 | percent_scrolled |
| click(outbound=true)(独自) | 外部サイトへのリンククリック時 | link_url, link_domain |
| file_download(独自) | PDF等のリンククリック時 | file_name, link_url |
| faq_open(独自) | FAQの項目を開いた時 | question |

すべて `js/analytics.js` の `sendEvent()` を経由しています。
新しいイベントを試したい場合は、この関数を呼び出す形で追加してください。
`ANALYTICS_DEBUG = true` の間は、ブラウザのコンソールに送信内容が表示されます。

---

## 5. カート機能について

カートの中身はブラウザの `localStorage` にのみ保存され、外部には一切送信されません。
別のブラウザ・別の端末からは共有されません(学習用の簡易実装のため)。

---

## 6. よくあるつまずきポイント

- GA4のリアルタイムレポート/DebugViewに反映されない → 測定IDの置き換え漏れがないか確認
- 画像が色付きの四角のまま → `assets/images/` に画像を配置し、`js/products.js` の `image` パスと `index.html` / `product.html` の表示部分を差し替えてください(現状はCSSの色プレースホルダーで表示しています)
- カタログPDFのリンクが404になる → `assets/pdf/catalog.pdf` にファイルを配置してください
