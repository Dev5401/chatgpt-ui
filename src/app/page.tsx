// // 'use client';
// // import { useState } from 'react';
// // import { PanelLeft } from 'lucide-react';
// // import { SideBar } from './component/SideBar';
// // import { ConversationPage } from './component/ConversationPage';

// // interface message {
// //   role: 'user' | 'assistant';
// //   content: string;
// // }

// // export default function Chat() {
// //   const [messages, setMessages] = useState<message[]>([]);
// //   const [input, setInput] = useState('');
// //   const [chats, setChats] = useState([
// //     { id: 1, title: 'Explain quantum computing' },
// //     { id: 2, title: 'How to make a cake' },
// //   ]);
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const [activeChat, setActiveChat] = useState<number | null>(null);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!input.trim()) return;

// //     const userMessage = { role: 'user' as const, content: input };
// //     setMessages((prev) => [...prev, userMessage]);
// //     setInput('');

// //     setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

// //     const res = await fetch('/api/chat', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({
// //         messages: [...messages, userMessage],
// //       }),
// //     });

// //     const reader = res.body?.getReader();
// //     const decoder = new TextDecoder();
// //     let aiMessage = '';

// //     while (reader) {
// //       const { done, value } = await reader.read();
// //       if (done) break;

// //       const chunk = decoder.decode(value);
// //       aiMessage += chunk;

// //       setMessages((prev) => {
// //         const newMessages = [...prev];
// //         newMessages[newMessages.length - 1].content = aiMessage;
// //         return newMessages;
// //       });
// //     }
// //   };

// //   return (
// //     <div className='flex h-screen'>
// //       {sidebarOpen ? (
// //         <SideBar
// //           sidebarOpen={sidebarOpen}
// //           setSidebarOpen={setSidebarOpen}
// //           chats={chats}
// //           setChats={setChats}
// //           activeChat={activeChat}
// //           setActiveChat={setActiveChat}
// //         />
// //       ) : (
// //         <div className='p-4'>
// //           <PanelLeft
// //             className='w-7 h-7 cursor-pointer'
// //             onClick={() => setSidebarOpen(!sidebarOpen)}
// //           />
// //         </div>
// //       )}

// //       <ConversationPage
// //         messages={messages}
// //         handleSubmit={handleSubmit}
// //         input={input}
// //         setInput={setInput}
// //       />
// //     </div>
// //   );
// // }

// // {
// //   /* <img width="50" height="50" src="https://img.icons8.com/ios/50/chatgpt.png" alt="chatgpt"/> */
// // }

// // // useMemo is used to memoize a value based on dependencies.
// // // The function passed to useMemo should not take any arguments because React will call it internally without arguments.
// // // You don't need useMemo here because calculateWidth is a simple utility function that doesn't depend on React state or props.
// // // You can define it as a regular function instead.


// 'use client';
// import { useState } from 'react';
// import { PanelLeft } from 'lucide-react';
// import { SideBar } from './component/SideBar';
// import { ConversationPage } from './component/ConversationPage';

// interface message {
//   role: 'user' | 'assistant';
//   content: string;
// }

// export default function Chat() {
//   const [messages, setMessages] = useState<message[]>([]);
//   const [input, setInput] = useState('');
//   const [chats, setChats] = useState([
//     { id: 1, title: 'Explain quantum computing' },
//     { id: 2, title: 'How to make a cake' },
//   ]);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [activeChat, setActiveChat] = useState<number | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { role: 'user' as const, content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');

//     setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

//     const res = await fetch('/api/chat', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         messages: [...messages, userMessage],
//       }),
//     });

//     const reader = res.body?.getReader();
//     const decoder = new TextDecoder();
//     let aiMessage = '';

//     while (reader) {
//       const { done, value } = await reader.read();
//       if (done) break;

//       const chunk = decoder.decode(value);
//       aiMessage += chunk;

//       setMessages((prev) => {
//         const newMessages = [...prev];
//         newMessages[newMessages.length - 1].content = aiMessage;
//         return newMessages;
//       });
//     }
//   };

//   return (
//     <div className='flex h-screen'>
//       {/* Sidebar and Content */}
//       <div className='flex h-full transition-all duration-500 ease-in-out'>
//         {/* Sidebar */}
//         <SideBar
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//           chats={chats}
//           setChats={setChats}
//           activeChat={activeChat}
//           setActiveChat={setActiveChat}
//         />

//         {/* Main content, adjust margin when sidebar is open */}
//         <div
//           className={`flex-1 transition-all duration-500 ease-in-out ${
//             sidebarOpen ? 'ml-64' : 'ml-0'
//           }`}
//         >
//           <div className='h-full flex flex-col'>
//             {/* Icon to toggle sidebar */}
//             <div className='p-4'>
//               <PanelLeft
//                 className='w-7 h-7 cursor-pointer'
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//               />
//             </div>

//             {/* Conversation Content */}
//             <ConversationPage
//               messages={messages}
//               handleSubmit={handleSubmit}
//               input={input}
//               setInput={setInput}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { PanelLeft } from 'lucide-react';
import { SideBar } from './component/SideBar';
import { ConversationPage } from './component/ConversationPage';

interface message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<message[]>([]);
  const [input, setInput] = useState('');
  const [chats, setChats] = useState([
    { id: 1, title: 'Explain quantum computing' },
    { id: 2, title: 'How to make a cake' },
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...messages, userMessage],
      }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let aiMessage = '';

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      aiMessage += chunk;

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = aiMessage;
        return newMessages;
      });
    }
  };

  return (
    <div className='flex h-screen relative'>
      {/* Sidebar */}
      <SideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        chats={chats}
        setChats={setChats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />

      {/* Floating toggle button to reopen sidebar */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className='absolute top-4 left-4 z-30 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition'
        >
          <PanelLeft className='w-5 h-5' />
        </button>
      )}

      {/* Conversation */}
      <div className='flex-1 transition-all duration-500 ease-in-out'>
        <ConversationPage
          messages={messages}
          handleSubmit={handleSubmit}
          input={input}
          setInput={setInput}
        />
      </div>
    </div>
  );
}
