import { ConversationPage } from '../component/ConversationPage';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('react-markdown', () => {
  return ({ children }: any) => <div>{children}</div>;
});

describe('CoversationPage', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Should display "What can I help with?" when no messages exist', () => {
    render(
      <ConversationPage messages={[]} handleSubmit={jest.fn()} input="" setInput={jest.fn()} />
    );

    expect(screen.queryByText('What can I help with?')).toBeInTheDocument();
  });

  it('Should render all messages with correct role-based alignment and styling', () => {
    const msg = [
      { role: 'user', content: 'How are you today' },
      { role: 'assistant', content: 'I am good. Thank You. How are you?' },
    ];
    render(
      <ConversationPage messages={msg} handleSubmit={jest.fn()} input="" setInput={jest.fn()} />
    );

    expect(screen.getByTestId('msg-user')).toHaveClass('bg-user');
    expect(screen.getByTestId('msg-assistant')).toHaveClass('text-white');
  });
});
