import React from "react";
import NewChatbutton from "./newchatbutton";

const Chatlist = () => {
  return (
    <aside className="flex flex-col gap-2 p-4 bg-gray-100 h-screen w-1/6 border-r border-gray-300">
      <NewChatbutton />
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Chat List</h2>
        <ul className="flex flex-col gap-2">
          <li className="p-2 bg-gray-200 rounded-md">Chat 1</li>
          <li className="p-2 bg-gray-200 rounded-md">Chat 2</li>
          <li className="p-2 bg-gray-200 rounded-md">Chat 3</li>
        </ul>
      </div>
    </aside>
  );
};

export default Chatlist;
