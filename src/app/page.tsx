import Chatlist from "@/components/aside/chat-list";
import ChatContainer from "@/components/chat/chatcontainer";

export default function Home() {
  return (
    <div
      className="flex items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]
     bg-gray-400 dark:bg-gray-900"
    >
      <Chatlist />
      <main className="flex flex-col items-center justify-center w-full h-screen bg-gray-200 dark:bg-gray-900">
        <ChatContainer />
      </main>
    </div>
  );
}
