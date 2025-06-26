import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const chatEndRef = useRef(null); // for auto-scroll

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem('chatHistory');
    if (savedChats) {
      setPreviousChats(JSON.parse(savedChats));
    }
  }, []);

  // Save chat history to localStorage on change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(previousChats));
  }, [previousChats]);

  // Scroll to bottom when new message appears
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [previousChats]);

  const createNewChat = () => {
    setMessages(null);
    setValue('');
    setCurrentTitle(null);
  };

  const handleClick = (title) => {
    setCurrentTitle(title);
    setMessages(null);
    setValue('');
  };

  const getMessages = async () => {
    if (!value.trim()) return;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: value
      })
    };

    try {
      const response = await fetch('http://localhost:8000/completions', options);

      if (response.status === 429) {
        alert('Too many requests. Please wait and try again.');
        return;
      }

      const data = await response.json();

      if (!data.choices || !data.choices[0]) {
        console.error('Invalid response from API:', data);
        return;
      }

      setMessages(data.choices[0].message);
    } catch (error) {
      console.error('Error fetching from OpenAI API:', error);
    }
  };

  // Append to chat history after receiving message
  useEffect(() => {
    if (!messages) return;

    const timestamp = new Date().toLocaleTimeString();
    const title = currentTitle || value;

    if (!currentTitle) {
      setCurrentTitle(title);
    }

    setPreviousChats(prev => [
      ...prev,
      {
        title,
        role: 'user',
        content: value,
        timestamp
      },
      {
        title,
        role: messages.role,
        content: messages.content,
        timestamp
      }
    ]);

    setValue(''); // Clear input
  }, [messages]);

  const currentChat = previousChats.filter(chat => chat.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map(chat => chat.title)));

  return (
    <div className="app">
      <section className="side-bar">
        <button id="new-chat" onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles.length === 0 ? (
            <li style={{ color: 'gray', fontStyle: 'italic' }}>No chats yet</li>
          ) : (
            uniqueTitles.map((title, index) => (
              <li key={index} onClick={() => handleClick(title)}>
                {title}
              </li>
            ))
          )}
        </ul>
        <div className="nav">
          <p>MyGPT</p>
        </div>
      </section>

      <section className="main">
        <div className="chat-container">
          <h1 className="welcome-message">MyGPT</h1>
          <ul className="feed">
            {currentChat.map((chat, index) => (
              <li key={index} className={chat.role}>
                <strong>{chat.role}:</strong> {chat.content}
                <br />
                <small style={{ color: 'gray' }}>{chat.timestamp}</small>
              </li>
            ))}
            <div ref={chatEndRef}></div>
          </ul>
        </div>

        <div className="bottom-section">
          <div className="input-container">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') getMessages();
              }}
              placeholder="Type a message..."
            />
            <div id="submit" onClick={getMessages}>➣</div>
          </div>
          <p className="info">
            This is a simple chat interface. Type your message and press enter or click the arrow to send it.
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
