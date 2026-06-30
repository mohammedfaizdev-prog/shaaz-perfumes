// src/chatbot/ChatMessage.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ChatMessage = ({ message, isLast }) => {
    const { text, sender, type, products, timestamp } = message;
    
    const formatTime = (ts) => {
        if (!ts) return '';
        const date = new Date(ts);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const renderContent = () => {
        if ((type === 'product-list' || type === 'product-card') && products) {
            return (
                <div className="message-wrapper bot">
                    <div className="message-bubble">
                        <div className="message-text">{text}</div>
                    </div>
                    <div className="product-list-container">
                        {products.map((product, index) => (
                            <ProductCard 
                                key={product.id || index} 
                                product={product} 
                                compact={type === 'product-card'}
                            />
                        ))}
                    </div>
                    <div className="message-meta">
                        <span className="message-time">{formatTime(timestamp)}</span>
                        <span className="message-status">
                            <i className="fas fa-check-double" style={{ color: '#4CAF50' }}></i>
                        </span>
                    </div>
                </div>
            );
        }

        // Format text with emojis and highlights
        const formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />');

        return (
            <div className={`message-wrapper ${sender}`}>
                <div className="message-bubble">
                    <div 
                        className="message-text"
                        dangerouslySetInnerHTML={{ __html: formattedText }}
                    />
                    <div className="message-meta">
                        <span className="message-time">{formatTime(timestamp)}</span>
                        {sender === 'user' && (
                            <span className="message-status">
                                <i className="fas fa-check-double" style={{ color: '#4CAF50' }}></i>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return renderContent();
};

export default ChatMessage;