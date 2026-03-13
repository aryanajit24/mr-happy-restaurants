// Design: Warm Mediterranean Bistro — Terracotta, Warm Sand, Deep Olive
// Restaurant data for Mr. Happy Restaurants

export interface OpeningHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
}

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
  openingHours: OpeningHours;
}

const defaultHours: OpeningHours = {
  monday: { open: '11:00', close: '22:00' },
  tuesday: { open: '11:00', close: '22:00' },
  wednesday: { open: '11:00', close: '22:00' },
  thursday: { open: '11:00', close: '22:00' },
  friday: { open: '11:00', close: '23:00' },
  saturday: { open: '11:00', close: '23:00' },
  sunday: { open: '12:00', close: '22:00' },
};

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
    openingHours: defaultHours,
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
    openingHours: defaultHours,
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
    openingHours: defaultHours,
  },
];

export const isRestaurantOpen = (restaurant: Restaurant): boolean => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
  const today = dayNames[dayOfWeek];
  const hours = restaurant.openingHours[today];
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  return currentTime >= hours.open && currentTime <= hours.close;
};

export const getRestaurantById = (id: string): Restaurant | undefined =>
  restaurants.find((r) => r.id === id);

export const getRestaurantHoursDisplay = (restaurant: Restaurant): string => {
  const dayOfWeek = new Date().getDay();
  const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const today = dayNames[dayOfWeek];
  const dayKeys: Array<keyof OpeningHours> = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayKey = dayKeys[dayOfWeek];
  const hours = restaurant.openingHours[dayKey];
  return `${today}: ${hours.open} - ${hours.close}`;
};
