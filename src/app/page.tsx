'use client';

import { useState } from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      // テキストとして応答を読み取る
      const responseText = await response.text();
      
      // AI応答をメッセージリストに追加
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: responseText
      }]);
    } catch (error) {
      console.error('Error:', error);
      // エラーメッセージをユーザーに表示
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '申し訳ありません。エラーが発生しました。'
      }]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 bg-white bg-opacity-10 dark:bg-slate-800 dark:bg-opacity-10 shadow-md p-4 z-10 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <h1 className="text-2xl font-bold text-foreground/30 dark:text-foreground/100">プライベートAIチャット</h1>
        </div>
      </header>
      
      <div className="flex-1 overflow-hidden max-w-2xl mx-auto w-full p-4">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 p-4 rounded-lg text-black ${
                  message.role === 'assistant'
                    ? 'bg-gray-100 mr-8'
                    : 'bg-blue-100 ml-8'
                }`}
              >
                <div className="font-semibold mb-1">
                  {message.role === 'assistant' ? 'AI' : 'あなた'}
                </div>
                {message.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <PaperPlaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
