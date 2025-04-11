import React from "react";
import AISelelectMenu from "./aiselelectmenu";
import ChatOptions from "./chatoptions";

const Chatheader = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b-1 cborder-gray dark:bg-black bg-white ">
      <AISelelectMenu />
      <ChatOptions />
    </div>
  );
};

export default Chatheader;
