"use client";

import { ToggleLeft } from "lucide-react";
import { ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SyncChatButton = () => {
  const [isSynced, setIsSynced] = useState(false);
  return (
    <div className="flex items-center gap-2">
      {isSynced && (
        <p className="rounded-lg py-1 px-2 bg-gray-200 text-green-700">
          Synced
        </p>
      )}
      <Button onClick={() => setIsSynced(!isSynced)} variant="outline">
        {isSynced ? <ToggleRight color="green" /> : <ToggleLeft color="red" />}
      </Button>
    </div>
  );
};

export default SyncChatButton;
