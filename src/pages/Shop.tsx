import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import AnimatedPage from '../components/AnimatedPage';
import OrderModal from '../components/OrderModal';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, SlidersHorizontal, Check } from 'lucide-react';

interface ShopProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  imageUrl: string;
  stars?: number;
  reviewsCount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

const staticProducts: ShopProduct[] = [
  // Kitchenware
  {
    id: 's1',
    name: 'Heritage Saute Pan',
    category: 'Kitchenware',
    price: '₦145,000',
    description: 'Enameled cast iron saute pan designed for professional searing and slow simmering.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC6u0Wp8D67u3HlW9z9t847v71jT5mX2YQvK-784f1MIFb6L3oD09-O99p2P6Lg42Yt1g6_nE1v3QzD0KlyoE6Jk06j11977M8lD-XfNqX5uO_oF0iE4y0d19u0qG-7E1-2J8n5O-vN8u4B6jH_T4M3gE-_Q5yYVv1XGk6C6rX-g',
    stars: 4.5,
    reviewsCount: 45,
    isBestseller: true
  },
  {
    id: 's2',
    name: 'Artisan Damascus Chef Knife',
    category: 'Kitchenware',
    price: '₦220,000',
    description: 'Forged 67-layer Damascus steel blade with premium dark walnut handle.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD34qXJ-R4B0Gtzw17yYyLzQ0G3K4oWz_6t_4gL7s-P4z9Tf_L4R0s72F9f4t8kC9w4qj3jFhT2ZzM37f2O6y7x-3k_L2sD5jU4Q7e80q6Kz06Lh9b6yR-3r4y89wH92x-1Bv8j7l4B3s4e0uF8F4f0R9A_N7H-Q6A3b_g',
    stars: 5.0,
    reviewsCount: 112
  },
  {
    id: 's3',
    name: 'Smart Temperature Kettle',
    category: 'Kitchenware',
    price: '₦185,000',
    description: 'Precision temperature kettle with smart controls and real-time OLED heat gauge.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPY0v8hN3w9z1yZ7Y9c_Zk4A3YtG-V8T2N1rO8P9Q4B_hI6_8_v7qX-O9P5t9c_3d1k9w3Y4G9e8_gV4_8bY-Q7B5_V_G9a9p_v_E6_8N_w-g6-5d9c7P9u9e-hG5Yv4k9H9x9A-t7B8x9V4_g-Q9x8N-A6YvV4k8_g',
    stars: 4.0,
    reviewsCount: 28,
    isNew: true
  },
  {
    id: 's4',
    name: 'Copper Mixing Bowl Set',
    category: 'Kitchenware',
    price: '₦115,000',
    description: 'Trio of solid copper mixing bowls with ergonomic loops and nestable design.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD34qXJ-R4B0Gtzw17yYyLzQ0G3K4oWz_6t_4gL7s-P4z9Tf_L4R0s72F9f4t8kC9w4qj3jFhT2ZzM37f2O6y7x-3k_L2sD5jU4Q7e80q6Kz06Lh9b6yR-3r4y89wH92x-1Bv8j7l4B3s4e0uF8F4f0R9A_N7H-Q6A3b_g',
    stars: 5.0,
    reviewsCount: 86
  },
  {
    id: 's5',
    name: 'Carbon Steel Wok',
    category: 'Kitchenware',
    price: '₦110,000',
    description: 'Lightweight and ultra-conductive wok for premium high-heat stir frying.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC6u0Wp8D67u3HlW9z9t847v71jT5mX2YQvK-784f1MIFb6L3oD09-O99p2P6Lg42Yt1g6_nE1v3QzD0KlyoE6Jk06j11977M8lD-XfNqX5uO_oF0iE4y0d19u0qG-7E1-2J8n5O-vN8u4B6jH_T4M3gE-_Q5yYVv1XGk6C6rX-g',
    stars: 4.5,
    reviewsCount: 215
  },
  {
    id: 's6',
    name: 'Copper Utensil Gallery',
    category: 'Kitchenware',
    price: '₦310,000',
    description: 'Handcrafted wall-mounted collection of luxury copper tools and kitchen organizers.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZVizGbpKpDwhv95GgT8D5M4yPmNtF9DnpHxkbnEoEBFsvp5XOmqIDHfdCSZp7SReA4jfdmtZ1HBisEmfyma5oY_zEUWayhXcgbjzO9hunmv0AMsEKsGDkO9f5baqpXK6bmrl9TbxdRJUcnAEHb4YukOfDqns0zEn-ix5ZIka0KNXTrROK07SG_TpBRfwBU_-VntvgItnI-hBDobOTEpE5JVB05W34e5hNkfsm3iRb3F1-tOfiyzJ0oA',
    stars: 4.8,
    reviewsCount: 19
  },

  // Bedding & Linen
  {
    id: 's7',
    name: 'Premium Silk Bedding Set',
    category: 'Bedding & Linen',
    price: '₦120,000',
    description: '100% pure Mulberry silk sheet set with envelope pillows for exquisite rest.',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600',
    stars: 4.7,
    reviewsCount: 52,
    isNew: true
  },
  {
    id: 's8',
    name: 'Classic Linen Room Set',
    category: 'Bedding & Linen',
    price: '₦210,000',
    description: '1000-thread count Egyptian cotton sheet bundle with tailored border embroidery.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxQBbebsXOpVZ1VTspvkASZm_19oYyDBbQPxZAW2RzP5P_zwcgPaEh4kJNNboa8AfEAzdANEPew_vqP3Y0SrwADFmLXwUStxpaY7GXV70gr-3hJnBPC0C0aWL2XpdnAv--tG4Kq4_Z_GxId4NXiXfuKE6X2BLS8q4ArUIj1wWljjFek6jMcSvxr_g1Z7N638fBQGc0cFDfkyNPBVfedTxdOnjzTNuBMaRIU2iU16xd0HFFg380lGlWmg',
    stars: 4.9,
    reviewsCount: 78
  },

  // Baby & Nursery
  {
    id: 's9',
    name: 'Kids Construction Play Outfit',
    category: 'Baby & Nursery',
    price: '₦45,000',
    description: 'Organic combed cotton jumpsuit set with friendly graphics for active play.',
    imageUrl: 'https://images.unsplash.com/photo-1519238382740-4cb50f6ea312?auto=format&fit=crop&q=80&w=600',
    stars: 4.6,
    reviewsCount: 34,
    isNew: true
  },
  {
    id: 's10',
    name: 'Nursery Canopy Bedding',
    category: 'Baby & Nursery',
    price: '₦85,000',
    description: 'Hypoallergenic soft breathable drapes for the perfect comforting baby environment.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsyplgedvvgzx1fFldrRWdLfkZDW-FwezaNsKCRw2d_HbO8FLnMpoJB5gbAmPlSi2kjKSmKvQl-FaDnNBZB5P53RQbqZSiDxdjgR7YYe6VD8MZD6cifPWFbavM07jrYGVSfY6TLv3MORLzcukkf9VGBkMpuwAoIGim44GM32-5HSpjPb_3aNmB9zDk4GwUG51em1KWRGgDY0Mdu3sH8_0klUBcync1Z8E-X3AgENs-1xnPCn83ZdNOaA',
    stars: 4.8,
    reviewsCount: 12
  },

  // Travel Gear
  {
    id: 's11',
    name: 'The Voyager Carry-On',
    category: 'Travel Gear',
    price: '₦325,000',
    description: 'Ultra-tough aerospace polycarbonate cabin case with multi-directional silent wheels.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiR-ujdbTrEVgKuiDGrh7XgN2XpOnNwky9b2biPvN5syVPL-FyZ5lJ8IVLw9NhH1Ci11m-DcCB_l6_NYbf02BDY1BDEaNJ4TphqJ8fYBlVydTOpna17EpY4eogk_LKYm0mGNvVTqVqJIZ8hUN53zmlk5x4EUADBgnfrUo0uSpTA-rfEYpuVBZnMdfVS_2Nn-a-vhFC7h1XWaBq6JzCuNtFow2yDhnlMo-4zxBauet30CugsEDCVm5-mw',
    stars: 4.9,
    reviewsCount: 167,
    isBestseller: true
  },
  {
    id: 's12',
    name: 'Canvas & Leather Weekender',
    category: 'Travel Gear',
    price: '₦450,000',
    description: 'Waxed heavy-duty canvas travel duffle with full grain bridle leather details.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtcgvsCugVdqPRWzXRjLsl3xAWrZm0llstG4uj1a6JOydh_7kc7rotamQfVImMgKbLe9ipZ7Dm5nbKxTUkNdtCwc1lJyetFZ8bdrDpvh4bEuF_HhH7SjnONOYCV8Zh1xmB35cHoZVA6qO6unZ0uG9Bj_qQ1KaOMRbVEg1gdaQzv7z-tia3-unA5UpUEhT8LSOIX_Eej9BJz7vCW0RyfrnPhXUIAFCc-U-F5bgqfDAn9i3RwW3jJVR9rg',
    stars: 4.8,
    reviewsCount: 94
  },
  {
    id: 's13',
    name: 'Hard-Shell Large Check-In',
    category: 'Travel Gear',
    price: '₦550,000',
    description: 'Extended holiday check-in luggage with built-in compression pad and digital weight gauge.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiR-ujdbTrEVgKuiDGrh7XgN2XpOnNwky9b2biPvN5syVPL-FyZ5lJ8IVLw9NhH1Ci11m-DcCB_l6_NYbf02BDY1BDEaNJ4TphqJ8fYBlVydTOpna17EpY4eogk_LKYm0mGNvVTqVqJIZ8hUN53zmlk5x4EUADBgnfrUo0uSpTA-rfEYpuVBZnMdfVS_2Nn-a-vhFC7h1XWaBq6JzCuNtFow2yDhnlMo-4zxBauet30CugsEDCVm5-mw',
    stars: 4.6,
    reviewsCount: 41
  },
  {
    id: 's14',
    name: 'Compression Packing Cubes',
    category: 'Travel Gear',
    price: '₦65,000',
    description: 'Set of 4 ripstop nylon compression pouches for perfect packing optimization.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsdOdeIv59BBimXaNMngLVdZT3nRCHHMCIY2mMBktB3XZDjY6S1sJ3bF6IOo4RlAiIFO2I3vOUbxcIhv8fbh4VWEaaRiMQ6k4chhc_MPp9uaEw61_uSL98lpB02ua9soIEXO4DgMxOfIIsH95-T4o4s29STfYa5pxTY21NEuBbAPqsven60qh8i8uX6gEwuGm0xGblyhisNFzVe31zf49nNMK2du8S_KURr9kBrxua55lBcRsezJJA3w',
    stars: 4.4,
    reviewsCount: 30
  },

  // Home Decor
  {
    id: 's15',
    name: 'Artisan Smoke Carafe',
    category: 'Home Decor',
    price: '₦185,000',
    description: 'Hand-blown heavy smoke glass pitcher with complementary solid matching tumblers.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuOU2SqV_UZ1J12xCE_jsqnGC5y41GsVYi-GudlrxjGsxN3vYRjjwOT6resHTst06QHb07gUavC0h59N_VL1B7s59EXGPzUTa2MQOx5PWrDOafGbxmnMVot5z-YqUed-ybI4ijHlg1IB2YIYWI8ZatLmOXba9RK2LW6LbeHUm6bdEfak3XIYpCrnfwqi2_58ETPxhrD4mbQ-qd5QkAVAr8De08c3ywE0jyfu_BEVALLIK4sAb8-HEKWA',
    stars: 4.8,
    reviewsCount: 22,
    isNew: true
  },
  {
    id: 's16',
    name: 'Matte Noir Dining Set',
    category: 'Home Decor',
    price: '₦240,000',
    description: 'Satin matte black glazed stoneware dining set including plates and artisan bowls.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0HfRccc7tVIrzjN86pJlE4f5kE2PBCy2nt7Ug6fKQwCMjkNBj9SOfzlmEphLbkKV6alggWqQCClA_kGN6tGWG5FRGwhWgSYnjMgaDdHC3qHC-dDJEZ6uR8jluxvvrgHUYKZ4iXQxNxtrAgvAHRZS5ylf1TvY_lM4_aPt7CHrxOHp5SGIoRxlPy2WZN-zs4GmDwKJJsG1uZaAqjkW5Tg0a1A8zQxVDqumk_UT2aFodQqbenbHjWxTt1w',
    stars: 4.9,
    reviewsCount: 65,
    isBestseller: true
  },
  {
    id: 's17',
    name: 'Emerald Velvet Cushion',
    category: 'Home Decor',
    price: '₦95,000',
    description: 'Plush velvet pillow filled with responsibly-sourced down in a jewel-tone emerald.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPD4t-1yB8CDzcRTSITPq9w1U9oTDrQJhkGgK-v-5WSXgGPTFmk57NHxcDkC4nSKoz9nzxvJ5mHErTR1O3gA2hTKAAwgJFTFoTm74WHvkQp5mq7_lFcrCoYmdm3ERY9vqvfcv7621eCe37IeeWSwQvdgkHs7C0aGAkB6dU4HqIYM0hhsS39Lwj8ZRpdS6zRrq_fwRTXNzOlSItfGcQFxTizm7ZhLo9-tzFFfxrgieGmVV5TSN6F5ZHXg',
    stars: 4.7,
    reviewsCount: 42
  },
  {
    id: 's18',
    name: 'Abstract Living Room Rug',
    category: 'Home Decor',
    price: '₦250,000',
    description: 'Masterfully soft, hand-loomed wool accent rug with striking minimalist abstract motifs.',
    imageUrl: 'https://images.unsplash.com/photo-1574870111867-089730e5a72b?auto=format&fit=crop&q=80&w=600',
    stars: 5.0,
    reviewsCount: 88,
    isBestseller: true
  },

  // Wedding & Gifts
  {
    id: 's19',
    name: 'Wedding Elegance Set',
    category: 'Wedding & Gifts',
    price: '₦280,000',
    description: 'Custom handcrafted presentation box with customized premium leather accessories.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY2wwSEozYpvA-F9ZZFg24zNqMBe2j7h5qmTxQlTZ5VslJlADR1yFAhiCgL5-ClUPfO1T6ipObE2OMVa_YYUfJhGDOGTYePf7qngImYiTdn8g3plXqQpxYmf_Ys_j7weFxxAAreqOhVvmIMuDGda4vqY-XF2Cf8xDjEKlbX8dkMsvwHNFvRGEHf26m8_cP2Qq5-VuhTY9gUfUE-nJUYg8QR4BOfWZLDEkg1xjQ9TFvdZ-AbEA2PYqciQ',
    stars: 5.0,
    reviewsCount: 26,
    isNew: true
  },
  {
    id: 's20',
    name: 'Tradition Walnut Case',
    category: 'Wedding & Gifts',
    price: '₦340,000',
    description: 'Premium dark American walnut briefcase with brass fittings and green felt liner.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAICF64kHjl9c_BfFeDPmLSz28qvSfb9IzUnMK37x4woQRazFPZX_ZNXVyzWenD-K1BgSuMK0BeCKS3E_P_spfHi_8PKczdwRKVbgku_1gky8ZHc0HzepzXAELw7AUkV3bdMGQitf-bGcvPWw0lpVDXuOoYur1xixqOjUDYTLbj-DOWsSsRsEm0h57KrjfYz27EBFyjEY54dzHOiAUDkWZ0oR7WsyvybOOhuvEmTqm2eaJB3SLSk2WY7Q',
    stars: 4.9,
    reviewsCount: 15
  }
];

