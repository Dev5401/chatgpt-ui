import { ConversationPage } from '../component/ConversationPage';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

jest.mock('react-markdown', () => {
  const MockReactMarkdown = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  MockReactMarkdown.displayName = 'MockReactMarkdown';
  return MockReactMarkdown;
});

describe('CoversationPage', () => {
  beforeEach(() => jest.clearAllMocks());

  const msg = [
    { role: 'user', content: 'How are you today' },
    { role: 'assistant', content: 'I am good. Thank You. How are you?' },
  ];

  it('Should display "What can I help with?" when no messages exist', () => {
    render(
      <ConversationPage messages={[]} handleSubmit={jest.fn()} input="" setInput={jest.fn()} />
    );

    expect(screen.queryByText('What can I help with?')).toBeInTheDocument();
  });

  it('Should render all messages with correct role-based alignment and styling', () => {
    render(
      <ConversationPage messages={msg} handleSubmit={jest.fn()} input="" setInput={jest.fn()} />
    );

    expect(screen.getByTestId('msg-user')).toHaveClass('bg-user');
    expect(screen.getByTestId('msg-assistant')).toHaveClass('text-white');
  });

  it('Should update input field as the user types', () => {
    const mockSetInput = jest.fn();

    render(
      <ConversationPage messages={[]} handleSubmit={jest.fn()} input="" setInput={mockSetInput} />
    );

    const inputBox = screen.getByTestId('user-input');
    fireEvent.change(inputBox, { target: { value: 'Hello AI' } });

    expect(mockSetInput).toHaveBeenCalledWith('Hello AI');
  });

  it('Should call handleSubmit when form is submitted', () => {
    const mockHandleSubmit = jest.fn((e) => e.preventDefault());

    render(
      <ConversationPage
        messages={[]}
        handleSubmit={mockHandleSubmit}
        input=""
        setInput={jest.fn()}
      />
    );

    const form = screen.getByTestId('conversation-form');

    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it('Should show footer note ("ChatGPT can make mistakes...") only when messages exist', () => {
    render(
      <ConversationPage messages={msg} handleSubmit={jest.fn()} input="" setInput={jest.fn()} />
    );

    expect(
      screen.queryByText('ChatGPT can make mistakes. Check important info.')
    ).toBeInTheDocument();

    cleanup();

    render(
      <ConversationPage messages={[]} handleSubmit={jest.fn()} input="" setInput={jest.fn()} />
    );

    expect(
      screen.queryByText('ChatGPT can make mistakes. Check important info.')
    ).not.toBeInTheDocument();
  });

  it.skip('Should render markdown content inside message bubbles', () => {
    const msg = [{ role: 'assistant', content: 'Here is **bold** text and `inline code`.' }];

    render(
      <ConversationPage messages={msg} handleSubmit={jest.fn()} input="" setInput={jest.fn()} />
    );

    const boldElement = screen.getByText('bold');
    expect(boldElement.tagName.toLowerCase()).toBe('strong');

    const codeElement = screen.getByText('inline code');
    expect(codeElement.tagName.toLowerCase()).toBe('code');
  });

  it('Layout should adapt between center-aligned (empty) and scrollable message list (non-empty)', () => {
    render(
      <ConversationPage messages={msg} handleSubmit={jest.fn()} input="" setInput={jest.fn()} />
    );

    expect(screen.getByTestId('input-box-bottom')).toHaveClass('input-box-bottom');

    cleanup();

    render(
      <ConversationPage messages={[]} handleSubmit={jest.fn()} input="" setInput={jest.fn()} />
    );

    expect(screen.getByTestId('input-box-center')).toHaveClass('input-box-center');
  });
});
