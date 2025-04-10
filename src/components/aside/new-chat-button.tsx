import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const NewChatbutton = () => {
  return (
    <Button className="m-4">
      <Plus />
      New chat
    </Button>
  );
};

export default NewChatbutton;
