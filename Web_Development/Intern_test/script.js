const thisForm = document.getElementById('myForm');
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    let response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        body: new FormData(thisForm)
    });

    let result = await response.json();
    alert(result.message)
    console.log(result)
});