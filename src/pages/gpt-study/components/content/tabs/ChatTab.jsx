// src/pages/gpt-study/components/content/tabs/ChatTab.jsx
import { useState } from 'react';

const ChatTab = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: '안녕하세요! 프롬프팅 실습을 시작해볼까요?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // 사용자 메시지 추가
    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // TODO: GPT API 연결 (추후)
    // 임시 응답
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: '좋은 질문이에요! (GPT API 연결 예정)'
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px] text-white">
      {/* 메시지 리스트 */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`
                max-w-[70%] px-4 py-3 rounded-lg
                ${message.role === 'user'
                  ? 'bg-white text-black'
                  : 'bg-black/30 text-white'
                }
              `}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 입력 영역 */}
      <div className="flex gap-2">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈)"
          className="
            flex-1 px-4 py-3 rounded-lg resize-none
            bg-white/10 border border-white/20
            text-white placeholder-white/50
            focus:outline-none focus:border-white/40
          "
          rows={3}
        />
        <button
          onClick={handleSend}
          className="
            px-6 bg-white text-black font-semibold rounded-lg
            hover:bg-gray-200 transition-all
          "
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatTab;