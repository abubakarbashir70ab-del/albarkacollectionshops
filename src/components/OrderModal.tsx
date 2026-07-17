import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productPrice?: string;
  productImage?: string;
}

export default function OrderModal({ isOpen, onClose, productName, productPrice, productImage }: OrderModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderDetails, setOrderDetails] = useState(
    productName ? `${productName}${productPrice ? ` - ${productPrice}` : ''}` : ''
  );
  const [receiptBase64, setReceiptBase64] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Update order details when product name changes
  React.useEffect(() => {
    if (productName && !isSuccess) {
      setOrderDetails(`${productName}${productPrice ? ` - ${productPrice}` : ''}`);
    }
  }, [productName, productPrice, isSuccess]);

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
        productImage: productImage || null,
        receipt: receiptBase64,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setAddress('');
    setReceiptBase64(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-surface shadow-2xl rounded-xl border border-outline flex flex-col max-h-[90vh] overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/30 bg-surface-container-lowest">
              <h2 className="font-headline-md text-xl text-primary">Place Your Order</h2>
              <button onClick={handleClose} className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {isSuccess ? (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-primary text-6xl mb-4">check_circle</span>
                  <h3 className="font-headline-md text-2xl mb-4">Order Received</h3>
                  <p className="font-body-md text-on-surface-variant">
                    Thank you, {name}! Your order has been received successfully. We will contact you shortly.
                  </p>
                </div>
              ) : (
                <form id="modal-order-form" onSubmit={handleSubmit} className="space-y-5">
                  {productImage && (
                    <div className="flex justify-center mb-6">
                      <img src={productImage} alt={productName} className="max-h-48 object-cover rounded-lg border border-outline/30 shadow-sm" />
                    </div>
                  )}
                  <div>
                    <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-1.5">Full Name *</label>
                    <input 
                      required 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="w-full border border-outline rounded bg-surface p-2.5 font-body-md focus:border-primary focus:outline-none" 
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-1.5">Phone Number *</label>
                    <input 
                      required 
                      type="tel" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="w-full border border-outline rounded bg-surface p-2.5 font-body-md focus:border-primary focus:outline-none" 
                      placeholder="e.g. 08032896303"
                    />
                  </div>

                  <div>
                    <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-1.5">Delivery Address *</label>
                    <textarea 
                      required 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      className="w-full border border-outline rounded bg-surface p-2.5 font-body-md focus:border-primary focus:outline-none min-h-[60px]" 
                      placeholder="Full delivery address"
                    />
                  </div>

                  <div>
                    <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-1.5">Order Details *</label>
                    <textarea 
                      required 
                      value={orderDetails} 
                      onChange={(e) => setOrderDetails(e.target.value)} 
                      className="w-full border border-outline rounded bg-surface p-2.5 font-body-md focus:border-primary focus:outline-none min-h-[60px]" 
                      placeholder="List the items you want to order..."
                    />
                  </div>

                  <div className="border border-outline/30 rounded-lg overflow-hidden mb-5 bg-surface">
                    <div className="bg-surface-container-lowest p-3 border-b border-outline/30 flex items-center justify-between">
                      <h3 className="font-headline-sm text-base font-bold flex items-center gap-2">
                        Payment Method
                      </h3>
                      <div className="flex items-center text-green-600 gap-1 text-xs font-medium">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        Secure
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <div className="border-2 border-primary rounded-md p-3 bg-primary/5 mb-3 relative">
                        <div className="absolute top-3 right-3 flex items-center">
                           <span className="material-symbols-outlined text-primary text-lg">radio_button_checked</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="material-symbols-outlined text-primary text-xl">account_balance</span>
                          <div>
                            <h4 className="font-bold text-on-surface text-sm">Direct Bank Transfer</h4>
                            <p className="text-[10px] text-on-surface-variant">Transfer directly to our bank account</p>
                          </div>
                        </div>
                        
                        <div className="bg-surface p-3 rounded border border-outline/20 space-y-2 font-body-sm text-sm">
                          <div className="flex justify-between items-center border-b border-outline/10 pb-1.5">
                            <span className="text-on-surface-variant">Bank Name</span>
                            <span className="font-semibold text-on-surface flex items-center gap-1">
                              <span className="material-symbols-outlined text-base text-secondary">account_balance</span> FirstBank
                            </span>
                          </div>
                          <div className="flex justify-between items-center border-b border-outline/10 pb-1.5">
                            <span className="text-on-surface-variant">Account Name</span>
                            <span className="font-semibold text-on-surface">Bashir Abubakar</span>
                          </div>
                          <div className="flex justify-between items-center pt-0.5">
                            <span className="text-on-surface-variant">Account Number</span>
                            <span className="font-bold text-primary text-lg flex items-center gap-2">
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

                      <div className="border border-dashed border-outline-variant p-4 text-center bg-surface-container-lowest rounded hover:bg-surface-variant/10 transition-colors">
                        <span className="material-symbols-outlined text-primary text-2xl mb-1">upload_file</span>
                        <label className="block font-label-md text-xs text-on-surface-variant mb-1 cursor-pointer hover:text-primary">
                          Click to upload payment receipt
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            className="hidden" 
                          />
                        </label>
                        <p className="font-caption text-[10px] text-on-surface-variant">Required to confirm your order.</p>
                        {receiptBase64 && (
                          <div className="mt-3 flex justify-center relative inline-block group">
                            <img src={receiptBase64} alt="Receipt preview" className="max-h-24 object-contain border border-outline/30 rounded shadow-sm" />
                            <button 
                              type="button" 
                              onClick={() => setReceiptBase64(null)} 
                              className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <span className="material-symbols-outlined text-[10px]">close</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {!isSuccess && (
              <div className="p-6 border-t border-outline-variant/30 bg-surface-container-lowest flex justify-end gap-4">
                <button 
                  type="button" 
                  onClick={handleClose}
                  className="px-6 py-2.5 font-label-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  CANCEL
                </button>
                <button 
                  form="modal-order-form"
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary text-on-primary px-8 py-2.5 rounded uppercase tracking-widest font-label-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'PLACE ORDER'}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
