"use client";

import { useRef, useEffect } from "react";

const PromptInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "0px";
    const newHeight = Math.min(textarea.scrollHeight, 150); // 288px = 72 * 4 (approx max-h-72)
    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("input", adjustHeight);
      // Set initial height
      adjustHeight();
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("input", adjustHeight);
      }
    };
  }, []);
  return (
    <textarea
      ref={textareaRef}
      rows={1}
      placeholder="Type your message here..."
      className="rounded-lg p-2 w-full  focus:outline-none
   focus:ring-1 focus:ring-gray-500/65 overflow-y-auto resize-none max-h-[150px] box-border "
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          // Handle send message logic here
          console.log("Message sent:", e.currentTarget.value);
        }
      }}
    />
  );
};

export default PromptInput;
