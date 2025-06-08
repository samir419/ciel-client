import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

function Chat() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    fetch(`${apiUrl}/chat/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.messages);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const sendMessage = () => {
    const sender = localStorage.getItem('user_id');
    if (!message.trim()) return;

    fetch(`${apiUrl}/chat-message/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender, content: message }),
    })
      .then((response) => response.json())
      .then(() => {
        setMessages([...messages, { sender: { name: 'You' }, content: message }]);
        setMessage('');
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>Chat Room</h2>
        <p className="chat-link">Invite Link: <span>{`http://localhost:3000/join_chat/${id}`}</span></p>
      </header>

      <div className="chat-messages">
        {messages.map((post, index) => (
          <div key={index} className={`chat-bubble ${post.sender?.name === 'You' ? 'self' : ''}`}>
            <strong>{post.sender?.name}:</strong> {post.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
