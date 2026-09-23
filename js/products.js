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
    color: "#2E2E2E",
    desc: "シルクのような肌触りのドレープ素材。上品な光沢感が、いつものコーディネートを格上げします。",
    image: "assets/images/product-1.jpg" // ご自身のChatGPT生成画像に差し替えてください
  },
  {
    id: "2",
    sku: "SKU002",
    name: "マーメイドスカート",
    category: "ボトムス",
    price: 8900,
    color: "#1A1A1A",
    desc: "美しいシルエットを追求したマーメイドライン。オフィスにもお出かけにも馴染みます。",
    image: "assets/images/product-2.jpg"
  },
  {
    id: "3",
    sku: "SKU003",
    name: "コットンジャケット",
    category: "アウター",
    price: 15900,
    color: "#4A4A4A",
    desc: "コットン100%。軽やかな着心地とナチュラルな風合いが魅力の一着です。",
    image: "assets/images/product-3.jpg"
  },
  {
    id: "4",
    sku: "SKU004",
    name: "バレエシューズ",
    category: "シューズ",
    price: 5900,
    color: "#606060",
    desc: "軽量でやわらかなレザー素材。長時間歩いても疲れにくい設計です。",
    image: "assets/images/product-4.jpg"
  },
  {
    id: "5",
    sku: "SKU005",
    name: "カシミアのモヘアセーター",
    category: "トップス",
    price: 20000,
    color: "#B8B8B8",
    desc: "ふんわりと柔らかなモヘア混カシミア。軽やかな着心地でありながら、ちゃんと暖かい。ゆったりとしたシルエットがエレガント。",
    image: "assets/images/product-5.jpg"
  },
  {
    id: "6",
    sku: "SKU006",
    name: "カシミアのウールコート",
    category: "アウター",
    price: 55000,
    color: "#D8D8D8",
    desc: "カシミアとウールを贅沢にブレンドした、しなやかで上質な一着。ベルトで絞ったウエストラインが、女性らしいシルエットを描きます。長く愛用したい、冬の定番アウター。",
    image: "assets/images/product-6.jpg"
  }
];

// GA4のitem形式に変換するヘルパー
function toGA4Item(product, quantity) {
  return {
    item_id: product.sku,
    item_name: product.name,
    item_category: product.category,
    item_brand: "TONE LAB",
    price: product.price,
    quantity: quantity || 1
  };
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === String(id));
}
