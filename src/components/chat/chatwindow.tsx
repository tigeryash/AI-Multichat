import React from "react";
import Chatheader from "./header/chatheader";
import Chatbody from "./body/chatbody";
import Chatinput from "./input/chatinput";

const ChatWindow = () => {
  return (
    <div className="border-2 border-gray-300 rounded-lg shadow-lg flex flex-col h-full w-full bg-white overflow-hidden">
      <Chatheader />
      <Chatbody />
      <Chatinput />
    </div>
  );
};

export default ChatWindow;
