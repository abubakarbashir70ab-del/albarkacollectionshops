import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="bg-primary py-2 px-margin-desktop hidden lg:block">
        <p className="text-center text-caption text-on-primary uppercase tracking-widest font-label-md">
          Complimentary Shipping on orders over ₦200,000
        </p>
      </div>
      <div className="h-20 max-w-container-max mx-auto px-margin-desktop flex items-center justify-between gap-gutter">
        <div className="flex-shrink-0">
          <Link to="/" className="font-headline-lg text-primary tracking-tight">Albarka Collection</Link>
        </div>
        <div className="flex-1 max-w-xl hidden md:flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant/30">
          <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
          <input
            className="bg-transparent border-none outline-none w-full text-body-md text-on-surface placeholder-on-surface-variant/60"
            placeholder="Search products, categories..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-6">
          <Link to="/checkout" className="text-on-surface-variant hover:text-primary transition-colors flex items-center relative">
            <span className="material-symbols-outlined mr-2">shopping_cart_checkout</span>
            <span className="hidden xl:inline text-label-md uppercase tracking-widest font-bold">Place Order</span>
          </Link>
          <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
            <img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg" />
            <span className="hidden xl:inline text-label-md text-on-surface-variant">Account</span>
          </div>
        </div>
      </div>
      <nav className="max-w-container-max mx-auto px-margin-desktop border-t border-outline-variant/20 flex items-center justify-center gap-8 py-4">
        <div className="relative group flex flex-col justify-center cursor-pointer h-full">
          <Link to="/shop" className="transition-colors uppercase text-primary font-bold border-b-2 border-primary py-1">Shop</Link>
          <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-3 w-[100vw] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="bg-surface-container-lowest shadow-xl p-margin-desktop grid grid-cols-4 gap-gutter cursor-default border-t border-outline-variant/20">
             <div className="space-y-4">
              <h4 className="font-label-md text-primary">Home & Kitchen</h4>
              <ul className="space-y-2 text-body-md text-on-surface-variant">
                <li><Link to="/shop?category=Kitchenware" className="hover:text-primary cursor-pointer">Kitchenware</Link></li>
                <li><Link to="/shop?category=Kitchenware" className="hover:text-primary cursor-pointer">Table Linen</Link></li>
                <li><Link to="/shop?category=Home Decor" className="hover:text-primary cursor-pointer">Home Decor</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-label-md text-primary">Baby & Gifts</h4>
              <ul className="space-y-2 text-body-md text-on-surface-variant">
                <li><Link to="/shop?category=Baby & Nursery" className="hover:text-primary cursor-pointer">Baby Apparel</Link></li>
                <li><Link to="/shop?category=Wedding & Gifts" className="hover:text-primary cursor-pointer">Gift Hampers</Link></li>
                <li><Link to="/shop?category=Wedding & Gifts" className="hover:text-primary cursor-pointer">Wedding Gifts</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-label-md text-primary">Bedding & Travel</h4>
              <ul className="space-y-2 text-body-md text-on-surface-variant">
                <li><Link to="/shop?category=Bedding & Linen" className="hover:text-primary cursor-pointer">Bedsheets</Link></li>
                <li><Link to="/shop?category=Travel Gear" className="hover:text-primary cursor-pointer">Travel Gear</Link></li>
                <li><Link to="/shop?category=Travel Gear" className="hover:text-primary cursor-pointer">Accessories</Link></li>
              </ul>
            </div>
            <div className="bg-surface-container rounded-xl p-6 flex flex-col justify-end min-h-[200px]">
              <p className="font-headline-md text-on-surface mb-2">New Arrivals</p>
              <Link to="/shop" className="text-primary font-label-md flex items-center">
                Discover Collection <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </Link>
            </div>
            </div>
          </div>
        </div>
        <Link to="/shop" className="text-label-md text-secondary hover:text-secondary-fixed-dim transition-colors uppercase">Deals</Link>
        <Link to="/shop" className="text-label-md text-on-surface-variant hover:text-primary transition-colors uppercase">Best Sellers</Link>
        <a href="/#about" className="text-label-md text-on-surface-variant hover:text-primary transition-colors uppercase">About</a>
        <a href="/#contact" className="text-label-md text-on-surface-variant hover:text-primary transition-colors uppercase">Contact</a>
      </nav>
    </header>
  );
}
