// JavaScript for contact form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Gather form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validate the input (simple validation)
    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent.`);
        
        // Clear the form
        document.getElementById("contactForm").reset();
    } else {
        alert("Please fill out all fields.");
    }
});
