import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import OrderModal from '../components/OrderModal';

export default function Heritage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{name: string, price: string, image?: string} | undefined>(undefined);

  const handleOpenOrderModal = (name: string, price: string, image?: string) => {
    setSelectedProduct({ name, price, image });
    setIsOrderModalOpen(true);
  };

  const slides = [
    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFc2-INq6WreJTdtByVZjqoPe92mgcSAdSBYeMsxRGzTWYNXUBCksz1mqPo4qLM141E2Le52jMY0a_yDz93g6kY49Q321D4SgmaJ1d02HO9fRb7OnS5h1UGLPOEerzW09saWHd7X_Fh7UhuhCsGPADyNOPzl3XM-5tWSVCUxg6SOQVuBx6LigG4-Rqpif79V7Eio6ZED4s46OMef-rf535NEYI1yBO0y3b8XqOD-0HP4tMOngoSlPdkw')",
    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXaA4EXxAnXjy-jUZMQPawbDDzQf3yKrqws66BX9o5me8zR7xAfAmeuxAOD3KdBFG4102deRGE3hMJHSN5fypKvETv2jUVMx4vnPM2VlBD5L6XPQuavyR44IVENW8SULbo7ArfKgN6PoIci0dk4jPiZRtfHg6PvJA-UfL3xgQL4bB_EbIQ0aeF0b1frS1GXIc7K3W8M_88wTQJjyMCMUJquwhI0C3WGK3Me8KHQfwg4c91zpa_T0hUYQ')"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <AnimatedPage>
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        productName={selectedProduct?.name}
        productPrice={selectedProduct?.price}
        productImage={selectedProduct?.image}
      />
      <section className="relative w-full overflow-hidden bg-surface pb-24">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          <div className="w-full lg:w-5/12 flex flex-col justify-center px-margin-desktop z-10 py-16 lg:py-0">
            <div className="space-y-6 max-w-xl">
              <span className="font-label-md text-secondary uppercase tracking-[0.3em] block animate-pulse">Est. 1994</span>
              <h1 className="font-headline-xl text-primary leading-tight">
                Elevated Living for the <span className="italic text-on-surface-variant">Modern Heritage</span>
              </h1>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                Discover a curated collection of premium home essentials, from artisanal kitchenware to the softest linens for your sanctuary.
              </p>
              <div className="flex gap-4 pt-4">
                <button className="bg-primary text-on-primary px-10 py-4 font-label-md hover:shadow-xl transition-all duration-300 rounded-none">
                  SHOP THE COLLECTION
                </button>
                <button className="bg-transparent border border-primary/20 text-primary px-10 py-4 font-label-md hover:bg-surface-container-low transition-all duration-300 rounded-none">
                  VIEW LOOKBOOK
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-7/12 relative group h-[500px] lg:h-auto">
            <div className="relative w-full h-full overflow-hidden">
              {slides.map((slide, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-full h-full bg-cover bg-center shadow-2xl" style={{ backgroundImage: slide }}></div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-12 -left-12 hidden xl:block bg-surface-container-lowest p-8 shadow-xl max-w-xs animate-bounce-slow">
              <p className="font-label-md text-primary mb-2">FEATURED PRODUCT</p>
              <p className="font-headline-md text-on-surface">The Artisan Dutch Oven</p>
              <p className="font-caption text-on-surface-variant mt-2">Hand-poured enameled cast iron in Signature Emerald.</p>
            </div>
            <div className="absolute bottom-8 right-margin-desktop flex gap-2">
              <button className="w-12 h-12 bg-surface/90 backdrop-blur flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
                <span className="material-symbols-outlined">west</span>
              </button>
              <button className="w-12 h-12 bg-surface/90 backdrop-blur flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>
                <span className="material-symbols-outlined">east</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-margin-desktop py-24 bg-surface-container-low">
        <div className="max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="font-headline-lg text-primary">Curated Categories</h2>
              <p className="font-body-md text-on-surface-variant">Exceptional quality for every corner of your life.</p>
            </div>
            <Link className="font-label-md text-primary flex items-center group" to="/heritage">
              EXPLORE ALL <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-[800px]">
            <Link to="/kitchen" className="md:col-span-8 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAICF64kHjl9c_BfFeDPmLSz28qvSfb9IzUnMK37x4woQRazFPZX_ZNXVyzWenD-K1BgSuMK0BeCKS3E_P_spfHi_8PKczdwRKVbgku_1gky8ZHc0HzepzXAELw7AUkV3bdMGQitf-bGcvPWw0lpVDXuOoYur1xixqOjUDYTLbj-DOWsSsRsEm0h57KrjfYz27EBFyjEY54dzHOiAUDkWZ0oR7WsyvybOOhuvEmTqm2eaJB3SLSk2WY7Q')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="font-headline-md text-on-primary">The Kitchen Atelier</h3>
                <p className="font-label-md text-on-primary/80 uppercase tracking-widest mt-2">Professional Grade</p>
              </div>
            </Link>
            <div className="md:col-span-4 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBY2wwSEozYpvA-F9ZZFg24zNqMBe2j7h5qmTxQlTZ5VslJlADR1yFAhiCgL5-ClUPfO1T6ipObE2OMVa_YYUfJhGDOGTYePf7qngImYiTdn8g3plXqQpxYmf_Ys_j7weFxxAAreqOhVvmIMuDGda4vqY-XF2Cf8xDjEKlbX8dkMsvwHNFvRGEHf26m8_cP2Qq5-VuhTY9gUfUE-nJUYg8QR4BOfWZLDEkg1xjQ9TFvdZ-AbEA2PYqciQ')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="font-headline-md text-on-primary">Wedding Briefcases</h3>
                <p className="font-label-md text-on-primary/80 uppercase tracking-widest mt-2">The Heritage Series</p>
              </div>
            </div>
            <div className="md:col-span-4 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCsyplgedvvgzx1fFldrRWdLfkZDW-FwezaNsKCRw2d_HbO8FLnMpoJB5gbAmPlSi2kjKSmKvQl-FaDnNBZB5P53RQbqZSiDxdjgR7YYe6VD8MZD6cifPWFbavM07jrYGVSfY6TLv3MORLzcukkf9VGBkMpuwAoIGim44GM32-5HSpjPb_3aNmB9zDk4GwUG51em1KWRGgDY0Mdu3sH8_0klUBcync1Z8E-X3AgENs-1xnPCn83ZdNOaA')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="font-headline-md text-on-primary">Baby & Toddler</h3>
                <p className="font-label-md text-on-primary/80 uppercase tracking-widest mt-2">Organic Comfort</p>
              </div>
            </div>
            <Link to="/travel" className="md:col-span-4 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCM2OQZPqxKh413gbo3hnaR4gtT_GKft1JkWRlLs0VnWby6esTNR8ODp9gFD_c4YSY0j0RLL4YRHRvzWkzRgrVdlBFnMQm0_mHa-CVYkZBpUT1bvOH-X6uoBBIqlVpe_vkgnBIsKa-hpTA4MhjAz_NXqk6Hm6Su_EpWk0RZdOtV5VCVf0TyVfLJcF3Rek41hQaojdt--PHIuV11WtQH5nIl3hSRcJF-iMHZQA9xBotGloZPK68qtirEqQ')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="font-headline-md text-on-primary">Travel Essentials</h3>
                <p className="font-label-md text-on-primary/80 uppercase tracking-widest mt-2">Go Anywhere</p>
              </div>
            </Link>
            <div className="md:col-span-4 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWHfAXCTsCEGzAdIAHiNeFd-FJL3DC--C7nLuDXaLpxPzr7TQZIP5_bwJB_PE-bSUXqDyzyN8dtBAOImGxZ8qHFJ2cMFmhpZxMrjKACC80xz1Q1PWYNRcTPTGEpkZA9x1TyQjGMer23A5ZuL0-IbAm_W4JjKWIylrnG3EBpi5whQ8VzDchfik43G61_hs6-exHpIC0MByWEu6zQ2anTx1-P9kUG1ts7Ed_fXz_RwODNQkdcd3ewgzE1w')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="font-headline-md text-on-primary">The Linen Room</h3>
                <p className="font-label-md text-on-primary/80 uppercase tracking-widest mt-2">Signature Comfort</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-24 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col lg:flex-row gap-gutter">
          <div className="lg:w-1/4">
            <div className="sticky top-40">
              <span className="text-[120px] font-headline-xl text-primary/5 absolute -top-16 -left-8 leading-none select-none">NEW</span>
              <h2 className="font-headline-lg text-primary relative z-10">New Arrivals</h2>
              <p className="font-body-md text-on-surface-variant mt-4 mb-8">Freshly curated pieces to refine your lifestyle. Limited quantities available for our latest drops.</p>
              <div className="flex flex-col gap-2">
                <div className="h-1 w-12 bg-primary"></div>
                <p className="font-label-md text-primary uppercase">Spring Summer '24</p>
              </div>
            </div>
          </div>
          <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden relative mb-6">
                <div className="absolute top-4 right-4 z-10 bg-secondary text-on-secondary px-3 py-1 font-label-md text-[10px]">NEW</div>
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuOU2SqV_UZ1J12xCE_jsqnGC5y41GsVYi-GudlrxjGsxN3vYRjjwOT6resHTst06QHb07gUavC0h59N_VL1B7s59EXGPzUTa2MQOx5PWrDOafGbxmnMVot5z-YqUed-ybI4ijHlg1IB2YIYWI8ZatLmOXba9RK2LW6LbeHUm6bdEfak3XIYpCrnfwqi2_58ETPxhrD4mbQ-qd5QkAVAr8De08c3ywE0jyfu_BEVALLIK4sAb8-HEKWA" alt="Glassware" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleOpenOrderModal('Artisan Smoke Carafe', '₦185,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuOU2SqV_UZ1J12xCE_jsqnGC5y41GsVYi-GudlrxjGsxN3vYRjjwOT6resHTst06QHb07gUavC0h59N_VL1B7s59EXGPzUTa2MQOx5PWrDOafGbxmnMVot5z-YqUed-ybI4ijHlg1IB2YIYWI8ZatLmOXba9RK2LW6LbeHUm6bdEfak3XIYpCrnfwqi2_58ETPxhrD4mbQ-qd5QkAVAr8De08c3ywE0jyfu_BEVALLIK4sAb8-HEKWA'); }}
                  className="absolute bottom-0 w-full bg-primary text-on-primary py-4 font-label-md translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  ADD TO BAG
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-md text-on-surface-variant uppercase text-[12px] mb-1">Glassware</p>
                  <h4 className="font-headline-md text-on-surface group-hover:text-primary transition-colors">Artisan Smoke Carafe</h4>
                </div>
                <p className="font-headline-md text-primary">₦185,000</p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden relative mb-6">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0HfRccc7tVIrzjN86pJlE4f5kE2PBCy2nt7Ug6fKQwCMjkNBj9SOfzlmEphLbkKV6alggWqQCClA_kGN6tGWG5FRGwhWgSYnjMgaDdHC3qHC-dDJEZ6uR8jluxvvrgHUYKZ4iXQxNxtrAgvAHRZS5ylf1TvY_lM4_aPt7CHrxOHp5SGIoRxlPy2WZN-zs4GmDwKJJsG1uZaAqjkW5Tg0a1A8zQxVDqumk_UT2aFodQqbenbHjWxTt1w" alt="Dinnerware" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleOpenOrderModal('Matte Noir Dining Set', '₦240,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0HfRccc7tVIrzjN86pJlE4f5kE2PBCy2nt7Ug6fKQwCMjkNBj9SOfzlmEphLbkKV6alggWqQCClA_kGN6tGWG5FRGwhWgSYnjMgaDdHC3qHC-dDJEZ6uR8jluxvvrgHUYKZ4iXQxNxtrAgvAHRZS5ylf1TvY_lM4_aPt7CHrxOHp5SGIoRxlPy2WZN-zs4GmDwKJJsG1uZaAqjkW5Tg0a1A8zQxVDqumk_UT2aFodQqbenbHjWxTt1w'); }}
                  className="absolute bottom-0 w-full bg-primary text-on-primary py-4 font-label-md translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  ADD TO BAG
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-md text-on-surface-variant uppercase text-[12px] mb-1">Dinnerware</p>
                  <h4 className="font-headline-md text-on-surface group-hover:text-primary transition-colors">Matte Noir Dining Set</h4>
                </div>
                <p className="font-headline-md text-primary">₦240,000</p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden relative mb-6">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPD4t-1yB8CDzcRTSITPq9w1U9oTDrQJhkGgK-v-5WSXgGPTFmk57NHxcDkC4nSKoz9nzxvJ5mHErTR1O3gA2hTKAAwgJFTFoTm74WHvkQp5mq7_lFcrCoYmdm3ERY9vqvfcv7621eCe37IeeWSwQvdgkHs7C0aGAkB6dU4HqIYM0hhsS39Lwj8ZRpdS6zRrq_fwRTXNzOlSItfGcQFxTizm7ZhLo9-tzFFfxrgieGmVV5TSN6F5ZHXg" alt="Decor" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleOpenOrderModal('Emerald Velvet Cushion', '₦95,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPD4t-1yB8CDzcRTSITPq9w1U9oTDrQJhkGgK-v-5WSXgGPTFmk57NHxcDkC4nSKoz9nzxvJ5mHErTR1O3gA2hTKAAwgJFTFoTm74WHvkQp5mq7_lFcrCoYmdm3ERY9vqvfcv7621eCe37IeeWSwQvdgkHs7C0aGAkB6dU4HqIYM0hhsS39Lwj8ZRpdS6zRrq_fwRTXNzOlSItfGcQFxTizm7ZhLo9-tzFFfxrgieGmVV5TSN6F5ZHXg'); }}
                  className="absolute bottom-0 w-full bg-primary text-on-primary py-4 font-label-md translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  ADD TO BAG
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-md text-on-surface-variant uppercase text-[12px] mb-1">Decor</p>
                  <h4 className="font-headline-md text-on-surface group-hover:text-primary transition-colors">Emerald Velvet Cushion</h4>
                </div>
                <p className="font-headline-md text-primary">₦95,000</p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden relative mb-6">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZVizGbpKpDwhv95GgT8D5M4yPmNtF9DnpHxkbnEoEBFsvp5XOmqIDHfdCSZp7SReA4jfdmtZ1HBisEmfyma5oY_zEUWayhXcgbjzO9hunmv0AMsEKsGDkO9f5baqpXK6bmrl9TbxdRJUcnAEHb4YukOfDqns0zEn-ix5ZIka0KNXTrROK07SG_TpBRfwBU_-VntvgItnI-hBDobOTEpE5JVB05W34e5hNkfsm3iRb3F1-tOfiyzJ0oA" alt="Kitchen" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleOpenOrderModal('Copper Utensil Gallery', '₦310,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZVizGbpKpDwhv95GgT8D5M4yPmNtF9DnpHxkbnEoEBFsvp5XOmqIDHfdCSZp7SReA4jfdmtZ1HBisEmfyma5oY_zEUWayhXcgbjzO9hunmv0AMsEKsGDkO9f5baqpXK6bmrl9TbxdRJUcnAEHb4YukOfDqns0zEn-ix5ZIka0KNXTrROK07SG_TpBRfwBU_-VntvgItnI-hBDobOTEpE5JVB05W34e5hNkfsm3iRb3F1-tOfiyzJ0oA'); }}
                  className="absolute bottom-0 w-full bg-primary text-on-primary py-4 font-label-md translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  ADD TO BAG
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-md text-on-surface-variant uppercase text-[12px] mb-1">Kitchen</p>
                  <h4 className="font-headline-md text-on-surface group-hover:text-primary transition-colors">Copper Utensil Gallery</h4>
                </div>
                <p className="font-headline-md text-primary">₦310,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-[600px] bg-primary overflow-hidden relative flex items-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor"></path>
          </svg>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop w-full grid md:grid-cols-2 items-center gap-16 relative z-10">
          <div className="space-y-8">
            <span className="font-label-md text-secondary tracking-[0.4em] uppercase">The Art of Giving</span>
            <h2 className="font-headline-xl text-on-primary">Thoughtfully Curated Gift Hampers</h2>
            <p className="font-body-lg text-on-primary/80 max-w-md">
              From wedding celebrations to corporate milestones, our bespoke gift sets are designed to leave a lasting impression.
            </p>
            <div className="flex gap-6">
              <button className="bg-secondary text-on-secondary px-8 py-4 font-label-md hover:bg-secondary-fixed transition-colors">CUSTOMIZE A GIFT</button>
              <button className="border border-on-primary/30 text-on-primary px-8 py-4 font-label-md hover:bg-on-primary hover:text-primary transition-all">SHOP READY-TO-GIFT</button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="w-full aspect-square bg-surface-container-highest p-8 shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApmZZCb7xVKtvuuMDDAFG3Hz_Mf0I5rP3p98AtM_1Fu1sOjPTO4arZxVakOtHIngsUlyaX52Zce207Yi8pARQ5-szTAPrrAUzaH09nUhjASpZHqr65odREpbrSQN1CAZRErRwUl4M5K49r_KJneXDzHVCv8LsIGjeW8mXDOLTKW-NpNMKV0HwsvdjRlXdcdlyPVwKRXJdTT0U4iIqlygLVvkZlr5VYpKIuIOwGO6zHm1jmKMOiFHI27w" alt="Gift Hamper" />
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/90 backdrop-blur rounded-full flex flex-col items-center justify-center text-center p-4">
              <p className="font-label-md text-on-secondary uppercase text-[10px] mb-1">Corporate Orders</p>
              <p className="font-headline-md text-on-secondary">15% OFF</p>
              <p className="font-caption text-on-secondary/80">On 10+ Sets</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-24 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex justify-between items-center mb-16">
            <h2 className="font-headline-lg text-primary">The Best Sellers</h2>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors shadow-sm">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors shadow-sm">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="flex gap-gutter overflow-x-auto pb-12 scrollbar-hide snap-x">
            <div className="min-w-[300px] md:min-w-[400px] snap-start group cursor-pointer" onClick={() => handleOpenOrderModal('The Signature Emerald Set', '₦399,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3k3UGtZTAQKhf4VMa9_SAhZ0caGrI4KKqbNvKMcW26xTCOojIH1u8UD65w3iQl7D74bfYXVMcRmYjOQVzus4arHlBU9TVIYBaSJ3sZOQmKnp1Y9VHkHhw5Lr-KJ0LbKUVpqK-3VxFhq_DJpS8mZ4Bllzj2qkV16QINwx0Hsc27t55aQVd-6liC26G-1HDouoFnxpagl7VJ7jADKyT626SnDDa91ohMIcaD9kV5H4470E3tBSyHR3JVQ')}>
              <div className="relative overflow-hidden mb-6">
                <img className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3k3UGtZTAQKhf4VMa9_SAhZ0caGrI4KKqbNvKMcW26xTCOojIH1u8UD65w3iQl7D74bfYXVMcRmYjOQVzus4arHlBU9TVIYBaSJ3sZOQmKnp1Y9VHkHhw5Lr-KJ0LbKUVpqK-3VxFhq_DJpS8mZ4Bllzj2qkV16QINwx0Hsc27t55aQVd-6liC26G-1HDouoFnxpagl7VJ7jADKyT626SnDDa91ohMIcaD9kV5H4470E3tBSyHR3JVQ" alt="Best Seller 1" />
                <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 font-label-md text-[10px]">#1 BESTSELLER</div>
              </div>
              <h3 className="font-headline-md text-on-surface">The Signature Emerald Set</h3>
              <p className="font-body-md text-on-surface-variant mt-2">16-Piece Ceramic Dinnerware</p>
              <div className="flex items-center gap-4 mt-4">
                <p className="font-headline-md text-primary">₦399,000</p>
                <div className="flex text-secondary">
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                </div>
                <p className="font-caption text-on-surface-variant">(124 Reviews)</p>
              </div>
            </div>

            <div className="min-w-[300px] md:min-w-[400px] snap-start group cursor-pointer" onClick={() => handleOpenOrderModal('The Nomad Leather Duffle', '₦545,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtcgvsCugVdqPRWzXRjLsl3xAWrZm0llstG4uj1a6JOydh_7kc7rotamQfVImMgKbLe9ipZ7Dm5nbKxTUkNdtCwc1lJyetFZ8bdrDpvh4bEuF_HhH7SjnONOYCV8Zh1xmB35cHoZVA6qO6unZ0uG9Bj_qQ1KaOMRbVEg1gdaQzv7z-tia3-unA5UpUEhT8LSOIX_Eej9BJz7vCW0RyfrnPhXUIAFCc-U-F5bgqfDAn9i3RwW3jJVR9rg')}>
              <div className="relative overflow-hidden mb-6">
                <img className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtcgvsCugVdqPRWzXRjLsl3xAWrZm0llstG4uj1a6JOydh_7kc7rotamQfVImMgKbLe9ipZ7Dm5nbKxTUkNdtCwc1lJyetFZ8bdrDpvh4bEuF_HhH7SjnONOYCV8Zh1xmB35cHoZVA6qO6unZ0uG9Bj_qQ1KaOMRbVEg1gdaQzv7z-tia3-unA5UpUEhT8LSOIX_Eej9BJz7vCW0RyfrnPhXUIAFCc-U-F5bgqfDAn9i3RwW3jJVR9rg" alt="Best Seller 2" />
              </div>
              <h3 className="font-headline-md text-on-surface">The Nomad Leather Duffle</h3>
              <p className="font-body-md text-on-surface-variant mt-2">Full-Grain Italian Leather</p>
              <div className="flex items-center gap-4 mt-4">
                <p className="font-headline-md text-primary">₦545,000</p>
                <div className="flex text-secondary">
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                  <span className="material-symbols-outlined fill-current text-sm">star_half</span>
                </div>
                <p className="font-caption text-on-surface-variant">(89 Reviews)</p>
              </div>
            </div>

            <div className="min-w-[300px] md:min-w-[400px] snap-start group cursor-pointer" onClick={() => handleOpenOrderModal('Cloud-Walk Linen Set', '₦295,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNMJ4BCcXk1xr6J127lPRYbRMFldZTqsbe12Mafz4vkwAvGLX_38iKBvQCIqQoOG9xeqz7WNIYYH6jtytXmpqzdo5iziYELSe8gkcC-VfkHdz3umD1ADKka9u-8ofHEpUF9MxxOpjUy4KX1xkCcUQ14aO44WKC1sQ4Eif-otxEEgDCpO7_t-7JEdDfCY6GNDRNmfYNWJk7dFe_3soGsS-Aoe7oXkwkVeTb-t61sTu8q3OZ-UNWatLgeg')}>
              <div className="relative overflow-hidden mb-6">
                <img className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNMJ4BCcXk1xr6J127lPRYbRMFldZTqsbe12Mafz4vkwAvGLX_38iKBvQCIqQoOG9xeqz7WNIYYH6jtytXmpqzdo5iziYELSe8gkcC-VfkHdz3umD1ADKka9u-8ofHEpUF9MxxOpjUy4KX1xkCcUQ14aO44WKC1sQ4Eif-otxEEgDCpO7_t-7JEdDfCY6GNDRNmfYNWJk7dFe_3soGsS-Aoe7oXkwkVeTb-t61sTu8q3OZ-UNWatLgeg" alt="Best Seller 3" />
              </div>
              <h3 className="font-headline-md text-on-surface">Cloud-Walk Linen Set</h3>
              <p className="font-body-md text-on-surface-variant mt-2">Pure Belgian Flax Linen</p>
              <div className="flex items-center gap-4 mt-4">
                <p className="font-headline-md text-primary">₦295,000</p>
                <div className="flex text-secondary">
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                  <span className="material-symbols-outlined fill-current text-sm">star</span>
                </div>
                <p className="font-caption text-on-surface-variant">(210 Reviews)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-32 bg-surface">
        <div className="max-w-4xl mx-auto px-margin-mobile text-center space-y-12">
          <div className="inline-block w-20 h-[1px] bg-primary mb-8 mx-auto"></div>
          <h2 className="font-headline-xl text-primary italic">"Quality is not an act, it is a habit."</h2>
          <div className="grid md:grid-cols-3 gap-12 pt-8">
            <div className="space-y-4">
              <span className="material-symbols-outlined text-primary text-4xl">eco</span>
              <h4 className="font-label-md text-on-surface uppercase tracking-widest">Ethically Sourced</h4>
              <p className="font-caption text-on-surface-variant">We partner only with artisans who share our commitment to fair wages and sustainable materials.</p>
            </div>
            <div className="space-y-4">
              <span className="material-symbols-outlined text-primary text-4xl">inventory_2</span>
              <h4 className="font-label-md text-on-surface uppercase tracking-widest">Heritage Quality</h4>
              <p className="font-caption text-on-surface-variant">Every item in our collection is designed to be passed down through generations.</p>
            </div>
            <div className="space-y-4">
              <span className="material-symbols-outlined text-primary text-4xl">local_shipping</span>
              <h4 className="font-label-md text-on-surface uppercase tracking-widest">White Glove Delivery</h4>
              <p className="font-caption text-on-surface-variant">Your premium orders deserve premium handling. Complimentary on orders over ₦200,000.</p>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
