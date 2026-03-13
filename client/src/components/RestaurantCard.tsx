// Design: Warm Mediterranean Bistro
// RestaurantCard: displays a restaurant with image, rating, and delivery info

import { Star, Clock, Truck, MapPin, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Restaurant } from '../data/restaurants';
import { isRestaurantOpen, getRestaurantHoursDisplay } from '../data/restaurants';

interface Props {
  restaurant: Restaurant;
  selected: boolean;
  onClick: () => void;
}

export default function RestaurantCard({ restaurant, selected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
        selected
          ? 'border-[#C4622D] shadow-lg shadow-[#C4622D]/10'
          : 'border-border hover:border-[#C4622D]/40 hover:shadow-md'
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Certifications + Status */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {isRestaurantOpen(restaurant) ? (
            <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full" />
              Offen
            </div>
          ) : (
            <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              Geschlossen
            </div>
          )}
          {restaurant.certifications.map((cert) => (
            <div key={cert} className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              {cert}
            </div>
          ))}
        </div>

        {/* Name overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-xl leading-tight">{restaurant.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-white text-sm font-medium">{restaurant.rating}</span>
            <span className="text-white/70 text-xs">({restaurant.reviewCount} Bewertungen)</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className={`p-4 transition-colors ${selected ? 'bg-[#C4622D]/5' : 'bg-card'}`}>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{restaurant.description}</p>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 hover:text-foreground cursor-help" title={getRestaurantHoursDisplay(restaurant)}>
            <Clock className="w-3.5 h-3.5 text-[#C4622D]" />
            {restaurant.deliveryTime}
          </span>
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-[#C4622D]" />
            €{restaurant.deliveryFee.toFixed(2)} Liefergebühr
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#C4622D]" />
            {restaurant.address.split(',')[1]?.trim() ?? restaurant.address}
          </span>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {restaurant.specialties.map((s) => (
            <Badge key={s} variant="outline" className="text-xs border-[#C4622D]/30 text-[#C4622D]">
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
