import { ArrowUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { calculateWidth } from '../utility/calculateWidth';

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

export const ConversationPage = ({
  messages,
  handleSubmit,
  input,
  setInput,
}: ConversationPage) => {
  return (
    <div className='flex flex-col flex-1 h-screen max-w-2xl mx-auto p-4'>
      <div className='flex-1 overflow-y-auto mb-4 space-y-3'>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              width:
                msg.role === 'user' ? `${calculateWidth(msg.content)}px` : '',
            }}
            className={` ${
              msg.role === 'user'
                ? 'bg-gray-600 text-white ml-auto rounded-2xl max-w-[70%] bg-user px-5 py-2.5 mr-2'
                : 'text-white mr-auto ml-2'
            }`}
          >
            <div className='prose'>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center p-4 text-3xl font-bold'>
        What can I help with?
      </div>
      <div className='bg-chat-box flex-col p-4 rounded-3xl'>
        <form onSubmit={handleSubmit} className='flex gap-2'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='flex-1 p-2 outline-none'
            placeholder='Ask anything'
          />
          <button
            type='submit'
            className='bg-white text-black p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer'
          >
            <ArrowUp className='w-5 h-5' strokeWidth={2.5} />
          </button>
        </form>
      </div>
      <div className='flex items-center justify-center text-sm pt-4'>
        ChatGPT can make mistakes. Check important info.
      </div>
    </div>
  );
};
