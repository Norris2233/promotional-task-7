document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Gather form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Example of handling form data (you can send this data to a backend service)
    console.log('Form submitted:', { name, email, message });
    
    // Provide feedback to the user
    alert('Thank you for your message. We will get back to you shortly.');
    
    // Clear the form
    this.reset();
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
