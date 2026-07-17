import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, getDoc, setDoc } from 'firebase/firestore';
import AnimatedPage from '../components/AnimatedPage';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt?: any;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  orderDetails: string;
  receipt?: string;
  status: string;
  createdAt: any;
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'video'>('products');
  const [loading, setLoading] = useState(false);

  // Video Ad State
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoIsActive, setVideoIsActive] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoMessage, setVideoMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const emptyProduct = { name: '', category: '', price: '', description: '', imageUrl: '' };
  const [newProducts, setNewProducts] = useState([emptyProduct]);
  
  const [categoryName, setCategoryName] = useState('');
  const [categorySlug, setCategorySlug] = useState('');

  const [password, setPassword] = useState('');
  const [isAuthenticatedWithPassword, setIsAuthenticatedWithPassword] = useState(false);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);
  const [confirmingDeleteCategoryId, setConfirmingDeleteCategoryId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticatedWithPassword) {
      fetchData();
    }
  }, [isAuthenticatedWithPassword]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const prods: Product[] = [];
      productsSnapshot.forEach((doc) => {
        prods.push({ id: doc.id, ...doc.data() } as Product);
      });
      // Sort products newest to oldest based on createdAt timestamp
      prods.sort((a, b) => {
        const timeA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : (a.createdAt?.toMillis?.() || 0);
        const timeB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : (b.createdAt?.toMillis?.() || 0);
        return timeB - timeA;
      });
      setProducts(prods);

      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const cats: Category[] = [];
      categoriesSnapshot.forEach((doc) => {
        cats.push({ id: doc.id, ...doc.data() } as Category);
      });
      setCategories(cats);

      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      const ords: Order[] = [];
      ordersSnapshot.forEach((doc) => {
        ords.push({ id: doc.id, ...doc.data() } as Order);
      });
      ords.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setOrders(ords);

      // Fetch promotional video settings
      try {
        const promoSnap = await getDoc(doc(db, 'promotions', 'ad_video'));
        if (promoSnap.exists()) {
          const data = promoSnap.data();
          setVideoUrl(data.videoUrl || '');
          setVideoTitle(data.title || '');
          setVideoDescription(data.description || '');
          setVideoIsActive(data.isActive !== false);
        }
      } catch (err) {
        console.error("Error fetching promotional video:", err);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVideoSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setVideoMessage(null);
    setLoading(true);
    try {
      await setDoc(doc(db, 'promotions', 'ad_video'), {
        videoUrl,
        title: videoTitle,
        description: videoDescription,
        isActive: videoIsActive,
        updatedAt: serverTimestamp()
      });
      setVideoMessage({ type: 'success', text: 'Promotional video settings updated successfully!' });
    } catch (err) {
      console.error("Error saving promotional video settings:", err);
      setVideoMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit size to ~100MB
    if (file.size > 100 * 1024 * 1024) {
      alert("The video is too large. Please select a video file under 100MB, or use a YouTube/Vimeo link instead.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setVideoMessage(null);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload-video', true);
    xhr.setRequestHeader('Content-Type', file.type);

    // Track real native upload progress!
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      setUploading(false);
      setUploadProgress(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.success && response.videoUrl) {
            setVideoUrl(response.videoUrl);
            setVideoMessage({ type: 'success', text: 'Video uploaded successfully! Click "Save Video Settings" to save and publish your changes.' });
          } else {
            setVideoMessage({ type: 'error', text: response.error || 'Failed to upload video.' });
          }
        } catch (err) {
          setVideoMessage({ type: 'error', text: 'Invalid response from server.' });
        }
      } else {
        setVideoMessage({ type: 'error', text: `Server returned status: ${xhr.status}` });
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      setUploadProgress(null);
      setVideoMessage({ type: 'error', text: 'Network connection error during upload.' });
    };

    xhr.send(file);
  };

  const handleDeleteAllProducts = async () => {
    const confirmDelete = window.confirm("⚠️ WARNING: Are you absolutely sure you want to delete ALL products? This action is permanent and cannot be undone!");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const deletePromises: Promise<void>[] = [];
      productsSnapshot.forEach((docSnap) => {
        deletePromises.push(deleteDoc(doc(db, 'products', docSnap.id)));
      });
      await Promise.all(deletePromises);
      await fetchData();
      alert("All products have been deleted successfully.");
    } catch (error) {
      console.error("Error deleting all products:", error);
      alert("Failed to delete all products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProducts = async (e: React.FormEvent) => {
    e.preventDefault();
    const validProducts = newProducts.filter(p => p.name && p.category && p.price);
    if (validProducts.length === 0) return;
    
    try {
      await Promise.all(validProducts.map(p => addDoc(collection(db, 'products'), {
        name: p.name,
        category: p.category,
        price: Number(p.price),
        description: p.description,
        imageUrl: p.imageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })));
      setNewProducts([emptyProduct]);
      fetchData();
    } catch (error) {
      console.error("Error adding products: ", error);
    }
  };

  const updateNewProduct = (index: number, field: string, value: string) => {
    const updated = [...newProducts];
    updated[index] = { ...updated[index], [field]: value };
    setNewProducts(updated);
  };

  const removeNewProduct = (index: number) => {
    const updated = [...newProducts];
    updated.splice(index, 1);
    if (updated.length === 0) {
      updated.push(emptyProduct);
    }
    setNewProducts(updated);
  };

  const addNewProductRow = () => {
    setNewProducts([...newProducts, emptyProduct]);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName || !categorySlug) return;
    
    try {
      await addDoc(collection(db, 'categories'), {
        name: categoryName,
        slug: categorySlug
      });
      setCategoryName('');
      setCategorySlug('');
      fetchData();
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
      fetchData();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status: newStatus });
      
      // Find the existing order from state to retrieve customer email and details
      const order = orders.find(o => o.id === id);
      if (order && order.email) {
        try {
          await fetch('/api/send-order-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id,
              name: order.name,
              email: order.email,
              phone: order.phone,
              address: order.address,
              orderDetails: order.orderDetails,
              status: newStatus,
              type: 'updated'
            })
          });
        } catch (emailErr) {
          console.error("Failed to send automated status update email:", emailErr);
        }
      }

      fetchData();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'orders', id));
      fetchData();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (!isAuthenticatedWithPassword) {
    return (
      <div className="pt-32 pb-24 px-margin-desktop min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-full max-w-sm bg-surface p-8 rounded-none border border-outline shadow-sm">
          <h1 className="font-headline-md text-2xl mb-6 text-center text-on-surface">Restricted Access</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (password === 'sadeeq123') {
              setIsAuthenticatedWithPassword(true);
            } else {
              alert('Incorrect access code');
              setPassword('');
            }
          }} className="space-y-6">
            <div>
              <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">Access Code</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full border border-outline bg-surface p-3 font-body-md focus:border-primary focus:outline-none text-center tracking-widest" 
                autoFocus
              />
            </div>
            <button type="submit" className="w-full bg-primary text-on-primary py-3 uppercase tracking-widest font-label-md hover:bg-primary/90 transition-colors">
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AnimatedPage className="pt-32 pb-24 px-margin-desktop min-h-screen">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-headline-lg text-4xl">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAuthenticatedWithPassword(false)}
            className="border border-outline px-4 py-2 uppercase tracking-widest font-label-md text-xs hover:bg-surface-variant transition-colors"
          >
            Lock Dashboard
          </button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-outline mb-12">
        <button 
          className={`pb-4 uppercase tracking-widest font-label-md ${activeTab === 'products' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={`pb-4 uppercase tracking-widest font-label-md ${activeTab === 'categories' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button 
          className={`pb-4 uppercase tracking-widest font-label-md ${activeTab === 'orders' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={`pb-4 uppercase tracking-widest font-label-md ${activeTab === 'video' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          onClick={() => setActiveTab('video')}
        >
          Promo Video Ad
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center">Loading...</div>
      ) : activeTab === 'products' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-2xl">Add Products</h2>
              <button 
                type="button" 
                onClick={addNewProductRow}
                className="text-primary text-xs uppercase tracking-widest font-label-md flex items-center gap-1 hover:text-primary/80"
              >
                <span className="material-symbols-outlined text-sm">add</span> Add Row
              </button>
            </div>
            <form onSubmit={handleAddProducts} className="space-y-6">
              {newProducts.map((p, index) => (
                <div key={index} className="border border-outline p-4 bg-surface-container-lowest relative group">
                  {newProducts.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeNewProduct(index)}
                      className="absolute top-2 right-2 text-error opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  )}
                  <h3 className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-4">Product {index + 1}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">Name</label>
                      <input required type="text" value={p.name} onChange={(e) => updateNewProduct(index, 'name', e.target.value)} className="w-full border border-outline bg-surface p-2 font-body-md focus:border-primary focus:outline-none text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">Category (Slug)</label>
                        <input required type="text" value={p.category} onChange={(e) => updateNewProduct(index, 'category', e.target.value)} className="w-full border border-outline bg-surface p-2 font-body-md focus:border-primary focus:outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">Price (₦)</label>
                        <input required type="number" value={p.price} onChange={(e) => updateNewProduct(index, 'price', e.target.value)} className="w-full border border-outline bg-surface p-2 font-body-md focus:border-primary focus:outline-none text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">Product Image</label>
                      <div className="space-y-2">
                        {p.imageUrl ? (
                          <div className="relative border border-outline rounded p-2 bg-surface flex items-center gap-3">
                            <img src={p.imageUrl} alt="Product preview" className="w-12 h-12 object-cover rounded border border-outline/30" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-on-surface truncate font-mono">
                                {p.imageUrl.startsWith('data:') ? 'Uploaded base64 image' : p.imageUrl}
                              </p>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => updateNewProduct(index, 'imageUrl', '')} 
                              className="text-error hover:bg-error/10 p-1 rounded flex items-center justify-center"
                              title="Remove image"
                            >
                              <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {/* File Upload Option */}
                            <label className="flex flex-col items-center justify-center border border-dashed border-outline-variant p-3 bg-surface-container-lowest rounded cursor-pointer hover:bg-surface-variant/15 transition-colors min-h-[90px]">
                              <span className="material-symbols-outlined text-primary text-xl mb-1">upload_file</span>
                              <span className="text-[11px] text-on-surface-variant font-medium">Upload Picture</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      updateNewProduct(index, 'imageUrl', reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }} 
                                className="hidden" 
                              />
                            </label>
                            
                            {/* URL Option */}
                            <div className="flex flex-col items-center justify-center border border-dashed border-outline-variant p-3 bg-surface-container-lowest rounded relative min-h-[90px]">
                              <span className="material-symbols-outlined text-secondary text-xl mb-1">link</span>
                              <span className="text-[11px] text-on-surface-variant font-medium mb-1">Or Paste Image URL</span>
                              <input 
                                type="text" 
                                placeholder="https://..." 
                                value={p.imageUrl}
                                onChange={(e) => updateNewProduct(index, 'imageUrl', e.target.value)} 
                                className="w-full text-[10px] border border-outline rounded bg-surface px-2 py-1 font-mono focus:border-primary focus:outline-none"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">Description</label>
                      <textarea value={p.description} onChange={(e) => updateNewProduct(index, 'description', e.target.value)} className="w-full border border-outline bg-surface p-2 font-body-md focus:border-primary focus:outline-none h-16 text-sm"></textarea>
                    </div>
                  </div>
                </div>
              ))}
              <button type="submit" className="w-full bg-primary text-on-primary py-3 uppercase tracking-widest font-label-md hover:bg-primary/90 transition-colors">
                Save All Products ({newProducts.length})
              </button>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="font-headline-md text-2xl">Manage Products</h2>
              {products.length > 0 && (
                <button 
                  onClick={handleDeleteAllProducts}
                  className="text-error uppercase tracking-widest font-label-md text-xs border border-error px-4 py-2 hover:bg-error hover:text-white transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span className="material-symbols-outlined text-sm">delete_sweep</span> Delete All Products
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(product => (
                <div key={product.id} className="border border-outline p-6 flex flex-col">
                  {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4 bg-surface-variant" />}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-lg">{product.name}</h3>
                    <p className="font-headline-md text-primary">₦{product.price.toLocaleString()}</p>
                  </div>
                  <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest mb-4">{product.category}</p>
                  <p className="font-body-md text-sm text-on-surface-variant line-clamp-2 mb-6 flex-grow">{product.description}</p>
                  {confirmingDeleteId === product.id ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          handleDeleteProduct(product.id);
                          setConfirmingDeleteId(null);
                        }} 
                        className="bg-error text-white uppercase tracking-widest font-label-md text-xs px-4 py-2 hover:bg-error/90 transition-colors flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">delete_forever</span> Confirm
                      </button>
                      <button 
                        onClick={() => setConfirmingDeleteId(null)} 
                        className="border border-outline text-on-surface uppercase tracking-widest font-label-md text-xs px-4 py-2 hover:bg-surface-variant transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setConfirmingDeleteId(product.id)} 
                      className="text-error uppercase tracking-widest font-label-md text-xs border border-error px-4 py-2 hover:bg-error hover:text-white transition-colors w-fit flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span> Delete Product
                    </button>
                  )}
                </div>
              ))}
              {products.length === 0 && <p className="text-on-surface-variant">No products found.</p>}
            </div>
          </div>
        </div>
      ) : activeTab === 'categories' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="font-headline-md text-2xl mb-6">Add Category</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">Name</label>
                <input required type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="w-full border border-outline bg-surface p-3 font-body-md focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">Slug</label>
                <input required type="text" value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)} className="w-full border border-outline bg-surface p-3 font-body-md focus:border-primary focus:outline-none" />
              </div>
              <button type="submit" className="w-full bg-primary text-on-primary py-3 uppercase tracking-widest font-label-md hover:bg-primary/90 transition-colors">
                Add Category
              </button>
            </form>
          </div>
          <div className="lg:col-span-2">
            <h2 className="font-headline-md text-2xl mb-6">Manage Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map(category => (
                <div key={category.id} className="border border-outline p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-headline-md text-lg">{category.name}</h3>
                    <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest mt-1">Slug: {category.slug}</p>
                  </div>
                  {confirmingDeleteCategoryId === category.id ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          handleDeleteCategory(category.id);
                          setConfirmingDeleteCategoryId(null);
                        }} 
                        className="bg-error text-white uppercase tracking-widest font-label-md text-xs px-4 py-2 hover:bg-error/90 transition-colors flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">delete_forever</span> Confirm
                      </button>
                      <button 
                        onClick={() => setConfirmingDeleteCategoryId(null)} 
                        className="border border-outline text-on-surface uppercase tracking-widest font-label-md text-xs px-4 py-2 hover:bg-surface-variant transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setConfirmingDeleteCategoryId(category.id)} 
                      className="text-error uppercase tracking-widest font-label-md text-xs border border-error px-4 py-2 hover:bg-error hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span> Delete
                    </button>
                  )}
                </div>
              ))}
              {categories.length === 0 && <p className="text-on-surface-variant">No categories found.</p>}
            </div>
          </div>
        </div>
      ) : activeTab === 'orders' ? (
        <div className="w-full">
          <h2 className="font-headline-md text-2xl mb-6">Manage Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-outline text-left text-sm">
              <thead className="bg-surface-container-lowest">
                <tr>
                  <th className="border-b border-outline p-4 font-label-md uppercase tracking-widest text-on-surface-variant text-xs">Date</th>
                  <th className="border-b border-outline p-4 font-label-md uppercase tracking-widest text-on-surface-variant text-xs">Customer</th>
                  <th className="border-b border-outline p-4 font-label-md uppercase tracking-widest text-on-surface-variant text-xs">Details</th>
                  <th className="border-b border-outline p-4 font-label-md uppercase tracking-widest text-on-surface-variant text-xs">Status</th>
                  <th className="border-b border-outline p-4 font-label-md uppercase tracking-widest text-on-surface-variant text-xs">Receipt</th>
                  <th className="border-b border-outline p-4 font-label-md uppercase tracking-widest text-on-surface-variant text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-surface-variant/20 transition-colors">
                    <td className="border-b border-outline p-4 whitespace-nowrap">
                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="border-b border-outline p-4">
                      <div className="font-medium text-on-surface">{order.name}</div>
                      {order.email && (
                        <div className="text-primary text-xs font-mono select-all hover:underline" title="Click to copy email">
                          {order.email}
                        </div>
                      )}
                      <div className="text-on-surface-variant text-xs">{order.phone}</div>
                      <div className="text-on-surface-variant text-xs truncate max-w-[200px]" title={order.address}>{order.address}</div>
                    </td>
                    <td className="border-b border-outline p-4 font-body-sm max-w-[250px]">
                      {order.productImage && (
                        <div className="mb-2">
                          <img src={order.productImage} alt="Product" className="w-16 h-16 object-cover rounded shadow-sm border border-outline/30" />
                        </div>
                      )}
                      {order.orderDetails}
                    </td>
                    <td className="border-b border-outline p-4">
                      <select 
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className={`bg-transparent border border-outline rounded p-1 text-xs font-label-md uppercase tracking-widest focus:outline-none ${
                          order.status === 'delivered' ? 'text-primary' : 
                          order.status === 'shipped' ? 'text-secondary' : 
                          order.status === 'cancelled' ? 'text-error' : 'text-on-surface-variant'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="border-b border-outline p-4">
                      {order.receipt ? (
                        <a href={order.receipt} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs uppercase tracking-widest font-label-md">View Receipt</a>
                      ) : (
                        <span className="text-on-surface-variant text-xs">None</span>
                      )}
                    </td>
                    <td className="border-b border-outline p-4">
                      <button onClick={() => handleDeleteOrder(order.id)} className="text-error uppercase tracking-widest font-label-md text-[10px] border border-error px-3 py-1 hover:bg-error hover:text-white transition-colors">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-on-surface-variant">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'video' ? (
        <div className="max-w-4xl mx-auto bg-surface-container-lowest border border-outline rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="font-headline-md text-2xl mb-2 text-on-surface">Manage Promotional Video</h2>
            <p className="font-body-md text-on-surface-variant text-sm">
              Configure or upload a professional promo video story that will float elegantly on the bottom-left of the storefront for customers to play.
            </p>
          </div>

          {videoMessage && (
            <div className={`p-4 mb-6 rounded-xl border text-sm ${
              videoMessage.type === 'success' 
                ? 'bg-success/10 border-success text-success' 
                : 'bg-error/10 border-error text-error'
            }`}>
              {videoMessage.text}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left side form */}
            <form onSubmit={handleSaveVideoSettings} className="lg:col-span-3 space-y-6">
              <div>
                <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                  Upload Video File
                </label>
                <div className="border-2 border-dashed border-outline-variant hover:border-primary/50 transition-colors rounded-2xl p-6 text-center cursor-pointer relative group">
                  <input 
                    type="file" 
                    accept="video/*" 
                    onChange={handleVideoUpload}
                    disabled={uploading}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors">
                      cloud_upload
                    </span>
                    <span className="font-label-md text-xs uppercase tracking-widest text-on-surface font-semibold">
                      {uploading ? 'Processing file...' : 'Choose file or drag here'}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      Supports MP4, WebM (Max 50MB)
                    </span>
                  </div>
                </div>

                {uploadProgress !== null && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs font-mono text-on-surface-variant">
                      <span>Uploading video to local stream...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-surface border border-outline/20 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] bg-outline-variant/30 flex-1"></div>
                <span className="text-xs font-mono text-on-surface-variant uppercase tracking-widest">OR</span>
                <div className="h-[1px] bg-outline-variant/30 flex-1"></div>
              </div>

              <div>
                <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                  Video Link (Direct URL or YouTube/Vimeo)
                </label>
                <input 
                  type="url" 
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full border border-outline bg-surface p-3 font-body-md focus:border-primary focus:outline-none text-sm rounded-xl"
                />
                <p className="text-[10px] text-on-surface-variant mt-1.5 leading-relaxed">
                  You can paste a direct MP4 link, a YouTube video URL, or a Vimeo video URL. YouTube links will automatically play using our secure embeds.
                </p>
              </div>

              <div>
                <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                  Ad Title / Feature Label
                </label>
                <input 
                  type="text" 
                  required
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="e.g. Handmade Silk Collection"
                  className="w-full border border-outline bg-surface p-3 font-body-md focus:border-primary focus:outline-none text-sm rounded-xl"
                />
              </div>

              <div>
                <label className="block font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                  Ad Story Description
                </label>
                <textarea 
                  required
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  placeholder="Tell the artisan story behind this collection..."
                  rows={4}
                  className="w-full border border-outline bg-surface p-3 font-body-md focus:border-primary focus:outline-none text-sm rounded-xl resize-none"
                />
              </div>

              <div className="flex items-center gap-3 bg-surface p-4 rounded-xl border border-outline/10">
                <input 
                  type="checkbox"
                  id="videoIsActive"
                  checked={videoIsActive}
                  onChange={(e) => setVideoIsActive(e.target.checked)}
                  className="w-4 h-4 rounded border-outline text-primary focus:ring-primary cursor-pointer"
                />
                <label htmlFor="videoIsActive" className="font-label-md text-xs uppercase tracking-widest text-on-surface cursor-pointer select-none">
                  Make Promotional Video Live on Storefront
                </label>
              </div>

              <button 
                type="submit"
                disabled={loading || uploading}
                className="w-full bg-primary text-on-primary py-3.5 uppercase tracking-widest font-label-md hover:bg-primary/90 transition-colors rounded-xl flex items-center justify-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-lg">save</span>
                {loading ? 'Saving Settings...' : 'Save Video Settings'}
              </button>
            </form>

            {/* Right side real-time live preview */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/30 pb-2">
                Live Storefront Preview
              </h3>

              {videoUrl ? (
                <div className="border border-outline bg-black rounded-2xl overflow-hidden aspect-video relative group shadow-lg flex items-center justify-center">
                  {videoUrl.includes('.mp4') || videoUrl.startsWith('data:video/') ? (
                    <video 
                      src={videoUrl} 
                      className="w-full h-full object-contain"
                      controls
                    />
                  ) : videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                    <div className="w-full h-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&auto=format&fit=crop')] flex flex-col items-center justify-center text-white p-4">
                      <span className="material-symbols-outlined text-4xl mb-2 text-red-600">play_circle</span>
                      <span className="text-xs font-semibold uppercase tracking-widest bg-black/60 px-3 py-1 rounded">YouTube Integration</span>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&auto=format&fit=crop')] flex flex-col items-center justify-center text-white p-4">
                      <span className="material-symbols-outlined text-4xl mb-2">play_circle</span>
                      <span className="text-xs font-semibold uppercase tracking-widest bg-black/60 px-3 py-1 rounded">External Video Link</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border border-dashed border-outline-variant bg-surface-container-low rounded-2xl aspect-video flex flex-col items-center justify-center p-6 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-3xl mb-2">video_library</span>
                  <span className="text-xs font-semibold uppercase tracking-widest">No Video Configured</span>
                  <p className="text-[10px] mt-1">Upload a video file or enter a link to preview here</p>
                </div>
              )}

              {/* Mock of storefront float bubble */}
              <div className="border border-outline/10 bg-surface rounded-2xl p-4 shadow-sm space-y-3">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Widget mockup:</span>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full border-2 border-primary overflow-hidden relative bg-black flex items-center justify-center shadow-md animate-pulse">
                    {videoUrl && (videoUrl.includes('.mp4') || videoUrl.startsWith('data:video/')) ? (
                      <video src={videoUrl} className="w-full h-full object-cover" muted playsInline />
                    ) : (
                      <div className="w-full h-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=100&auto=format&fit=crop')]" />
                    )}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">play_arrow</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-on-surface truncate max-w-[150px]">{videoTitle || 'Artisan Story'}</h4>
                    <p className="text-[10px] text-on-surface-variant truncate max-w-[150px]">{videoDescription || 'Discover premium collections'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </AnimatedPage>
  );
}
