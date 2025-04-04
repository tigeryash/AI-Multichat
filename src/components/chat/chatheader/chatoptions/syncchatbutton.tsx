import { ToggleLeft } from "lucide-react";
import { ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SyncChatButton = () => {
  return (
    <div className="flex items-center gap-2">
      <p className="rounded-lg bg-gray-200">Synced</p>
      <Button>
        <ToggleRight />
      </Button>
    </div>
  );
};

export default SyncChatButton;
