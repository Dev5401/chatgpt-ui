import { ConversationPage } from '../component/ConversationPage';
import { render, screen, fireEvent } from '@testing-library/react';

describe('CoversationPage', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Should display "What can I help with?" when no messages exist', () => {
    render(
      <ConversationPage messages={[]} handleSubmit={jest.fn()} input="" setInput={jest.fn()} />
    );

    expect(screen.queryByText('What can I help with?')).toBeInTheDocument();
  });
});
