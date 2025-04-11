"use client";

import Image from "next/image";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import { useState } from "react";
import ImageModal from "@/components/image-modal";

type ImagePreviewProps = {
  image: File | null;
  setImage: (file: File | null) => void;
  convertingImage: boolean;
  resetFileInput?: () => void;
};

const ImagePreview = ({
  image,
  setImage,
  convertingImage,
  resetFileInput,
}: ImagePreviewProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClear = () => {
    setImage(null);
    if (resetFileInput) {
      resetFileInput();
    }
  };

  const handleImageClick = () => {
    if (image) {
      setIsModalOpen(true);
    }
  };
  return (
    <>
      {image && (
        <div className="flex items-center justify-center w-24 h-24 bg-transparent relative">
          <button
            className="absolute -top-2 -right-2 px-2 flex justify-center items-center text-white dark:text-black 
            bg-black dark:bg-white dark:hover:bg-gray-300 rounded-full hover:bg-gray-800 hover:text-red-500 transition-transform duration-200 z-10"
            onClick={handleClear}
          >
            x
          </button>
          <div
            className="w-full h-full cursor-pointer"
            onClick={handleImageClick}
          >
            <Image
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg"
              width={64}
              height={64}
            />
          </div>

          {convertingImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg opacity-50">
              <Ring2
                size="40"
                stroke="5"
                strokeLength="0.25"
                bgOpacity="0.1"
                speed="0.8"
                color="black"
              />
            </div>
          )}
        </div>
      )}

      {/* Image Modal */}
      {image && (
        <ImageModal
          imageUrl={image ? URL.createObjectURL(image) : ""}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          alt="Uploaded image preview"
        />
      )}
    </>
  );
};
export default ImagePreview;
