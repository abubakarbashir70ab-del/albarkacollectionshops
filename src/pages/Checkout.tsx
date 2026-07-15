import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import AnimatedPage from '../components/AnimatedPage';

export default function Checkout() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderDetails, setOrderDetails] = useState('');
  const [receiptBase64, setReceiptBase64] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !orderDetails) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'orders'), {
        name,
        phone,
        address,
        orderDetails,
        receipt: receiptBase64,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <AnimatedPage className="pt-32 pb-24 px-margin-desktop min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-surface p-8 border border-outline shadow-sm text-center">
          <span className="material-symbols-outlined text-primary text-6xl mb-4">check_circle</span>
          <h1 className="font-headline-md text-2xl mb-4">Order Received</h1>
          <p className="font-body-md text-on-surface-variant mb-6">
            Thank you, {name}! Your order and payment receipt have been received successfully. We will contact you shortly.
          </p>
          <Link to="/" className="inline-block bg-primary text-on-primary px-8 py-3 uppercase tracking-widest font-label-md hover:bg-primary/90 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="pt-32 pb-24 px-margin-desktop min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-headline-lg text-4xl mb-4 text-center">Place Your Order</h1>
        <p className="font-body-md text-on-surface-variant mb-12 text-center">
          Fill in the details below and drop your payment receipt to complete your order.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-8 border border-outline shadow-sm">
          <div>
            <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">Full Name *</label>
            <input 
              required 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full border border-outline bg-surface p-3 font-body-md focus:border-primary focus:outline-none" 
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">Phone Number *</label>
            <input 
              required 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className="w-full border border-outline bg-surface p-3 font-body-md focus:border-primary focus:outline-none" 
              placeholder="e.g. 08033239248"
            />
          </div>

          <div>
            <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">Delivery Address *</label>
            <textarea 
              required 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              className="w-full border border-outline bg-surface p-3 font-body-md focus:border-primary focus:outline-none min-h-[80px]" 
              placeholder="Full delivery address"
            />
          </div>

          <div>
            <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">Order Details *</label>
            <textarea 
              required 
              value={orderDetails} 
              onChange={(e) => setOrderDetails(e.target.value)} 
              className="w-full border border-outline bg-surface p-3 font-body-md focus:border-primary focus:outline-none min-h-[100px]" 
              placeholder="List the items you want to order..."
            />
          </div>

          <div className="border border-outline/30 rounded-lg overflow-hidden mb-6 bg-surface">
            <div className="bg-surface-container-lowest p-4 border-b border-outline/30 flex items-center justify-between">
              <h3 className="font-headline-sm text-lg font-bold flex items-center gap-2">
                Payment Method
              </h3>
              <div className="flex items-center text-green-600 gap-1 text-sm font-medium">
                <span className="material-symbols-outlined text-base">lock</span>
                Secure checkout
              </div>
            </div>
            
            <div className="p-4">
              <div className="border-2 border-primary rounded-md p-4 bg-primary/5 mb-4 relative">
                <div className="absolute top-4 right-4 flex items-center">
                   <span className="material-symbols-outlined text-primary text-xl">radio_button_checked</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">account_balance</span>
                  <div>
                    <h4 className="font-bold text-on-surface">Direct Bank Transfer</h4>
                    <p className="text-xs text-on-surface-variant">Transfer directly to our bank account</p>
                  </div>
                </div>
                
                <div className="bg-surface p-4 rounded border border-outline/20 space-y-3 font-body-sm">
                  <div className="flex justify-between items-center border-b border-outline/10 pb-2">
                    <span className="text-on-surface-variant">Bank Name</span>
                    <span className="font-semibold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg text-secondary">account_balance</span> FirstBank
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline/10 pb-2">
                    <span className="text-on-surface-variant">Account Name</span>
                    <span className="font-semibold text-on-surface">Bashir Abubakar</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-on-surface-variant">Account Number</span>
                    <span className="font-bold text-primary text-xl flex items-center gap-2">
                      3100999564
                      <button 
                        type="button" 
                        onClick={() => navigator.clipboard.writeText('3100999564')} 
                        className="text-on-surface-variant hover:text-primary transition-colors flex items-center" 
                        title="Copy to clipboard"
                      >
                        <span className="material-symbols-outlined text-sm">content_copy</span>
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-dashed border-outline-variant p-6 text-center bg-surface-container-lowest rounded hover:bg-surface-variant/10 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl mb-2">upload_file</span>
                <label className="block font-label-md text-sm text-on-surface-variant mb-2 cursor-pointer hover:text-primary">
                  Click to upload payment receipt
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </label>
                <p className="font-caption text-xs text-on-surface-variant">Required to confirm your order. Accepted formats: JPG, PNG</p>
                {receiptBase64 && (
                  <div className="mt-4 flex justify-center relative inline-block group">
                    <img src={receiptBase64} alt="Receipt preview" className="max-h-32 object-contain border border-outline/30 rounded shadow-sm" />
                    <button 
                      type="button" 
                      onClick={() => setReceiptBase64(null)} 
                      className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary text-on-primary py-4 uppercase tracking-widest font-label-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Order'}
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
}
