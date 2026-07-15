import { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import OrderModal from '../components/OrderModal';

export default function Kitchen() {
  const [priceRange, setPriceRange] = useState(500000);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{name: string, price: string, image?: string} | undefined>(undefined);

  const handleOpenOrderModal = (name: string, price: string, image?: string) => {
    setSelectedProduct({ name, price, image });
    setIsOrderModalOpen(true);
  };

  return (
    <AnimatedPage>
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        productName={selectedProduct?.name}
        productPrice={selectedProduct?.price}
        productImage={selectedProduct?.image}
      />
      <section className="bg-surface-container-low py-12 px-margin-desktop border-b border-outline-variant/20">
        <div className="max-w-container-max mx-auto">
          <div className="flex items-center gap-2 text-caption text-on-surface-variant font-label-md uppercase mb-4">
            <span>Home</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Kitchen Materials</span>
          </div>
          <h1 className="font-headline-xl text-primary mb-4">Culinary Excellence Starts Here</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl">
            Equip your kitchen with tools designed for both the passionate home cook and the professional chef. Discover our meticulously crafted collection.
          </p>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-desktop py-12 flex flex-col md:flex-row gap-12">
        <aside className="w-full md:w-1/4">
          <div className="sticky top-40 space-y-10">
            <div>
              <h3 className="font-label-md text-on-surface uppercase tracking-widest mb-4">Categories</h3>
              <ul className="space-y-3 font-body-md text-on-surface-variant">
                <li className="flex justify-between items-center text-primary font-bold">
                  <span>Cookware</span>
                  <span className="text-caption bg-surface-container-highest px-2 py-0.5 rounded">24</span>
                </li>
                <li className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors">
                  <span>Bakeware</span>
                  <span className="text-caption bg-surface-container-highest px-2 py-0.5 rounded">18</span>
                </li>
                <li className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors">
                  <span>Cutlery</span>
                  <span className="text-caption bg-surface-container-highest px-2 py-0.5 rounded">32</span>
                </li>
                <li className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors">
                  <span>Appliances</span>
                  <span className="text-caption bg-surface-container-highest px-2 py-0.5 rounded">15</span>
                </li>
                <li className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors">
                  <span>Tools & Gadgets</span>
                  <span className="text-caption bg-surface-container-highest px-2 py-0.5 rounded">45</span>
                </li>
                <li className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors">
                  <span>Tabletop</span>
                  <span className="text-caption bg-surface-container-highest px-2 py-0.5 rounded">28</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-label-md text-on-surface uppercase tracking-widest mb-4">Filter by Price</h3>
              <input 
                type="range" 
                min="0" 
                max="1000000" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary" 
              />
              <div className="flex justify-between font-caption text-on-surface-variant mt-2">
                <span>₦0</span>
                <span>₦{priceRange.toLocaleString()}+</span>
              </div>
            </div>

            <div>
              <h3 className="font-label-md text-on-surface uppercase tracking-widest mb-4">Material</h3>
              <div className="space-y-2 font-body-md text-on-surface-variant">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-primary" defaultChecked />
                  <span>Stainless Steel</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                  <span>Cast Iron</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                  <span>Copper</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                  <span>Ceramic</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-8">
            <p className="font-body-md text-on-surface-variant">Showing 1-12 of 162 Products</p>
            <div className="flex items-center gap-2">
              <span className="font-label-md text-on-surface-variant">Sort by:</span>
              <select className="bg-transparent border border-outline-variant rounded p-2 text-on-surface font-body-md outline-none focus:border-primary">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mb-16">
            <div className="group cursor-pointer">
              <div className="aspect-square bg-surface-container-low overflow-hidden relative mb-4">
                <div className="absolute top-4 left-4 z-10 bg-surface text-on-surface px-2 py-1 font-label-md text-[10px] uppercase">Best Seller</div>
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC6u0Wp8D67u3HlW9z9t847v71jT5mX2YQvK-784f1MIFb6L3oD09-O99p2P6Lg42Yt1g6_nE1v3QzD0KlyoE6Jk06j11977M8lD-XfNqX5uO_oF0iE4y0d19u0qG-7E1-2J8n5O-vN8u4B6jH_T4M3gE-_Q5yYVv1XGk6C6rX-g" alt="Pan" />
                <button 
                  onClick={() => handleOpenOrderModal('Heritage Saute Pan', '₦145,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC6u0Wp8D67u3HlW9z9t847v71jT5mX2YQvK-784f1MIFb6L3oD09-O99p2P6Lg42Yt1g6_nE1v3QzD0KlyoE6Jk06j11977M8lD-XfNqX5uO_oF0iE4y0d19u0qG-7E1-2J8n5O-vN8u4B6jH_T4M3gE-_Q5yYVv1XGk6C6rX-g')}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-surface text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                </button>
              </div>
              <p className="font-label-md text-on-surface-variant uppercase text-[10px] mb-1">Cookware</p>
              <h4 className="font-headline-md text-on-surface text-lg mb-1">Heritage Saute Pan</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-secondary text-xs">
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star_half</span>
                </div>
                <span className="font-caption text-on-surface-variant">(45)</span>
              </div>
              <p className="font-headline-md text-primary">₦145,000</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-square bg-surface-container-low overflow-hidden relative mb-4">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD34qXJ-R4B0Gtzw17yYyLzQ0G3K4oWz_6t_4gL7s-P4z9Tf_L4R0s72F9f4t8kC9w4qj3jFhT2ZzM37f2O6y7x-3k_L2sD5jU4Q7e80q6Kz06Lh9b6yR-3r4y89wH92x-1Bv8j7l4B3s4e0uF8F4f0R9A_N7H-Q6A3b_g" alt="Knife" />
                <button 
                  onClick={() => handleOpenOrderModal('Artisan Damascus Chef Knife', '₦220,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD34qXJ-R4B0Gtzw17yYyLzQ0G3K4oWz_6t_4gL7s-P4z9Tf_L4R0s72F9f4t8kC9w4qj3jFhT2ZzM37f2O6y7x-3k_L2sD5jU4Q7e80q6Kz06Lh9b6yR-3r4y89wH92x-1Bv8j7l4B3s4e0uF8F4f0R9A_N7H-Q6A3b_g')}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-surface text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                </button>
              </div>
              <p className="font-label-md text-on-surface-variant uppercase text-[10px] mb-1">Cutlery</p>
              <h4 className="font-headline-md text-on-surface text-lg mb-1">Artisan Damascus Chef Knife</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-secondary text-xs">
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                </div>
                <span className="font-caption text-on-surface-variant">(112)</span>
              </div>
              <p className="font-headline-md text-primary">₦220,000</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-square bg-surface-container-low overflow-hidden relative mb-4">
                <div className="absolute top-4 left-4 z-10 bg-secondary text-on-secondary px-2 py-1 font-label-md text-[10px] uppercase">New Arrival</div>
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPY0v8hN3w9z1yZ7Y9c_Zk4A3YtG-V8T2N1rO8P9Q4B_hI6_8_v7qX-O9P5t9c_3d1k9w3Y4G9e8_gV4_8bY-Q7B5_V_G9a9p_v_E6_8N_w-g6-5d9c7P9u9e-hG5Yv4k9H9x9A-t7B8x9V4_g-Q9x8N-A6YvV4k8_g" alt="Kettle" />
                <button 
                  onClick={() => handleOpenOrderModal('Smart Temperature Kettle', '₦185,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPY0v8hN3w9z1yZ7Y9c_Zk4A3YtG-V8T2N1rO8P9Q4B_hI6_8_v7qX-O9P5t9c_3d1k9w3Y4G9e8_gV4_8bY-Q7B5_V_G9a9p_v_E6_8N_w-g6-5d9c7P9u9e-hG5Yv4k9H9x9A-t7B8x9V4_g-Q9x8N-A6YvV4k8_g')}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-surface text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                </button>
              </div>
              <p className="font-label-md text-on-surface-variant uppercase text-[10px] mb-1">Appliances</p>
              <h4 className="font-headline-md text-on-surface text-lg mb-1">Smart Temperature Kettle</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-secondary text-xs">
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined text-outline-variant text-[14px]">star</span>
                </div>
                <span className="font-caption text-on-surface-variant">(28)</span>
              </div>
              <p className="font-headline-md text-primary">₦185,000</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-square bg-surface-container-low overflow-hidden relative mb-4">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD34qXJ-R4B0Gtzw17yYyLzQ0G3K4oWz_6t_4gL7s-P4z9Tf_L4R0s72F9f4t8kC9w4qj3jFhT2ZzM37f2O6y7x-3k_L2sD5jU4Q7e80q6Kz06Lh9b6yR-3r4y89wH92x-1Bv8j7l4B3s4e0uF8F4f0R9A_N7H-Q6A3b_g" alt="Bowl" />
                <button 
                  onClick={() => handleOpenOrderModal('Copper Mixing Bowl Set', '₦115,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD34qXJ-R4B0Gtzw17yYyLzQ0G3K4oWz_6t_4gL7s-P4z9Tf_L4R0s72F9f4t8kC9w4qj3jFhT2ZzM37f2O6y7x-3k_L2sD5jU4Q7e80q6Kz06Lh9b6yR-3r4y89wH92x-1Bv8j7l4B3s4e0uF8F4f0R9A_N7H-Q6A3b_g')}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-surface text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                </button>
              </div>
              <p className="font-label-md text-on-surface-variant uppercase text-[10px] mb-1">Bakeware</p>
              <h4 className="font-headline-md text-on-surface text-lg mb-1">Copper Mixing Bowl Set</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-secondary text-xs">
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                </div>
                <span className="font-caption text-on-surface-variant">(86)</span>
              </div>
              <p className="font-headline-md text-primary">₦115,000</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-square bg-surface-container-low overflow-hidden relative mb-4">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC6u0Wp8D67u3HlW9z9t847v71jT5mX2YQvK-784f1MIFb6L3oD09-O99p2P6Lg42Yt1g6_nE1v3QzD0KlyoE6Jk06j11977M8lD-XfNqX5uO_oF0iE4y0d19u0qG-7E1-2J8n5O-vN8u4B6jH_T4M3gE-_Q5yYVv1XGk6C6rX-g" alt="Wok" />
                <button 
                  onClick={() => handleOpenOrderModal('Carbon Steel Wok', '₦110,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC6u0Wp8D67u3HlW9z9t847v71jT5mX2YQvK-784f1MIFb6L3oD09-O99p2P6Lg42Yt1g6_nE1v3QzD0KlyoE6Jk06j11977M8lD-XfNqX5uO_oF0iE4y0d19u0qG-7E1-2J8n5O-vN8u4B6jH_T4M3gE-_Q5yYVv1XGk6C6rX-g')}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-surface text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                </button>
              </div>
              <p className="font-label-md text-on-surface-variant uppercase text-[10px] mb-1">Cookware</p>
              <h4 className="font-headline-md text-on-surface text-lg mb-1">Carbon Steel Wok</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-secondary text-xs">
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star_half</span>
                </div>
                <span className="font-caption text-on-surface-variant">(215)</span>
              </div>
              <p className="font-headline-md text-primary">₦110,000</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-square bg-surface-container-low overflow-hidden relative mb-4">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPY0v8hN3w9z1yZ7Y9c_Zk4A3YtG-V8T2N1rO8P9Q4B_hI6_8_v7qX-O9P5t9c_3d1k9w3Y4G9e8_gV4_8bY-Q7B5_V_G9a9p_v_E6_8N_w-g6-5d9c7P9u9e-hG5Yv4k9H9x9A-t7B8x9V4_g-Q9x8N-A6YvV4k8_g" alt="Mixer" />
                <button 
                  onClick={() => handleOpenOrderModal('Professional Stand Mixer', '₦450,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPY0v8hN3w9z1yZ7Y9c_Zk4A3YtG-V8T2N1rO8P9Q4B_hI6_8_v7qX-O9P5t9c_3d1k9w3Y4G9e8_gV4_8bY-Q7B5_V_G9a9p_v_E6_8N_w-g6-5d9c7P9u9e-hG5Yv4k9H9x9A-t7B8x9V4_g-Q9x8N-A6YvV4k8_g')}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-surface text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                </button>
              </div>
              <p className="font-label-md text-on-surface-variant uppercase text-[10px] mb-1">Appliances</p>
              <h4 className="font-headline-md text-on-surface text-lg mb-1">Professional Stand Mixer</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-secondary text-xs">
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[14px]">star</span>
                </div>
                <span className="font-caption text-on-surface-variant">(304)</span>
              </div>
              <p className="font-headline-md text-primary">₦450,000</p>
            </div>
          </div>

          <div className="w-full bg-primary rounded-xl overflow-hidden flex flex-col sm:flex-row mb-16 shadow-lg">
            <div className="w-full sm:w-1/2 bg-cover bg-center h-64 sm:h-auto" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCuOU2SqV_UZ1J12xCE_jsqnGC5y41GsVYi-GudlrxjGsxN3vYRjjwOT6resHTst06QHb07gUavC0h59N_VL1B7s59EXGPzUTa2MQOx5PWrDOafGbxmnMVot5z-YqUed-ybI4ijHlg1IB2YIYWI8ZatLmOXba9RK2LW6LbeHUm6bdEfak3XIYpCrnfwqi2_58ETPxhrD4mbQ-qd5QkAVAr8De08c3ywE0jyfu_BEVALLIK4sAb8-HEKWA')" }}></div>
            <div className="w-full sm:w-1/2 p-10 flex flex-col justify-center text-on-primary">
              <span className="font-label-md text-primary-fixed uppercase tracking-[0.2em] mb-2">Featured Collection</span>
              <h3 className="font-headline-md mb-4">The Professional Grade Standard</h3>
              <p className="font-body-md text-on-primary/80 mb-6">Designed for those who demand precision. Our professional series offers unmatched durability and thermal performance.</p>
              <button className="bg-surface text-primary w-fit px-6 py-2 rounded font-label-md hover:bg-surface-variant transition-colors">SHOP PROFESSIONAL</button>
            </div>
          </div>

          <div>
            <h3 className="font-headline-md text-primary mb-6">Quick Access</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30 flex flex-col items-center text-center group cursor-pointer hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:scale-110 transition-transform">bakery_dining</span>
                <h4 className="font-label-md text-on-surface mb-2">Baking Essentials</h4>
                <p className="font-caption text-on-surface-variant">Pans, sheets & tools</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30 flex flex-col items-center text-center group cursor-pointer hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:scale-110 transition-transform">blender</span>
                <h4 className="font-label-md text-on-surface mb-2">Smart Appliances</h4>
                <p className="font-caption text-on-surface-variant">Modernize your prep</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30 flex flex-col items-center text-center group cursor-pointer hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:scale-110 transition-transform">kitchen</span>
                <h4 className="font-label-md text-on-surface mb-2">Kitchen Storage</h4>
                <p className="font-caption text-on-surface-variant">Organize with elegance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
