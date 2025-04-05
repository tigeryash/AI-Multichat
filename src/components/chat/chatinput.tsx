import React from "react";

const Chatinput = () => {
  return (
    <div className="flex items-center p-4 border-t-2 border-gray-300 bg-white">
      <input
        type="text"
        placeholder="Type your message here..."
        className="border-2 border-gray-300 rounded-lg p-2 w-full"
      />
      <button className="bg-blue-500 text-white rounded-lg p-2 ml-2">
        Send
      </button>
    </div>
  );
};

export default Chatinput;
