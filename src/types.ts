export type Language = 'ar' | 'en';

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category:
    | 'emt_conduits'
    | 'flexible_conduits'
    | 'boxes_fittings'
    | 'earthing'
    | 'cables'
    | 'switchgear'
    | 'automation'
    | 'transformers'
    | 'cable_tray'
    | 'lighting';
  categoryAr: string;
  categoryEn: string;
  brand: string;
  specAr: string;
  specEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  inStock: boolean;
  standards: string[];
  unit: string;
}

export interface RfqItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface QuoteRequestForm {
  clientName: string;
  companyName: string;
  phone: string;
  email: string;
  projectLocation: string;
  projectType: string;
  urgency: 'immediate' | 'standard' | 'tender';
  notes: string;
  items: RfqItem[];
  boqFileDescription?: string;
}
