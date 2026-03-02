'use client';
import { useState } from 'react';

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform z-50 text-white"
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.03 2 11C2 13.435 3.097 15.637 4.869 17.189L3.5 21.5L8.033 20.063C9.283 20.655 10.621 21 12 21C17.523 21 22 16.97 22 12C22 7.03 17.523 2 12 2Z" fill="currentColor" />
                </svg>
            </div>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
                    <div className="bg-slate-900 text-white p-4 font-bold flex justify-between items-center">
                        <span>AI Business Assistant</span>
                        <button onClick={() => setIsOpen(false)} className="text-xl">&times;</button>
                    </div>
                    {/* We point this iframe to the server-rendered AI chat route in ERPNext */}
                    <iframe
                        src="https://uat-demo.fateherp.com/app/ai-chat"
                        className="flex-1 w-full border-none"
                        title="AI Chat"
                    ></iframe>
                </div>
            )}
        </>
    );
}
