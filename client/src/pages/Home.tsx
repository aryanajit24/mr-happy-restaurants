// Design: Warm Mediterranean Bistro
// Color palette: Terracotta #C4622D, Warm Sand #F5EDD6, Deep Olive #3D4A2E, Cream #FDFAF4
// Layout: Hero → Restaurant selector → Left sidebar (categories) + Right content (menu grid)

import { useState, useMemo, useRef } from 'react';
import { Search, ShoppingCart, X, SlidersHorizontal, ChevronRight, Phone, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RestaurantCard from '../components/RestaurantCard';
import MenuItemCard from '../components/MenuItemCard';
import CartSidebar from '../components/CartSidebar';
import { restaurants } from '../data/restaurants';
import { getMenuItemsByRestaurant, getCategoriesByRestaurant, groupByCategory } from '../data/menuItems';
import { useCart } from '../contexts/CartContext';

type DietaryFilter = 'all' | 'vegetarian' | 'vegan' | 'glutenFree';

export default function Home() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { totalItems, totalPrice } = useCart();

  const selectedRestaurant = restaurants.find((r) => r.id === selectedRestaurantId);

  const allItems = useMemo(() => {
    if (!selectedRestaurantId) return [];
    return getMenuItemsByRestaurant(selectedRestaurantId);
  }, [selectedRestaurantId]);

  const categories = useMemo(() => {
    if (!selectedRestaurantId) return [];
    return getCategoriesByRestaurant(selectedRestaurantId);
  }, [selectedRestaurantId]);

  const filteredItems = useMemo(() => {
    let items = allItems;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory) {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // Dietary filter
    if (dietaryFilter === 'vegetarian') items = items.filter((i) => i.dietaryInfo.vegetarian);
    if (dietaryFilter === 'vegan') items = items.filter((i) => i.dietaryInfo.vegan);
    if (dietaryFilter === 'glutenFree') items = items.filter((i) => i.dietaryInfo.glutenFree);

    return items;
  }, [allItems, searchQuery, selectedCategory, dietaryFilter]);

  const groupedItems = useMemo(() => groupByCategory(filteredItems), [filteredItems]);

  const handleRestaurantSelect = (id: string) => {
    setSelectedRestaurantId(id);
    setSelectedCategory(null);
    setSearchQuery('');
    setDietaryFilter('all');
    setTimeout(() => menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  return (
    <div className="min-h-screen bg-[#FDFAF4]">
      {/* ─── Sticky Header ─── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#C4622D]/10 shadow-sm">
        <div className="container flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-[#C4622D] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg leading-none">M</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-black text-[#C4622D] text-lg leading-tight">Mr. Happy</p>
              <p className="text-xs text-[#3D4A2E] leading-tight -mt-0.5">Restaurants</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Suche nach Gerichten..."
              className="w-full pl-9 pr-9 py-2 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4622D]/30 focus:border-[#C4622D] bg-background"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#C4622D] hover:bg-[#A8521F] text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Warenkorb</span>
            {totalItems > 0 && (
              <>
                <span className="hidden sm:inline font-bold">€{totalPrice.toFixed(2)}</span>
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ─── Hero Section ─── */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663433407028/AuFq7AkmySU8UbRBjiGUjC/hero-main-YTnQJUd4QKqLEpSrAxE4gd.webp"
          alt="Mr. Happy Restaurants"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16">
          <p className="text-[#F5EDD6] text-sm font-medium tracking-widest uppercase mb-2">Bremen & Schwanewede</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-3">
            Mr. Happy<br />
            <span className="text-[#C4622D]">Restaurants</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-md">
            Döner, Burger, Pizza & mehr — frisch zubereitet, schnell geliefert.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full border border-white/30">
              🥙 100% Halal Döner
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full border border-white/30">
              🍔 Premium Burger
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full border border-white/30">
              🍕 36cm Pizzen
            </span>
          </div>
        </div>
      </section>

      {/* ─── Restaurant Selection ─── */}
      <section className="container py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-[#3D4A2E]">Unsere Restaurants</h2>
            <p className="text-muted-foreground text-sm mt-1">Wähle ein Restaurant und entdecke das Menü</p>
          </div>
          <Badge variant="outline" className="border-[#C4622D]/30 text-[#C4622D]">
            {restaurants.length} Standorte
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {restaurants.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              selected={selectedRestaurantId === r.id}
              onClick={() => handleRestaurantSelect(r.id)}
            />
          ))}
        </div>
      </section>

      {/* ─── Menu Section ─── */}
      {selectedRestaurantId && (
        <section ref={menuRef} className="container pb-16">
          <div className="border-t border-[#C4622D]/10 pt-8">
            {/* Menu header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-black text-[#3D4A2E]">
                  {selectedRestaurant?.name} — Menü
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {allItems.length} Gerichte · {selectedRestaurant?.deliveryTime} Lieferzeit
                </p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  showFilters ? 'bg-[#C4622D] text-white border-[#C4622D]' : 'border-border hover:border-[#C4622D]/50'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="bg-white border border-border rounded-xl p-4 mb-6 flex flex-wrap gap-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Ernährung</p>
                  <div className="flex gap-2">
                    {([
                      { value: 'all', label: 'Alle' },
                      { value: 'vegetarian', label: '🌿 Vegetarisch' },
                      { value: 'vegan', label: '🌱 Vegan' },
                      { value: 'glutenFree', label: '🌾 Glutenfrei' },
                    ] as const).map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setDietaryFilter(value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          dietaryFilter === value
                            ? 'bg-[#C4622D] text-white border-[#C4622D]'
                            : 'border-border hover:border-[#C4622D]/50'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── Mobile category scroll (outside flex for proper mobile layout) ─── */}
            <div className="lg:hidden w-full mb-4">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    !selectedCategory ? 'bg-[#C4622D] text-white border-[#C4622D]' : 'border-border hover:border-[#C4622D]/50'
                  }`}
                >
                  Alle
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedCategory === cat ? 'bg-[#C4622D] text-white border-[#C4622D]' : 'border-border hover:border-[#C4622D]/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-6">
              {/* ─── Left sidebar: category navigation ─── */}
              <aside className="hidden lg:block w-52 shrink-0">
                <div className="sticky top-20 space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">Kategorien</p>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                      !selectedCategory
                        ? 'bg-[#C4622D] text-white'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <span>Alle Gerichte</span>
                    <span className={`text-xs ${!selectedCategory ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {allItems.length}
                    </span>
                  </button>
                  {categories.map((cat) => {
                    const count = allItems.filter((i) => i.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between ${
                          selectedCategory === cat
                            ? 'bg-[#C4622D] text-white'
                            : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        <span className="truncate">{cat}</span>
                        <span className={`text-xs shrink-0 ml-1 ${selectedCategory === cat ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* ─── Main menu content ─── */}
              <div className="flex-1 min-w-0">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-4xl mb-4">🔍</p>
                    <p className="font-semibold text-foreground">Keine Gerichte gefunden</p>
                    <p className="text-sm text-muted-foreground mt-1">Versuche einen anderen Suchbegriff oder Filter</p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategory(null); setDietaryFilter('all'); }}
                      className="mt-4 text-sm text-[#C4622D] hover:underline"
                    >
                      Filter zurücksetzen
                    </button>
                  </div>
                ) : selectedCategory ? (
                  // Single category view
                  <div>
                    <h3 className="text-lg font-bold text-[#3D4A2E] mb-4">{selectedCategory}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {filteredItems.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                ) : searchQuery ? (
                  // Search results
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {filteredItems.length} Ergebnis{filteredItems.length !== 1 ? 'se' : ''} für "{searchQuery}"
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {filteredItems.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                ) : (
                  // All categories grouped
                  <div className="space-y-8">
                    {Object.entries(groupedItems).map(([category, items]) => (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-[#3D4A2E]">{category}</h3>
                          <span className="text-xs text-muted-foreground">{items.length} Gerichte</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                          {items.map((item) => (
                            <MenuItemCard key={item.id} item={item} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Footer ─── */}
      <footer className="bg-[#3D4A2E] text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-[#C4622D] rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-lg">M</span>
                </div>
                <div>
                  <p className="font-black text-lg leading-tight">Mr. Happy</p>
                  <p className="text-xs text-white/60 leading-tight">Restaurants</p>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Authentische mediterrane Küche — Döner, Burger, Pizza & mehr. Frisch zubereitet und schnell geliefert.
              </p>
            </div>
            {restaurants.map((r) => (
              <div key={r.id}>
                <h4 className="font-bold mb-3">{r.name}</h4>
                <div className="space-y-2 text-sm text-white/70">
                  <p className="flex items-start gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#C4622D]" />{r.address}</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#C4622D]" />{r.phone}</p>
                  {r.certifications.map((c) => (
                    <p key={c} className="text-green-400 font-medium">✓ {c}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/40 text-xs">
            © 2026 Mr. Happy Restaurants · Bremen & Schwanewede
          </div>
        </div>
      </footer>

      {/* ─── Cart Sidebar ─── */}
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ─── Floating cart button (mobile) ─── */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 lg:hidden">
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-3 bg-[#C4622D] text-white px-6 py-3 rounded-2xl shadow-xl font-semibold text-sm"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{totalItems} Artikel</span>
            <span className="font-bold">€{totalPrice.toFixed(2)}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
