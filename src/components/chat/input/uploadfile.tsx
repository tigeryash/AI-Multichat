"use client";
import { ImageUp } from "lucide-react";
import React from "react";

const UploadFile = ({
  setImage,
}: {
  setImage: (file: File | null) => void;
}) => {
  return (
    <button className=" flex items-center justify-center  relative">
      <ImageUp color="black" size={38} />
      <input
        type="file"
        accept="image/*"
        className="absolute opacity-0 cursor-pointer"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            console.log(file);
            setImage(file);
          }
        }}
      />
    </button>
  );
};

export default UploadFile;
