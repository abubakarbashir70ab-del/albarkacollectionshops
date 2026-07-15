import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import OrderModal from '../components/OrderModal';

export default function Travel() {
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
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiR-ujdbTrEVgKuiDGrh7XgN2XpOnNwky9b2biPvN5syVPL-FyZ5lJ8IVLw9NhH1Ci11m-DcCB_l6_NYbf02BDY1BDEaNJ4TphqJ8fYBlVydTOpna17EpY4eogk_LKYm0mGNvVTqVqJIZ8hUN53zmlk5x4EUADBgnfrUo0uSpTA-rfEYpuVBZnMdfVS_2Nn-a-vhFC7h1XWaBq6JzCuNtFow2yDhnlMo-4zxBauet30CugsEDCVm5-mw" alt="Travel Header" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-margin-desktop text-on-primary">
          <span className="font-label-md uppercase tracking-[0.4em] mb-4 drop-shadow-md">The Journey Awaits</span>
          <h1 className="font-headline-xl mb-6 drop-shadow-lg max-w-4xl">Elite Travel & Luggage Systems</h1>
          <p className="font-body-lg max-w-2xl drop-shadow-md">
            Engineered for durability, designed for elegance. Our premium travel collection ensures you move through the world with grace.
          </p>
        </div>
      </section>

      <section className="w-full bg-surface-container-lowest border-b border-outline-variant/20 sticky top-[80px] z-40 hidden md:block shadow-sm">
        <div className="max-w-container-max mx-auto px-margin-desktop flex items-center justify-between py-4">
          <div className="flex gap-8">
            <Link to="/travel" className="font-label-md text-primary uppercase tracking-widest border-b-2 border-primary pb-1">Carry-On</Link>
            <Link to="/travel" className="font-label-md text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">Checked Luggage</Link>
            <Link to="/travel" className="font-label-md text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">Duffles & Weekenders</Link>
            <Link to="/travel" className="font-label-md text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">Travel Accessories</Link>
          </div>
          <div className="flex items-center gap-2 border-l border-outline-variant/30 pl-6">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">filter_list</span>
            <span className="font-label-md text-on-surface">Filter</span>
          </div>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          <div className="col-span-1 lg:col-span-2 group">
            <div className="h-full bg-surface-container-highest rounded-xl overflow-hidden relative min-h-[400px] flex flex-col justify-end p-10 cursor-pointer" onClick={() => handleOpenOrderModal('The Heritage Aluminium Series', '', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsdOdeIv59BBimXaNMngLVdZT3nRCHHMCIY2mMBktB3XZDjY6S1sJ3bF6IOo4RlAiIFO2I3vOUbxcIhv8fbh4VWEaaRiMQ6k4chhc_MPp9uaEw61_uSL98lpB02ua9soIEXO4DgMxOfIIsH95-T4o4s29STfYa5pxTY21NEuBbAPqsven60qh8i8uX6gEwuGm0xGblyhisNFzVe31zf49nNMK2du8S_KURr9kBrxua55lBcRsezJJA3w')}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsdOdeIv59BBimXaNMngLVdZT3nRCHHMCIY2mMBktB3XZDjY6S1sJ3bF6IOo4RlAiIFO2I3vOUbxcIhv8fbh4VWEaaRiMQ6k4chhc_MPp9uaEw61_uSL98lpB02ua9soIEXO4DgMxOfIIsH95-T4o4s29STfYa5pxTY21NEuBbAPqsven60qh8i8uX6gEwuGm0xGblyhisNFzVe31zf49nNMK2du8S_KURr9kBrxua55lBcRsezJJA3w')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent"></div>
              <div className="relative z-10 text-on-primary">
                <span className="bg-secondary text-on-secondary px-3 py-1 font-label-md text-[10px] uppercase rounded-sm mb-4 inline-block">Collection Spotlight</span>
                <h3 className="font-headline-lg mb-2">The Heritage Aluminium Series</h3>
                <p className="font-body-md text-on-primary/90 mb-6 max-w-sm">Aircraft-grade aluminium meets Italian leather trim in our most durable collection yet.</p>
                <button className="flex items-center gap-2 font-label-md hover:text-secondary-fixed transition-colors">
                  EXPLORE SERIES <span className="material-symbols-outlined text-sm">east</span>
                </button>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer" onClick={() => handleOpenOrderModal('The Voyager Carry-On', '₦325,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiR-ujdbTrEVgKuiDGrh7XgN2XpOnNwky9b2biPvN5syVPL-FyZ5lJ8IVLw9NhH1Ci11m-DcCB_l6_NYbf02BDY1BDEaNJ4TphqJ8fYBlVydTOpna17EpY4eogk_LKYm0mGNvVTqVqJIZ8hUN53zmlk5x4EUADBgnfrUo0uSpTA-rfEYpuVBZnMdfVS_2Nn-a-vhFC7h1XWaBq6JzCuNtFow2yDhnlMo-4zxBauet30CugsEDCVm5-mw')}>
            <div className="aspect-[3/4] bg-surface-container-low overflow-hidden relative mb-4">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiR-ujdbTrEVgKuiDGrh7XgN2XpOnNwky9b2biPvN5syVPL-FyZ5lJ8IVLw9NhH1Ci11m-DcCB_l6_NYbf02BDY1BDEaNJ4TphqJ8fYBlVydTOpna17EpY4eogk_LKYm0mGNvVTqVqJIZ8hUN53zmlk5x4EUADBgnfrUo0uSpTA-rfEYpuVBZnMdfVS_2Nn-a-vhFC7h1XWaBq6JzCuNtFow2yDhnlMo-4zxBauet30CugsEDCVm5-mw" alt="Carry-On" />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="w-5 h-5 rounded-full bg-[#111111] border-2 border-on-primary ring-1 ring-outline"></div>
                <div className="w-5 h-5 rounded-full bg-[#8c9296] border-2 border-on-primary"></div>
                <div className="w-5 h-5 rounded-full bg-[#3d4f3b] border-2 border-on-primary"></div>
              </div>
            </div>
            <p className="font-label-md text-on-surface-variant uppercase text-[10px] mb-1">Cabin Luggage</p>
            <h4 className="font-headline-md text-on-surface text-lg mb-1">The Voyager Carry-On</h4>
            <p className="font-body-md text-on-surface-variant text-sm mb-2">Polycarbonate Hard Shell</p>
            <p className="font-headline-md text-primary">₦325,000</p>
          </div>

          <div className="group cursor-pointer" onClick={() => handleOpenOrderModal('Canvas & Leather Weekender', '₦450,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtcgvsCugVdqPRWzXRjLsl3xAWrZm0llstG4uj1a6JOydh_7kc7rotamQfVImMgKbLe9ipZ7Dm5nbKxTUkNdtCwc1lJyetFZ8bdrDpvh4bEuF_HhH7SjnONOYCV8Zh1xmB35cHoZVA6qO6unZ0uG9Bj_qQ1KaOMRbVEg1gdaQzv7z-tia3-unA5UpUEhT8LSOIX_Eej9BJz7vCW0RyfrnPhXUIAFCc-U-F5bgqfDAn9i3RwW3jJVR9rg')}>
            <div className="aspect-[3/4] bg-surface-container-low overflow-hidden relative mb-4">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtcgvsCugVdqPRWzXRjLsl3xAWrZm0llstG4uj1a6JOydh_7kc7rotamQfVImMgKbLe9ipZ7Dm5nbKxTUkNdtCwc1lJyetFZ8bdrDpvh4bEuF_HhH7SjnONOYCV8Zh1xmB35cHoZVA6qO6unZ0uG9Bj_qQ1KaOMRbVEg1gdaQzv7z-tia3-unA5UpUEhT8LSOIX_Eej9BJz7vCW0RyfrnPhXUIAFCc-U-F5bgqfDAn9i3RwW3jJVR9rg" alt="Weekender" />
            </div>
            <p className="font-label-md text-on-surface-variant uppercase text-[10px] mb-1">Duffles</p>
            <h4 className="font-headline-md text-on-surface text-lg mb-1">Canvas & Leather Weekender</h4>
            <p className="font-body-md text-on-surface-variant text-sm mb-2">Water-resistant canvas</p>
            <p className="font-headline-md text-primary">₦450,000</p>
          </div>

          <div className="group cursor-pointer" onClick={() => handleOpenOrderModal('Hard-Shell Large Check-In', '₦550,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiR-ujdbTrEVgKuiDGrh7XgN2XpOnNwky9b2biPvN5syVPL-FyZ5lJ8IVLw9NhH1Ci11m-DcCB_l6_NYbf02BDY1BDEaNJ4TphqJ8fYBlVydTOpna17EpY4eogk_LKYm0mGNvVTqVqJIZ8hUN53zmlk5x4EUADBgnfrUo0uSpTA-rfEYpuVBZnMdfVS_2Nn-a-vhFC7h1XWaBq6JzCuNtFow2yDhnlMo-4zxBauet30CugsEDCVm5-mw')}>
            <div className="aspect-[3/4] bg-surface-container-low overflow-hidden relative mb-4">
              <div className="absolute top-4 left-4 bg-surface text-on-surface px-2 py-1 font-label-md text-[10px] uppercase shadow-sm">Bestseller</div>
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiR-ujdbTrEVgKuiDGrh7XgN2XpOnNwky9b2biPvN5syVPL-FyZ5lJ8IVLw9NhH1Ci11m-DcCB_l6_NYbf02BDY1BDEaNJ4TphqJ8fYBlVydTOpna17EpY4eogk_LKYm0mGNvVTqVqJIZ8hUN53zmlk5x4EUADBgnfrUo0uSpTA-rfEYpuVBZnMdfVS_2Nn-a-vhFC7h1XWaBq6JzCuNtFow2yDhnlMo-4zxBauet30CugsEDCVm5-mw" alt="Check-in" />
            </div>
            <p className="font-label-md text-on-surface-variant uppercase text-[10px] mb-1">Checked Luggage</p>
            <h4 className="font-headline-md text-on-surface text-lg mb-1">Hard-Shell Large Check-In</h4>
            <p className="font-body-md text-on-surface-variant text-sm mb-2">Extended Trips (10+ Days)</p>
            <p className="font-headline-md text-primary">₦550,000</p>
          </div>

          <div className="group cursor-pointer" onClick={() => handleOpenOrderModal('Compression Packing Cubes', '₦65,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsdOdeIv59BBimXaNMngLVdZT3nRCHHMCIY2mMBktB3XZDjY6S1sJ3bF6IOo4RlAiIFO2I3vOUbxcIhv8fbh4VWEaaRiMQ6k4chhc_MPp9uaEw61_uSL98lpB02ua9soIEXO4DgMxOfIIsH95-T4o4s29STfYa5pxTY21NEuBbAPqsven60qh8i8uX6gEwuGm0xGblyhisNFzVe31zf49nNMK2du8S_KURr9kBrxua55lBcRsezJJA3w')}>
            <div className="aspect-[3/4] bg-surface-container-low overflow-hidden relative mb-4 flex items-center justify-center p-8">
              <img className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsdOdeIv59BBimXaNMngLVdZT3nRCHHMCIY2mMBktB3XZDjY6S1sJ3bF6IOo4RlAiIFO2I3vOUbxcIhv8fbh4VWEaaRiMQ6k4chhc_MPp9uaEw61_uSL98lpB02ua9soIEXO4DgMxOfIIsH95-T4o4s29STfYa5pxTY21NEuBbAPqsven60qh8i8uX6gEwuGm0xGblyhisNFzVe31zf49nNMK2du8S_KURr9kBrxua55lBcRsezJJA3w" alt="Cubes" />
            </div>
            <p className="font-label-md text-on-surface-variant uppercase text-[10px] mb-1">Accessories</p>
            <h4 className="font-headline-md text-on-surface text-lg mb-1">Compression Packing Cubes</h4>
            <p className="font-body-md text-on-surface-variant text-sm mb-2">Set of 4, Water-resistant</p>
            <p className="font-headline-md text-primary">₦65,000</p>
          </div>

          <div className="group cursor-pointer" onClick={() => handleOpenOrderModal('Leather Passport Wallet', '₦85,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtcgvsCugVdqPRWzXRjLsl3xAWrZm0llstG4uj1a6JOydh_7kc7rotamQfVImMgKbLe9ipZ7Dm5nbKxTUkNdtCwc1lJyetFZ8bdrDpvh4bEuF_HhH7SjnONOYCV8Zh1xmB35cHoZVA6qO6unZ0uG9Bj_qQ1KaOMRbVEg1gdaQzv7z-tia3-unA5UpUEhT8LSOIX_Eej9BJz7vCW0RyfrnPhXUIAFCc-U-F5bgqfDAn9i3RwW3jJVR9rg')}>
            <div className="aspect-[3/4] bg-surface-container-low overflow-hidden relative mb-4 flex items-center justify-center p-8">
              <img className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtcgvsCugVdqPRWzXRjLsl3xAWrZm0llstG4uj1a6JOydh_7kc7rotamQfVImMgKbLe9ipZ7Dm5nbKxTUkNdtCwc1lJyetFZ8bdrDpvh4bEuF_HhH7SjnONOYCV8Zh1xmB35cHoZVA6qO6unZ0uG9Bj_qQ1KaOMRbVEg1gdaQzv7z-tia3-unA5UpUEhT8LSOIX_Eej9BJz7vCW0RyfrnPhXUIAFCc-U-F5bgqfDAn9i3RwW3jJVR9rg" alt="Wallet" />
            </div>
            <p className="font-label-md text-on-surface-variant uppercase text-[10px] mb-1">Accessories</p>
            <h4 className="font-headline-md text-on-surface text-lg mb-1">Leather Passport Wallet</h4>
            <p className="font-body-md text-on-surface-variant text-sm mb-2">RFID Blocking, 4 Cards</p>
            <p className="font-headline-md text-primary">₦85,000</p>
          </div>

          <div className="group cursor-pointer" onClick={() => handleOpenOrderModal('Tech Organizer Pouch', '₦45,000', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiR-ujdbTrEVgKuiDGrh7XgN2XpOnNwky9b2biPvN5syVPL-FyZ5lJ8IVLw9NhH1Ci11m-DcCB_l6_NYbf02BDY1BDEaNJ4TphqJ8fYBlVydTOpna17EpY4eogk_LKYm0mGNvVTqVqJIZ8hUN53zmlk5x4EUADBgnfrUo0uSpTA-rfEYpuVBZnMdfVS_2Nn-a-vhFC7h1XWaBq6JzCuNtFow2yDhnlMo-4zxBauet30CugsEDCVm5-mw')}>
            <div className="aspect-[3/4] bg-surface-container-low overflow-hidden relative mb-4 flex items-center justify-center p-8">
              <img className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiR-ujdbTrEVgKuiDGrh7XgN2XpOnNwky9b2biPvN5syVPL-FyZ5lJ8IVLw9NhH1Ci11m-DcCB_l6_NYbf02BDY1BDEaNJ4TphqJ8fYBlVydTOpna17EpY4eogk_LKYm0mGNvVTqVqJIZ8hUN53zmlk5x4EUADBgnfrUo0uSpTA-rfEYpuVBZnMdfVS_2Nn-a-vhFC7h1XWaBq6JzCuNtFow2yDhnlMo-4zxBauet30CugsEDCVm5-mw" alt="Tech" />
            </div>
            <p className="font-label-md text-on-surface-variant uppercase text-[10px] mb-1">Accessories</p>
            <h4 className="font-headline-md text-on-surface text-lg mb-1">Tech Organizer Pouch</h4>
            <p className="font-body-md text-on-surface-variant text-sm mb-2">Cable management</p>
            <p className="font-headline-md text-primary">₦45,000</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container-low py-20 mt-12">
        <div className="max-w-container-max mx-auto px-margin-desktop grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline-lg text-primary mb-6">The Cabin Advantage</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary text-3xl">airline_seat_recline_extra</span>
                <div>
                  <h4 className="font-label-md text-on-surface">Airline Approved</h4>
                  <p className="font-body-md text-on-surface-variant mt-1">Guaranteed to fit in the overhead bins of major global airlines.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary text-3xl">wifi_tethering</span>
                <div>
                  <h4 className="font-label-md text-on-surface">Smart Charging</h4>
                  <p className="font-body-md text-on-surface-variant mt-1">Integrated dual USB ports to keep you powered on the go (battery not included).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary text-3xl">360</span>
                <div>
                  <h4 className="font-label-md text-on-surface">Silent Glide Wheels</h4>
                  <p className="font-body-md text-on-surface-variant mt-1">Japanese-engineered 360° spinner wheels for effortless navigation.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container h-48 rounded-lg"></div>
            <div className="bg-surface-container h-48 rounded-lg mt-8"></div>
            <div className="bg-surface-container h-48 rounded-lg -mt-8"></div>
            <div className="bg-surface-container h-48 rounded-lg"></div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
