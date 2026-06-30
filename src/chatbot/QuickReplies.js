// src/chatbot/QuickReplies.jsx
import React from 'react';

const QuickReplies = ({ onQuickReply, lastMessage }) => {
    const getSuggestedReplies = () => {
        const text = lastMessage?.text || '';
        
        // Default suggestions with icons
        let suggestions = [
            { text: '🔍 Find Perfume', value: 'Find a Perfume' },
            { text: '🎁 Gift Ideas', value: 'Gift Recommendations' },
            { text: '⭐ Best Sellers', value: 'Best Sellers' },
            { text: '📦 Track Order', value: 'Track Order' }
        ];
        
        // Context-aware suggestions
        if (text.includes('perfume') || text.includes('fragrance')) {
            if (text.includes('kind') || text.includes('like')) {
                suggestions = [
                    { text: '🌸 Floral', value: 'Floral' },
                    { text: '🍋 Fresh', value: 'Fresh' },
                    { text: '🌳 Woody', value: 'Woody' },
                    { text: '🍬 Sweet', value: 'Sweet' },
                    { text: '🔥 Oud', value: 'Oud' }
                ];
            } else {
                suggestions = [
                    { text: '💼 Office', value: 'Office' },
                    { text: '🌿 Fresh', value: 'Fresh' },
                    { text: '🌳 Woody', value: 'Woody' },
                    { text: '🍬 Sweet', value: 'Sweet' }
                ];
            }
        } else if (text.includes('gift')) {
            suggestions = [
                { text: '👨 For Men', value: 'Gift for Men' },
                { text: '👩 For Women', value: 'Gift for Women' },
                { text: '❤️ Couple', value: 'Gift for Couple' },
                { text: '🎁 Luxury', value: 'Luxury Gift' }
            ];
        } else if (text.includes('best seller') || text.includes('best selling')) {
            suggestions = [
                { text: '🏆 Top Rated', value: 'Top rated' },
                { text: '🆕 New Arrivals', value: 'New arrivals' },
                { text: '💰 Sale Items', value: 'Sale items' },
                { text: '📦 All Products', value: 'All products' }
            ];
        } else if (text.includes('order') || text.includes('track')) {
            suggestions = [
                { text: '📬 Status', value: 'Order status' },
                { text: '🚚 Shipping', value: 'Shipping info' },
                { text: '↩️ Returns', value: 'Return policy' },
                { text: '📞 Contact', value: 'Contact support' }
            ];
        } else if (text.includes('shipping') || text.includes('delivery')) {
            suggestions = [
                { text: '🚚 Free Shipping', value: 'Free shipping' },
                { text: '📦 Track Order', value: 'Track order' },
                { text: '⏱️ Delivery Time', value: 'Delivery time' },
                { text: '💳 Payment', value: 'Payment methods' }
            ];
        }
        
        return suggestions;
    };

    const suggestions = getSuggestedReplies();

    return (
        <div className="quick-replies-wrapper">
            <span className="quick-replies-label">Quick replies</span>
            <div className="quick-replies">
                {suggestions.map((suggestion, index) => (
                    <button
                        key={index}
                        className="quick-reply-btn"
                        onClick={() => onQuickReply(suggestion.value)}
                    >
                        {suggestion.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickReplies;