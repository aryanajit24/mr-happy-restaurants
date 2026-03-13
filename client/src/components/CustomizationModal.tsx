// Design: Warm Mediterranean Bistro — Terracotta, Warm Sand, Deep Olive
// CustomizationModal: full ingredient customization for menu items

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, ShoppingCart, ChevronDown, ChevronUp, Info } from 'lucide-react';
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

type QuantityLevel = 'none' | 'slight' | 'normal' | 'extra';

const QUANTITY_LABELS: Record<QuantityLevel, string> = {
  none: 'Nein',
  slight: 'Wenig',
  normal: 'Normal',
  extra: 'Extra',
};

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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Fleisch', 'Gemüse', 'Saucen']));

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

  const updateIngredientQuantity = (ingredientId: string, name: string, quantity: QuantityLevel, isPremium: boolean, price: number) => {
    setIngredientCustomizations((prev) => {
      const existing = prev.find((c) => c.ingredientId === ingredientId);
      if (existing) {
        if (quantity === 'none') {
          return prev.map((c) => c.ingredientId === ingredientId ? { ...c, quantity: 'none', isRemoved: true } : c);
        }
        return prev.map((c) => c.ingredientId === ingredientId ? { ...c, quantity, isRemoved: false } : c);
      }
      return [...prev, { ingredientId, name, quantity, isRemoved: quantity === 'none', isPremium, price }];
    });
  };

  const getIngredientQuantity = (ingredientId: string): QuantityLevel => {
    const c = ingredientCustomizations.find((c) => c.ingredientId === ingredientId);
    return c ? c.quantity : 'normal';
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
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Header image */}
        <div className="relative h-48 shrink-0 overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <DialogHeader>
              <DialogTitle className="text-white text-2xl font-bold leading-tight">{item.name}</DialogTitle>
            </DialogHeader>
            <p className="text-white/80 text-sm mt-1">{item.description}</p>
          </div>
        </div>

        <ScrollArea className="flex-1 overflow-auto">
          <div className="p-5 space-y-5">
            {/* Dietary badges */}
            <div className="flex flex-wrap gap-2">
              {item.dietaryInfo.vegetarian && <Badge className="bg-green-100 text-green-800 border-green-200">Vegetarisch</Badge>}
              {item.dietaryInfo.vegan && <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Vegan</Badge>}
              {item.dietaryInfo.glutenFree && <Badge className="bg-amber-100 text-amber-800 border-amber-200">Glutenfrei</Badge>}
              {item.dietaryInfo.spicy > 0 && (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  {'🌶️'.repeat(item.dietaryInfo.spicy)} Scharf
                </Badge>
              )}
              {item.calories > 0 && <Badge variant="outline">{item.calories} kcal</Badge>}
            </div>

            {/* Free items info for buckets */}
            {item.freeItems && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-amber-800 font-semibold text-sm">{item.freeItems}</p>
                  <p className="text-amber-700 text-xs mt-0.5">Wähle deine kostenlosen Extras unten aus</p>
                </div>
              </div>
            )}

            {/* Sauce selection for döner restaurants */}
            {rule?.freeSauces && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Saucen wählen</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {freeSauceCount} GRATIS · weitere +€{rule.freeSauces.additionalPrice.toFixed(2)}
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
                        className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all ${
                          selected
                            ? 'border-[#C4622D] bg-[#C4622D]/10 text-[#C4622D] font-medium'
                            : 'border-border hover:border-[#C4622D]/50 hover:bg-muted/50'
                        }`}
                      >
                        <span>{sauce}</span>
                        {isPaid && <span className="text-xs text-muted-foreground">+€{rule.freeSauces!.additionalPrice.toFixed(2)}</span>}
                        {!isPaid && selected && <span className="text-xs text-green-600">Gratis</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dip selection for burger buckets */}
            {rule?.freeDips && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Dips wählen</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {freeDipCount} GRATIS · weitere +€{rule.freeDips.additionalPrice.toFixed(2)}
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
                        className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all ${
                          selected
                            ? 'border-[#C4622D] bg-[#C4622D]/10 text-[#C4622D] font-medium'
                            : 'border-border hover:border-[#C4622D]/50 hover:bg-muted/50'
                        }`}
                      >
                        <span>{dip}</span>
                        {isPaid && <span className="text-xs text-muted-foreground">+€{rule.freeDips!.additionalPrice.toFixed(2)}</span>}
                        {!isPaid && selected && <span className="text-xs text-green-600">Gratis</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Drink selection for burger buckets */}
            {rule?.freeDrinks && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Getränke wählen</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {freeDrinkCount} GRATIS · weitere +€{rule.freeDrinks.additionalPrice.toFixed(2)}
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
                        className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all ${
                          selected
                            ? 'border-[#C4622D] bg-[#C4622D]/10 text-[#C4622D] font-medium'
                            : 'border-border hover:border-[#C4622D]/50 hover:bg-muted/50'
                        }`}
                      >
                        <span>{drink}</span>
                        {isPaid && <span className="text-xs text-muted-foreground">+€{rule.freeDrinks!.additionalPrice.toFixed(2)}</span>}
                        {!isPaid && selected && <span className="text-xs text-green-600">Gratis</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ingredient categories */}
            {item.customizable && rule?.ingredientCategories && rule.ingredientCategories.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Zutaten anpassen</h3>
                <div className="space-y-2">
                  {rule.ingredientCategories.map((cat) => (
                    <div key={cat.name} className="border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleCategory(cat.name)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium text-sm">{cat.name}</span>
                        {expandedCategories.has(cat.name) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expandedCategories.has(cat.name) && (
                        <div className="p-3 space-y-2">
                          {cat.ingredients.map((ing) => {
                            const currentQty = getIngredientQuantity(ing.ingredientId);
                            return (
                              <div key={ing.ingredientId} className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-sm truncate">{ing.name}</span>
                                  {ing.isPremium && (
                                    <span className="text-xs text-[#C4622D] font-medium shrink-0">+€{ing.price.toFixed(2)}</span>
                                  )}
                                  {ing.isRemovable && !ing.isPremium && (
                                    <span className="text-xs text-muted-foreground shrink-0">entfernbar</span>
                                  )}
                                </div>
                                <div className="flex gap-1 shrink-0">
                                  {(['none', 'slight', 'normal', 'extra'] as QuantityLevel[]).map((level) => (
                                    <button
                                      key={level}
                                      onClick={() => updateIngredientQuantity(ing.ingredientId, ing.name, level, ing.isPremium, ing.price)}
                                      className={`px-2 py-1 text-xs rounded border transition-all ${
                                        currentQty === level
                                          ? 'bg-[#C4622D] text-white border-[#C4622D]'
                                          : 'border-border hover:border-[#C4622D]/50 text-muted-foreground'
                                      }`}
                                    >
                                      {QUANTITY_LABELS[level]}
                                    </button>
                                  ))}
                                </div>
                              </div>
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
                <h3 className="font-semibold text-foreground mb-3">Extras hinzufügen</h3>
                <div className="grid grid-cols-2 gap-2">
                  {rule.addExtras.map((extra) => {
                    const selected = selectedExtras.some((e) => e.name === extra.name);
                    return (
                      <button
                        key={extra.name}
                        onClick={() => toggleExtra(extra)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all ${
                          selected
                            ? 'border-[#C4622D] bg-[#C4622D]/10 text-[#C4622D] font-medium'
                            : 'border-border hover:border-[#C4622D]/50 hover:bg-muted/50'
                        }`}
                      >
                        <span>{extra.name}</span>
                        <span className="text-xs">+€{extra.price.toFixed(2)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special instructions */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Besondere Wünsche</h3>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="z.B. ohne Zwiebeln, extra scharf, Soße separat..."
                className="w-full border border-border rounded-lg px-3 py-2 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/30 focus:border-[#C4622D] bg-background"
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
        <div className="border-t border-border p-4 bg-background shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-lg w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Gesamt</p>
              <p className="text-xl font-bold text-[#C4622D]">€{(itemTotal * quantity).toFixed(2)}</p>
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#C4622D] hover:bg-[#A8521F] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Zum Warenkorb hinzufügen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
