"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

type ImageModalProps = {
  imageUrl: string;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
};

const ImageModal = ({
  imageUrl,
  alt = "Image",
  isOpen,
  onClose,
}: ImageModalProps) => {
  const [mounted, setMounted] = useState(false);

  // Handle escape key press to close modal
  useEffect(() => {
    setMounted(true);

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Handle click outside of image to close modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleCloseButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event from propagating to backdrop
    onClose();
  };

  // Don't render during SSR to prevent hydration issues
  if (!mounted) return null;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCloseButtonClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 
          dark:bg-white/30 dark:hover:bg-white/50 transition-colors z-20" // Added z-20 for better stacking
          aria-label="Close image viewer"
        >
          <X size={24} />
        </button>

        {/* Image with responsive size */}
        <div className="relative">
          <Image
            src={imageUrl}
            alt={alt}
            className="rounded-lg object-contain max-h-[90vh]"
            width={1200}
            height={800}
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 1200px"
            priority
            unoptimized={imageUrl.startsWith("blob:")} // For local blob URLs
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
