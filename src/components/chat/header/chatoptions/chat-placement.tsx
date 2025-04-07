"use client";

import {
  ArrowLeft,
  ArrowRight,
  Ellipsis,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useClickOutside from "@/hooks/useClickOutside";

const ChatPlacement = () => {
  const { menuRef, showOptions, setShowOptions } = useClickOutside();
  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <Button onClick={() => setShowOptions((prev) => !prev)} variant="outline">
        <Ellipsis />
      </Button>

      {showOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
          <div className="py-1">
            <button className="px-4 py-2 text-sm w-full flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <RotateCcw />
              <span>Clear Chat</span>
            </button>
            <button className="px-4 py-2 text-sm w-full flex items-center justify-end space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <span>Move Right</span>
              <ArrowRight />
            </button>
            <button className="px-4 py-2 text-sm w-full flex items-center justify-start space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <ArrowLeft /> <span>Move Left</span>
            </button>
          </div>
          <button className="px-4 py-2 text-sm w-full flex text-red-600 items-center justify-center space-x-2 border-t-2  dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-300 cursor-pointer">
            <Trash2 /> <span>Delete Chat</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatPlacement;
