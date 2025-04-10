import React from "react";
import NewChatbutton from "./new-chat-button";
import Theme from "./theme";

const Chatlist = () => {
  return (
    <aside className="flex flex-col gap-2 relative bg-gray-100 dark:bg-gray-800 h-screen w-1/6 border-r border-gray-300">
      <NewChatbutton />
      <h2 className="text-lg font-semibold">Chat List</h2>
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-thin scrollbar-track-gray-100 gap-2 ">
        <ul className="flex flex-col gap-2 p-2 ">
          <li className="p-2 bg-gray-200 dark:bg-black rounded-md">Chat 1</li>
        </ul>
      </div>
      <Theme />
    </aside>
  );
};

export default Chatlist;
