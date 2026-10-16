export interface ServiceItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  placeholderImg: string;
}

export interface PortfolioItem {
  id: string;
  client: string;
  category: string;
  tagline: string;
  meta: string;
  description: string;
  layout: 'single' | 'collage' | 'split';
  mainImg: string;
  subImg?: string;
  logo?: string;
}

export interface NavLinkItem {
  name: string;
  path: string;
  img?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}
