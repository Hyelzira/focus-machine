import React, { useState, useEffect, useRef } from 'react';

const SupportBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello. I'm here to help you understand Focus Machine. Ask me about your score, privacy, or safety resources.", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Auto-scroll to the bottom when new messages arrive
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add user message
    const userMessage = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // 2. Simulate bot thinking and reply
    setTimeout(() => {
      const q = userMessage.text.toLowerCase();
      let botResponse = "";

      if (q.includes("focus level") || q.includes("score")) {
        botResponse = "Your Focus Level is calculated based on your accuracy, consistency, and how long you practiced. It ranges from 1 to 10. There are no streaks or pressure—just honest feedback.";
      } else if (q.includes("data") || q.includes("privacy") || q.includes("store")) {
        botResponse = "For Version 1, your data is stored locally on your device. We do not force account creation, and cloud sync is optional later. Your privacy is a priority.";
      } else if (q.includes("crisis") || q.includes("help") || q.includes("emergency")) {
        botResponse = "If you are in distress, please go to our Safety & Help page immediately. It has one-tap access to crisis resources. Focus Machine is a training tool, not a medical treatment.";
      } else if (q.includes("time") || q.includes("long")) {
        botResponse = "You are encouraged to practice for at least 7 minutes, but there is no forced time limit. Take all the time you need.";
      } else {
        botResponse = "I'm a simple support bot. I can answer questions about your Focus Level, privacy, or safety resources. For anything else, please check the About or Safety pages.";
      }

      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 1000); // 1 second delay to simulate typing
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-['Times_New_Roman',_Times,_serif]">
      
      {/* 1. THE CHAT WINDOW */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-[#E2DFD5] dark:border-gray-700 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="bg-[#4A7C59] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <h3 className="font-bold text-lg">Focus Support</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white font-sans text-lg">
              ✕
            </button>
          </div>

          {/* Message History Column */}
          <div className="flex-1 p-4 h-80 overflow-y-auto flex flex-col gap-4 bg-[#FAF9F6] dark:bg-gray-900">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.isBot 
                    ? 'bg-white dark:bg-gray-800 text-[#2C3E35] dark:text-gray-200 border border-[#E2DFD5] dark:border-gray-700 self-start rounded-tl-sm shadow-sm' 
                    : 'bg-[#4A7C59] text-white self-end rounded-tr-sm shadow-md'
                }`}
              >
                {msg.text}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="bg-white dark:bg-gray-800 border border-[#E2DFD5] dark:border-gray-700 p-3 rounded-2xl rounded-tl-sm self-start flex gap-1 items-center shadow-sm">
                <div className="w-2 h-2 bg-[#A3B18A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#A3B18A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[#A3B18A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
            {/* Invisible div to help scroll to bottom */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-800 border-t border-[#E2DFD5] dark:border-gray-700 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-[#F5F2EB] dark:bg-gray-900 border border-[#E2DFD5] dark:border-gray-700 rounded-xl px-4 py-2 text-sm text-[#2C3E35] dark:text-white focus:outline-none focus:border-[#4A7C59] dark:focus:border-[#A3B18A] transition-colors font-['Times_New_Roman',_Times,_serif]"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="bg-[#4A7C59] hover:bg-[#3D664A] disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-colors flex items-center justify-center w-10 h-10 font-sans"
            >
              ➤
            </button>
          </form>

        </div>
      )}

      {/* 2. THE FLOATING BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#4A7C59] hover:bg-[#3D664A] rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 z-50 relative"
      >
        <span className="text-2xl">{isOpen ? '✕' : '🤖'}</span>
      </button>

    </div>
  );
};

export default SupportBot;