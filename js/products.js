// ============================================================
// 商品マスタデータ(ダミー)
// GA4のitemsパラメータに使う情報をここに集約しています。
// 商品を増やしたい場合はこの配列に追記してください。
// ============================================================
const PRODUCTS = [
  {
    id: "1",
    sku: "SKU001",
    name: "リボンブラウス",
    category: "トップス",
    price: 6900,
    color: "#C97B5B",
    desc: "シルクのような肌触りのドレープ素材。上品な光沢感が、いつものコーディネートを格上げします。",
    image: "assets/images/product-1.jpg" // ご自身のChatGPT生成画像に差し替えてください
  },
  {
    id: "2",
    sku: "SKU002",
    name: "マーメイドスカート",
    category: "ボトムス",
    price: 8900,
    color: "#8C6A4F",
    desc: "美しいシルエットを追求したマーメイドライン。オフィスにもお出かけにも馴染みます。",
    image: "assets/images/product-2.jpg"
  },
  {
    id: "3",
    sku: "SKU003",
    name: "コットンジャケット",
    category: "アウター",
    price: 15900,
    color: "#6E6A4F",
    desc: "コットン100%。軽やかな着心地とナチュラルな風合いが魅力の一着です。",
    image: "assets/images/product-3.jpg"
  },
  {
    id: "4",
    sku: "SKU004",
    name: "バレエシューズ",
    category: "シューズ",
    price: 5900,
    color: "#A6785F",
    desc: "軽量でやわらかなレザー素材。長時間歩いても疲れにくい設計です。",
    image: "assets/images/product-4.jpg"
  }
];

// GA4のitem形式に変換するヘルパー
function toGA4Item(product, quantity) {
  return {
    item_id: product.sku,
    item_name: product.name,
    item_category: product.category,
    item_brand: "Closet Lab",
    price: product.price,
    quantity: quantity || 1
  };
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === String(id));
}
