"use client";

import Image from "next/image";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";

type ImagePreviewProps = {
  image: File | null;
  setImage: (file: File | null) => void;
  convertingImage: boolean;
};

const ImagePreview = ({
  image,
  setImage,
  convertingImage,
}: ImagePreviewProps) => {
  return (
    image && (
      <div className="flex items-center justify-center w-24 h-24 bg-gray-200   relative">
        <button
          className="absolute -top-2 -right-2 px-2 flex justify-center items-center text-white bg-black rounded-full hover:bg-gray-800 hover:text-red-500 transition-transform duration-200"
          onClick={() => setImage(null)}
        >
          x
        </button>
        <Image
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          className="w-full h-full object-cover rounded-lg"
          width={64}
          height={64}
        />

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
    )
  );
};

export default ImagePreview;
