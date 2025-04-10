"use client";

import { ImageUp } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const UploadFile = ({
  setImage,
  getBase64,
}: {
  setImage: (file: File | null) => void;
  getBase64: (file: File) => void;
}) => {
  const { theme } = useTheme();
  return (
    <button className=" flex items-center justify-center relative">
      <ImageUp color={theme === "light" ? "black" : "white"} size={38} />
      <input
        type="file"
        accept="image/*"
        className="absolute opacity-0 cursor-pointer"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            console.log(file);
            setImage(file);
            getBase64(file);
          }
        }}
      />
    </button>
  );
};

export default UploadFile;
