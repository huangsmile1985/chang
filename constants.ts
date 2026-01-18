
import { Carpet, Translation } from './types';

export const TRANSLATIONS: Record<'zh' | 'en', Translation> = {
  zh: {
    title: "优质地毯精品店",
    subtitle: "简约 · 舒适 · 自然",
    materialLabel: "材质",
    priceCurrency: "¥",
    contactTitle: "联系我们",
    email: "邮箱",
    phone: "电话",
    whatsapp: "WhatsApp 咨询",
    prevPage: "上一页",
    nextPage: "下一页",
    pageOf: "第 {current} 页 / 共 {total} 页"
  },
  en: {
    title: "Premium Carpet Boutique",
    subtitle: "Simple · Comfortable · Natural",
    materialLabel: "Material",
    priceCurrency: "$",
    contactTitle: "Contact Us",
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp Us",
    prevPage: "Previous",
    nextPage: "Next",
    pageOf: "Page {current} of {total}"
  }
};

// Generate 60 carpets (6 per page * 10 pages)
const materials = [
  { zh: '纯棉', en: 'Pure Cotton' },
  { zh: '羊毛', en: 'Wool' },
  { zh: '黄麻', en: 'Jute' },
  { zh: '混纺', en: 'Blended Fiber' },
  { zh: '亚麻', en: 'Linen' }
];

const carpetNames = [
  { zh: '北欧简约长毛地毯', en: 'Nordic Minimalist Shaggy Rug' },
  { zh: '日式和风编织毯', en: 'Japanese Woven Tatami Mat' },
  { zh: '复古几何艺术毯', en: 'Vintage Geometric Art Rug' },
  { zh: '云感静音卧室毯', en: 'Cloud-feel Silent Bedroom Rug' },
  { zh: '天然黄麻耐磨地垫', en: 'Natural Jute Durable Mat' },
  { zh: '手工羊毛奢华地毯', en: 'Handmade Wool Luxury Rug' }
];

export const MOCK_CARPETS: Carpet[] = Array.from({ length: 60 }).map((_, i) => {
  const nameBase = carpetNames[i % carpetNames.length];
  const materialBase = materials[i % materials.length];
  return {
    id: i + 1,
    name: {
      zh: `${nameBase.zh} ${Math.floor(i / 6) + 1}号`,
      en: `${nameBase.en} No.${Math.floor(i / 6) + 1}`
    },
    material: materialBase,
    price: 199 + (i * 15),
    imageUrl: `https://picsum.photos/seed/${i + 123}/300/200`
  };
});
