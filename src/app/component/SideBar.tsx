import { PlusIcon, PanelLeft } from 'lucide-react';

type Chat = {
  id: number;
  title: string;
};

type SideBar = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  activeChat: number | null;
  setActiveChat: (chatId: number) => void;
};

export const SideBar = ({
  sidebarOpen,
  setSidebarOpen,
  chats,
  setChats,
  activeChat,
  setActiveChat,
}: SideBar) => {
  return (
    <div
      className={`fixed md:relative z-20 h-full bg-sidebar ${
        sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full'
      } transform transition-transform duration-600 ease-in-out`}
    >
      <div className='p-4 h-full flex flex-col'>
        <div className='pb-4'>
          <PanelLeft
            className='w-7 h-7 cursor-pointer'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>

        <button
          onClick={() =>
            setChats([...chats, { id: Date.now(), title: 'New Chat' }])
          }
          className='flex items-center gap-2 p-2 border rounded mb-4 cursor-pointer overflow-y-auto'
        >
          <PlusIcon className='w-5 h-5' />
          New Chat
        </button>

        <div className='flex-1 overflow-y-auto'>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-2 rounded-xl mb-1 truncate ${
                activeChat === chat.id
                  ? 'bg-chat-box font-medium'
                  : 'sidebar-chat-title'
              }`}
              onClick={() => setActiveChat(chat.id)}
            >
              {chat.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
