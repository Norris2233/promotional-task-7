document.addEventListener('DOMContentLoaded', () => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            const featuredProductsContainer = document.getElementById('featured-products-container');
            data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>$${product.price}</p>
                    <a href="product.html?id=${product.id}">View Details</a>
                `;
                featuredProductsContainer.appendChild(productElement);
            });
        });
});
document.addEventListener('DOMContentLoaded', () => {
    // Slider Variables
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.hero-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    const slideInterval = 5000; // Slide change interval in milliseconds

    function goToSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    // Initialize slider
    setInterval(nextSlide, slideInterval);

    // Optionally, add navigation dots if implemented
    // Add code for navigation dots here if you choose to include them
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
