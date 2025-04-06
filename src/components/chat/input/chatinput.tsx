"use client";

import { useState } from "react";
import PromptInput from "./promptinput";
import UploadFile from "./uploadfile";

const ChatInput = () => {
  const [image, setImage] = useState<File | null>(null);
  return (
    <div className="flex items-center p-4 border-t-2 border-gray-300 bg-white space-x-4  ">
      {image && (
        <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <UploadFile setImage={setImage} />
      <PromptInput />
      <button className="bg-blue-500 text-white rounded-lg p-2">Send</button>
    </div>
  );
};

export default ChatInput;
