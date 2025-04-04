import React from "react";
import SyncChatButton from "./chatoptions/syncchatbutton";
import ConfigureModel from "./chatoptions/configuremodel";
import AddChatWindow from "./chatoptions/addchatwindow";
import ChatPlacement from "./chatoptions/chatplacement";

const ChatOptions = () => {
  return (
    <div className="flex items-center gap-2">
      <SyncChatButton />
      <ConfigureModel />
      <AddChatWindow />
      <ChatPlacement />
    </div>
  );
};

export default ChatOptions;
