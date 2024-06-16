
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Validate and submit the form data
    if (validateForm()) {
        submitForm();
    }
});

function validateForm() {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var website = document.getElementById("website").value;

    // Basic validation, you can add more checks as needed
    if (!name || !phone || !website) {
        alert("Please fill in all fields.");
        return false;
    }

    return true;
}

function submitForm() {
    var formData = {
        Name: document.getElementById("name").value,
        Phone: document.getElementById("phone").value,
        Website: document.getElementById("website").value
    };

    fetch('', {
        method: 'POST',
        body: new URLSearchParams(formData),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    });
}
