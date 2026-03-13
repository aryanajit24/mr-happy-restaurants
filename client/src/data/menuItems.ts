// Design: Warm Mediterranean Bistro
// Complete 122 menu items across 3 restaurants

export interface DietaryInfo {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  spicy: number; // 0–5
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  category: string;
  restaurantId: string;
  dietaryInfo: DietaryInfo;
  allergens: string[];
  calories: number;
  customizable: boolean;
  popular: boolean;
  bucketType?: 'single' | 'twice' | 'family';
  freeItems?: string; // e.g. "1 Dip + 1 Drink GRATIS"
}

// ─── Unsplash image helpers ───────────────────────────────────────────────────
const IMG = {
  doner: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&q=80',
  donerTeller: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500&q=80',
  hahn: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80',
  rollo: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&q=80',
  turkPizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80',
  pommes: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&q=80',
  borek: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80',
  salat: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
  nuggets: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80',
  currywurst: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80',
  drink: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80',
  bucket: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=500&q=80',
  burger: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663433407028/AuFq7AkmySU8UbRBjiGUjC/hero-burger-QUyxcDtFCEXEt7pWXsz8bx.webp',
  crispyChicken: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&q=80',
  pizza: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663433407028/AuFq7AkmySU8UbRBjiGUjC/hero-pizza-QzENFhyEHvD5en44fNjcVc.webp',
  pide: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80',
  falafel: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=500&q=80',
  sauce: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=500&q=80',
  schnitzel: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=500&q=80',
};

// ─── Restaurant 1: "Restaurant" (Döner Shop) — 34 Items ──────────────────────

