// Design: Warm Mediterranean Bistro
// Customization rules for all 3 restaurants

export interface ExtraOption {
  name: string;
  price: number;
}

export interface FreeAllocation {
  quantity: number;
  options: string[];
  additionalPrice: number;
}

export interface CustomizationRule {
  restaurantId: string;
  bucketType?: string;
  freeSauces?: FreeAllocation;
  freeDips?: FreeAllocation;
  freeDrinks?: FreeAllocation;
  removableItems: string[];
  addExtras: ExtraOption[];
  ingredientCategories?: IngredientCategory[];
}

export interface Ingredient {
  ingredientId: string;
  name: string;
  price: number;
  category: 'meat' | 'vegetable' | 'cheese' | 'sauce' | 'bread' | 'premium';
  isRemovable: boolean;
  isPremium: boolean;
}

export interface IngredientCategory {
  name: string;
  type: 'meat' | 'vegetable' | 'cheese' | 'sauce' | 'bread' | 'premium';
  ingredients: Ingredient[];
}

export interface IngredientCustomization {
  ingredientId: string;
  name: string;
  quantity: 'none' | 'slight' | 'normal' | 'extra';
  isRemoved: boolean;
  isPremium: boolean;
  price: number;
}

// ─── Restaurant 1 & 3: Döner Shop Ingredients ────────────────────────────────

export const donerIngredientCategories: IngredientCategory[] = [
  {
    name: 'Fleisch',
    type: 'meat',
    ingredients: [
      { ingredientId: 'meat-doner', name: 'Döner Fleisch', price: 0, category: 'meat', isRemovable: true, isPremium: false },
      { ingredientId: 'meat-hahn', name: 'Hähnchen', price: 0, category: 'meat', isRemovable: true, isPremium: false },
      { ingredientId: 'meat-sucuk', name: 'Sucuk (Türk. Wurst)', price: 1.0, category: 'meat', isRemovable: false, isPremium: true },
      { ingredientId: 'meat-hack', name: 'Hackfleisch', price: 0, category: 'meat', isRemovable: true, isPremium: false },
      { ingredientId: 'meat-double', name: 'Doppeltes Fleisch', price: 3.0, category: 'meat', isRemovable: false, isPremium: true },
      { ingredientId: 'meat-bacon', name: 'Bacon', price: 2.0, category: 'meat', isRemovable: false, isPremium: true },
    ],
  },
  {
    name: 'Gemüse',
    type: 'vegetable',
    ingredients: [
      { ingredientId: 'veg-salat', name: 'Salat', price: 0, category: 'vegetable', isRemovable: true, isPremium: false },
      { ingredientId: 'veg-tomate', name: 'Tomate', price: 0, category: 'vegetable', isRemovable: true, isPremium: false },
      { ingredientId: 'veg-zwiebel', name: 'Zwiebel', price: 0, category: 'vegetable', isRemovable: true, isPremium: false },
      { ingredientId: 'veg-kraut', name: 'Kraut', price: 0, category: 'vegetable', isRemovable: true, isPremium: false },
      { ingredientId: 'veg-gurke', name: 'Gurke', price: 0, category: 'vegetable', isRemovable: true, isPremium: false },
      { ingredientId: 'veg-jalapeno', name: 'Jalapeños', price: 0.5, category: 'vegetable', isRemovable: false, isPremium: true },
      { ingredientId: 'veg-avocado', name: 'Avocado', price: 2.5, category: 'vegetable', isRemovable: false, isPremium: true },
    ],
  },
  {
    name: 'Käse',
    type: 'cheese',
    ingredients: [
      { ingredientId: 'cheese-regular', name: 'Käse', price: 0, category: 'cheese', isRemovable: true, isPremium: false },
      { ingredientId: 'cheese-feta', name: 'Feta', price: 2.0, category: 'cheese', isRemovable: false, isPremium: true },
      { ingredientId: 'cheese-mozzarella', name: 'Mozzarella', price: 1.5, category: 'cheese', isRemovable: false, isPremium: true },
    ],
  },
  {
    name: 'Saucen',
    type: 'sauce',
    ingredients: [
      { ingredientId: 'sauce-cocktail', name: 'Cocktail Sauce', price: 0, category: 'sauce', isRemovable: true, isPremium: false },
      { ingredientId: 'sauce-tzatziki', name: 'Tzatziki', price: 0, category: 'sauce', isRemovable: true, isPremium: false },
      { ingredientId: 'sauce-scharf', name: 'Scharfe Sauce', price: 0, category: 'sauce', isRemovable: true, isPremium: false },
      { ingredientId: 'sauce-knoblauch', name: 'Knoblauch', price: 0, category: 'sauce', isRemovable: true, isPremium: false },
      { ingredientId: 'sauce-ranch', name: 'Ranch', price: 0, category: 'sauce', isRemovable: true, isPremium: false },
      { ingredientId: 'sauce-chili-cheese', name: 'Chili Cheese', price: 0, category: 'sauce', isRemovable: true, isPremium: false },
    ],
  },
  {
    name: 'Brot',
    type: 'bread',
    ingredients: [
      { ingredientId: 'bread-pita', name: 'Pita', price: 0, category: 'bread', isRemovable: false, isPremium: false },
      { ingredientId: 'bread-durum', name: 'Dürüm (Wrap)', price: 0, category: 'bread', isRemovable: false, isPremium: false },
      { ingredientId: 'bread-box', name: 'Box', price: 0, category: 'bread', isRemovable: false, isPremium: false },
    ],
  },
];

