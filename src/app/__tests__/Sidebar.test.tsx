import { SideBar } from '../component/SideBar';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chat } from '../component/SideBar';

describe('Sidebar', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Should render nothing when sidebarOpen is false', () => {
    render(
      <SideBar
        sidebarOpen={false}
        setSidebarOpen={jest.fn()}
        chats={[]}
        setChats={jest.fn()}
        activeChat={null}
        setActiveChat={jest.fn()}
      />
    );

    expect(screen.queryByText('ChatGPT')).not.toBeInTheDocument();
  });

  it('Should render header and "ChatGPT" title when sidebarOpen is true', () => {
    render(
      <SideBar
        sidebarOpen={true}
        setSidebarOpen={jest.fn()}
        chats={[]}
        setChats={jest.fn()}
        activeChat={null}
        setActiveChat={jest.fn()}
      />
    );

    expect(screen.queryByText('ChatGPT')).toBeInTheDocument();
    expect(screen.queryByText('+ New Chat')).toBeInTheDocument();
  });

  it('Should trigger setSidebarOpen(false) when close (PanelLeft) button is clicked', () => {
    const mockSetSidebarOpen = jest.fn();

    render(
      <SideBar
        sidebarOpen={true}
        setSidebarOpen={mockSetSidebarOpen}
        chats={[]}
        setChats={jest.fn()}
        activeChat={null}
        setActiveChat={jest.fn()}
      />
    );

    const closeButton = screen.getByTestId('sidebar-close-button');
    fireEvent.click(closeButton);

    expect(mockSetSidebarOpen).toHaveBeenCalledWith(false);
  });

  it('Should render existing chats from the chats prop', () => {
    const chats = [
      { id: 1, title: 'Explain quantum computing' },
      { id: 2, title: 'How to make a cake' },
    ];

    render(
      <SideBar
        sidebarOpen={true}
        setSidebarOpen={jest.fn()}
        chats={chats}
        setChats={jest.fn()}
        activeChat={null}
        setActiveChat={jest.fn()}
      />
    );

    expect(screen.getByText('Explain quantum computing')).toBeInTheDocument();
    expect(screen.getByText('How to make a cake')).toBeInTheDocument();
  });

  it('Should call setActiveChat(chat.id) when a chat is clicked', () => {
    const mockSetActiveChat = jest.fn();

    const chats = [
      { id: 1, title: 'Explain quantum computing' },
      { id: 2, title: 'How to make a cake' },
    ];

    render(
      <SideBar
        sidebarOpen={true}
        setSidebarOpen={jest.fn()}
        chats={chats}
        setChats={jest.fn()}
        activeChat={null}
        setActiveChat={mockSetActiveChat}
      />
    );

    const firstChatItem = screen.getByTestId('chat-item-1');
    fireEvent.click(firstChatItem);

    expect(mockSetActiveChat).toHaveBeenCalledWith(1);

    const secondChatItem = screen.getByTestId('chat-item-2');
    fireEvent.click(secondChatItem);

    expect(mockSetActiveChat).toHaveBeenCalledWith(2);
  });

  it('Should add a new chat and set it as active when "+ New Chat" is clicked', () => {
    const mockSetChats = jest.fn();
    const mockSetActiveChat = jest.fn();

    render(
      <SideBar
        sidebarOpen={true}
        setSidebarOpen={jest.fn()}
        chats={[]}
        setChats={mockSetChats}
        activeChat={null}
        setActiveChat={mockSetActiveChat}
      />
    );

    const newChatButton = screen.getByText('+ New Chat');
    fireEvent.click(newChatButton);

    expect(mockSetChats).toHaveBeenCalledWith(expect.any(Function));

    const fakePrevChats: Chat[] = [];
    const updaterFn = mockSetChats.mock.calls[0][0];
    const newChatList = updaterFn(fakePrevChats);

    expect(newChatList).toEqual([{ id: 1, title: 'New Chat 1' }]);

    expect(mockSetActiveChat).toHaveBeenCalledWith(1);
  });

  it('Should apply correct CSS class to active chat', () => {
    const chats = [
      { id: 1, title: 'Explain quantum computing' },
      { id: 2, title: 'How to make a cake' },
    ];

    render(
      <SideBar
        sidebarOpen={true}
        setSidebarOpen={jest.fn()}
        chats={chats}
        setChats={jest.fn()}
        activeChat={2}
        setActiveChat={jest.fn()}
      />
    );

    const activeChatElement = screen.getByText('How to make a cake');

    expect(activeChatElement.className).toContain('sidebar-chat-title');

    const inactiveChatElement = screen.getByText('Explain quantum computing');
    expect(inactiveChatElement.className).not.toContain('sidebar-chat-title');
  });
});