const rest1: MenuItem[] = [
  // DÖNER (7)
  { id: 'rest1-doner-pita-1', name: 'Döner Pita', description: 'Saftiges Döner-Fleisch im knusprigen Pita-Brot mit frischem Salat, Tomate, Zwiebeln und Haussoße', basePrice: 8.0, image: IMG.doner, category: '🥙 Döner', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 520, customizable: true, popular: true },
  { id: 'rest1-veggie-doner-pita-2', name: 'Veggie Döner Pita', description: 'Vegetarischer Döner mit Grillgemüse, frischem Salat und cremiger Soße im Pita', basePrice: 8.0, image: IMG.doner, category: '🥙 Döner', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 420, customizable: true, popular: false },
  { id: 'rest1-falafel-doner-pita-3', name: 'Falafel Döner Pita', description: 'Knusprige Falafel-Bällchen im Pita mit Salat, Tomate und Tahini-Soße', basePrice: 8.0, image: IMG.falafel, category: '🥙 Döner', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Sesam'], calories: 450, customizable: true, popular: false },
  { id: 'rest1-chili-cheese-doner-4', name: 'Chili Cheese Döner Pita', description: 'Döner mit würziger Chili-Cheese-Soße, geschmolzenem Käse und frischem Gemüse', basePrice: 9.0, image: IMG.doner, category: '🥙 Döner', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 3 }, allergens: ['Gluten', 'Milch'], calories: 580, customizable: true, popular: false },
  { id: 'rest1-pomm-doner-5', name: 'Pomm Döner', description: 'Döner Pita mit einer Portion knuspriger Pommes Frites', basePrice: 9.0, image: IMG.doner, category: '🥙 Döner', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 720, customizable: true, popular: false },
  { id: 'rest1-doner-box-6', name: 'Döner Box', description: 'Döner-Fleisch in der Box mit Salat, Tomate, Zwiebeln und Soße — perfekt zum Mitnehmen', basePrice: 9.0, image: IMG.donerTeller, category: '🥙 Döner', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: true, spicy: 0 }, allergens: ['Milch'], calories: 490, customizable: true, popular: false },
  { id: 'rest1-doner-teller-7', name: 'Döner Teller', description: 'Großzügige Portion Döner-Fleisch auf dem Teller mit Reis oder Bulgur, frischem Salat und zwei Soßen', basePrice: 12.0, image: IMG.donerTeller, category: '🥙 Döner', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: true, spicy: 0 }, allergens: ['Milch'], calories: 780, customizable: true, popular: true },

  // HÄHNCHEN (5)
  { id: 'rest1-hahn-pita', name: 'Hähnchen Pita', description: 'Zartes Hähnchen-Fleisch im Pita mit frischem Salat und Haussoße', basePrice: 7.5, image: IMG.hahn, category: '🍗 Hähnchen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 480, customizable: true, popular: false },
  { id: 'rest1-hahn-durum', name: 'Hähnchen Dürüm', description: 'Hähnchen-Fleisch im knusprigen Dürüm-Wrap mit Salat, Tomate und Soße', basePrice: 8.0, image: IMG.rollo, category: '🍗 Hähnchen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 510, customizable: true, popular: false },
  { id: 'rest1-halbes-hahn', name: 'Halbes Hähnchen', description: 'Knuspriges halbes Hähnchen vom Grill — saftig und aromatisch gewürzt', basePrice: 9.2, image: IMG.hahn, category: '🍗 Hähnchen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: true, spicy: 0 }, allergens: [], calories: 620, customizable: false, popular: false },
  { id: 'rest1-ganzes-hahn', name: 'Ganzes Hähnchen', description: 'Ein ganzes gegrilltes Hähnchen — ideal für zwei Personen', basePrice: 16.7, image: IMG.hahn, category: '🍗 Hähnchen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: true, spicy: 0 }, allergens: [], calories: 1240, customizable: false, popular: false },
  { id: 'rest1-3x-halbes-hahn', name: '3x Halbes Hähnchen', description: 'Drei halbe gegrillte Hähnchen — das perfekte Familien-Sharing-Gericht', basePrice: 19.9, image: IMG.hahn, category: '🍗 Hähnchen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: true, spicy: 0 }, allergens: [], calories: 1860, customizable: false, popular: true },

  // ROLLO (4)
  { id: 'rest1-rollo-doner', name: 'Rollo Döner', description: 'Großer Döner-Rollo mit Salat, Tomate, Zwiebeln und Haussoße — satt und zufrieden', basePrice: 11.0, image: IMG.rollo, category: '🌯 Rollo', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 680, customizable: true, popular: false },
  { id: 'rest1-rollo-sucuk', name: 'Rollo Sucuk', description: 'Würziger Sucuk (türkische Wurst) im Rollo mit Salat und Soße', basePrice: 11.0, image: IMG.rollo, category: '🌯 Rollo', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 2 }, allergens: ['Gluten', 'Milch'], calories: 700, customizable: true, popular: false },
  { id: 'rest1-rollo-tonno', name: 'Rollo Tonno', description: 'Thunfisch-Rollo mit frischem Salat, Tomate und Cocktail-Soße', basePrice: 11.0, image: IMG.rollo, category: '🌯 Rollo', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Fisch', 'Milch'], calories: 580, customizable: true, popular: false },
  { id: 'rest1-rollo-veggie', name: 'Rollo Veggie', description: 'Vegetarischer Rollo mit Grillgemüse, Feta und Tzatziki', basePrice: 11.0, image: IMG.rollo, category: '🌯 Rollo', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 520, customizable: true, popular: false },

  // TÜRKISCHE PIZZA (3)
  { id: 'rest1-turkey-pizza-classic', name: 'Türkische Pizza Klassisch', description: 'Dünner Teig mit Hackfleisch, Zwiebeln und Gewürzen — die klassische Lahmacun', basePrice: 4.5, image: IMG.turkPizza, category: '🍕 Türkische Pizza', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten'], calories: 320, customizable: false, popular: false },
  { id: 'rest1-turkey-pizza-salat', name: 'Türkische Pizza mit Salat + Sauce', description: 'Lahmacun mit frischem Salat, Tomate, Zwiebeln und Soße — komplett und sättigend', basePrice: 9.5, image: IMG.turkPizza, category: '🍕 Türkische Pizza', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Milch'], calories: 520, customizable: true, popular: false },
  { id: 'rest1-turkey-pizza-doner', name: 'Türkische Pizza mit Döner', description: 'Lahmacun belegt mit saftigem Döner-Fleisch und Salat', basePrice: 11.5, image: IMG.turkPizza, category: '🍕 Türkische Pizza', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Milch'], calories: 680, customizable: true, popular: false },

  // SIDES (11)
  { id: 'rest1-sides-pommes', name: 'Pommes', description: 'Knusprige Pommes Frites, goldbraun frittiert', basePrice: 4.9, image: IMG.pommes, category: '🍟 Beilagen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 380, customizable: false, popular: false },
  { id: 'rest1-sides-borek-hackfleisch', name: 'Börek Hackfleisch', description: 'Knuspriges Blätterteig-Börek gefüllt mit würzigem Hackfleisch', basePrice: 5.2, image: IMG.borek, category: '🍟 Beilagen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 420, customizable: false, popular: false },
  { id: 'rest1-sides-borek-feta', name: 'Börek Feta', description: 'Knuspriges Blätterteig-Börek gefüllt mit cremigem Feta-Käse', basePrice: 5.2, image: IMG.borek, category: '🍟 Beilagen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 390, customizable: false, popular: false },
  { id: 'rest1-sides-borek-spinat', name: 'Börek Spinat Feta', description: 'Knuspriges Blätterteig-Börek mit Spinat und Feta — ein mediterraner Klassiker', basePrice: 5.2, image: IMG.borek, category: '🍟 Beilagen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 370, customizable: false, popular: false },
  { id: 'rest1-sides-reis-bulgur', name: 'Reis oder Bulgur', description: 'Beilage nach Wahl: lockerer Basmati-Reis oder herzhafter Bulgur', basePrice: 5.9, image: IMG.salat, category: '🍟 Beilagen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: false, spicy: 0 }, allergens: ['Gluten'], calories: 280, customizable: false, popular: false },
  { id: 'rest1-sides-schnitzel', name: 'Schnitzel', description: 'Zartes paniertes Schnitzel, goldbraun gebraten', basePrice: 7.0, image: IMG.schnitzel, category: '🍟 Beilagen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Ei', 'Milch'], calories: 520, customizable: false, popular: false },
  { id: 'rest1-sides-doner-salat', name: 'mit Döner Salat + Sauce', description: 'Frischer gemischter Salat mit Döner-Fleisch und Haussoße', basePrice: 8.2, image: IMG.salat, category: '🍟 Beilagen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: true, spicy: 0 }, allergens: ['Milch'], calories: 380, customizable: true, popular: false },
  { id: 'rest1-sides-gemischter-salat', name: 'Gemischter Salat', description: 'Frischer gemischter Salat mit Tomaten, Gurken, Paprika und Dressing', basePrice: 9.9, image: IMG.salat, category: '🍟 Beilagen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 180, customizable: false, popular: false },
  { id: 'rest1-sides-nuggets', name: 'Nuggets 12 Stück', description: '12 knusprige Chicken Nuggets — perfekt zum Teilen', basePrice: 11.9, image: IMG.nuggets, category: '🍟 Beilagen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Ei'], calories: 680, customizable: false, popular: false },
  { id: 'rest1-sides-currywurst', name: 'Currywurst XL mit Pommes', description: 'Große Currywurst mit würziger Curry-Soße und knusprigen Pommes', basePrice: 13.9, image: IMG.currywurst, category: '🍟 Beilagen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 2 }, allergens: ['Gluten', 'Milch'], calories: 820, customizable: false, popular: false },
  { id: 'rest1-sides-saucen', name: 'Ketchup/Mayo', description: 'Ketchup oder Mayonnaise als extra Beilage', basePrice: 1.0, image: IMG.sauce, category: '🍟 Beilagen', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, spicy: 0 }, allergens: ['Ei'], calories: 80, customizable: false, popular: false },

  // GETRÄNKE (4)
  { id: 'rest1-drinks-wasser', name: 'Wasser', description: 'Stilles Mineralwasser 0,5l', basePrice: 3.0, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 0, customizable: false, popular: false },
  { id: 'rest1-drinks-ayran', name: 'Ayran', description: 'Frisches türkisches Joghurt-Getränk, leicht gesalzen', basePrice: 3.0, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, spicy: 0 }, allergens: ['Milch'], calories: 90, customizable: false, popular: false },
  { id: 'rest1-drinks-uludag', name: 'Uludağ', description: 'Türkisches Mineralwasser mit Kohlensäure 0,33l', basePrice: 3.5, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 0, customizable: false, popular: false },
  { id: 'rest1-drinks-fritz', name: 'FRITZ', description: 'FRITZ-Kola oder FRITZ-Limo in verschiedenen Sorten 0,33l', basePrice: 3.5, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant1', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 120, customizable: false, popular: false },
];

// ─── Restaurant 2: "Mr. Happy Burger" — 28 Items ─────────────────────────────

const rest2: MenuItem[] = [
  // BUCKETS (6)
  { id: 'rest2-bucket-single-mix', name: 'Single Mix Bucket', description: 'Mix aus Crispy & Flavour Chicken — inkl. 1 Dip + 1 Drink GRATIS nach Wahl', basePrice: 11.9, image: IMG.bucket, category: '🪣 Buckets', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Ei'], calories: 680, customizable: true, popular: true, bucketType: 'single', freeItems: '1 Dip + 1 Drink GRATIS' },
  { id: 'rest2-bucket-flavour', name: 'Flavour Bucket', description: 'Knusprige Flavour Chicken Pieces in deiner Lieblings-Würzung — inkl. 1 Dip + 1 Drink GRATIS', basePrice: 15.9, image: IMG.bucket, category: '🪣 Buckets', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Ei'], calories: 820, customizable: true, popular: false, bucketType: 'single', freeItems: '1 Dip + 1 Drink GRATIS' },
  { id: 'rest2-bucket-twice-mix', name: 'Twice Mix Bucket', description: 'Doppelte Portion Mix Chicken für zwei — inkl. 2 Dips + 2 Drinks GRATIS', basePrice: 22.9, image: IMG.bucket, category: '🪣 Buckets', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Ei'], calories: 1360, customizable: true, popular: true, bucketType: 'twice', freeItems: '2 Dips + 2 Drinks GRATIS' },
  { id: 'rest2-bucket-keulen', name: 'Keulen Bucket', description: 'Saftige Hähnchen-Keulen im Bucket — inkl. 2 Dips + 2 Drinks GRATIS', basePrice: 20.9, image: IMG.bucket, category: '🪣 Buckets', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: true, spicy: 0 }, allergens: [], calories: 1180, customizable: true, popular: false, bucketType: 'twice', freeItems: '2 Dips + 2 Drinks GRATIS' },
  { id: 'rest2-bucket-filet', name: 'Filet Bucket', description: 'Zarte Hähnchen-Filets im Bucket — inkl. 2 Dips + 2 Drinks GRATIS', basePrice: 22.9, image: IMG.bucket, category: '🪣 Buckets', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Ei'], calories: 1240, customizable: true, popular: false, bucketType: 'twice', freeItems: '2 Dips + 2 Drinks GRATIS' },
  { id: 'rest2-bucket-family-mix', name: 'Family Mix Bucket', description: 'Das große Familien-Bucket mit Mix Chicken — inkl. 4 Dips + 4 Drinks GRATIS', basePrice: 49.9, image: IMG.bucket, category: '🪣 Buckets', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Ei'], calories: 2720, customizable: true, popular: false, bucketType: 'family', freeItems: '4 Dips + 4 Drinks GRATIS' },

  // BURGERS (9)
  { id: 'rest2-burger-kids', name: 'Hamburger Kindermenü', description: 'Kleiner Hamburger für die Kleinen — mit Ketchup und Gurken', basePrice: 4.9, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 320, customizable: true, popular: false },
  { id: 'rest2-burger-cheese', name: 'Cheeseburger', description: 'Klassischer Cheeseburger mit Beef Patty, Cheddar, Salat, Tomate und Burgersauce', basePrice: 5.4, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 480, customizable: true, popular: false },
  { id: 'rest2-burger-crispy-chicken', name: 'Crispy Chicken Burger', description: 'Knuspriges Crispy Chicken Filet im Brioche-Bun mit Salat und Mayo', basePrice: 5.4, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 520, customizable: true, popular: false },
  { id: 'rest2-burger-smash-cheese', name: 'Smash Cheese', description: 'Doppelter Smash Beef Patty mit geschmolzenem American Cheese und Burgersauce', basePrice: 8.9, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 680, customizable: true, popular: false },
  { id: 'rest2-burger-smash-chili', name: 'Smash Chili Cheese', description: 'Doppelter Smash Patty mit Chili-Cheese-Soße, Jalapeños und American Cheese', basePrice: 8.9, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 3 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 720, customizable: true, popular: false },
  { id: 'rest2-burger-nashville', name: 'Nashville Chicken', description: 'Knuspriges Chicken mit Nashville-Würzung, Coleslaw und Pickles', basePrice: 8.9, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 2 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 640, customizable: true, popular: false },
  { id: 'rest2-burger-nashville-hot', name: 'Nashville Hot Chicken', description: 'Extra scharfes Nashville Chicken mit Hot Sauce, Coleslaw und Pickles', basePrice: 8.9, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 4 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 660, customizable: true, popular: false },
  { id: 'rest2-burger-bbq-bacon', name: 'BBQ Beef Bacon', description: 'Saftiger Beef Patty mit BBQ-Soße, Bacon, Cheddar und Zwiebeln', basePrice: 8.9, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 750, customizable: true, popular: false },
  { id: 'rest2-burger-veggie', name: 'Veggie Burger', description: 'Saftiger Veggie Patty mit frischem Salat, Tomate, Avocado und Kräuter-Mayo', basePrice: 8.9, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 520, customizable: true, popular: false },

  // CRISPY CHICKEN (4)
  { id: 'rest2-crispy-12', name: 'Crispy Chicken 12 Stk.', description: '12 knusprige Chicken Pieces — perfekt zum Teilen', basePrice: 7.9, image: IMG.crispyChicken, category: '🍗 Crispy Chicken', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Ei'], calories: 720, customizable: false, popular: false },
  { id: 'rest2-crispy-18a', name: 'Crispy Chicken 18 Stk.', description: '18 knusprige Chicken Pieces', basePrice: 6.9, image: IMG.crispyChicken, category: '🍗 Crispy Chicken', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Ei'], calories: 1080, customizable: false, popular: false },
  { id: 'rest2-crispy-18b', name: 'Crispy Chicken 24 Stk.', description: '24 knusprige Chicken Pieces', basePrice: 6.9, image: IMG.crispyChicken, category: '🍗 Crispy Chicken', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Ei'], calories: 1440, customizable: false, popular: false },
  { id: 'rest2-crispy-32', name: 'Crispy Chicken 32 Stk.', description: '32 knusprige Chicken Pieces — die große Runde', basePrice: 6.9, image: IMG.crispyChicken, category: '🍗 Crispy Chicken', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Ei'], calories: 1920, customizable: false, popular: false },

  // FLAVOUR CHICKEN (4)
  { id: 'rest2-flavour-12', name: 'Flavour Chicken 12 Stk.', description: '12 gewürzte Flavour Chicken Pieces in deiner Lieblings-Würzung', basePrice: 7.9, image: IMG.crispyChicken, category: '🍗 Flavour Chicken', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Ei'], calories: 740, customizable: false, popular: false },
  { id: 'rest2-flavour-18a', name: 'Flavour Chicken 18 Stk.', description: '18 gewürzte Flavour Chicken Pieces', basePrice: 7.9, image: IMG.crispyChicken, category: '🍗 Flavour Chicken', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Ei'], calories: 1110, customizable: false, popular: false },
  { id: 'rest2-flavour-18b', name: 'Flavour Chicken 24 Stk.', description: '24 gewürzte Flavour Chicken Pieces', basePrice: 7.9, image: IMG.crispyChicken, category: '🍗 Flavour Chicken', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Ei'], calories: 1480, customizable: false, popular: false },
  { id: 'rest2-flavour-24', name: 'Flavour Chicken 32 Stk.', description: '32 gewürzte Flavour Chicken Pieces — für die ganze Gruppe', basePrice: 8.9, image: IMG.crispyChicken, category: '🍗 Flavour Chicken', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Ei'], calories: 1960, customizable: false, popular: false },

  // SIDES (5)
  { id: 'rest2-sides-pommes', name: 'Pommes', description: 'Knusprige Pommes Frites', basePrice: 4.9, image: IMG.pommes, category: '🍟 Beilagen', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 380, customizable: false, popular: false },
  { id: 'rest2-sauces', name: 'Saucen', description: 'Ranch, Curry, Chilli Cheese, Burgersauce, Ketchup, Mayo, BBQ oder Süss-Sauer', basePrice: 0.5, image: IMG.sauce, category: '🍟 Beilagen', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, spicy: 0 }, allergens: ['Ei'], calories: 60, customizable: false, popular: false },
  { id: 'rest2-drinks-capri', name: 'Capri-Sun', description: 'Capri-Sun Fruchtsaft-Getränk 0,2l', basePrice: 1.5, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 80, customizable: false, popular: false },
  { id: 'rest2-drinks-wasser', name: 'Wasser', description: 'Stilles Mineralwasser 0,5l', basePrice: 2.9, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 0, customizable: false, popular: false },
  { id: 'rest2-drinks-fritz', name: 'FRITZ-Getränke', description: 'FRITZ Kola, FRITZ Limo Orange, Zitrone, Apfel-Kirsch-Holunder, Melone, Rhabarber oder Honigmelone 0,33l', basePrice: 2.9, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant2', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 120, customizable: false, popular: false },
];

// ─── Restaurant 3: "MR. Happy Doner & Pizza" — 60 Items ──────────────────────

const rest3: MenuItem[] = [
  // DÖNER (7)
  { id: 'rest3-doner-pita', name: 'Döner Pita', description: 'Saftiges Döner-Fleisch im knusprigen Pita-Brot mit frischem Salat, Tomate, Zwiebeln und Haussoße', basePrice: 8.0, image: IMG.doner, category: '🥙 Döner', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 520, customizable: true, popular: true },
  { id: 'rest3-veggie-doner-pita', name: 'Veggie Döner Pita', description: 'Vegetarischer Döner mit Grillgemüse, frischem Salat und cremiger Soße im Pita', basePrice: 8.0, image: IMG.doner, category: '🥙 Döner', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 420, customizable: true, popular: false },
  { id: 'rest3-falafel-doner-pita', name: 'Falafel Döner Pita', description: 'Knusprige Falafel-Bällchen im Pita mit Salat, Tomate und Tahini-Soße', basePrice: 8.0, image: IMG.falafel, category: '🥙 Döner', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Sesam'], calories: 450, customizable: true, popular: false },
  { id: 'rest3-chili-cheese-doner', name: 'Chili Cheese Döner Pita', description: 'Döner mit würziger Chili-Cheese-Soße, geschmolzenem Käse und frischem Gemüse', basePrice: 9.0, image: IMG.doner, category: '🥙 Döner', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 3 }, allergens: ['Gluten', 'Milch'], calories: 580, customizable: true, popular: false },
  { id: 'rest3-pomm-doner', name: 'Pomm Döner', description: 'Döner Pita mit einer Portion knuspriger Pommes Frites', basePrice: 9.0, image: IMG.doner, category: '🥙 Döner', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 720, customizable: true, popular: false },
  { id: 'rest3-doner-box', name: 'Döner Box', description: 'Döner-Fleisch in der Box mit Salat, Tomate, Zwiebeln und Soße', basePrice: 9.0, image: IMG.donerTeller, category: '🥙 Döner', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: true, spicy: 0 }, allergens: ['Milch'], calories: 490, customizable: true, popular: false },
  { id: 'rest3-doner-teller', name: 'Döner Teller', description: 'Großzügige Portion Döner-Fleisch auf dem Teller mit Reis oder Bulgur, frischem Salat und zwei Soßen', basePrice: 12.0, image: IMG.donerTeller, category: '🥙 Döner', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: true, spicy: 0 }, allergens: ['Milch'], calories: 780, customizable: true, popular: true },

  // FALAFEL (3)
  { id: 'rest3-falafel-pita', name: 'Falafel Pita', description: 'Knusprige Falafel im Pita mit Salat, Tomate und Tahini-Soße', basePrice: 8.0, image: IMG.falafel, category: '🧆 Falafel', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Sesam'], calories: 440, customizable: true, popular: false },
  { id: 'rest3-falafel-rollo', name: 'Falafel Rollo', description: 'Knusprige Falafel im großen Dürüm-Wrap mit Salat und Soße', basePrice: 11.0, image: IMG.falafel, category: '🧆 Falafel', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Sesam'], calories: 580, customizable: true, popular: false },
  { id: 'rest3-falafel-teller', name: 'Falafel Teller', description: 'Falafel auf dem Teller mit Reis, frischem Salat und Tahini-Soße', basePrice: 12.0, image: IMG.falafel, category: '🧆 Falafel', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: ['Sesam'], calories: 620, customizable: true, popular: false },

  // ROLLO (4)
  { id: 'rest3-rollo-doner', name: 'Rollo Döner', description: 'Großer Döner-Rollo mit Salat, Tomate, Zwiebeln und Haussoße', basePrice: 11.0, image: IMG.rollo, category: '🌯 Rollo', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 680, customizable: true, popular: false },
  { id: 'rest3-rollo-sucuk', name: 'Rollo Sucuk', description: 'Würziger Sucuk im Rollo mit Salat und Soße', basePrice: 11.0, image: IMG.rollo, category: '🌯 Rollo', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 2 }, allergens: ['Gluten', 'Milch'], calories: 700, customizable: true, popular: false },
  { id: 'rest3-rollo-tonno', name: 'Rollo Tonno', description: 'Thunfisch-Rollo mit frischem Salat, Tomate und Cocktail-Soße', basePrice: 11.0, image: IMG.rollo, category: '🌯 Rollo', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Fisch', 'Milch'], calories: 580, customizable: true, popular: false },
  { id: 'rest3-rollo-veggie', name: 'Rollo Veggie', description: 'Vegetarischer Rollo mit Grillgemüse, Feta und Tzatziki', basePrice: 11.0, image: IMG.rollo, category: '🌯 Rollo', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 520, customizable: true, popular: false },

  // TÜRKISCHE PIZZA (3)
  { id: 'rest3-turkey-pizza-classic', name: 'Türkische Pizza Klassisch', description: 'Dünner Teig mit Hackfleisch, Zwiebeln und Gewürzen — die klassische Lahmacun', basePrice: 4.5, image: IMG.turkPizza, category: '🍕 Türkische Pizza', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten'], calories: 320, customizable: false, popular: false },
  { id: 'rest3-turkey-pizza-salat', name: 'Türkische Pizza mit Salat + Sauce', description: 'Lahmacun mit frischem Salat, Tomate, Zwiebeln und Soße', basePrice: 9.5, image: IMG.turkPizza, category: '🍕 Türkische Pizza', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Milch'], calories: 520, customizable: true, popular: false },
  { id: 'rest3-turkey-pizza-doner', name: 'Türkische Pizza mit Döner', description: 'Lahmacun belegt mit saftigem Döner-Fleisch und Salat', basePrice: 11.5, image: IMG.turkPizza, category: '🍕 Türkische Pizza', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Milch'], calories: 680, customizable: true, popular: false },

  // PIDE (6)
  { id: 'rest3-pide-gouda', name: 'Pide Gouda', description: 'Türkisches Fladenbrot-Boot mit geschmolzenem Gouda-Käse', basePrice: 13.0, image: IMG.pide, category: '🥖 Pide', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 620, customizable: false, popular: false },
  { id: 'rest3-pide-veggie', name: 'Pide Veggie', description: 'Pide mit Grillgemüse, Paprika, Zwiebeln und Käse', basePrice: 14.0, image: IMG.pide, category: '🥖 Pide', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 580, customizable: false, popular: false },
  { id: 'rest3-pide-funghi', name: 'Pide Funghi', description: 'Pide mit frischen Champignons, Zwiebeln und Käse', basePrice: 14.0, image: IMG.pide, category: '🥖 Pide', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 560, customizable: false, popular: false },
  { id: 'rest3-pide-sucuk', name: 'Pide Sucuk', description: 'Pide mit würzigem Sucuk (türkische Wurst) und Käse', basePrice: 14.0, image: IMG.pide, category: '🥖 Pide', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 2 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 680, customizable: false, popular: false },
  { id: 'rest3-pide-hackfleisch', name: 'Pide Hackfleisch', description: 'Pide mit würzigem Hackfleisch, Zwiebeln und Paprika', basePrice: 14.5, image: IMG.pide, category: '🥖 Pide', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 720, customizable: false, popular: false },
  { id: 'rest3-pide-doner', name: 'Pide Döner', description: 'Pide mit saftigem Döner-Fleisch, Zwiebeln und Käse', basePrice: 14.5, image: IMG.pide, category: '🥖 Pide', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 740, customizable: false, popular: false },

  // KONYA (2)
  { id: 'rest3-konya-salat', name: 'Konya Salat + Sauce', description: 'Konya-Spezialität: Fleisch auf Fladenbrot mit frischem Salat und Haussoße', basePrice: 15.5, image: IMG.donerTeller, category: '🥘 Konya', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 820, customizable: true, popular: false },
  { id: 'rest3-konya-doner', name: 'Konya mit Döner', description: 'Konya-Spezialität mit extra Döner-Fleisch, Salat und Soße', basePrice: 18.0, image: IMG.donerTeller, category: '🥘 Konya', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 980, customizable: true, popular: false },

  // PIZZA 36cm (12)
  { id: 'rest3-pizza-margherita', name: 'Pizza Margherita', description: 'Klassische Pizza mit Tomatensauce, Mozzarella und frischem Basilikum', basePrice: 14.0, image: IMG.pizza, category: '🍕 Pizza 36cm', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 780, customizable: false, popular: false },
  { id: 'rest3-pizza-salami', name: 'Pizza Salami', description: 'Pizza mit Tomatensauce, Mozzarella und würziger Salami', basePrice: 14.0, image: IMG.pizza, category: '🍕 Pizza 36cm', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Milch'], calories: 920, customizable: false, popular: false },
  { id: 'rest3-pizza-funghi', name: 'Pizza Funghi', description: 'Pizza mit Tomatensauce, Mozzarella und frischen Champignons', basePrice: 15.0, image: IMG.pizza, category: '🍕 Pizza 36cm', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 840, customizable: false, popular: false },
  { id: 'rest3-pizza-prosciutto', name: 'Pizza Prosciutto', description: 'Pizza mit Tomatensauce, Mozzarella und zartem Prosciutto', basePrice: 15.0, image: IMG.pizza, category: '🍕 Pizza 36cm', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 880, customizable: false, popular: false },
  { id: 'rest3-pizza-tonno', name: 'Pizza Tonno', description: 'Pizza mit Tomatensauce, Mozzarella, Thunfisch und roten Zwiebeln', basePrice: 15.0, image: IMG.pizza, category: '🍕 Pizza 36cm', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Fisch'], calories: 860, customizable: false, popular: false },
  { id: 'rest3-pizza-veggie', name: 'Pizza Veggie', description: 'Pizza mit Tomatensauce, Mozzarella und buntem Gemüse', basePrice: 15.0, image: IMG.pizza, category: '🍕 Pizza 36cm', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 800, customizable: false, popular: false },
  { id: 'rest3-pizza-sucuk', name: 'Pizza Sucuk', description: 'Pizza mit Tomatensauce, Mozzarella und würzigem Sucuk', basePrice: 15.0, image: IMG.pizza, category: '🍕 Pizza 36cm', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 2 }, allergens: ['Gluten', 'Milch'], calories: 940, customizable: false, popular: false },
  { id: 'rest3-pizza-hawaii', name: 'Pizza Hawaii', description: 'Pizza mit Tomatensauce, Mozzarella, Schinken und Ananas', basePrice: 15.0, image: IMG.pizza, category: '🍕 Pizza 36cm', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 870, customizable: false, popular: false },
  { id: 'rest3-pizza-quattro', name: 'Pizza Quattro Formaggi', description: 'Pizza mit vier Käsesorten: Mozzarella, Gorgonzola, Parmesan und Gouda', basePrice: 16.5, image: IMG.pizza, category: '🍕 Pizza 36cm', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 1020, customizable: false, popular: false },
  { id: 'rest3-pizza-diavola', name: 'Pizza Diavola', description: 'Scharfe Pizza mit Tomatensauce, Mozzarella, Salami und Chili', basePrice: 16.5, image: IMG.pizza, category: '🍕 Pizza 36cm', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 4 }, allergens: ['Gluten', 'Milch'], calories: 960, customizable: false, popular: false },
  { id: 'rest3-pizza-speciale', name: 'Pizza Speciale', description: 'Hausgemachte Spezial-Pizza mit Salami, Champignons, Paprika und Oliven', basePrice: 16.5, image: IMG.pizza, category: '🍕 Pizza 36cm', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Milch'], calories: 980, customizable: false, popular: false },
  { id: 'rest3-pizza-mr-happy', name: 'Pizza Mr. Happy', description: 'Die Signature-Pizza: Döner-Fleisch, Mozzarella, Paprika, Zwiebeln und Haussoße — ein echtes Highlight', basePrice: 19.7, image: IMG.pizza, category: '🍕 Pizza 36cm', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 1 }, allergens: ['Gluten', 'Milch'], calories: 1080, customizable: false, popular: true },

  // BURGER (5)
  { id: 'rest3-burger-cheese', name: 'Cheeseburger', description: 'Klassischer Cheeseburger mit Beef Patty, Cheddar, Salat, Tomate und Burgersauce', basePrice: 8.7, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 520, customizable: true, popular: false },
  { id: 'rest3-burger-chicken', name: 'Chicken Burger', description: 'Knuspriges Chicken Filet im Brioche-Bun mit Salat und Mayo', basePrice: 8.7, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 540, customizable: true, popular: false },
  { id: 'rest3-burger-big-happy', name: 'Big Happy Burger', description: 'Doppelter Beef Patty mit Cheddar, Bacon, Salat, Tomate und Haussoße — der Signature-Burger', basePrice: 11.3, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 780, customizable: true, popular: true },
  { id: 'rest3-burger-doner', name: 'Döner Burger', description: 'Döner-Fleisch im Burger-Bun mit Salat, Tomate und Knoblauch-Soße', basePrice: 11.3, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch'], calories: 680, customizable: true, popular: false },
  { id: 'rest3-burger-falafel', name: 'Falafel Burger', description: 'Knusprige Falafel im Burger-Bun mit Salat, Tomate und Tahini-Soße', basePrice: 11.3, image: IMG.burger, category: '🍔 Burger', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Sesam'], calories: 560, customizable: true, popular: false },

  // SIDES (10)
  { id: 'rest3-sides-doner-bread', name: 'Döner Brot', description: 'Frisches Fladenbrot als Beilage', basePrice: 2.0, image: IMG.borek, category: '🍟 Beilagen', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: false, spicy: 0 }, allergens: ['Gluten'], calories: 180, customizable: false, popular: false },
  { id: 'rest3-sides-pommes-frites', name: 'Pommes Frites', description: 'Knusprige Pommes Frites', basePrice: 4.0, image: IMG.pommes, category: '🍟 Beilagen', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 340, customizable: false, popular: false },
  { id: 'rest3-sides-reis', name: 'Reis', description: 'Lockerer Basmati-Reis als Beilage', basePrice: 4.5, image: IMG.salat, category: '🍟 Beilagen', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 240, customizable: false, popular: false },
  { id: 'rest3-sides-pommes-alt', name: 'Pommes (Portion)', description: 'Große Portion knusprige Pommes', basePrice: 4.7, image: IMG.pommes, category: '🍟 Beilagen', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 380, customizable: false, popular: false },
  { id: 'rest3-sides-borek', name: 'Börek', description: 'Knuspriges Blätterteig-Börek nach Wahl', basePrice: 5.1, image: IMG.borek, category: '🍟 Beilagen', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Milch', 'Ei'], calories: 390, customizable: false, popular: false },
  { id: 'rest3-sides-reis-bulgur', name: 'Reis oder Bulgur Portion', description: 'Beilage nach Wahl: lockerer Basmati-Reis oder herzhafter Bulgur', basePrice: 5.8, image: IMG.salat, category: '🍟 Beilagen', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: false, spicy: 0 }, allergens: ['Gluten'], calories: 280, customizable: false, popular: false },
  { id: 'rest3-sides-nuggets', name: '6x Nuggets + Pommes', description: '6 knusprige Chicken Nuggets mit Pommes Frites', basePrice: 8.7, image: IMG.nuggets, category: '🍟 Beilagen', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 0 }, allergens: ['Gluten', 'Ei'], calories: 620, customizable: false, popular: false },
  { id: 'rest3-sides-fleisch', name: 'Portion Fleisch', description: 'Extra Portion Döner-Fleisch', basePrice: 9.6, image: IMG.donerTeller, category: '🍟 Beilagen', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: true, spicy: 0 }, allergens: [], calories: 480, customizable: false, popular: false },
  { id: 'rest3-sides-salat', name: 'Gemischter Salat', description: 'Frischer gemischter Salat mit Tomaten, Gurken, Paprika und Dressing', basePrice: 9.7, image: IMG.salat, category: '🍟 Beilagen', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 180, customizable: false, popular: false },
  { id: 'rest3-sides-currywurst', name: 'Currywurst Pommes', description: 'Currywurst mit würziger Curry-Soße und knusprigen Pommes', basePrice: 12.1, image: IMG.currywurst, category: '🍟 Beilagen', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, spicy: 2 }, allergens: ['Gluten', 'Milch'], calories: 820, customizable: false, popular: false },

  // SAUCES (2)
  { id: 'rest3-sauce-ketchup', name: 'Ketchup/Mayo', description: 'Ketchup oder Mayonnaise als extra Beilage', basePrice: 1.0, image: IMG.sauce, category: '🍯 Saucen', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, spicy: 0 }, allergens: ['Ei'], calories: 80, customizable: false, popular: false },
  { id: 'rest3-sauce-premium', name: 'Premium Sauce', description: 'Hausgemachte Premium-Soße nach Wahl (Tzatziki, Cocktail, Knoblauch, Scharfe)', basePrice: 2.5, image: IMG.sauce, category: '🍯 Saucen', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, spicy: 0 }, allergens: ['Milch', 'Ei'], calories: 120, customizable: false, popular: false },

  // GETRÄNKE (6)
  { id: 'rest3-drinks-wasser', name: 'Wasser', description: 'Stilles Mineralwasser 0,5l', basePrice: 3.0, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 0, customizable: false, popular: false },
  { id: 'rest3-drinks-ayran', name: 'Ayran', description: 'Frisches türkisches Joghurt-Getränk, leicht gesalzen', basePrice: 3.0, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, spicy: 0 }, allergens: ['Milch'], calories: 90, customizable: false, popular: false },
  { id: 'rest3-drinks-fritz-kola', name: 'FRITZ Kola', description: 'FRITZ Kola 0,33l', basePrice: 3.5, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 140, customizable: false, popular: false },
  { id: 'rest3-drinks-fritz-limo', name: 'FRITZ Limo', description: 'FRITZ Limo in verschiedenen Sorten 0,33l', basePrice: 3.5, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 120, customizable: false, popular: false },
  { id: 'rest3-drinks-uludag', name: 'Uludağ', description: 'Türkisches Mineralwasser mit Kohlensäure 0,33l', basePrice: 3.0, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 0, customizable: false, popular: false },
  { id: 'rest3-drinks-cola', name: 'Cola / Softdrink', description: 'Cola oder Softdrink nach Wahl 0,33l', basePrice: 3.0, image: IMG.drink, category: '🥤 Getränke', restaurantId: 'restaurant3', dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, spicy: 0 }, allergens: [], calories: 130, customizable: false, popular: false },
];

// ─── Combined export ──────────────────────────────────────────────────────────

export const menuItems: MenuItem[] = [...rest1, ...rest2, ...rest3];

export const getMenuItemsByRestaurant = (restaurantId: string): MenuItem[] =>
  menuItems.filter((item) => item.restaurantId === restaurantId);

export const getMenuItemById = (id: string): MenuItem | undefined =>
  menuItems.find((item) => item.id === id);

export const getPopularItems = (): MenuItem[] =>
  menuItems.filter((item) => item.popular);

export const getCategoriesByRestaurant = (restaurantId: string): string[] => {
  const items = getMenuItemsByRestaurant(restaurantId);
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of items) {
    if (!seen.has(item.category)) {
      seen.add(item.category);
      result.push(item.category);
    }
  }
  return result;
};

export const groupByCategory = (items: MenuItem[]): Record<string, MenuItem[]> =>
  items.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, MenuItem[]>
  );