// ─── Restaurant 2: Burger Ingredients ────────────────────────────────────────

export const burgerIngredientCategories: IngredientCategory[] = [
  {
    name: 'Fleisch',
    type: 'meat',
    ingredients: [
      { ingredientId: 'b-meat-beef', name: 'Beef Patty', price: 0, category: 'meat', isRemovable: true, isPremium: false },
      { ingredientId: 'b-meat-chicken', name: 'Chicken Breast', price: 0, category: 'meat', isRemovable: true, isPremium: false },
      { ingredientId: 'b-meat-crispy', name: 'Crispy Chicken', price: 1.0, category: 'meat', isRemovable: false, isPremium: true },
      { ingredientId: 'b-meat-veggie', name: 'Veggie Patty', price: 0, category: 'meat', isRemovable: true, isPremium: false },
      { ingredientId: 'b-meat-double', name: 'Double Beef', price: 2.0, category: 'meat', isRemovable: false, isPremium: true },
      { ingredientId: 'b-meat-triple', name: 'Triple Patty', price: 4.0, category: 'meat', isRemovable: false, isPremium: true },
    ],
  },
  {
    name: 'Käse',
    type: 'cheese',
    ingredients: [
      { ingredientId: 'b-cheese-american', name: 'American Cheese', price: 0, category: 'cheese', isRemovable: true, isPremium: false },
      { ingredientId: 'b-cheese-cheddar', name: 'Cheddar', price: 0.5, category: 'cheese', isRemovable: false, isPremium: true },
      { ingredientId: 'b-cheese-swiss', name: 'Swiss', price: 0.5, category: 'cheese', isRemovable: false, isPremium: true },
      { ingredientId: 'b-cheese-bacon', name: 'Bacon Cheese', price: 1.0, category: 'cheese', isRemovable: false, isPremium: true },
      { ingredientId: 'b-cheese-blue', name: 'Blue Cheese', price: 1.5, category: 'cheese', isRemovable: false, isPremium: true },
    ],
  },
  {
    name: 'Gemüse',
    type: 'vegetable',
    ingredients: [
      { ingredientId: 'b-veg-lettuce', name: 'Salat', price: 0, category: 'vegetable', isRemovable: true, isPremium: false },
      { ingredientId: 'b-veg-tomato', name: 'Tomate', price: 0, category: 'vegetable', isRemovable: true, isPremium: false },
      { ingredientId: 'b-veg-onion', name: 'Zwiebel', price: 0, category: 'vegetable', isRemovable: true, isPremium: false },
      { ingredientId: 'b-veg-red-onion', name: 'Rote Zwiebel', price: 0, category: 'vegetable', isRemovable: true, isPremium: false },
      { ingredientId: 'b-veg-pickles', name: 'Gurken (Pickles)', price: 0, category: 'vegetable', isRemovable: true, isPremium: false },
      { ingredientId: 'b-veg-jalapeno', name: 'Jalapeños', price: 0.5, category: 'vegetable', isRemovable: false, isPremium: true },
      { ingredientId: 'b-veg-grilled-onion', name: 'Gebratene Zwiebeln', price: 0.5, category: 'vegetable', isRemovable: false, isPremium: true },
      { ingredientId: 'b-veg-avocado', name: 'Avocado', price: 2.5, category: 'vegetable', isRemovable: false, isPremium: true },
      { ingredientId: 'b-veg-mushrooms', name: 'Champignons', price: 0.75, category: 'vegetable', isRemovable: false, isPremium: true },
    ],
  },
  {
    name: 'Premium Extras',
    type: 'premium',
    ingredients: [
      { ingredientId: 'b-extra-bacon', name: 'Bacon Streifen', price: 1.5, category: 'premium', isRemovable: false, isPremium: true },
      { ingredientId: 'b-extra-egg', name: 'Spiegelei', price: 1.5, category: 'premium', isRemovable: false, isPremium: true },
      { ingredientId: 'b-extra-onion-strings', name: 'Crispy Onion Strings', price: 0.75, category: 'premium', isRemovable: false, isPremium: true },
      { ingredientId: 'b-extra-guacamole', name: 'Guacamole', price: 2.0, category: 'premium', isRemovable: false, isPremium: true },
      { ingredientId: 'b-extra-sauce', name: 'Extra Sauce', price: 0.5, category: 'premium', isRemovable: false, isPremium: true },
    ],
  },
];

