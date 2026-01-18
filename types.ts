
export type Language = 'zh' | 'en';

export interface Carpet {
  id: number;
  name: {
    zh: string;
    en: string;
  };
  material: {
    zh: string;
    en: string;
  };
  price: number;
  imageUrl: string;
}

export interface Translation {
  title: string;
  subtitle: string;
  materialLabel: string;
  priceCurrency: string;
  contactTitle: string;
  email: string;
  phone: string;
  whatsapp: string;
  prevPage: string;
  nextPage: string;
  pageOf: string;
}
