"use client";

import { ImageUp } from "lucide-react";
import { useTheme } from "next-themes";

const UploadFile = ({
  setImage,
  getBase64,
}: {
  setImage: (file: File | null) => void;
  getBase64: (file: File) => void;
}) => {
  const { theme } = useTheme();

  return (
    <button className=" flex items-center justify-center relative overflow-hidden">
      <ImageUp color={theme === "light" ? "black" : "white"} size={38} />
      <input
        type="file"
        accept="image/*"
        className="absolute opacity-0 cursor-pointer"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            console.log("File selected:", file.name);
            setImage(file);
            getBase64(file);
          }
        }}
      />
    </button>
  );
};

export default UploadFile;
