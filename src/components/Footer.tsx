import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-highest pt-16 pb-8 border-t border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-16">
        <div className="space-y-6">
          <div>
            <span className="font-headline-lg text-primary">Albarka Collection</span>
            <p className="mt-4 text-body-md text-on-surface-variant">Curating premium lifestyle essentials for the modern home since 1994. Experience luxury that feels like home.</p>
            <div className="mt-4 text-xs text-on-surface-variant/80 space-y-1">
              <p className="font-label-md uppercase tracking-wider text-on-surface">Flagship Store:</p>
              <p>T48 Anguwan Rogo, Jos North,</p>
              <p>Plateau State, Nigeria</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all" to="/">
              <span className="material-symbols-outlined">share</span>
            </Link>
            <Link className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all" to="/">
              <span className="material-symbols-outlined">public</span>
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <h5 className="font-label-md text-on-surface uppercase tracking-widest">Customer Service</h5>
          <ul className="space-y-3 text-body-md text-on-surface-variant">
            <li><Link to="/" className="hover:text-primary cursor-pointer">Track Order</Link></li>
            <li><Link to="/" className="hover:text-primary cursor-pointer">Returns & Exchanges</Link></li>
            <li><Link to="/" className="hover:text-primary cursor-pointer">Shipping Info</Link></li>
            <li><Link to="/" className="hover:text-primary cursor-pointer">FAQs</Link></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h5 className="font-label-md text-on-surface uppercase tracking-widest">Corporate</h5>
          <ul className="space-y-3 text-body-md text-on-surface-variant">
            <li><a href="/#about" className="hover:text-primary cursor-pointer block">About Us</a></li>
            <li><Link to="/" className="hover:text-primary cursor-pointer block">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-primary cursor-pointer block">Terms of Service</Link></li>
            <li><a href="/#contact" className="hover:text-primary cursor-pointer block">Contact</a></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h5 className="font-label-md text-on-surface uppercase tracking-widest">Newsletter</h5>
          <p className="text-body-md text-on-surface-variant">Join our elite club for early access to sales and new collection drops.</p>
          <div className="flex flex-col gap-3">
            <input className="bg-surface-container-lowest border border-outline-variant px-4 py-3 rounded-lg outline-none focus:border-primary" placeholder="your@email.com" type="email" />
            <button className="bg-primary text-on-primary py-3 rounded-lg font-label-md hover:bg-primary-container transition-colors">SUBSCRIBE</button>
          </div>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-desktop border-t border-outline-variant/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-caption text-on-surface-variant">
        <p>© 2024 Albarka Collection. All Rights Reserved.</p>
        <div className="flex gap-6">
          <span className="material-symbols-outlined">payments</span>
          <span className="material-symbols-outlined">lock</span>
          <span className="material-symbols-outlined">verified_user</span>
        </div>
      </div>
      <div className="flex justify-center pt-8 pb-2 opacity-5 hover:opacity-100 transition-opacity">
        <a href="/admin" className="text-[10px] text-on-surface-variant cursor-default">Administration</a>
      </div>
    </footer>
  );
}
