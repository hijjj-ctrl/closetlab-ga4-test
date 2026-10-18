// ============================================================
// 商品マスタデータ(ダミー)
// GA4のitemsパラメータに使う情報をここに集約しています。
// 商品を増やしたい場合はこの配列に追記してください。
//   colors : 商品ページで選べるカラー(先頭が、商品画像のカラー)
//   sizes  : 商品ページで選べるサイズ
// ============================================================
const SIZES_APPAREL = ["S", "M", "L"];
const SIZES_SHOES = ["23.0", "24.0", "25.0"];
const SIZES_FREE = ["FREE"];

const PRODUCTS = [
  {
    id: "1",
    sku: "SKU001",
    name: "リボンブラウス",
    category: "トップス",
    price: 6900,
    color: "#EFE6D6",
    colors: ["ミルクホワイト", "モカブラウン", "セージグリーン"],
    sizes: SIZES_APPAREL,
    desc: "シルクのような肌触りのドレープ素材。やわらかなミルクホワイトと上品な光沢感が、いつものコーディネートを格上げします。",
    image: "assets/images/product-1.jpg"
  },
  {
    id: "2",
    sku: "SKU002",
    name: "マーメイドスカート",
    category: "ボトムス",
    price: 8900,
    color: "#B5543A",
    colors: ["ブリックレッド", "モカブラウン", "ブラック"],
    sizes: SIZES_APPAREL,
    desc: "美しいシルエットを追求したマーメイドライン。深みのあるブリックレッドが、秋冬のコーディネートに映えます。",
    image: "assets/images/product-2.jpg"
  },
  {
    id: "3",
    sku: "SKU003",
    name: "ウールジャケット",
    category: "アウター",
    price: 19800,
    color: "#7A7248",
    colors: ["オリーブカーキ", "キャメル", "オフホワイト"],
    sizes: SIZES_APPAREL,
    desc: "ノーカラーのすっきりとしたデザイン。しっかりとしたウール素材で、軽く羽織るだけでほんのり暖かい。ほどよいゆとりのシルエットで、インナーを選ばず合わせやすい一着です。",
    image: "assets/images/product-3.jpg"
  },
  {
    id: "4",
    sku: "SKU004",
    name: "ショートブーツ",
    category: "シューズ",
    price: 14900,
    color: "#3A322C",
    colors: ["ブラック", "ダークブラウン"],
    sizes: SIZES_SHOES,
    desc: "やわらかなレザーのサイドファスナー付きショートブーツ。脱ぎ履きがしやすく、パンツにもスカートにも合わせやすい定番の一足です。",
    image: "assets/images/product-4.jpg"
  },
  {
    id: "5",
    sku: "SKU005",
    name: "カシミアのモヘアセーター",
    category: "トップス",
    price: 20000,
    color: "#A9B7A0",
    colors: ["セージグリーン", "オフホワイト", "ダスティローズ"],
    sizes: SIZES_APPAREL,
    desc: "ふんわりと柔らかなモヘア混カシミア。軽やかな着心地でありながら、ちゃんと暖かい。ゆったりとしたシルエットがエレガント。",
    image: "assets/images/product-5.jpg"
  },
  {
    id: "6",
    sku: "SKU006",
    name: "カシミアのウールコート",
    category: "アウター",
    price: 55000,
    color: "#C49A6C",
    colors: ["キャメル", "モカブラウン", "オフホワイト"],
    sizes: SIZES_APPAREL,
    desc: "カシミアとウールを贅沢にブレンドした、しなやかで上質な一着。ベルトで絞ったウエストラインが、女性らしいシルエットを描きます。長く愛用したい、冬の定番アウター。",
    image: "assets/images/product-6.jpg"
  },
  {
    id: "7",
    sku: "SKU007",
    name: "ニットワンピース",
    category: "ワンピース",
    price: 12900,
    color: "#8FA3B5",
    colors: ["ダスティブルー", "モカブラウン", "セージグリーン"],
    sizes: SIZES_APPAREL,
    desc: "ウール混のニットジャージー素材。長袖でひざ丈、やわらかく体に沿うシルエットで、1枚で絵になる秋冬のワンピースです。",
    image: "assets/images/product-7.jpg"
  },
  {
    id: "8",
    sku: "SKU008",
    name: "ワイドパンツ",
    category: "ボトムス",
    price: 9900,
    color: "#8B6B55",
    colors: ["モカブラウン", "オフホワイト", "ブラック"],
    sizes: SIZES_APPAREL,
    desc: "たっぷりとした太さで、きれいに落ちるシルエット。センタープレスが脚をすっきり見せ、オンにもオフにも使えます。",
    image: "assets/images/product-8.jpg"
  },
  {
    id: "9",
    sku: "SKU009",
    name: "ケーブルニットカーディガン",
    category: "トップス",
    price: 11900,
    color: "#C99A9A",
    colors: ["ダスティローズ", "オフホワイト", "セージグリーン"],
    sizes: SIZES_APPAREL,
    desc: "ざっくりとしたケーブル編みに、木のボタンがアクセント。やさしいダスティローズが、ほっとする表情をつくります。",
    image: "assets/images/product-9.jpg"
  },
  {
    id: "10",
    sku: "SKU010",
    name: "ローファー",
    category: "シューズ",
    price: 12900,
    color: "#5A3A2A",
    colors: ["ダークブラウン", "ブラック"],
    sizes: SIZES_SHOES,
    desc: "しなやかなレザーで足になじむ、ダークブラウンのローファー。シンプルなデザインで、スカートにもパンツにも合わせられます。",
    image: "assets/images/product-10.jpg"
  },
  {
    id: "11",
    sku: "SKU011",
    name: "キャンバストートバッグ",
    category: "バッグ",
    price: 6900,
    color: "#EDE3D0",
    colors: ["オフホワイト", "ブラック"],
    sizes: SIZES_FREE,
    desc: "しっかりとした厚手のキャンバス地に、茶色のレザーの持ち手。A4が入るサイズで、毎日のお出かけに使いやすい一つです。",
    image: "assets/images/product-11.jpg"
  },
  {
    id: "12",
    sku: "SKU012",
    name: "ウールマフラー",
    category: "小物",
    price: 5900,
    color: "#D4A62A",
    colors: ["マスタードイエロー", "キャメル", "オフホワイト"],
    sizes: SIZES_FREE,
    desc: "やわらかなウール素材のたっぷりサイズ。首もとに、冬のコーディネートのアクセントになるマスタードイエローを。",
    image: "assets/images/product-12.jpg"
  }
];

// ラインナップの絞り込み用カテゴリ(表示順)
const PRODUCT_CATEGORIES = ["トップス", "ワンピース", "ボトムス", "アウター", "シューズ", "バッグ", "小物"];

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
