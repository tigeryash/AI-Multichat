import { ToggleLeft } from "lucide-react";
import { ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SyncChatButton = () => {
  return (
    <div className="flex items-center gap-2">
      <p className="rounded-lg py-1 px-2 bg-gray-200">Synced</p>
      <Button>
        {Math.random() * 10 > 1 ? <ToggleRight /> : <ToggleLeft />}
      </Button>
    </div>
  );
};

export default SyncChatButton;
