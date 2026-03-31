function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const minutesStr = minutes < 10 ? '0' + minutes : '' + minutes;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutesStr} ${ampm}`;
  };

  return (
    <div className={`chat-message ${isUser ? 'chat-message-user' : 'chat-message-ai'}`}>
      <div className="chat-bubble">
        <p>{message.content}</p>
        <span className="chat-time">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
}

export default ChatMessage;