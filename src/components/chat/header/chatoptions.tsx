import SyncChatButton from "./chatoptions/sync-chat-button";
import ConfigureModel from "./chatoptions/configure-model";
import AddChatWindow from "./chatoptions/add-chat-window";
import ChatPlacement from "./chatoptions/chat-placement";

const ChatOptions = () => {
  return (
    <div className="flex items-center gap-2">
      <SyncChatButton />
      <ConfigureModel />
      <AddChatWindow />
      <ChatPlacement />
    </div>
  );
};

export default ChatOptions;
