import { useState, useEffect, useRef } from "react";

const useClickOutside = () => {
  const [showOptions, setShowOptions] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [showOptions, setShowOptions]);
  return {
    menuRef,
    showOptions,
    setShowOptions,
  };
};

export default useClickOutside;
