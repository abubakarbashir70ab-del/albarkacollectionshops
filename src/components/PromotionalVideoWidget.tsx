import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface PromotionalVideo {
  videoUrl: string;
  title: string;
  description: string;
  isActive: boolean;
}

export default function PromotionalVideoWidget() {
  const [promo, setPromo] = useState<PromotionalVideo | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Listen for updates from Firestore
    const unsubscribe = onSnapshot(
      doc(db, 'promotions', 'ad_video'),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setPromo({
            videoUrl: data.videoUrl || '',
            title: data.title || 'Albarka Collection',
            description: data.description || 'Experience our premium craftsmanship and handpicked lifestyle essentials.',
            isActive: data.isActive !== false, // default true
          });
        } else {
          // Default fallbacks if no video is uploaded/configured yet
          setPromo({
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-tailor-working-with-fabric-40507-large.mp4',
            title: 'Artisan Craftsmanship',
            description: 'Discover the precision, dedication, and luxury behind every thread of Albarka Collection.',
            isActive: true,
          });
        }
      },
      (error) => {
        console.error("Error reading promotional video:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  if (!promo || !promo.isActive || !promo.videoUrl) {
    return null;
  }

  // Helper to determine if a URL is a YouTube link and get embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Check for direct MP4 video
    if (url.includes('.mp4') || url.startsWith('data:video/')) {
      return '';
    }

    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/||user\/[^\/]+\/|embed\/|watch\?(?:.*&)?v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(ytRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=0&rel=0&modestbranding=1`;
    }

    const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/i;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=0`;
    }

    return url;
  };

  const embedUrl = getEmbedUrl(promo.videoUrl);
  const isDirectVideo = !embedUrl;

  return (
    <>
      {/* Floating Mini-Player Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: "spring", stiffness: 260, damping: 25, delay: 1 }}
            className="fixed bottom-6 left-6 z-[80]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-surface-container-lowest border-2 border-primary shadow-2xl overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 group"
              aria-label="Play promotional video"
            >
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping pointer-events-none -z-10"></div>
              
              <div className="w-full h-full rounded-full overflow-hidden relative bg-black flex items-center justify-center">
                {isDirectVideo ? (
                  <video
                    ref={videoRef}
                    src={promo.videoUrl}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  // YouTube Thumbnail simulator or simple background image
                  <div className="w-full h-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=200&auto=format&fit=crop')] flex items-center justify-center opacity-80" />
                )}

                {/* Dark overlay with play icon */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl group-hover:scale-125 transition-transform duration-300">
                    play_arrow_filled
                  </span>
                </div>

                {/* Live Banner */}
                <div className="absolute bottom-1 bg-primary text-on-primary text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full scale-90">
                  Story
                </div>
              </div>
            </button>

            {/* Premium tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-surface text-on-surface text-xs font-label-md px-4 py-2.5 rounded-xl shadow-xl border border-outline/10 whitespace-nowrap pointer-events-none flex flex-col gap-0.5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Albarka Collection</span>
                  <span className="font-medium text-on-surface text-sm">{promo.title}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Premium Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-surface-container rounded-3xl overflow-hidden shadow-2xl border border-outline/10 z-10 flex flex-col md:flex-row h-[85vh] md:h-auto md:max-h-[80vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center z-20 backdrop-blur-md transition-all border border-white/10"
                aria-label="Close video player"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              {/* Left Side: Video Player */}
              <div className="w-full md:w-[65%] bg-black relative flex items-center justify-center aspect-video md:aspect-auto md:min-h-[450px]">
                {isDirectVideo ? (
                  <video
                    src={promo.videoUrl}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <iframe
                    title={promo.title}
                    src={embedUrl}
                    className="w-full h-full absolute inset-0 border-0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Right Side: Copy/CTA Info */}
              <div className="w-full md:w-[35%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-surface-container-high border-t md:border-t-0 md:border-l border-outline/10">
                <div className="space-y-4">
                  <span className="font-label-md text-xs uppercase tracking-[0.2em] text-primary">Special Feature</span>
                  <h3 className="font-headline-md text-xl md:text-2xl text-on-surface leading-tight font-semibold">
                    {promo.title}
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed max-h-[150px] overflow-y-auto">
                    {promo.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-outline-variant/10 space-y-3">
                  <a
                    href="https://wa.me/2348032896303?text=Hello%20Albarka%20Collection,%20I%20saw%20your%20promotional%20video%20and%20wanted%20to%20inquire%20about%20your%20premium%20collection!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-label-md text-xs uppercase tracking-widest hover:bg-primary/95 hover:shadow-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span> Inquire on WhatsApp
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 px-4 border border-outline hover:bg-surface-variant/30 text-on-surface-variant rounded-xl font-label-md text-xs uppercase tracking-widest transition-all"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
