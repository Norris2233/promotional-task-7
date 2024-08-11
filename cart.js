document.addEventListener('DOMContentLoaded', () => {
    // Initialize the cart from local storage or start with an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render cart items
    function renderCart() {
        const cartSummary = document.getElementById('cart-summary');
        const subtotalElement = document.getElementById('subtotal');
        const totalElement = document.getElementById('total');
        
        cartSummary.innerHTML = ''; // Clear previous items

        if (cart.length === 0) {
            // Display empty cart message if no items
            cartSummary.innerHTML = '<p>Your cart is empty.</p>';
            subtotalElement.textContent = '0.00';
            totalElement.textContent = '0.00';
            return;
        }

        let subtotal = 0;

        // Iterate over each item in the cart
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-quantity">
                        <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                        <span class="cart-item-remove" data-id="${item.id}">Remove</span>
                    </div>
                </div>
            `;
            
            cartSummary.appendChild(itemDiv);

            subtotal += item.price * item.quantity;
        });

        const tax = 0.1 * subtotal; // Assuming 10% tax
        const total = subtotal + tax;

        // Update subtotal and total in the UI
        subtotalElement.textContent = subtotal.toFixed(2);
        totalElement.textContent = total.toFixed(2);
    }

    // Function to update cart in local storage and re-render
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCounter();
    }

    // Function to update the cart counter
    function updateCartCounter() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    }

    // Function to clear the cart
    function clearCart() {
        cart = []; // Empty the cart array
        updateCart(); // Update local storage and re-render
        showRemovalMessage('All items have been removed from your cart.');
    }

    // Function to show removal confirmation message
    function showRemovalMessage(message) {
        const messageElement = document.getElementById('cart-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.style.display = 'block';
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 3000); // Hide message after 3 seconds
        }
    }

    // Initial rendering of the cart
    renderCart();

    // Event listener for removing items from the cart
    document.getElementById('cart-summary').addEventListener('click', (event) => {
        if (event.target.classList.contains('cart-item-remove')) {
            const id = event.target.dataset.id;
            const index = cart.findIndex(i => i.id === id);
            
            if (index !== -1) {
                const removedItem = cart.splice(index, 1)[0]; // Remove item from cart
                updateCart();
                showRemovalMessage(`Removed ${removedItem.title} from your cart.`);
            }
        }
    });

    // Event listener for changing item quantities
    document.getElementById('cart-summary').addEventListener('change', (event) => {
        if (event.target.type === 'number') {
            const id = event.target.dataset.id;
            const newQuantity = parseInt(event.target.value, 10);
            const item = cart.find(i => i.id === id);

            if (item) {
                item.quantity = newQuantity;
                updateCart();
            }
        }
    });

    // Event listener for clearing the cart (optional button)
    document.getElementById('clear-cart-button').addEventListener('click', () => {
        clearCart();
    });

    // Initial cart counter update
    updateCartCounter();
});
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
        });
    }
});
