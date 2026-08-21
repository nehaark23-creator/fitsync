import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ShoppingCart, Zap, Star, Tag, ArrowRight, Check, X, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionHeading, { Reveal } from '@/components/ui/SectionHeading';
import Modal from '@/components/ui/Modal';
import Rating from '@/components/ui/Rating';
import { useCart } from '@/context/CartContext';
import { products, productCategories } from '@/data/mockData';
import type { Product } from '@/data/mockData';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating';

export default function Shop() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState<SortOption>('popular');
  const [selected, setSelected] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'All' && p.category !== category) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    switch (sort) {
      case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'popular': result = [...result].sort((a, b) => Number(b.popular || false) - Number(a.popular || false)); break;
    }
    return result;
  }, [search, category, maxPrice, sort]);

  const handleBuyNow = (product: Product) => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/19025674/pexels-photo-19025674.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/80 to-ink-950" />
        </div>
        <div className="relative container-x text-center">
          <span className="section-label animate-fade-up">
            <ShoppingBag size={14} />
            FitSync Shop
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white animate-fade-up animate-delay-100">
            Gear Up for <span className="text-gradient">Greatness</span>
          </h1>
          <p className="mt-6 text-lg text-ink-300 max-w-2xl mx-auto animate-fade-up animate-delay-200">
            Premium supplements, equipment, and apparel — everything you need to train, recover, and perform at your best.
          </p>
        </div>
      </section>

      {/* Shop */}
      <section className="pb-20 md:pb-28">
        <div className="container-x">
          {/* Search + Sort Bar */}
          <div className="glass rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-11"
              />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="input-field cursor-pointer w-auto"
              >
                <option value="popular">Sort: Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-11 h-11 rounded-xl glass flex items-center justify-center text-ink-200 hover:text-red-500 transition-colors shrink-0"
                aria-label="Toggle filters"
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
            {/* Sidebar Filters */}
            <aside className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="glass rounded-2xl p-6 space-y-6 sticky top-24">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Categories</h3>
                  <div className="space-y-1.5">
                    {productCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`w-full text-left rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                          category === cat ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-ink-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Max Price</h3>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-red-500"
                  />
                  <div className="flex justify-between text-xs text-ink-400 mt-1">
                    <span>$10</span>
                    <span className="text-red-500 font-bold">${maxPrice}</span>
                    <span>$100</span>
                  </div>
                </div>
                <button
                  onClick={() => { setCategory('All'); setMaxPrice(100); setSearch(''); setSort('popular'); }}
                  className="w-full text-xs text-ink-400 hover:text-red-500 transition-colors text-center"
                >
                  Reset all filters
                </button>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-ink-400">
                  <span className="text-white font-bold">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="glass rounded-2xl p-16 text-center">
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={28} className="text-ink-500" />
                  </div>
                  <p className="text-lg font-bold text-white">No products found</p>
                  <p className="text-sm text-ink-400 mt-1">Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((product, i) => (
                    <Reveal key={product.id} delay={`animate-delay-${(i % 3) * 100}`}>
                      <div className="group glass rounded-2xl overflow-hidden card-hover h-full flex flex-col">
                        <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => setSelected(product)}>
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                          {product.discount && (
                            <div className="absolute top-3 left-3">
                              <span className="badge bg-red-500 text-white">
                                <Tag size={12} />
                                -{product.discount}%
                              </span>
                            </div>
                          )}
                          {product.popular && (
                            <div className="absolute top-3 right-3">
                              <span className="badge bg-white text-ink-950">
                                <Star size={12} className="fill-ink-950" />
                                Popular
                              </span>
                            </div>
                          )}
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-ink-950/70 flex items-center justify-center">
                              <span className="badge bg-ink-700 text-ink-200 text-sm">Out of Stock</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <h3 className="text-sm font-bold text-white cursor-pointer hover:text-red-500 transition-colors" onClick={() => setSelected(product)}>
                            {product.name}
                          </h3>
                          <p className="text-xs text-ink-400 mt-1 line-clamp-2 flex-1">{product.description}</p>
                          <div className="mt-3">
                            <Rating value={product.rating} reviews={product.reviews} />
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-ink-500 line-through">${product.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <button
                              onClick={() => addToCart(product)}
                              disabled={!product.inStock}
                              className="rounded-xl border border-white/10 py-2.5 text-xs font-bold text-white transition-all hover:border-red-500/50 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                            >
                              <ShoppingCart size={14} />
                              Add to Cart
                            </button>
                            <button
                              onClick={() => handleBuyNow(product)}
                              disabled={!product.inStock}
                              className="rounded-xl bg-red-500 py-2.5 text-xs font-bold text-white transition-all hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                            >
                              <Zap size={14} />
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Product Details" maxWidth="max-w-3xl">
        {selected && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-2xl overflow-hidden h-72">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                {selected.discount && (
                  <div className="absolute top-3 left-3">
                    <span className="badge bg-red-500 text-white">
                      <Tag size={12} />
                      -{selected.discount}%
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="badge bg-white/5 text-ink-200 border border-white/10 w-fit">{selected.category}</span>
                <h2 className="text-2xl font-bold text-white mt-3">{selected.name}</h2>
                <div className="mt-3">
                  <Rating value={selected.rating} reviews={selected.reviews} size="md" />
                </div>
                <p className="text-sm text-ink-300 mt-4 leading-relaxed">{selected.description}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-3xl font-bold text-white">${selected.price.toFixed(2)}</span>
                  {selected.originalPrice && (
                    <span className="text-lg text-ink-500 line-through">${selected.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  {selected.inStock ? (
                    <span className="flex items-center gap-1.5 text-red-500 font-semibold">
                      <Check size={16} /> In Stock
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-ink-500 font-semibold">
                      <X size={16} /> Out of Stock
                    </span>
                  )}
                </div>
                <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { addToCart(selected); setSelected(null); }}
                    disabled={!selected.inStock}
                    className="rounded-xl border border-white/10 py-3 text-sm font-bold text-white transition-all hover:border-red-500/50 hover:text-red-500 disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => { handleBuyNow(selected); setSelected(null); }}
                    disabled={!selected.inStock}
                    className="rounded-xl bg-red-500 py-3 text-sm font-bold text-white transition-all hover:bg-red-600 disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    <Zap size={16} />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
