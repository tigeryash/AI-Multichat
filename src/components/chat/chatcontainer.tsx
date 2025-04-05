import React from "react";
import ChatWindow from "./chatwindow";

const ChatContainer = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 p-4 ">
      <ChatWindow />
    </div>
  );
};

export default ChatContainer;
