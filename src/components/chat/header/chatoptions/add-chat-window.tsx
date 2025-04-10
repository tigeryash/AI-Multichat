"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AddChatWindow = () => {
  const handleAddChatWindow = () => {};
  return (
    <div>
      <Button onClick={handleAddChatWindow} variant={"outline"}>
        <Plus />
      </Button>
    </div>
  );
};

export default AddChatWindow;
