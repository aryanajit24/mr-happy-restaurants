// Design: Warm Mediterranean Bistro
// MenuItemCard: displays a single menu item with dietary badges and add button

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Plus, Star } from 'lucide-react';
import type { MenuItem } from '../data/menuItems';
import CustomizationModal from './CustomizationModal';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface Props {
  item: MenuItem;
}

export default function MenuItemCard({ item }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.customizable) {
      setModalOpen(true);
    } else {
      addToCart({
        item,
        quantity: 1,
        ingredientCustomizations: [],
        selectedExtras: [],
        selectedSauces: [],
        selectedDips: [],
        selectedDrinks: [],
        specialInstructions: '',
        totalPrice: item.basePrice,
      });
      toast.success(`${item.name} hinzugefügt`, {
        description: `€${item.basePrice.toFixed(2)}`,
      });
    }
  };

  return (
    <>
      <div
        className="group bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-md hover:border-[#C4622D]/30 transition-all duration-200"
        onClick={() => setModalOpen(true)}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-muted">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {item.popular && (
            <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              Beliebt
            </div>
          )}
          {item.freeItems && (
            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {item.freeItems}
            </div>
          )}
          {item.dietaryInfo.vegan && (
            <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              Vegan
            </div>
          )}
          {!item.dietaryInfo.vegan && item.dietaryInfo.vegetarian && (
            <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              Vegetarisch
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm leading-tight text-foreground line-clamp-2">{item.name}</h3>
            {item.dietaryInfo.spicy > 0 && (
              <span className="text-xs shrink-0 text-red-500">{'🌶️'.repeat(Math.min(item.dietaryInfo.spicy, 3))}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{item.description}</p>

          {/* Dietary badges */}
          <div className="flex flex-wrap gap-1 mb-3">
            {item.dietaryInfo.glutenFree && (
              <Badge variant="outline" className="text-xs py-0 px-1.5 border-amber-300 text-amber-700">GF</Badge>
            )}
            {item.customizable && (
              <Badge variant="outline" className="text-xs py-0 px-1.5 border-[#C4622D]/30 text-[#C4622D]">Anpassbar</Badge>
            )}
          </div>

          {/* Price + Add button */}
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#C4622D] text-base">€{item.basePrice.toFixed(2)}</span>
            <button
              onClick={handleQuickAdd}
              className="w-8 h-8 bg-[#C4622D] hover:bg-[#A8521F] text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
              aria-label={`${item.name} hinzufügen`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <CustomizationModal item={item} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
