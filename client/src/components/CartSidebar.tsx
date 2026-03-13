// Design: Warm Mediterranean Bistro
// CartSidebar: right-panel cart with item list, totals, and checkout — mobile optimized

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2, ShoppingBag, MapPin, Clock, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { getRestaurantById } from '../data/restaurants';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartSidebar({ open, onClose }: Props) {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, restaurantId } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'confirm'>('cart');
  const [address, setAddress] = useState({ name: '', street: '', city: '', phone: '' });

  const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;
  const deliveryFee = restaurant?.deliveryFee ?? 0;
  const grandTotal = totalPrice + deliveryFee;

  const handleCheckout = () => {
    if (checkoutStep === 'cart') {
      setCheckoutStep('address');
    } else if (checkoutStep === 'address') {
      if (!address.name || !address.street || !address.city || !address.phone) {
        toast.error('Bitte alle Felder ausfüllen');
        return;
      }
      setCheckoutStep('confirm');
    } else {
      toast.success('Bestellung aufgegeben!', {
        description: `Deine Bestellung bei ${restaurant?.name} wird in ${restaurant?.deliveryTime} geliefert.`,
      });
      clearCart();
      setCheckoutStep('cart');
      setAddress({ name: '', street: '', city: '', phone: '' });
      onClose();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 gap-0 max-h-screen">
        <SheetHeader className="px-3 sm:px-5 py-3 sm:py-4 border-b border-border shrink-0">
          <SheetTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#C4622D]" />
            Warenkorb
            {totalItems > 0 && (
              <span className="ml-auto bg-[#C4622D] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </SheetTitle>
          {restaurant && (
            <div className="flex flex-col gap-1 text-xs text-muted-foreground mt-2 sm:flex-row sm:gap-4">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{restaurant.name}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{restaurant.deliveryTime}</span>
            </div>
          )}
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Dein Warenkorb ist leer</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Füge Gerichte aus dem Menü hinzu</p>
            </div>
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-muted/30 shrink-0 overflow-x-auto">
              {(['cart', 'address', 'confirm'] as const).map((step, i) => (
                <div key={step} className="flex items-center gap-2 shrink-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    checkoutStep === step ? 'bg-[#C4622D] text-white' :
                    ['cart', 'address', 'confirm'].indexOf(checkoutStep) > i ? 'bg-green-500 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>{i + 1}</div>
                  {i < 2 && <div className="w-6 h-0.5 bg-border shrink-0" />}
                </div>
              ))}
            </div>

            <ScrollArea className="flex-1 overflow-auto">
              {checkoutStep === 'cart' && (
                <div className="p-3 sm:p-4 space-y-3">
                  {items.map((cartItem) => (
                    <div key={cartItem.cartId} className="bg-card border border-border rounded-lg sm:rounded-xl p-3 mx-0">
                      <div className="flex gap-3">
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-xs sm:text-sm leading-tight">{cartItem.item.name}</h4>
                            <button
                              onClick={() => removeFromCart(cartItem.cartId)}
                              className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>

                          {/* Customizations summary */}
                          {(cartItem.selectedSauces.length > 0 || cartItem.selectedDips.length > 0 || cartItem.selectedDrinks.length > 0 || cartItem.selectedExtras.length > 0 || cartItem.specialInstructions) && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {[cartItem.selectedSauces.length > 0 && `Saucen: ${cartItem.selectedSauces.join(', ')}`,
                                cartItem.selectedDips.length > 0 && `Dips: ${cartItem.selectedDips.join(', ')}`,
                                cartItem.selectedDrinks.length > 0 && `Getränke: ${cartItem.selectedDrinks.join(', ')}`,
                                cartItem.selectedExtras.length > 0 && `Extras: ${cartItem.selectedExtras.map((e) => e.name).join(', ')}`,
                                cartItem.specialInstructions && `"${cartItem.specialInstructions}"`
                              ].filter(Boolean).join(' · ')}
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-2 gap-2">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              </button>
                              <span className="text-xs sm:text-sm font-medium w-4 text-center">{cartItem.quantity}</span>
                              <button
                                onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              </button>
                            </div>
                            <span className="font-bold text-sm sm:text-base text-[#C4622D]">€{(cartItem.totalPrice * cartItem.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={clearCart}
                    className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors py-2"
                  >
                    Warenkorb leeren
                  </button>
                </div>
              )}

              {checkoutStep === 'address' && (
                <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  <h3 className="font-semibold text-foreground text-sm">Lieferadresse</h3>
                  {[
                    { key: 'name', label: 'Name', placeholder: 'Vor- und Nachname' },
                    { key: 'street', label: 'Straße & Hausnummer', placeholder: 'Musterstraße 1' },
                    { key: 'city', label: 'PLZ & Stadt', placeholder: '28759 Bremen' },
                    { key: 'phone', label: 'Telefonnummer', placeholder: '+49 421 ...' },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="text-xs sm:text-sm font-medium text-foreground block mb-1">{label}</label>
                      <input
                        type="text"
                        value={address[key as keyof typeof address]}
                        onChange={(e) => setAddress((prev) => ({ ...prev, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className="w-full border border-border rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C4622D]/30 focus:border-[#C4622D] bg-background"
                      />
                    </div>
                  ))}
                </div>
              )}

              {checkoutStep === 'confirm' && (
                <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  <h3 className="font-semibold text-foreground text-sm">Bestellung bestätigen</h3>
                  <div className="bg-muted/30 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-2">
                    <div className="flex items-start gap-2 text-xs sm:text-sm">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#C4622D] mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium">{address.name}</p>
                        <p className="text-muted-foreground text-xs">{address.street}, {address.city}</p>
                        <p className="text-muted-foreground text-xs">{address.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    {items.map((i) => (
                      <div key={i.cartId} className="flex justify-between">
                        <span className="truncate">{i.quantity}x {i.item.name}</span>
                        <span className="shrink-0">€{(i.totalPrice * i.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-amber-800">
                    <p className="font-medium">Zahlung bei Lieferung</p>
                    <p className="text-xs mt-0.5">Bar oder Karte möglich</p>
                  </div>
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-border p-3 sm:p-4 space-y-3 shrink-0">
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Zwischensumme</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Liefergebühr</span>
                  <span>€{deliveryFee.toFixed(2)}</span>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between font-bold text-sm sm:text-base">
                  <span>Gesamt</span>
                  <span className="text-[#C4622D]">€{grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#C4622D] hover:bg-[#A8521F] text-white font-semibold py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                {checkoutStep === 'cart' ? 'Zur Kasse' : checkoutStep === 'address' ? 'Weiter' : 'Jetzt bestellen'}
              </Button>
              {checkoutStep !== 'cart' && (
                <button
                  onClick={() => setCheckoutStep(checkoutStep === 'confirm' ? 'address' : 'cart')}
                  className="w-full text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Zurück
                </button>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
