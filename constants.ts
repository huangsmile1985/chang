import { Carpet, Translation } from './types';

export const TRANSLATIONS: Record<'zh' | 'en', any> = {
  zh: {
    title: "优质地毯精品店",
    subtitle: "简约 · 舒适 · 自然",
    filterCategory: "类型",
    filterMaterial: "材质",
    filterScenario: "场景",
    all: "全部",
    carpet: "地毯",
    mat: "地垫",
    livingRoom: "客厅",
    bedroom: "卧室",
    entryway: "玄关",
    contactTitle: "联系我们",
    email: "邮箱",
    phone: "电话",
    whatsapp: "WhatsApp",
    priceCurrency: "¥"
  },
  en: {
    title: "Premium Carpet Boutique",
    subtitle: "Simple · Comfortable · Natural",
    filterCategory: "Category",
    filterMaterial: "Material",
    filterScenario: "Scenario",
    all: "All",
    carpet: "Rug",
    mat: "Mat",
    livingRoom: "Living Room",
    bedroom: "Bedroom",
    entryway: "Entryway",
    contactTitle: "Contact Us",
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp Us",
    priceCurrency: "$"
  }
};

const scenarios = ['livingRoom', 'bedroom', 'entryway'];
const categories = ['carpet', 'mat'];
const materials = [
  { key: 'wool', zh: '羊毛', en: 'Wool' },
  { key: 'cotton', zh: '纯棉', en: 'Cotton' },
  { key: 'jute', zh: '黄麻', en: 'Jute' }
];

export const MOCK_CARPETS: any[] = Array.from({ length: 60 }).map((_, i) => {
  const mat = materials[i % materials.length];
  return {
    id: i + 1,
    name: { zh: `精品系列 ${i + 1}号`, en: `Premium Series No.${i + 1}` },
    price: 399 + (i * 30),
    imageUrl: `https://picsum.photos/seed/${i + 800}/600/800`, // Revival 风格竖图
    category: categories[i % categories.length],
    scenario: scenarios[i % scenarios.length],
    materialKey: mat.key,
    material: { zh: mat.zh, en: mat.en }
  };
});
