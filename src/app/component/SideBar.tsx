'use client';
import { PanelLeft } from 'lucide-react';

type chat = {
  id: number;
  title: string;
};

type SideBarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  chats: chat[];
  setChats: React.Dispatch<React.SetStateAction<chat[]>>;
  activeChat: number | null;
  setActiveChat: (id: number | null) => void;
};

export const SideBar = ({
  sidebarOpen,
  setSidebarOpen,
  chats,
  setChats,
  activeChat,
  setActiveChat,
}: SideBarProps) => {
  return (
    <div
      className={`bg-sidebar text-white h-full transition-all duration-500 ease-in-out ${
        sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}
    >
      <div className='flex items-center justify-between p-4 border-b border-gray-700'>
        <button
          onClick={() => setSidebarOpen(false)}
          className='text-white cursor-pointer'
        >
          <PanelLeft className='w-5 h-5' />
        </button>
        {sidebarOpen && <span className='text-lg font-semibold'>ChatGPT</span>}
      </div>

      {sidebarOpen && (
        <div className='p-4 space-y-4'>
          <button
            onClick={() => {
              const newChat = {
                id: chats.length + 1,
                title: `New Chat ${chats.length + 1}`,
              };
              setChats((prev) => [...prev, newChat]);
              setActiveChat(newChat.id);
            }}
            className='w-full sidebar-chat-title p-2 rounded'
          >
            + New Chat
          </button>

          <div className='space-y-2'>
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-2 rounded cursor-pointer ${
                  activeChat === chat.id
                    ? 'sidebar-chat-title'
                    : 'hover:bg-hovergrey'
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                {chat.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