// ─── Customization Rules ──────────────────────────────────────────────────────

export const customizationRules: CustomizationRule[] = [
  // Restaurant 1 — Döner Shop
  {
    restaurantId: 'restaurant1',
    freeSauces: {
      quantity: 2,
      options: ['Cocktail Sauce', 'Tzatziki', 'Scharfe Sauce', 'Knoblauch', 'Ranch', 'Chili Cheese'],
      additionalPrice: 1.0,
    },
    removableItems: ['Salat', 'Tomate', 'Zwiebel', 'Kraut', 'Käse'],
    addExtras: [
      { name: 'Extra Käse', price: 1.5 },
      { name: 'Feta', price: 2.0 },
      { name: 'Avocado', price: 2.5 },
      { name: 'Doppeltes Fleisch', price: 3.0 },
      { name: 'Bacon', price: 2.0 },
      { name: 'Extra Sauce', price: 1.0 },
    ],
    ingredientCategories: donerIngredientCategories,
  },
  // Restaurant 2 — Mr. Happy Burger (Single/Flavour Buckets)
  {
    restaurantId: 'restaurant2',
    bucketType: 'single',
    freeDips: {
      quantity: 1,
      options: ['Ranch', 'Curry', 'Chilli Cheese', 'Burgersauce', 'Ketchup', 'Mayonnaise', 'BBQ', 'Süss-Sauer'],
      additionalPrice: 0.5,
    },
    freeDrinks: {
      quantity: 1,
      options: ['FRITZ Kola', 'FRITZ Limo Orange', 'FRITZ Limo Zitrone', 'FRITZ Limo Apfel-Kirsch-Holunder', 'FRITZ Limo Melone', 'FRITZ Limo Rhabarber', 'FRITZ Limo Honigmelone', 'Wasser'],
      additionalPrice: 2.9,
    },
    removableItems: ['Salat', 'Tomate', 'Zwiebel', 'Pickles'],
    addExtras: [
      { name: 'Bacon Streifen', price: 1.5 },
      { name: 'Spiegelei', price: 1.5 },
      { name: 'Guacamole', price: 2.0 },
      { name: 'Extra Sauce', price: 0.5 },
    ],
    ingredientCategories: burgerIngredientCategories,
  },
  // Restaurant 2 — Mr. Happy Burger (Twice/Keulen/Filet Buckets)
  {
    restaurantId: 'restaurant2',
    bucketType: 'twice',
    freeDips: {
      quantity: 2,
      options: ['Ranch', 'Curry', 'Chilli Cheese', 'Burgersauce', 'Ketchup', 'Mayonnaise', 'BBQ', 'Süss-Sauer'],
      additionalPrice: 0.5,
    },
    freeDrinks: {
      quantity: 2,
      options: ['FRITZ Kola', 'FRITZ Limo Orange', 'FRITZ Limo Zitrone', 'FRITZ Limo Apfel-Kirsch-Holunder', 'FRITZ Limo Melone', 'FRITZ Limo Rhabarber', 'FRITZ Limo Honigmelone', 'Wasser'],
      additionalPrice: 2.9,
    },
    removableItems: ['Salat', 'Tomate', 'Zwiebel', 'Pickles'],
    addExtras: [
      { name: 'Bacon Streifen', price: 1.5 },
      { name: 'Spiegelei', price: 1.5 },
      { name: 'Guacamole', price: 2.0 },
      { name: 'Extra Sauce', price: 0.5 },
    ],
    ingredientCategories: burgerIngredientCategories,
  },
  // Restaurant 2 — Mr. Happy Burger (Family Bucket)
  {
    restaurantId: 'restaurant2',
    bucketType: 'family',
    freeDips: {
      quantity: 4,
      options: ['Ranch', 'Curry', 'Chilli Cheese', 'Burgersauce', 'Ketchup', 'Mayonnaise', 'BBQ', 'Süss-Sauer'],
      additionalPrice: 0.5,
    },
    freeDrinks: {
      quantity: 4,
      options: ['FRITZ Kola', 'FRITZ Limo Orange', 'FRITZ Limo Zitrone', 'FRITZ Limo Apfel-Kirsch-Holunder', 'FRITZ Limo Melone', 'FRITZ Limo Rhabarber', 'FRITZ Limo Honigmelone', 'Wasser'],
      additionalPrice: 2.9,
    },
    removableItems: ['Salat', 'Tomate', 'Zwiebel', 'Pickles'],
    addExtras: [
      { name: 'Bacon Streifen', price: 1.5 },
      { name: 'Spiegelei', price: 1.5 },
      { name: 'Guacamole', price: 2.0 },
      { name: 'Extra Sauce', price: 0.5 },
    ],
    ingredientCategories: burgerIngredientCategories,
  },
  // Restaurant 3 — Döner & Pizza
  {
    restaurantId: 'restaurant3',
    freeSauces: {
      quantity: 2,
      options: ['Cocktail Sauce', 'Tzatziki', 'Scharfe Sauce', 'Knoblauch', 'Ranch', 'Chili Cheese'],
      additionalPrice: 1.0,
    },
    removableItems: ['Salat', 'Tomate', 'Zwiebel', 'Kraut', 'Käse'],
    addExtras: [
      { name: 'Extra Käse', price: 1.5 },
      { name: 'Feta', price: 2.0 },
      { name: 'Avocado', price: 2.5 },
      { name: 'Doppeltes Fleisch', price: 3.0 },
      { name: 'Bacon', price: 2.0 },
      { name: 'Extra Sauce', price: 1.0 },
    ],
    ingredientCategories: donerIngredientCategories,
  },
];

export const getCustomizationRuleForItem = (
  restaurantId: string,
  bucketType?: string
): CustomizationRule | undefined => {
  if (bucketType) {
    return customizationRules.find(
      (r) => r.restaurantId === restaurantId && r.bucketType === bucketType
    );
  }
  return customizationRules.find(
    (r) => r.restaurantId === restaurantId && !r.bucketType
  );
};

export const getAvailableIngredients = (
  restaurantId: string,
  categoryType: string
): Ingredient[] => {
  const rule = getCustomizationRuleForItem(restaurantId);
  if (!rule?.ingredientCategories) return [];
  const cat = rule.ingredientCategories.find((c) => c.type === categoryType);
  return cat?.ingredients ?? [];
};

export const getTotalIngredientsPrice = (
  customizations: IngredientCustomization[]
): number => {
  return customizations.reduce((sum, c) => {
    if (c.isRemoved) return sum;
    if (c.isPremium && c.quantity !== 'none') return sum + c.price;
    return sum;
  }, 0);
};
