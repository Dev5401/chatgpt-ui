// import { PlusIcon, PanelLeft } from 'lucide-react';

// type Chat = {
//   id: number;
//   title: string;
// };

// type SideBar = {
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
//   chats: Chat[];
//   setChats: (chats: Chat[]) => void;
//   activeChat: number | null;
//   setActiveChat: (chatId: number) => void;
// };

// export const SideBar = ({
//   sidebarOpen,
//   setSidebarOpen,
//   chats,
//   setChats,
//   activeChat,
//   setActiveChat,
// }: SideBar) => {
//   return (
//     <div
//       className={`fixed md:relative z-20 h-full bg-sidebar ${
//         sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full'
//       } transform transition-transform duration-600 ease-in-out`}
//     >
//       <div className='p-4 h-full flex flex-col'>
//         <div className='pb-4'>
//           <PanelLeft
//             className='w-7 h-7 cursor-pointer'
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           />
//         </div>

//         <button
//           onClick={() =>
//             setChats([...chats, { id: Date.now(), title: 'New Chat' }])
//           }
//           className='flex items-center gap-2 p-2 border rounded mb-4 cursor-pointer overflow-y-auto'
//         >
//           <PlusIcon className='w-5 h-5' />
//           New Chat
//         </button>

//         <div className='flex-1 overflow-y-auto'>
//           {chats.map((chat) => (
//             <div
//               key={chat.id}
//               className={`p-2 rounded-xl mb-1 truncate ${
//                 activeChat === chat.id
//                   ? 'bg-chat-box font-medium'
//                   : 'sidebar-chat-title'
//               }`}
//               onClick={() => setActiveChat(chat.id)}
//             >
//               {chat.title}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
'use client';

import { PanelLeft } from 'lucide-react';

type SideBarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  chats: { id: number; title: string }[];
  setChats: React.Dispatch<React.SetStateAction<{ id: number; title: string }[]>>;
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
      {/* Top bar with toggle icon */}
      <div className='flex items-center justify-between p-4 border-b border-gray-700'>
        <button
          onClick={() => setSidebarOpen(false)}
          className='text-white hover:text-gray-400'
        >
          <PanelLeft className='w-5 h-5' />
        </button>
        {sidebarOpen && <span className='text-lg font-semibold'>ChatGPT</span>}
      </div>

      {/* Sidebar content */}
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
            className='w-full bg-gray-700 hover:bg-gray-600 p-2 rounded'
          >
            + New Chat
          </button>

          <div className='space-y-2'>
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-2 rounded cursor-pointer ${
                  activeChat === chat.id
                    ? 'bg-gray-600'
                    : 'hover:bg-gray-700'
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
