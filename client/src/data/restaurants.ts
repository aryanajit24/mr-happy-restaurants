// Design: Warm Mediterranean Bistro — Terracotta, Warm Sand, Deep Olive
// Restaurant data for Mr. Happy Restaurants

export interface Restaurant {
  id: string;
  name: string;
  type: 'doner' | 'burger' | 'pizza';
  description: string;
  image: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  address: string;
  phone: string;
  certifications: string[];
  isOpen: boolean;
}

export const restaurants: Restaurant[] = [
  {
    id: 'restaurant1',
    name: 'Restaurant',
    type: 'doner',
    description: 'Authentic Turkish Döner & Hähnchen — crafted with 100% Halal ingredients, fresh vegetables, and house-made sauces. A true taste of the Mediterranean.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663433407028/AuFq7AkmySU8UbRBjiGUjC/hero-doner-jFqazYFxYXNmPYoypDZyxX.webp',
    specialties: ['Döner Pita', 'Döner Teller', '3x Halbes Hähnchen'],
    rating: 4.8,
    reviewCount: 342,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    minOrder: 10,
    address: 'Zum Alten Speicher 1-2, 28759 Bremen Vegesack',
    phone: '04209/8989990',
    certifications: ['100% HALAL'],
    isOpen: true,
  },
  {
    id: 'restaurant2',
    name: 'Mr. Happy Burger',
    type: 'burger',
    description: 'Premium smash burgers and crispy chicken in signature buckets — with FREE dips and drinks. Every bite is a happy meal.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663433407028/AuFq7AkmySU8UbRBjiGUjC/hero-burger-QUyxcDtFCEXEt7pWXsz8bx.webp',
    specialties: ['Single Mix Bucket', 'Twice Mix Bucket', 'Smash Cheese Burger'],
    rating: 4.7,
    reviewCount: 218,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    minOrder: 8,
    address: 'Zum Alten Speicher 1-2, 28759 Bremen Vegesack',
    phone: '04209/8989990',
    certifications: [],
    isOpen: true,
  },
  {
    id: 'restaurant3',
    name: 'MR. Happy Doner & Pizza',
    type: 'pizza',
    description: 'The full Mediterranean experience — Halal Döner, stone-baked 36cm Pizzas, Pide, Falafel, and more. 60 items to satisfy every craving.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663433407028/AuFq7AkmySU8UbRBjiGUjC/hero-pizza-QzENFhyEHvD5en44fNjcVc.webp',
    specialties: ['Pizza Mr. Happy', 'Döner Teller', 'Big Happy Burger'],
    rating: 4.8,
    reviewCount: 487,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    minOrder: 10,
    address: 'Heidkamp 25, 28790 Schwanewede',
    phone: '042098989992',
    certifications: ['Döner 100% HALAL'],
    isOpen: true,
  },
];

export const getRestaurantById = (id: string): Restaurant | undefined =>
  restaurants.find((r) => r.id === id);
