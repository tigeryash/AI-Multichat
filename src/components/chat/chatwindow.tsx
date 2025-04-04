import React from "react";
import Chatheader from "./chatheader/chatheader";
import Chatbody from "./chatbody";
import Chatinput from "./chatinput";

const ChatWindow = () => {
  return (
    <div>
      <Chatheader />
      <Chatbody />
      <Chatinput />
    </div>
  );
};

export default ChatWindow;
