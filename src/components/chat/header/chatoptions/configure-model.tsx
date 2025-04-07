"use client";
import { Button } from "@/components/ui/button";
import useClickOutside from "@/hooks/useClickOutside";
import { Settings2 } from "lucide-react";

const configurations = [
  {
    title: "Max Output Tokens",
    titleInfo:
      "The maximum number of tokens to generate in the chat completion.",
    outputTokenVal: 1000,
    outputTokenMin: 0,
    outputTokenMax: 4096,
  },
  {
    title: "Temperature",
    titleInfo:
      "Controls the randomness of the model's output. Lower values make the output more focused and deterministic, while higher values make it more random.",
    temperatureVal: 0.7,
    temperatureMin: 0,
    temperatureMax: 1,
  },
  {
    title: "Top P",
    titleInfo:
      "The cumulative probability of the most likely tokens. Lower values make the output more focused and deterministic, while higher values make it more random.",
    topPVal: 1,
    topPMin: 0,
    topPMax: 1,
  },
];

const ConfigureModel = () => {
  const { menuRef, showOptions, setShowOptions } = useClickOutside();
  return (
    <div ref={menuRef} className="relative  gap-2">
      <Button variant={"outline"} onClick={() => setShowOptions(!showOptions)}>
        <Settings2 />
      </Button>

      {showOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
          <div className="py-1">
            {configurations.map((config) => (
              <div key={config.title} className="px-4 py-2 text-sm w-full">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-200">
                    {config.title}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    {config.titleInfo}
                  </span>
                </div>
                <input
                  type="number"
                  defaultValue={config.outputTokenVal}
                  min={config.outputTokenMin}
                  max={config.outputTokenMax}
                  className="mt-1 w-full p-1 border border-gray-300 rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigureModel;