const categories = [
  'All',
  'Kitchenware',
  'Home Decor',
  'Travel Gear',
  'Baby & Nursery',
  'Bedding & Linen',
  'Wedding & Gifts'
];

export default function Shop() {
  const [products, setProducts] = useState<ShopProduct[]>(staticProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category');

  useEffect(() => {
    if (categoryParam) {
      const matched = categories.find(c => c.toLowerCase() === categoryParam.toLowerCase());
      if (matched) {
        setSelectedCategory(matched);
      }
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  useEffect(() => {
    async function fetchCustomProducts() {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const customItems: ShopProduct[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Map Firestore products to our ShopProduct schema
          customItems.push({
            id: doc.id,
            name: data.name || 'Custom Product',
            category: data.category || 'Home Decor',
            price: typeof data.price === 'number' 
              ? `₦${data.price.toLocaleString()}` 
              : data.price ? `₦${Number(data.price).toLocaleString()}` : '₦0',
            description: data.description || 'Custom handcrafted product.',
            imageUrl: data.imageUrl || 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
            stars: 5.0,
            reviewsCount: 0,
            isNew: true
          });
        });

        // Combine static products and custom items from Firestore
        setProducts([...staticProducts, ...customItems]);
      } catch (err) {
        console.error('Error fetching custom products from firestore:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomProducts();
  }, []);

  const handleOpenOrderModal = (product: ShopProduct) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  // Filter products based on search and selected category
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatedPage>
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        productName={selectedProduct?.name}
        productPrice={selectedProduct?.price}
        productImage={selectedProduct?.imageUrl}
      />

      <div className="bg-surface-container-low py-12 px-margin-desktop border-b border-outline-variant/20">
        <div className="max-w-container-max mx-auto text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-caption text-on-surface-variant font-label-md uppercase mb-4">
            <span>Home</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-bold">Shop Collection</span>
          </div>
          <h1 className="font-headline-xl text-primary mb-3">The Entire Albarka Collection</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto md:mx-0">
            A simple, intuitive way to explore and purchase. Select any masterpiece to submit your order or start a direct custom dispatch inquiry.
          </p>
        </div>
      </div>

      <section className="max-w-container-max mx-auto px-margin-desktop py-12">
        {/* Controls block */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10 pb-6 border-b border-outline-variant/10">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 md:pb-0 scrollbar-none scroll-smooth">
            <span className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs flex items-center gap-1.5 shrink-0 mr-2">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    if (cat === 'All') {
                      searchParams.delete('category');
                    } else {
                      searchParams.set('category', cat);
                    }
                    setSearchParams(searchParams);
                  }}
                  className={`px-4 py-1.5 text-xs font-label-md uppercase tracking-widest rounded-full transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant/25'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {isSelected && <Check className="w-3 h-3" />}
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-outline-variant rounded-full bg-surface-container-lowest text-sm text-on-surface placeholder-on-surface-variant/50 focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-body-md text-on-surface-variant">Loading Albarka catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/30">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-3">inventory_2</span>
            <h3 className="font-headline-md text-lg text-on-surface mb-1">No products found</h3>
            <p className="font-body-md text-on-surface-variant text-sm max-w-sm mx-auto">
              We couldn't find any products matching your current query. Try changing the category filter or searching for another term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                  onClick={() => handleOpenOrderModal(product)}
                  className="group cursor-pointer flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 hover:shadow-lg hover:border-primary/25 transition-all"
                >
                  <div className="aspect-square bg-surface-container-low overflow-hidden relative">
                    {product.isNew && (
                      <div className="absolute top-3 left-3 z-10 bg-primary text-on-primary text-[9px] font-label-md uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
                        New
                      </div>
                    )}
                    {product.isBestseller && (
                      <div className="absolute top-3 left-3 z-10 bg-secondary text-on-secondary text-[9px] font-label-md uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
                        Bestseller
                      </div>
                    )}
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    
                    {/* Visual Hover Quick Buy Overlay */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="w-full bg-primary text-on-primary py-2.5 rounded text-xs font-label-md uppercase tracking-widest text-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        Order Product Direct
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-label-md text-on-surface-variant uppercase text-[10px] tracking-wider mb-1.5">
                        {product.category}
                      </p>
                      <h4 className="font-headline-md text-base text-on-surface group-hover:text-primary transition-colors leading-snug mb-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-4">
                        {product.description}
                      </p>
                    </div>

                    <div>
                      {product.stars !== undefined && product.reviewsCount !== undefined && (
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className="flex text-secondary">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`material-symbols-outlined text-[14px] ${
                                  i < Math.floor(product.stars || 0) ? 'fill-current' : 'text-outline-variant'
                                }`}
                              >
                                star
                              </span>
                            ))}
                          </div>
                          <span className="text-[10px] text-on-surface-variant font-mono">
                            ({product.reviewsCount})
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-outline-variant/10">
                        <span className="font-headline-md text-lg text-primary font-bold">
                          {product.price}
                        </span>
                        <button 
                          className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all shrink-0"
                          title="Purchase Product"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </AnimatedPage>
  );
}
