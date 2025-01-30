const products = [
    { id: 1, name: 'Smartphone 5G', price: 299.99, rating: 4.5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFKVCH23gIom_fYZKc-SPzHj_kwctYxyRaug&s' },
    { id: 2, name: 'AI Headphones', price: 159.99, rating: 4.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhWin6PP_0FPKnqa9BkIvaA-YBnIjTBFd8nQ&s' },
    { id: 3, name: 'Smart Watch', price: 199.99, rating: 4.7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjbeOaWluVBsqsI8yZjYnYL--lHZ4Ug1IMsA&s' },
    { id: 4, name: 'Wireless Earbuds', price: 89.99, rating: 4.3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI79Ota5LeJIL_cEn9NLLl_QwEfjqAZn7PQQ&s' },
    { id: 5, name: 'Smart Home Speaker', price: 129.99, rating: 4.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI79Ota5LeJIL_cEn9NLLl_QwEfjqAZn7PQQ&s' },
    { id: 6, name: 'Laptop Ultra Pro', price: 899.99, rating: 4.6, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI79Ota5LeJIL_cEn9NLLl_QwEfjqAZn7PQQ&s' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update Cart Function
function updateCart() {
    const cartCount = cart.length;
    document.getElementById('view-cart').textContent = `Cart (${cartCount})`;
}

// Render Product List
function renderProducts() {
    const productListContainer = document.getElementById('product-list');
    productListContainer.innerHTML = ''; // Clear existing products
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-4', 'mb-4');
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted">Rating: ${product.rating}</span>
                    </div>
                    <button class="btn btn-primary add-to-cart mt-3" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productListContainer.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        });
    });
}

// Add Product to Cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        alert('This product is already in your cart!');
    } else {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

// Search Products
document.getElementById('search-input').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    products = filteredProducts;
    renderProducts();
});

// Sort Products
document.getElementById('sort-select').addEventListener('change', (event) => {
    const sortBy = event.target.value;
    products.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'rating') return b.rating - a.rating;
    });
    renderProducts();
});

// Modal Cart functionality
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('row');
        cartItemDiv.innerHTML = `
            <div class="col-md-8">
                <h5>${item.name}</h5>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="col-md-4">
                <button class="btn btn-danger remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    // Update cart total
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('row', 'mt-3');
    totalDiv.innerHTML = `
        <div class="col-md-12 text-right">
            <h5>Total: $${total.toFixed(2)}</h5>
        </div>
    `;
    cartItemsContainer.appendChild(totalDiv);

    // Remove item from cart
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
            renderCartItems();
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
    renderCartItems();
});
// Change navbar color when scrolling
window.onscroll = function() {
    let navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
};

// Simple AI Chatbot Simulation
let chatbotMessages = [
    "Hello! How can I assist you today?",
    "I can help you find products, check your cart, or provide store info."
];

let userMessages = [];

// Function to simulate AI chat response
function aiChatbotResponse(input) {
    const messageContainer = document.querySelector('.message-container');
    messageContainer.innerHTML += `<div class="user-message">${input}</div>`;

    // Simulate AI response (simple matching)
    let response = "I'm sorry, I didn't understand that. Can you try asking something else?";
    if (input.toLowerCase().includes("product")) {
        response = "I can help you search for products! What are you looking for?";
    } else if (input.toLowerCase().includes("cart")) {
        response = "Sure! Let me show you your cart.";
    }

    messageContainer.innerHTML += `<div class="ai-message">${response}</div>`;
    document.getElementById('user-input').value = ''; // Clear input field
}

// Listen for user input and send message
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        let userInput = e.target.value;
        aiChatbotResponse(userInput);
    }
});
// AI Product Recommendation (based on user behavior)
let recommendedProducts = [
    { title: "Smartphone 5G", image: "data:image/jpeg;base64,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", price: "$299.99" },
    { title: "AI Headphones", image: "data:image/jpeg;base64,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", price: "$159.99" },
    { title: "Smart Watch", image: "data:image/jpeg;base64,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", price: "$199.99" }
];

function showRecommendedProducts() {
    let recommendationsContainer = document.getElementById('recommendations');
    recommendedProducts.forEach(product => {
        let productCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.price}</p>
                        <a href="#" class="btn btn-primary btn-block">Add to Cart</a>
                    </div>
                </div>
            </div>
        `;
        recommendationsContainer.innerHTML += productCard;
    });
}

// Call this function to load personalized recommendations when the page is loaded
showRecommendedProducts();
// AI-powered search suggestions
const searchSuggestions = [
    "Smartphone 5G",
    "AI Headphones",
    "Smart Watch",
    "Laptop Ultra Pro",
    "Wireless Earbuds"
];

document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredSuggestions = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query)
    );

    let suggestionsHTML = '';
    filteredSuggestions.forEach(suggestion => {
        suggestionsHTML += `<li class="list-group-item">${suggestion}</li>`;
    });

    document.getElementById('search-suggestions').innerHTML = suggestionsHTML;
});
