// src/chatbot/ChatEngine.js
import { products } from './products';
import { faq } from './faq';
import { getProductRecommendations, getIntent } from './intents';

export const getInitialMessage = () => {
    return `Hi, I'm Shaaz AI Assistant! 👋\n\nHow can I help you today?\n\n1️⃣ Find a Perfume\n2️⃣ Gift Recommendations\n3️⃣ Best Sellers\n4️⃣ Track Order\n5️⃣ Shipping Information`;
};

export const generateResponse = (userInput, addToCart, addToWishlist) => {
    const input = userInput.toLowerCase().trim();
    
    // DEBUG: Log the input
    console.log('User input:', input);
    
    // Detect intent
    const intent = getIntent(input);
    console.log('Detected intent:', intent);
    
    // Check for exact matches first
    if (input === 'find a perfume' || input === 'find perfume' || 
        input === 'perfume' || input === 'fragrance') {
        return {
            text: "What kind of fragrance do you like? 🌸\n\n🌸 Floral\n🍋 Fresh\n🌳 Woody\n🍬 Sweet\n🔥 Strong Oud",
            type: 'text'
        };
    }
    
    switch (intent) {
        case 'find_perfume':
            return handleFindPerfume(input);
            
        case 'gift':
        case 'gift_men':
        case 'gift_women':
        case 'gift_couple':
        case 'gift_luxury':
            return handleGiftRecommendation(intent, input);
            
        case 'bestseller':
            return handleBestSellers();
            
        case 'track_order':
            return handleTrackOrder();
            
        case 'shipping':
            return handleShippingInfo();
            
        case 'office_perfume':
        case 'fresh_perfume':
        case 'sweet_perfume':
        case 'oud_perfume':
            return handlePerfumeRecommendation(intent);
            
        case 'long_lasting':
            return handleLongLastingPerfumes();
            
        default:
            return handleGeneralQuery(input);
    }
};

// ===== HANDLERS =====

const handleFindPerfume = (input) => {
    // Check if they specified a category
    const categories = ['floral', 'fresh', 'woody', 'sweet', 'oud'];
    const foundCategory = categories.find(cat => input.includes(cat));
    
    if (foundCategory) {
        return handlePerfumeRecommendation(`${foundCategory}_perfume`);
    }
    
    return {
        text: "What kind of fragrance do you like? 🌸\n\n🌸 Floral\n🍋 Fresh\n🌳 Woody\n🍬 Sweet\n🔥 Strong Oud",
        type: 'text'
    };
};

const handlePerfumeRecommendation = (intent) => {
    let recommendedProducts = [];
    let message = '';
    
    switch (intent) {
        case 'office_perfume':
            recommendedProducts = products.filter(p => 
                p.category === 'fresh' || p.occasion === 'office'
            ).slice(0, 2);
            message = "Here are some perfect office fragrances:";
            break;
            
        case 'fresh_perfume':
            recommendedProducts = products.filter(p => 
                p.category === 'fresh'
            ).slice(0, 2);
            message = "I recommend these fresh fragrances:";
            break;
            
        case 'sweet_perfume':
            recommendedProducts = products.filter(p => 
                p.category === 'sweet'
            ).slice(0, 2);
            message = "Here are some sweet and warm fragrances:";
            break;
            
        case 'oud_perfume':
            recommendedProducts = products.filter(p => 
                p.category === 'oud' || p.name.toLowerCase().includes('oud')
            ).slice(0, 2);
            message = "These oud fragrances are truly majestic:";
            break;
            
        default:
            recommendedProducts = products.slice(0, 2);
            message = "I recommend:";
    }
    
    if (recommendedProducts.length === 0) {
        recommendedProducts = products.slice(0, 2);
    }
    
    return {
        text: message,
        type: 'product-list',
        products: recommendedProducts.map(p => ({
            ...p,
            rating: 4.5
        }))
    };
};

const handleLongLastingPerfumes = () => {
    const longLasting = products.filter(p => 
        p.longevity === 'long' || p.longevity === 'very long'
    );
    
    const recommended = longLasting.length > 0 ? longLasting : products.slice(0, 2);
    
    return {
        text: "These long-lasting fragrances will keep you smelling amazing all day:",
        type: 'product-list',
        products: recommended.map(p => ({
            ...p,
            rating: 4.7
        }))
    };
};

