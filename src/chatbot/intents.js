// src/chatbot/intents.js
import { products } from './products';

// Intent keywords mapping
export const intentKeywords = {
    find_perfume: ['find perfume', 'fragrance', 'recommend perfume', 'suggest perfume', 'perfume for'],
    gift: ['gift', 'present', 'gifting', 'for gift', 'gift for', 'gift recommendation'],
    bestseller: ['best seller', 'best selling', 'popular', 'top selling', 'bestseller', 'best-seller', 'top seller'],
    track_order: ['track order', 'order status', 'where is my order', 'track my order'],
    shipping: ['shipping', 'delivery', 'free shipping', 'ship', 'deliver'],
    office_perfume: ['office', 'work', 'professional', 'business', 'formal'],
    fresh_perfume: ['fresh', 'clean', 'aquatic', 'citrus', 'refreshing'],
    sweet_perfume: ['sweet', 'warm', 'gourmand', 'vanilla', 'spicy'],
    oud_perfume: ['oud', 'agarwood', 'woody', 'woody fragrance', 'wood'],
    long_lasting: ['long lasting', 'longevity', 'last long', 'stays long', 'all day']
};

// Product recommendation engine
export const getProductRecommendations = (category, limit = 3) => {
    let filtered = products;
    
    if (category === 'office') {
        filtered = products.filter(p => 
            p.occasion === 'office' || p.occasion === 'formal'
        );
    } else if (category === 'fresh') {
        filtered = products.filter(p => p.category === 'fresh');
    } else if (category === 'sweet') {
        filtered = products.filter(p => p.category === 'sweet');
    } else if (category === 'oud') {
        filtered = products.filter(p => 
            p.category === 'oud' || p.name.toLowerCase().includes('oud')
        );
    } else if (category === 'long_lasting') {
        filtered = products.filter(p => 
            p.longevity === 'long' || p.longevity === 'very long'
        );
    } else if (category === 'gift_men') {
        filtered = products.filter(p => 
            p.gender === 'male' || p.gender === 'unisex'
        );
    } else if (category === 'gift_women') {
        filtered = products.filter(p => 
            p.gender === 'female' || p.gender === 'unisex'
        );
    } else if (category === 'gift_couple') {
        filtered = products.filter(p => p.gender === 'unisex');
    } else if (category === 'gift_luxury') {
        filtered = products.filter(p => p.price > 15);
    } else if (category === 'bestseller') {
        filtered = products.filter(p => p.category === 'best-seller');
    }
    
    return filtered.slice(0, limit);
};

// Intent detection
// src/chatbot/intents.js
// Update the getIntent function

export const getIntent = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Check each intent
    for (const [intent, keywords] of Object.entries(intentKeywords)) {
        if (keywords.some(keyword => lowerInput.includes(keyword))) {
            return intent;
        }
    }
    
    // Check for gender-specific gift - FIXED
    if (lowerInput.includes('gift')) {
        if (lowerInput.includes('women') || lowerInput.includes('woman') || 
            lowerInput.includes('female') || lowerInput.includes('girl') || 
            lowerInput.includes('her')) {
            return 'gift_women';
        }
        if (lowerInput.includes('men') || lowerInput.includes('man') || 
            lowerInput.includes('male') || lowerInput.includes('boy') || 
            lowerInput.includes('him')) {
            return 'gift_men';
        }
        if (lowerInput.includes('couple') || lowerInput.includes('both') || 
            lowerInput.includes('partner')) {
            return 'gift_couple';
        }
        if (lowerInput.includes('luxury') || lowerInput.includes('premium') || 
            lowerInput.includes('expensive')) {
            return 'gift_luxury';
        }
        return 'gift';
    }
    
    // Check for best seller variations
    if (lowerInput.includes('best seller') || lowerInput.includes('bestseller') || 
        lowerInput.includes('top selling') || lowerInput.includes('popular')) {
        return 'bestseller';
    }
    
    // Check if they're asking about a specific product
    for (const product of products) {
        if (lowerInput.includes(product.name.toLowerCase())) {
            return 'find_perfume';
        }
    }
    
    return 'general';
};