"use client";

import { useState } from "react";
import PromptInput from "./promptinput";
import UploadFile from "./uploadfile";
import ImagePreview from "./image-preview";

const InputContainer = () => {
  const [image, setImage] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | ArrayBuffer | null>(
    null
  );
  const [convertingImage, setConvertingImage] = useState(false);

  const getBase64 = (file: File) => {
    setConvertingImage(true);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log("called: ", reader);
      setBase64Image(reader.result);
      setConvertingImage(false);
    };
  };

  const resetFileInput = () => {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    setBase64Image(null);
  };
  return (
    <div className="flex flex-col p-4 border-t-1 cborder-gray dark:bg-black bg-white space-y-2 ">
      <ImagePreview
        image={image}
        setImage={setImage}
        convertingImage={convertingImage}
        resetFileInput={resetFileInput}
      />
      <div className="flex items-center space-x-4">
        <UploadFile setImage={setImage} getBase64={getBase64} />
        <PromptInput />
        <button className="bg-blue-500 text-white rounded-lg p-2">Send</button>
      </div>
    </div>
  );
};

export default InputContainer;
