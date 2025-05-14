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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="flex h-screen relative">
      <SideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        chats={chats}
        setChats={setChats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />

      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="hover-class absolute top-3 left-2 z-30 text-white p-2 rounded-full shadow-md bg-hovergrey transition cursor-pointer"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
      )}

      <div className="flex-1 transition-all duration-500 ease-in-out">
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
