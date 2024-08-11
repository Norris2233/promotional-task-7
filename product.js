document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Get product ID from URL

    if (productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                // Populate product details
                document.getElementById('main-product-image').src = product.image;
                document.getElementById('product-title').textContent = product.title;
                document.getElementById('product-description').textContent = product.description;
                document.getElementById('product-price').textContent = `$${product.price}`;

                // Add repeating product images as thumbnails
                const thumbnails = document.querySelector('.product-thumbnails');
                for (let i = 0; i < 5; i++) { // Create 5 thumbnails
                    const img = document.createElement('img');
                    img.className = 'thumbnail';
                    img.src = product.image; // Use the same image for thumbnails
                    img.alt = `${product.title} Thumbnail ${i + 1}`;
                    img.addEventListener('click', () => changeMainImage(img));
                    thumbnails.appendChild(img);
                }

                // Handle add to cart button click
                document.getElementById('add-to-cart-button').addEventListener('click', () => {
                    addToCart(product);
                });
            })
            .catch(error => console.error('Error fetching product data:', error));
    }
});

function changeMainImage(thumbnail) {
    document.getElementById('main-product-image').src = thumbnail.src;
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // Increase quantity if product already in cart
        existingProduct.quantity += 1;
    } else {
        // Add new product to cart
        cart.push({
            id: product.id,
            image: product.image,
            title: product.title,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart counter
    updateCartCounter();
    
    alert('Product added to cart!');
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Call updateCartCounter on page load to set initial count
document.addEventListener('DOMContentLoaded', updateCartCounter);

