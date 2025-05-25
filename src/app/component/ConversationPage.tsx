import { ArrowUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type msg = {
  role: string;
  content: string;
};

type ConversationPage = {
  messages: msg[];
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  input: string;
  setInput: (input: string) => void;
};

export const ConversationPage = ({ messages, handleSubmit, input, setInput }: ConversationPage) => {
  const isEmpty = messages.length === 0;

  return (
    <div
      className={`flex flex-col p-4 transition-all duration-300 ${
        isEmpty
          ? 'justify-center items-center h-screen input-box-center'
          : 'h-screen max-w-2xl mx-auto input-box-bottom'
      }`}
      data-testid={isEmpty ? 'input-box-center' : 'input-box-bottom'}
    >
      {!isEmpty && (
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 w-full">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`w-full flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`inline-block rounded-2xl px-5 py-2.5 break-words whitespace-pre-wrap ${
                  msg.role === 'user' ? 'bg-user' : 'text-white'
                }`}
                style={{ maxWidth: '80%' }}
                data-testid={`msg-${msg.role}`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center p-4 text-3xl font-bold">
        What can I help with?
      </div>

      <div className="bg-chat-box p-4 rounded-3xl w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="flex gap-2" data-testid="conversation-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 outline-none"
            placeholder="Ask anything"
            data-testid="user-input"
          />
          <button
            type="submit"
            className="bg-white text-black p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </form>
      </div>

      {!isEmpty && (
        <div className="flex items-center justify-center text-sm pt-4">
          ChatGPT can make mistakes. Check important info.
        </div>
      )}
    </div>
  );
};
