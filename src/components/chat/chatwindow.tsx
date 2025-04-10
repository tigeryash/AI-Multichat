import Chatheader from "./header/chatheader";
import Chatbody from "./body/chatbody";
import InputContainer from "./input/input-container";

const ChatWindow = () => {
  return (
    <div className="cborder rounded-lg shadow-lg flex flex-col h-full w-full bg-white overflow-hidden">
      <Chatheader />
      <Chatbody />
      <InputContainer />
    </div>
  );
};

export default ChatWindow;
