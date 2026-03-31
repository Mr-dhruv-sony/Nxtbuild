import { useState } from 'react';

function ChatInput({ onSend, loading, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim() || loading || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe what you want to build..."
        disabled={disabled}
        rows={2}
      />
      <button
        className="chat-send-btn"
        onClick={handleSubmit}
        disabled={!input.trim() || loading || disabled}
      >
        {loading ? 'Generating...' : 'Send'}
      </button>
    </div>
  );
}

export default ChatInput;