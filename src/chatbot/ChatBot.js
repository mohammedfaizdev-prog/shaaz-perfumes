// src/chatbot/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import ChatMessage from './ChatMessage';
import QuickReplies from './QuickReplies';
import { generateResponse, getInitialMessage } from './ChatEngine';
import { useShop } from '../context/ShopContext';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const chatWindowRef = useRef(null);
    const { addToCart, addToWishlist } = useShop();

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initialize chat with welcome message
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMsg = {
                id: Date.now(),
                text: getInitialMessage(),
                sender: 'bot',
                type: 'text',
                timestamp: Date.now()
            };
            setMessages([welcomeMsg]);
            setUnreadCount(0);
        }
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handle unread count when chat is closed
    useEffect(() => {
        if (!isOpen && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.sender === 'bot') {
                setUnreadCount(prev => prev + 1);
            }
        }
    }, [messages, isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            text: text,
            sender: 'user',
            type: 'text',
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Generate bot response with delay for realism
        setTimeout(() => {
            const botResponse = generateResponse(text, addToCart, addToWishlist);
            
            // Handle multiple responses
            if (Array.isArray(botResponse)) {
                botResponse.forEach((response, index) => {
                    setTimeout(() => {
                        setMessages(prev => [...prev, {
                            id: Date.now() + index,
                            ...response,
                            sender: 'bot',
                            timestamp: Date.now()
                        }]);
                    }, index * 400 + 300);
                });
            } else {
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    ...botResponse,
                    sender: 'bot',
                    timestamp: Date.now()
                }]);
            }
            
            setIsTyping(false);
        }, 600);
    };

    const handleQuickReply = (text) => {
        handleSendMessage(text);
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setUnreadCount(0);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 400);
        }
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    // Close chat on mobile back button
    useEffect(() => {
        const handleBackButton = (e) => {
            if (isOpen && isMobile) {
                e.preventDefault();
                setIsOpen(false);
            }
        };
        window.addEventListener('popstate', handleBackButton);
        return () => window.removeEventListener('popstate', handleBackButton);
    }, [isOpen, isMobile]);

    return (
        <>
            {/* Floating Button */}
            <button 
                className={`chat-toggle-btn ${isOpen ? 'open' : ''}`} 
                onClick={toggleChat}
                aria-label="Toggle chat"
            >
                {isOpen ? (
                    <i className="fas fa-times"></i>
                ) : (
                    <>
                        <i className="fas fa-comment-dots"></i>
                        {unreadCount > 0 && (
                            <span className="notification-badge">{unreadCount}</span>
                        )}
                    </>
                )}
                <span className="pulse-ring"></span>
            </button>

            {/* Chat Window */}
            <div 
                className={`chat-window ${isOpen ? 'open' : ''} ${isMinimized ? 'minimized' : ''} ${isMobile ? 'mobile' : ''}`}
                ref={chatWindowRef}
            >
                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-avatar">
                            <img 
                                src="/images/logo-icon.png" 
                                alt="Shaaz" 
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = '<i class="fas fa-crown"></i>';
                                }}
                            />
                            <span className="online-dot"></span>
                        </div>
                        <div className="chat-header-text">
                            <h3>Shaaz AI Assistant</h3>
                            <div className="header-status">
                                <span className="online-status">● Online</span>
                                <span className="response-time">Avg 5s</span>
                            </div>
                        </div>
                    </div>
                    <div className="chat-header-actions">
                        <button className="minimize-chat" onClick={toggleMinimize}>
                            <i className={`fas fa-${isMinimized ? 'chevron-up' : 'minus'}`}></i>
                        </button>
                        <button className="close-chat" onClick={toggleChat}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                {/* Minimized State - Show last message */}
                {isMinimized && (
                    <div className="chat-minimized-preview">
                        <div className="preview-content">
                            <i className="fas fa-robot"></i>
                            <span>
                                {messages.length > 0 
                                    ? messages[messages.length - 1]?.text?.substring(0, 50) + '...'
                                    : 'How can I help you?'
                                }
                            </span>
                        </div>
                        <button className="expand-chat" onClick={toggleMinimize}>
                            <i className="fas fa-chevron-down"></i>
                        </button>
                    </div>
                )}

                {/* Messages */}
                {!isMinimized && (
                    <>
                        <div className="chat-messages" id="chat-messages">
                            {/* Welcome banner */}
                            {messages.length === 0 && (
                                <div className="welcome-banner">
                                    <div className="welcome-icon">
                                        <i className="fas fa-hand-sparkles"></i>
                                    </div>
                                    <h4>Welcome to Shaaz Perfumes</h4>
                                    <p>Let me help you find the perfect fragrance</p>
                                </div>
                            )}
                            
                            {messages.map((message, index) => (
                                <ChatMessage 
                                    key={message.id || index} 
                                    message={message}
                                    isLast={index === messages.length - 1}
                                />
                            ))}
                            
                            {isTyping && (
                                <div className="typing-indicator-wrapper">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <span className="typing-text">Shaaz is typing...</span>
                                </div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length > 0 && messages[messages.length - 1]?.sender === 'bot' && (
                            <QuickReplies 
                                onQuickReply={handleQuickReply}
                                lastMessage={messages[messages.length - 1]}
                            />
                        )}

                        {/* Input */}
                        <div className="chat-input-container">
                            <div className="input-wrapper">
                                <button className="input-emoji-btn" aria-label="Emoji">
                                    <i className="far fa-smile"></i>
                                </button>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="chat-input"
                                    placeholder="Ask about perfumes, gifts, or orders..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage(input);
                                        }
                                    }}
                                />
                                <button 
                                    className="chat-send-btn"
                                    onClick={() => handleSendMessage(input)}
                                    disabled={!input.trim()}
                                >
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                            <div className="input-hint">
                                <span>Powered by Shaaz AI</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ChatBot;