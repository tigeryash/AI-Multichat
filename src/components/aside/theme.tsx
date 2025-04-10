"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

const Theme = () => {
  const { setTheme, theme } = useTheme();

  console.log("theme", theme);
  return (
    <div className="flex items-center p-1 space-x-1 rounded-lg bg-gray-100 dark:bg-transparent border border-gray-300 mx-auto mt-auto my-4">
      <Button
        variant={"themeIcon"}
        onClick={() => setTheme("light")}
        className={theme === "light" ? "bg-gray-200 " : ""}
      >
        <Sun size={24} />
      </Button>
      <Button
        variant={"themeIcon"}
        onClick={() => setTheme("system")}
        className={
          theme === "system"
            ? "bg-gray-200 dark:bg-gray-200 dark:text-black"
            : ""
        }
      >
        <Monitor size={24} />
      </Button>
      <Button
        variant={"themeIcon"}
        onClick={() => setTheme("dark")}
        className={theme === "dark" ? "dark:bg-gray-200 dark:text-black" : ""}
      >
        <Moon size={24} />
      </Button>
    </div>
  );
};

export default Theme;
