// Design: Warm Mediterranean Bistro — Terracotta, Warm Sand, Deep Olive
// CustomizationModal: full ingredient customization for menu items with simplified Yes/No buttons

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, ShoppingCart, ChevronDown, ChevronUp, Info, X } from 'lucide-react';
import type { MenuItem } from '../data/menuItems';
import type { IngredientCustomization } from '../data/customizationRules';
import { getCustomizationRuleForItem, getTotalIngredientsPrice } from '../data/customizationRules';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface Props {
  item: MenuItem | null;
  open: boolean;
  onClose: () => void;
}

const SAUCE_OPTIONS = ['Cocktail Sauce', 'Tzatziki', 'Scharfe Sauce', 'Knoblauch', 'Ranch', 'Chili Cheese'];
const DIP_OPTIONS = ['Ranch', 'Curry', 'Chilli Cheese', 'Burgersauce', 'Ketchup', 'Mayonnaise', 'BBQ', 'Süss-Sauer'];
const DRINK_OPTIONS = ['FRITZ Kola', 'FRITZ Limo Orange', 'FRITZ Limo Zitrone', 'FRITZ Limo Apfel-Kirsch-Holunder', 'FRITZ Limo Melone', 'FRITZ Limo Rhabarber', 'FRITZ Limo Honigmelone', 'Wasser'];

