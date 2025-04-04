import React from "react";
import AISelelectMenu from "./aiselelectmenu";
import ChatOptions from "./chatoptions";

const Chatheader = () => {
  return (
    <div className="flex items-center justify-between p-4  ">
      <AISelelectMenu />
      <ChatOptions />
    </div>
  );
};

export default Chatheader;
