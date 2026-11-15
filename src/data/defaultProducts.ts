import huile1L from '../assets/huile-olive-1l.jpg';
import huile5L from '../assets/huile-olive-5l.jpg';

export interface DefaultProduct {
    id: number;
    name_fr: string;
    name_ar: string;
    price: string;
    discount_price?: string;
    is_promo: boolean;
    weight: string;
    category: number;
    category_name: string;
    image: string;
    description_fr: string;
    description_ar: string;
    origin_fr: string;
    origin_ar: string;
    benefits_fr: string;
    benefits_ar: string;
}

export const DEFAULT_CATEGORIES = [
    {
        id: 1,
        name_fr: "Huiles d'Olive Bio",
        name_ar: "زيت زيتون العطاوية",
        description_fr: "Huile d'olive vierge extra 100% naturelle de la région d'El Ataouia, extraite à froid.",
        description_ar: "زيت زيتون بكر ممتاز طبيعي 100% من منطقة العطاوية.",
        image: huile1L
    }
];

export const DEFAULT_PRODUCTS: DefaultProduct[] = [
    {
        id: 1,
        name_fr: "Huile d'Olive de l'Ataouia - 1L",
        name_ar: "زيت زيتون العطاوية - 1 لتر",
        price: "55",
        is_promo: true,
        weight: "1L",
        category: 1,
        category_name: "Huiles d'Olive Bio",
        image: huile1L,
        description_fr: "Huile d'olive vierge extra 100% naturelle de la région d'El Ataouia (1 Litre), pressée à froid pour préserver son goût authentique et tous ses bienfaits pour la santé.",
        description_ar: "زيت زيتون بكر ممتاز طبيعي 100% من منطقة العطاوية (1 لتر)، معصور على البارد للحفاظ على مذاقه الأصيل وفوائده الصحية.",
        origin_fr: "El Ataouia, Maroc",
        origin_ar: "العطاوية، المغرب",
        benefits_fr: "100% Pure et Naturelle\nPremière pression à froid\nRiche en antioxydants et vitamine E\nTerroir authentique d'El Ataouia",
        benefits_ar: "طبيعي وحر 100%\nعصرة أولى على البارد\nغني بمضادات الأكسدة وفيتامين E\nمنطقة العطاوية الأصيلة"
    },
    {
        id: 2,
        name_fr: "Huile d'Olive de l'Ataouia - 5L",
        name_ar: "زيت زيتون العطاوية - 5 لتر",
        price: "275",
        is_promo: true,
        weight: "5L",
        category: 1,
        category_name: "Huiles d'Olive Bio",
        image: huile5L,
        description_fr: "Format familial économique de 5 Litres. Huile d'olive vierge extra 100% naturelle de la région d'El Ataouia, extraite à froid, idéale pour toute la famille.",
        description_ar: "حجم عائلي اقتصادي 5 لتر. زيت زيتون بكر ممتاز طبيعي 100% من منطقة العطاوية، معصور على البارد، مثالي لجميع أفراد العائلة.",
        origin_fr: "El Ataouia, Maroc",
        origin_ar: "العطاوية، المغرب",
        benefits_fr: "Format familial économique 5L (275 DH)\n100% Pure et Naturelle\nPremière pression à froid\nQualité supérieure garantie",
        benefits_ar: "حجم عائلي اقتصادي 5 لتر (275 درهم)\nطبيعي وحر 100%\nعصرة أولى على البارد\nجودة عالية مضمونة"
    }
];