export default function CustomizationModal({ item, open, onClose }: Props) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [ingredientCustomizations, setIngredientCustomizations] = useState<IngredientCustomization[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Array<{ name: string; price: number }>>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [selectedDips, setSelectedDips] = useState<string[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Fleisch', 'Gemüse']));

  const rule = item ? getCustomizationRuleForItem(item.restaurantId, item.bucketType) : null;

  useEffect(() => {
    if (!open) {
      setQuantity(1);
      setIngredientCustomizations([]);
      setSelectedExtras([]);
      setSelectedSauces([]);
      setSelectedDips([]);
      setSelectedDrinks([]);
      setSpecialInstructions('');
    }
  }, [open]);

  if (!item) return null;

  const extrasPrice = selectedExtras.reduce((s, e) => s + e.price, 0);
  const ingredientsPrice = getTotalIngredientsPrice(ingredientCustomizations);

  // Sauce extra cost
  const freeSauceCount = rule?.freeSauces?.quantity ?? 0;
  const sauceExtraCount = Math.max(0, selectedSauces.length - freeSauceCount);
  const sauceExtraPrice = sauceExtraCount * (rule?.freeSauces?.additionalPrice ?? 1.0);

  // Dip extra cost
  const freeDipCount = rule?.freeDips?.quantity ?? 0;
  const dipExtraCount = Math.max(0, selectedDips.length - freeDipCount);
  const dipExtraPrice = dipExtraCount * (rule?.freeDips?.additionalPrice ?? 0.5);

  // Drink extra cost
  const freeDrinkCount = rule?.freeDrinks?.quantity ?? 0;
  const drinkExtraCount = Math.max(0, selectedDrinks.length - freeDrinkCount);
  const drinkExtraPrice = drinkExtraCount * (rule?.freeDrinks?.additionalPrice ?? 2.9);

  const itemTotal = item.basePrice + extrasPrice + ingredientsPrice + sauceExtraPrice + dipExtraPrice + drinkExtraPrice;

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const toggleIngredient = (ingredientId: string, name: string, isPremium: boolean, price: number) => {
    setIngredientCustomizations((prev) => {
      const existing = prev.find((c) => c.ingredientId === ingredientId);
      if (existing) {
        // Toggle off
        return prev.filter((c) => c.ingredientId !== ingredientId);
      }
      // Toggle on with default "normal" quantity
      return [...prev, { ingredientId, name, quantity: 'normal', isRemoved: false, isPremium, price }];
    });
  };

  const isIngredientSelected = (ingredientId: string): boolean => {
    return ingredientCustomizations.some((c) => c.ingredientId === ingredientId);
  };

  const toggleExtra = (extra: { name: string; price: number }) => {
    setSelectedExtras((prev) => {
      const exists = prev.find((e) => e.name === extra.name);
      if (exists) return prev.filter((e) => e.name !== extra.name);
      return [...prev, extra];
    });
  };

  const toggleSauce = (sauce: string) => {
    setSelectedSauces((prev) => prev.includes(sauce) ? prev.filter((s) => s !== sauce) : [...prev, sauce]);
  };

  const toggleDip = (dip: string) => {
    setSelectedDips((prev) => prev.includes(dip) ? prev.filter((d) => d !== dip) : [...prev, dip]);
  };

  const toggleDrink = (drink: string) => {
    setSelectedDrinks((prev) => prev.includes(drink) ? prev.filter((d) => d !== drink) : [...prev, drink]);
  };

  const handleAddToCart = () => {
    addToCart({
      item,
      quantity,
      ingredientCustomizations,
      selectedExtras,
      selectedSauces,
      selectedDips,
      selectedDrinks,
      specialInstructions,
      totalPrice: itemTotal,
    });
    toast.success(`${item.name} zum Warenkorb hinzugefügt`, {
      description: `${quantity}x · €${(itemTotal * quantity).toFixed(2)}`,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] flex flex-col p-0 gap-0 overflow-hidden sm:rounded-2xl">
        {/* Header image */}
        <div className="relative h-40 sm:h-48 shrink-0 overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <DialogHeader>
              <DialogTitle className="text-white text-xl sm:text-2xl font-bold leading-tight">{item.name}</DialogTitle>
            </DialogHeader>
            <p className="text-white/80 text-xs sm:text-sm mt-1 line-clamp-2">{item.description}</p>
          </div>
        </div>

        <ScrollArea className="flex-1 overflow-auto">
          <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
            {/* Dietary badges */}
            <div className="flex flex-wrap gap-2">
              {item.dietaryInfo.vegetarian && <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Vegetarisch</Badge>}
              {item.dietaryInfo.vegan && <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">Vegan</Badge>}
              {item.dietaryInfo.glutenFree && <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">Glutenfrei</Badge>}
              {item.dietaryInfo.spicy > 0 && (
                <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                  {'🌶️'.repeat(item.dietaryInfo.spicy)} Scharf
                </Badge>
              )}
              {item.calories > 0 && <Badge variant="outline" className="text-xs">{item.calories} kcal</Badge>}
            </div>

            {/* Free items info */}
            {item.freeItems && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-amber-800 font-semibold text-sm">{item.freeItems}</p>
                  <p className="text-amber-700 text-xs mt-0.5">Wähle deine kostenlosen Extras unten aus</p>
                </div>
              </div>
            )}

            {/* Sauce selection */}
            {rule?.freeSauces && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-sm">Saucen</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {freeSauceCount} GRATIS
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SAUCE_OPTIONS.map((sauce) => {
                    const selected = selectedSauces.includes(sauce);
                    const idx = selectedSauces.indexOf(sauce);
                    const isPaid = selected && idx >= freeSauceCount;
                    return (
                      <button
                        key={sauce}
                        onClick={() => toggleSauce(sauce)}
                        className={`px-3 py-2 rounded-lg border text-xs sm:text-sm transition-all font-medium ${
                          selected
                            ? 'border-[#C4622D] bg-[#C4622D]/10 text-[#C4622D]'
                            : 'border-border hover:border-[#C4622D]/50 hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate">{sauce}</span>
                          {isPaid && <span className="text-xs text-muted-foreground shrink-0">+€{rule.freeSauces!.additionalPrice.toFixed(2)}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dip selection */}
            {rule?.freeDips && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-sm">Dips</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {freeDipCount} GRATIS
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {DIP_OPTIONS.map((dip) => {
                    const selected = selectedDips.includes(dip);
                    const idx = selectedDips.indexOf(dip);
                    const isPaid = selected && idx >= freeDipCount;
                    return (
                      <button
                        key={dip}
                        onClick={() => toggleDip(dip)}
                        className={`px-3 py-2 rounded-lg border text-xs sm:text-sm transition-all font-medium ${
                          selected
                            ? 'border-[#C4622D] bg-[#C4622D]/10 text-[#C4622D]'
                            : 'border-border hover:border-[#C4622D]/50 hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate">{dip}</span>
                          {isPaid && <span className="text-xs text-muted-foreground shrink-0">+€{rule.freeDips!.additionalPrice.toFixed(2)}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Drink selection */}
            {rule?.freeDrinks && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-sm">Getränke</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {freeDrinkCount} GRATIS
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {DRINK_OPTIONS.map((drink) => {
                    const selected = selectedDrinks.includes(drink);
                    const idx = selectedDrinks.indexOf(drink);
                    const isPaid = selected && idx >= freeDrinkCount;
                    return (
                      <button
                        key={drink}
                        onClick={() => toggleDrink(drink)}
                        className={`px-3 py-2 rounded-lg border text-xs sm:text-sm transition-all font-medium ${
                          selected
                            ? 'border-[#C4622D] bg-[#C4622D]/10 text-[#C4622D]'
                            : 'border-border hover:border-[#C4622D]/50 hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate">{drink}</span>
                          {isPaid && <span className="text-xs text-muted-foreground shrink-0">+€{rule.freeDrinks!.additionalPrice.toFixed(2)}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ingredient categories — simplified Yes/No */}
            {item.customizable && rule?.ingredientCategories && rule.ingredientCategories.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-3">Zutaten anpassen</h3>
                <div className="space-y-2">
                  {rule.ingredientCategories.map((cat) => (
                    <div key={cat.name} className="border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleCategory(cat.name)}
                        className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium text-sm">{cat.name}</span>
                        {expandedCategories.has(cat.name) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expandedCategories.has(cat.name) && (
                        <div className="p-3 sm:p-4 space-y-2 bg-background/50">
                          {cat.ingredients.map((ing) => {
                            const selected = isIngredientSelected(ing.ingredientId);
                            return (
                              <button
                                key={ing.ingredientId}
                                onClick={() => toggleIngredient(ing.ingredientId, ing.name, ing.isPremium, ing.price)}
                                className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                                  selected
                                    ? 'border-[#C4622D] bg-[#C4622D]/10 text-[#C4622D] font-medium'
                                    : 'border-border hover:border-[#C4622D]/50 hover:bg-muted/50 text-foreground'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <span className="truncate text-xs sm:text-sm">{ing.name}</span>
                                  {ing.isPremium && (
                                    <span className="text-xs text-[#C4622D] font-medium shrink-0">+€{ing.price.toFixed(2)}</span>
                                  )}
                                </div>
                                <span className={`text-xs sm:text-sm font-bold shrink-0 ${selected ? 'text-[#C4622D]' : 'text-muted-foreground'}`}>
                                  {selected ? 'Ja' : 'Nein'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extras */}
            {rule && rule.addExtras.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-3">Extras hinzufügen</h3>
                <div className="grid grid-cols-2 gap-2">
                  {rule.addExtras.map((extra) => {
                    const selected = selectedExtras.some((e) => e.name === extra.name);
                    return (
                      <button
                        key={extra.name}
                        onClick={() => toggleExtra(extra)}
                        className={`px-3 py-2 rounded-lg border text-xs sm:text-sm transition-all font-medium ${
                          selected
                            ? 'border-[#C4622D] bg-[#C4622D]/10 text-[#C4622D]'
                            : 'border-border hover:border-[#C4622D]/50 hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate">{extra.name}</span>
                          <span className="text-xs shrink-0">+€{extra.price.toFixed(2)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special instructions */}
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-2">Besondere Wünsche</h3>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="z.B. ohne Zwiebeln, extra scharf..."
                className="w-full border border-border rounded-lg px-3 py-2 text-xs sm:text-sm resize-none h-16 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/30 focus:border-[#C4622D] bg-background"
              />
            </div>

            {/* Allergens */}
            {item.allergens.length > 0 && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Allergene: </span>
                {item.allergens.join(', ')}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-border p-4 sm:p-5 bg-background shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <span className="font-bold text-base sm:text-lg w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Gesamt</p>
              <p className="text-lg sm:text-xl font-bold text-[#C4622D]">€{(itemTotal * quantity).toFixed(2)}</p>
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#C4622D] hover:bg-[#A8521F] text-white font-semibold py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            Zum Warenkorb hinzufügen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
