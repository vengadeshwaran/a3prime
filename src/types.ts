export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string; // matches Category id
  spec: string;
  code: string; // product model code, typical of HEPO
  price: number; // in ₹
  originalPrice?: number; // for showing discounts/retail vs builder pricing
  image: string;
  description: string;
  features: string[];
  packSize: string;
  material?: string;
  finish?: string;
  sizeOptions?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  comment: string;
}

export interface WhyHighlight {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
