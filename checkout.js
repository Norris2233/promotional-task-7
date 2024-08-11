document.addEventListener('DOMContentLoaded', () => {
    // Retrieve cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummary = document.getElementById('order-summary');
    const placeOrderButton = document.getElementById('place-order-button');

    // Function to render the order summary
    function renderOrderSummary() {
        orderSummary.innerHTML = ''; // Clear previous content

        let subtotal = 0;

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'order-item';
            itemDiv.innerHTML = `
                <div class="order-item-title">${item.title}</div>
                <div class="order-item-price">$${item.price}</div>
                <div class="order-item-quantity">Quantity: ${item.quantity}</div>
            `;
            orderSummary.appendChild(itemDiv);

            subtotal += item.price * item.quantity;
        });

        const tax = 0.1 * subtotal; // Assuming 10% tax
        const total = subtotal + tax;

        orderSummary.innerHTML += `
            <div class="order-summary-total">
                <strong>Subtotal:</strong> $${subtotal.toFixed(2)}<br>
                <strong>Tax (10%):</strong> $${tax.toFixed(2)}<br>
                <strong>Total:</strong> $${total.toFixed(2)}
            </div>
        `;
    }

    renderOrderSummary();

    // Handle form submission
    document.getElementById('checkout-form').addEventListener('submit', (event) => {
        event.preventDefault();

        // Retrieve form values
        const billingName = document.getElementById('billing-name').value;
        const billingAddress = document.getElementById('billing-address').value;
        const billingEmail = document.getElementById('billing-email').value;
        const billingPhone = document.getElementById('billing-phone').value;
        const shippingAddress = document.getElementById('shipping-address').value;
        const cardName = document.getElementById('card-name').value;
        const cardNumber = document.getElementById('card-number').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvc = document.getElementById('card-cvc').value;

        // Perform your form submission logic here
        // For example, you can send the data to your server or process the payment

        alert('Order placed successfully!');

        // Clear the cart after placing the order
        localStorage.removeItem('cart');
        window.location.href = 'index.html'; // Redirect to the home page
    });
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
