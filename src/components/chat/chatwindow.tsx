import React from "react";
import Chatheader from "./chatheader/chatheader";
import Chatbody from "./chatbody";
import Chatinput from "./chatinput";

const ChatWindow = () => {
  return (
    <div className="border-2 border-gray-300 rounded-lg shadow-lg flex flex-col h-full w-full bg-white">
      <Chatheader />
      <Chatbody />
      <Chatinput />
    </div>
  );
};

export default ChatWindow;
