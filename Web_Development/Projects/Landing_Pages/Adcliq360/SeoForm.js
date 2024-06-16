async function submitForm() {
    var form = document.getElementById("contactForm");

    if (form.checkValidity()) {
        // Display sending message
        document.getElementById("statusMessage").innerHTML = "Sending...";

        try {
            // Prepare form data
            var formData = new FormData(form);

            // Send data to Google Sheets using Fetch API
            // var response = await fetch("https://script.google.com/macros/s/AKfycbzA7mkY4r-jb7Xt8BFVtt78KgnDYSqZWMOXceUny1xMAa1ulSwlQot6GbshNnxRb8iJ/exec", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // Reset form and display success message
                form.reset();
                document.getElementById("statusMessage").innerHTML = "Sent successfully!";
                //  Redirect to the next page
                window.location.href = "thank_you.html";
            } else {
                throw new Error("Error submitting form.");
            }
        } catch (error) {
            // Display error message
            console.error(error);
            document.getElementById("statusMessage").innerHTML = "Error submitting form.";
        }
    } else {
        // Display validation error messages
        form.classList.add('was-validated');
    }
}

// function submitForm() {
//     var form = document.getElementById("contactForm");

//     if (form.checkValidity()) {
//         // Simulate sending data (you can replace this with your actual form submission logic)
//         document.getElementById("statusMessage").innerHTML = "Sending...";

//         setTimeout(function () {
//             // Reset form and display success message
//             form.reset();
//             document.getElementById("statusMessage").innerHTML = "Sent successfully!";
//         }, 2000);
//     } else {
//         // Display validation error messages
//         form.classList.add('was-validated');
//     }
// }
//     async function submitForm() {
//         var form = document.getElementById("contactForm");

//         if (form.checkValidity()) {
//             // Display sending message
//             document.getElementById("statusMessage").innerHTML = "Sending...";

//             try {
//                 // Prepare form data
//                 var formData = new FormData(form);

//                 // Send data to Google Sheets using Fetch API
//                 var response = await fetch("https://script.google.com/macros/s/AKfycbzA7mkY4r-jb7Xt8BFVtt78KgnDYSqZWMOXceUny1xMAa1ulSwlQot6GbshNnxRb8iJ/exec", {
//                     method: "POST",
//                     body: formData,
//                 });

//                 if (response.ok) {
//                     // Reset form and display success message
//                     form.reset();
//                     document.getElementById("statusMessage").innerHTML = "Sent successfully!";
//                 } else {
//                     throw new Error("Error submitting form.");
//                 }
//             } catch (error) {
//                 // Display error message
//                 console.error(error);
//                 document.getElementById("statusMessage").innerHTML = "Error submitting form.";
//             }
//         } else {
//             // Display validation error messages
//             form.classList.add('was-validated');
//         }
//     }