const handleGiftRecommendation = (intent, input) => {
    // Check for gender in input
    const lowerInput = input.toLowerCase();
    
    // Check if it's a specific gift type from intent
    if (intent === 'gift_men' || lowerInput.includes('men') || lowerInput.includes('male') || lowerInput.includes('boy')) {
        const giftProducts = products.filter(p => 
            p.gender === 'male' || p.gender === 'unisex'
        ).slice(0, 2);
        
        return {
            text: "Perfect gifts for men: 👔",
            type: 'product-list',
            products: giftProducts.map(p => ({
                ...p,
                rating: 4.6
            }))
        };
    }
    
    if (intent === 'gift_women' || lowerInput.includes('women') || lowerInput.includes('female') || lowerInput.includes('girl')) {
        const giftProducts = products.filter(p => 
            p.gender === 'female' || p.gender === 'unisex'
        ).slice(0, 2);
        
        // If no female-specific products, show unisex
        const finalProducts = giftProducts.length > 0 ? giftProducts : products.filter(p => p.gender === 'unisex').slice(0, 2);
        
        return {
            text: "Beautiful gifts for women: 👗",
            type: 'product-list',
            products: finalProducts.map(p => ({
                ...p,
                rating: 4.6
            }))
        };
    }
    
    if (intent === 'gift_couple' || lowerInput.includes('couple') || lowerInput.includes('both')) {
        const giftProducts = products.filter(p => 
            p.gender === 'unisex'
        ).slice(0, 2);
        
        return {
            text: "Romantic gifts for couples: 💑",
            type: 'product-list',
            products: giftProducts.map(p => ({
                ...p,
                rating: 4.8
            }))
        };
    }
    
    if (intent === 'gift_luxury' || lowerInput.includes('luxury')) {
        const luxuryProducts = products.filter(p => 
            p.price > 15
        ).slice(0, 2);
        
        return {
            text: "Luxury gift selections: ✨",
            type: 'product-list',
            products: luxuryProducts.map(p => ({
                ...p,
                rating: 4.9
            }))
        };
    }
    
    // Default - show all options
    return {
        text: "Who is the gift for? 🎁\n\n👨 Men\n👩 Women\n❤️ Couple\n🎁 Luxury Gift",
        type: 'text'
    };
};

const handleBestSellers = () => {
    const bestSellers = products.filter(p => 
        p.category === 'best-seller'
    );
    
    const productsList = bestSellers.length > 0 ? bestSellers : products.slice(0, 3);
    
    return {
        text: "⭐ Our Best Sellers:\n\n" + 
              productsList.map((p, i) => `${i + 1}. ${p.name} - $${p.price}`).join('\n'),
        type: 'product-list',
        products: productsList.map(p => ({
            ...p,
            rating: 4.8
        }))
    };
};

const handleTrackOrder = () => {
    return {
        text: "Please enter your Order ID to track your order.\n\n🔍 Example: #ORD-12345\n\n(Note: For demo purposes, you can enter any order ID)",
        type: 'text'
    };
};

const handleShippingInfo = () => {
    return {
        text: `📦 **Shipping Information**\n\n${faq.shipping}\n\n🚚 **Free Shipping:** ${faq.freeShipping || 'Orders above $50'}\n\n💳 **Payment Methods:**\n${faq.payment}`,
        type: 'text'
    };
};

const handleGeneralQuery = (input) => {
    // Check FAQ
    if (input.includes('return') || input.includes('refund')) {
        return {
            text: faq.returns,
            type: 'text'
        };
    }
    
    if (input.includes('payment') || input.includes('pay') || input.includes('card')) {
        return {
            text: faq.payment,
            type: 'text'
        };
    }
    
    if (input.includes('delivery') || input.includes('shipping')) {
        return handleShippingInfo();
    }
    
    // If no specific match, offer help
    return {
        text: "I'm here to help! 😊\n\nTry asking me about:\n• Finding a perfume\n• Gift recommendations\n• Best sellers\n• Order tracking\n• Shipping information",
        type: 'text'
    };
};

// Export for use in other files
export const chatEngine = {
    generateResponse,
    getInitialMessage
};