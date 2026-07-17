import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const heroProducts = [
  {
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200",
    title: "Premium Silk Bedding",
    description: "Experience unparalleled comfort with our signature collection",
    price: "₦120,000",
    category: "Home Decor"
  },
  {
    image: "https://images.unsplash.com/photo-1574870111867-089730e5a72b?auto=format&fit=crop&q=80&w=1200",
    title: "Abstract Loom Rug",
    description: "Hand-woven mastercrafts to anchor your living space",
    price: "₦250,000",
    category: "Rugs"
  },
  {
    image: "https://images.unsplash.com/photo-1519238382740-4cb50f6ea312?auto=format&fit=crop&q=80&w=1200",
    title: "Kids Adventure Wear",
    description: "Durable and playful clothing for the little explorers",
    price: "₦45,000",
    category: "Apparel"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtcgvsCugVdqPRWzXRjLsl3xAWrZm0llstG4uj1a6JOydh_7kc7rotamQfVImMgKbLe9ipZ7Dm5nbKxTUkNdtCwc1lJyetFZ8bdrDpvh4bEuF_HhH7SjnONOYCV8Zh1xmB35cHoZVA6qO6unZ0uG9Bj_qQ1KaOMRbVEg1gdaQzv7z-tia3-unA5UpUEhT8LSOIX_Eej9BJz7vCW0RyfrnPhXUIAFCc-U-F5bgqfDAn9i3RwW3jJVR9rg",
    title: "Modern Dining Set",
    description: "Minimalist elegance for your everyday meals",
    price: "₦310,000",
    category: "Furniture"
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0HfRccc7tVIrzjN86pJlE4f5kE2PBCy2nt7Ug6fKQwCMjkNBj9SOfzlmEphLbkKV6alggWqQCClA_kGN6tGWG5FRGwhWgSYnjMgaDdHC3qHC-dDJEZ6uR8jluxvvrgHUYKZ4iXQxNxtrAgvAHRZS5ylf1TvY_lM4_aPt7CHrxOHp5SGIoRxlPy2WZN-zs4GmDwKJJsG1uZaAqjkW5Tg0a1A8zQxVDqumk_UT2aFodQqbenbHjWxTt1w",
    title: "Artisan Kitchenware",
    description: "Crafted tools for the passionate home chef",
    price: "₦85,000",
    category: "Kitchen"
  }
];

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatedPage>
      <section className="relative w-full bg-primary py-24 px-margin-desktop overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.2,88.5,-0.9C87,14.5,81.4,28.9,73,41.2C64.6,53.5,53.3,63.6,40.4,70.9C27.5,78.2,13.7,82.7,-0.7,83.9C-15.1,85.1,-30.2,83.1,-43.8,76.5C-57.4,69.9,-69.5,58.7,-77.4,45.3C-85.3,31.9,-89.1,16.2,-88.7,0.2C-88.3,-15.7,-83.8,-31.4,-75.1,-44.9C-66.4,-58.4,-53.4,-69.7,-39.3,-76.9C-25.2,-84.1,-12.6,-87.2,1.3,-89.4C15.2,-91.7,30.5,-83.5,44.7,-76.4Z" fill="currentColor" transform="translate(100 100)"></path>
          </svg>
        </div>
        <div className="relative z-10 max-w-container-max mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2">
            <span className="font-label-md text-on-primary/60 uppercase tracking-[0.4em] mb-4">Curated Selections</span>
            <h1 className="font-headline-xl text-on-primary mb-6 max-w-3xl">Explore the Art of <span className="text-primary-fixed">Albarka</span> Living</h1>
            <p className="font-body-lg text-on-primary/80 max-w-2xl">From the heart of your home to the far reaches of your travels, discover quality that endures and style that inspires.</p>
          </div>
          <div className="lg:w-1/2 w-full max-w-xl relative">
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl relative ring-4 ring-primary-fixed/20 bg-surface">
              <span className="absolute top-4 right-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded uppercase tracking-widest z-20 backdrop-blur-sm border border-white/20">Featured Collections</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 z-0"
                >
                  <motion.img
                    src={heroProducts[currentHeroIndex].image}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="w-full h-full object-cover"
                    alt={heroProducts[currentHeroIndex].title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 text-left">
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-label-md text-primary-fixed uppercase tracking-[0.2em] text-xs mb-2 block"
                    >
                      {heroProducts[currentHeroIndex].category}
                    </motion.span>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="font-headline-md text-white text-2xl mb-1"
                    >
                      {heroProducts[currentHeroIndex].title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="font-body-sm text-white/80 mb-3"
                    >
                      {heroProducts[currentHeroIndex].description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span className="font-label-lg text-white bg-primary px-4 py-2 rounded-full text-sm inline-block">
                        {heroProducts[currentHeroIndex].price}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-desktop -mt-16 mb-24 relative z-20">
        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 lg:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 p-12 flex flex-col justify-between">
                <div>
                  <span className="font-label-md text-primary uppercase tracking-widest mb-2 block">Culinary Arts</span>
                  <h2 className="font-headline-lg text-on-surface mb-4">Kitchen Materials</h2>
                  <p className="font-body-md text-on-surface-variant mb-8">Professional-grade cookware and appliances for the modern chef. Precision-engineered knives and elegant kitchenware.</p>
                  <ul className="space-y-3 font-body-md text-on-surface-variant/80">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Premium Cookware</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Forged Steel Knives</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Smart Appliances</li>
                  </ul>
                </div>
                <Link to="/kitchen" className="w-fit mt-12 px-8 py-3 bg-primary text-on-primary font-label-md rounded-full hover:bg-primary-container transition-colors group">
                  SHOP COLLECTION <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
              <div className="w-full md:w-1/2 h-[400px] md:h-auto overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFKCx7EkV5ToaYS-3U7Eg3jYUSmUkOZMwQJDknmO6iPI7ZcU0rnoQHn3VIBC4QJQh1ix6ZXX1Rut4quCzRMvc826TSZ3PPy7RnhJS5bnTl_6nXATK_SAnrR4PhT-Af0L4zNlcJVJ64ZFafRMjGFikrh2A7OmITMsOtcvMDnIVPPrrEbr8oE6xIVre5hopfpqLPUVG2pTXqkM-iiSbUR96p1g0ilRuyenXvIjZHx7dNXOZJNpZAHVv6OA" alt="Kitchen Materials" />
              </div>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container-high shadow-md hover:shadow-xl transition-all duration-500">
            <div className="w-full h-80 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUfD1_IUt4FXQb1RwSl3Dvz-LY8-qFvi6tudNM43cSL7MAu7au8Yy_3Hur08jFCjP7lwJ62zdNWbQUUL9xzFQtpQgm0LSrMFsp0E1YqcrshXZ_qJk4D5OBTz3N4wbihl-LVceLlehEugYa6e25OuwB2_SYF5YZ8Iaf3SHtqHvi3DKwsamnR_5gAEJlv9ozY0RPS-glOZm9TEENZmGUveUhFG-3HuYaAKQkJqtApkOFZauRCDbJyvhWMQ')" }}></div>
            <div className="p-8 bg-surface-container-lowest">
              <h3 className="font-headline-md text-on-surface mb-2">Baby & Nursery</h3>
              <p className="font-body-md text-on-surface-variant mb-6">Organic fabrics and gentle designs for your little ones.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-surface-container rounded text-caption text-on-surface-variant font-label-md">NEWBORN</span>
                <span className="px-3 py-1 bg-surface-container rounded text-caption text-on-surface-variant font-label-md">ACCESSORIES</span>
              </div>
              <Link className="font-label-md text-primary border-b-2 border-primary/20 hover:border-primary transition-all" to="/heritage">VIEW ALL BABY</Link>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container shadow-md hover:shadow-xl transition-all duration-500">
            <div className="relative h-full min-h-[450px] p-8 flex flex-col justify-end">
              <div className="absolute inset-0 z-0">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxQBbebsXOpVZ1VTspvkASZm_19oYyDBbQPxZAW2RzP5P_zwcgPaEh4kJNNboa8AfEAzdANEPew_vqP3Y0SrwADFmLXwUStxpaY7GXV70gr-3hJnBPC0C0aWL2XpdnAv--tG4Kq4_Z_GxId4NXiXfuKE6X2BLS8q4ArUIj1wWljjFek6jMcSvxr_g1Z7N638fBQGc0cFDfkyNPBVfedTxdOnjzTNuBMaRIU2iU16xd0HFFg380lGlWmg" alt="Bedsheets & Linen" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              <div className="relative z-10 text-on-primary">
                <h3 className="font-headline-md mb-2">Bedsheets & Linen</h3>
                <p className="font-body-md text-on-primary/80 mb-6">Experience the luxury of 1000-thread count Egyptian cotton.</p>
                <Link to="/heritage" className="bg-on-primary text-primary px-6 py-2 rounded-full font-label-md hover:bg-primary-fixed transition-colors inline-block text-center mt-auto">DISCOVER COMFORT</Link>
              </div>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container shadow-md hover:shadow-xl transition-all duration-500">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined text-4xl text-primary">luggage</span>
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-caption font-bold">DURABLE</span>
              </div>
              <h3 className="font-headline-md text-on-surface mb-2">Travel Essentials</h3>
              <p className="font-body-md text-on-surface-variant mb-6">Premium suitcases and backpacks designed for the modern explorer.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-lg bg-cover bg-center border border-outline-variant/10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDiR-ujdbTrEVgKuiDGrh7XgN2XpOnNwky9b2biPvN5syVPL-FyZ5lJ8IVLw9NhH1Ci11m-DcCB_l6_NYbf02BDY1BDEaNJ4TphqJ8fYBlVydTOpna17EpY4eogk_LKYm0mGNvVTqVqJIZ8hUN53zmlk5x4EUADBgnfrUo0uSpTA-rfEYpuVBZnMdfVS_2Nn-a-vhFC7h1XWaBq6JzCuNtFow2yDhnlMo-4zxBauet30CugsEDCVm5-mw')" }}></div>
                <div className="aspect-square rounded-lg bg-cover bg-center border border-outline-variant/10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsdOdeIv59BBimXaNMngLVdZT3nRCHHMCIY2mMBktB3XZDjY6S1sJ3bF6IOo4RlAiIFO2I3vOUbxcIhv8fbh4VWEaaRiMQ6k4chhc_MPp9uaEw61_uSL98lpB02ua9soIEXO4DgMxOfIIsH95-T4o4s29STfYa5pxTY21NEuBbAPqsven60qh8i8uX6gEwuGm0xGblyhisNFzVe31zf49nNMK2du8S_KURr9kBrxua55lBcRsezJJA3w')" }}></div>
              </div>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-6 lg:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-md hover:shadow-xl transition-all duration-500">
            <div className="absolute top-4 right-4 z-10">
              <span className="material-symbols-outlined text-secondary text-3xl">workspace_premium</span>
            </div>
            <div className="p-8">
              <h3 className="font-headline-md text-on-surface mb-4">Wedding Packages</h3>
              <p className="font-body-md text-on-surface-variant mb-8">Exquisite luxury briefcases and curated gift sets for the bride and groom.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low group-hover:bg-primary/5 transition-colors">
                  <span className="material-symbols-outlined text-primary">card_giftcard</span>
                  <div>
                    <p className="font-label-md text-on-surface">Bride's Elegance Set</p>
                    <p className="text-caption text-on-surface-variant">Customized leather briefcase</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low group-hover:bg-primary/5 transition-colors">
                  <span className="material-symbols-outlined text-primary">cases</span>
                  <div>
                    <p className="font-label-md text-on-surface">Groom's Tradition Case</p>
                    <p className="text-caption text-on-surface-variant">Handcrafted walnut finish</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-7 group relative overflow-hidden rounded-xl bg-surface-container-high shadow-md hover:shadow-xl transition-all duration-500">
            <div className="flex flex-col sm:flex-row h-full">
              <div className="w-full sm:w-2/5 p-8 flex flex-col justify-center">
                <h3 className="font-headline-md text-on-surface mb-2">Home Décor</h3>
                <p className="font-body-md text-on-surface-variant mb-6">Accentuate your living space with wall art and smart storage solutions.</p>
                <Link className="text-primary font-label-md flex items-center gap-2" to="/heritage">Explore Accents <span className="material-symbols-outlined text-sm">east</span></Link>
              </div>
              <div className="w-full sm:w-3/5 h-64 sm:h-auto overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIFOQ77yVOGALDJJRfZLhWX738KsQUP0ysH-UfhV29IpqaJvAEJYmnvWasJjAKLxkdutMvwbso4TDNAifmlw8n9MolJXjbTG2DHRWWZ4Hb0pETkHCXwIcbGe0Ir-vH5ETQaOWVCF6P9H7rptv16KPuwwyVTQiSRgLoI9yw0gmqloTkikDBMLZBjIaZdsY-poOVpSuoTF1anZ8Ji8p_bdpua-7sP-wuQ2WQqBsn0HyR55r-O-RQgua3hQ" alt="Home Decor" />
              </div>
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-5 group relative overflow-hidden rounded-xl bg-primary shadow-md hover:shadow-xl transition-all duration-500">
            <div className="p-12 text-on-primary relative h-full flex flex-col justify-center overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-on-primary/10 rounded-full blur-3xl"></div>
              <h3 className="font-headline-md mb-4">Gifting Reimagined</h3>
              <p className="font-body-md text-on-primary/70 mb-8 max-w-xs">Bespoke corporate hampers and thoughtful birthday treasures for those who matter most.</p>
              <div className="flex gap-4">
                <Link to="/heritage" className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-label-md hover:bg-secondary-fixed-dim transition-colors text-center inline-block">BIRTHDAY</Link>
                <Link to="/heritage" className="bg-surface-container-highest/20 text-on-primary px-6 py-2 rounded-lg font-label-md hover:bg-surface-container-highest/30 transition-colors text-center inline-block">CORPORATE</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container py-20">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-on-surface mb-2">New Arrivals</h2>
              <p className="font-body-md text-on-surface-variant">The latest additions to our collection.</p>
            </div>
            <Link to="/heritage" className="font-label-md text-primary uppercase tracking-widest hover:text-primary-fixed transition-colors border-b border-primary/30 hover:border-primary">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Kid's Clothing */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-surface-container-highest rounded-lg overflow-hidden mb-4 relative">
                <div className="absolute top-4 left-4 bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10">New</div>
                <img src="https://images.unsplash.com/photo-1519238382740-4cb50f6ea312?auto=format&fit=crop&q=80&w=600" alt="Kids Construction Clothing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-label-lg text-on-surface">Kids Construction Play Outfit</h3>
                  <p className="font-body-sm text-on-surface-variant">Durable & Fun</p>
                </div>
                <span className="font-label-md text-primary">$45</span>
              </div>
            </div>

            {/* Bedding Sets */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-surface-container-highest rounded-lg overflow-hidden mb-4 relative">
                <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600" alt="Premium Bedding Set" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-label-lg text-on-surface">Premium Silk Bedding Set</h3>
                  <p className="font-body-sm text-on-surface-variant">Available in 6 colors</p>
                </div>
                <span className="font-label-md text-primary">$120</span>
              </div>
            </div>

            {/* Rugs */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-surface-container-highest rounded-lg overflow-hidden mb-4 relative">
                <img src="https://images.unsplash.com/photo-1574870111867-089730e5a72b?auto=format&fit=crop&q=80&w=600" alt="Living Room Rug" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-label-lg text-on-surface">Abstract Living Room Rug</h3>
                  <p className="font-body-sm text-on-surface-variant">Hand-woven</p>
                </div>
                <span className="font-label-md text-primary">$250</span>
              </div>
            </div>

            {/* Damascus Chef Knife */}
            <Link to="/shop" className="group cursor-pointer">
              <div className="aspect-[4/5] bg-surface-container-highest rounded-lg overflow-hidden mb-4 relative">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD34qXJ-R4B0Gtzw17yYyLzQ0G3K4oWz_6t_4gL7s-P4z9Tf_L4R0s72F9f4t8kC9w4qj3jFhT2ZzM37f2O6y7x-3k_L2sD5jU4Q7e80q6Kz06Lh9b6yR-3r4y89wH92x-1Bv8j7l4B3s4e0uF8F4f0R9A_N7H-Q6A3b_g" alt="Artisan Damascus Chef Knife" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-label-lg text-on-surface">Artisan Damascus Chef Knife</h3>
                  <p className="font-body-sm text-on-surface-variant">Forged Damascus steel</p>
                </div>
                <span className="font-label-md text-primary">$220</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container-lowest py-20 border-y border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-primary mb-2">Shop by Category</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
            <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
              Explore our curated collections. From culinary essentials to travel gear, find exactly what you need for every aspect of your lifestyle.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Link to="/kitchen" className="bg-surface p-6 rounded-2xl shadow-sm border border-outline/10 hover:shadow-md hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">skillet</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">Cookware</h3>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">Professional pots, pans, and essential kitchen tools for every home chef.</p>
            </Link>
            
            <Link to="/heritage" className="bg-surface p-6 rounded-2xl shadow-sm border border-outline/10 hover:shadow-md hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">child_care</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">Baby Apparel</h3>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">Comfortable, durable, and stylish clothing designed for kids and babies.</p>
            </Link>
            
            <Link to="/heritage" className="bg-surface p-6 rounded-2xl shadow-sm border border-outline/10 hover:shadow-md hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">bed</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">Linen & Bedding</h3>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">Premium bedsheets, blankets, and soft home textiles for restful sleep.</p>
            </Link>
            
            <Link to="/travel" className="bg-surface p-6 rounded-2xl shadow-sm border border-outline/10 hover:shadow-md hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">flight</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">Travel Gear</h3>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">Durable luggage, travel accessories, and essentials for your next journey.</p>
            </Link>
            
            <Link to="/heritage" className="bg-surface p-6 rounded-2xl shadow-sm border border-outline/10 hover:shadow-md hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">volunteer_activism</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">Wedding</h3>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">Elegant registries, decor, and the perfect meaningful gifts for the special day.</p>
            </Link>
            
            <Link to="/heritage" className="bg-surface p-6 rounded-2xl shadow-sm border border-outline/10 hover:shadow-md hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">deck</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">Home Decor</h3>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">Beautiful accents, rugs, and statement pieces to personalize your living space.</p>
            </Link>
            
            <Link to="/heritage" className="bg-surface p-6 rounded-2xl shadow-sm border border-outline/10 hover:shadow-md hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">redeem</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">Gift Hampers</h3>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">Thoughtfully curated hampers and beautifully packaged presents for any occasion.</p>
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-24 bg-surface overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-secondary/10 rounded-full -z-10 animate-pulse"></div>
            <img className="rounded-2xl shadow-2xl relative z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk2B1DTOK7uDU5gl52BxIb9Klg-MUlQl9EYDFCgepMUCv_Ns7OM7GwxaWy0NdHZqz9kW09mAUlscIpO6IC6I-q5qWHQ53lwvt2OrsA_IRPAXP3RLay2OYnTWm2y6Eun_VXnQDhp4r3TF29H-P2tRciALe6s9jdR0QV6f7KyE5uxZNMbC1tuQJryyjmLwaMlg4J7Ks5iAWr88pvJqHxhe0Rum0TVwPsmZ4U07pUVGQ_OycAk2_lkYI0uw" alt="The Albarka Promise" />
            <div className="absolute -bottom-8 -right-8 p-8 bg-surface-container-lowest rounded-xl shadow-lg z-20 hidden md:block">
              <p className="font-headline-md text-primary mb-1">98%</p>
              <p className="text-caption text-on-surface-variant uppercase font-bold tracking-widest">Customer Loyalty</p>
            </div>
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <span className="font-label-md text-secondary uppercase tracking-[0.3em]">The Albarka Promise</span>
            <h2 className="font-headline-xl text-on-surface">Quality that speaks for itself.</h2>
            <p className="font-body-lg text-on-surface-variant">We source only the finest materials and partner with global craftsmen to ensure every piece in our collection meets our rigorous standards of luxury and durability.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                <div>
                  <h4 className="font-label-md text-on-surface">Handpicked Items</h4>
                  <p className="text-caption text-on-surface-variant">Each product is tested for quality.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
                <div>
                  <h4 className="font-label-md text-on-surface">Priority Delivery</h4>
                  <p className="text-caption text-on-surface-variant">Safe & fast global shipping.</p>
                </div>
              </div>
            </div>
            <Link to="/" className="bg-primary text-on-primary px-10 py-4 rounded-lg font-label-md hover:scale-105 transition-all shadow-lg inline-block">LEARN MORE ABOUT US</Link>
          </div>
        </div>
      </section>

      <section id="contact" className="w-full py-24 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <span className="font-label-md text-secondary uppercase tracking-[0.3em]">Visit Our Showroom</span>
                <h2 className="font-headline-xl text-on-surface mt-2">Come Experience the Collection</h2>
                <p className="font-body-lg text-on-surface-variant mt-4">
                  Visit us at our flagship boutique store in Jos. Feel the premium textures, inspect the artisan craftsmanship, and receive personalized assistance from our expert team.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-on-surface">Store Address</h4>
                    <p className="font-body-md text-on-surface-variant mt-1">
                      T48 Anguwan Rogo, Jos North,<br />
                      Plateau State, Nigeria
                    </p>
                    <a 
                      href="https://maps.google.com/?q=T48+Anguwan+Rogo,+Jos+North,+Plateau+State,+Nigeria" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-label-md text-primary hover:text-primary-fixed-dim transition-colors mt-2"
                    >
                      <span className="material-symbols-outlined text-sm">open_in_new</span> Get Directions on Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-on-surface">Opening Hours</h4>
                    <p className="font-body-md text-on-surface-variant mt-1">
                      Monday – Saturday: <span className="font-semibold text-on-surface">9:00 AM – 6:00 PM</span><br />
                      Sunday: <span className="text-on-surface-variant/70">Closed</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">contact_phone</span>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-on-surface">Get in Touch</h4>
                    <p className="font-body-md text-on-surface-variant mt-1">
                      Phone: <a href="tel:+2348032896303" className="hover:text-primary transition-colors">+234 803 289 6303</a><br />
                      Email: <a href="mailto:info@albarkacollection.com" className="hover:text-primary transition-colors">info@albarkacollection.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full bg-surface-container rounded-2xl border border-outline/10 overflow-hidden shadow-xl flex flex-col h-[450px]">
              {/* Map View Header */}
              <div className="p-4 bg-surface-container-high border-b border-outline/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Live Flagship Showroom</span>
                </div>
                <span className="font-mono text-[10px] text-on-surface-variant/60">Lat: 9.9324° N, Lon: 8.8920° E</span>
              </div>
              
              {/* Embed Google Maps centered on Angwan Rogo, Jos, Nigeria */}
              <div className="flex-grow w-full relative bg-surface-container-highest">
                <iframe 
                  title="Albarka Collection Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15715.111664188331!2d8.887201!3d9.933333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1053730e791e0bc3%3A0xe543ec8e7b952f9!2sAngwan+Rogo%2C+Jos%2C+Nigeria!5e0!3m2!1sen!2sus!4v1721000000000!5m2!1sen!2sus"
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
