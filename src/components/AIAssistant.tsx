"use client";

import { useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Ingeri's AI assistant. How can I help you today? I can answer questions about projects, skills, or help with contact information.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const aiResponses: Record<string, string> = {
    project: "I work on full-stack applications using React, Next.js, and Node.js. Would you like to know more about a specific project?",
    skill: "My main skills include React, Next.js, TypeScript, Tailwind CSS, Node.js, and REST APIs. What would you like to know more about?",
    contact: "You can reach Ingeri at hello@ingeri.dev or use the contact form on the contact page. Would you like me to help you with something specific?",
    experience: "Ingeri has over 4 years of experience in web and software development, with 12+ projects delivered.",
    default: "That's a great question! Feel free to reach out via email at hello@ingeri.dev for more detailed discussions.",
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(aiResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    return aiResponses.default;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 300);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-500/40 hover:bg-blue-700 transition-smooth hover-lift active:scale-95 z-30"
        aria-label="AI Assistant"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 rounded-2xl border border-slate-200 bg-white shadow-2xl flex flex-col h-96 animate-scale-in dark:bg-slate-900 dark:border-slate-700 z-30">
          <div className="border-b border-slate-200 bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-t-2xl dark:border-slate-700">
            <h3 className="font-semibold text-white">Ingeri's Assistant</h3>
            <p className="text-xs text-blue-100">Online now</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 text-sm animate-slide-up ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-2">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 p-4 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 transition-smooth disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a.25.25 0 00-.448 0l-7.5 15a.25.25 0 00.224.372h15.052a.25.25 0 00.224-.372l-7.5-15zM10 12.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
