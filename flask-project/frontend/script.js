const form = document.getElementById('studentForm');
const errorText = document.getElementById('error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorText.innerText = '';

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };

    try {

        const response = await fetch('http://127.0.0.1:5000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if(result.success) {
            window.location.href = 'success.html';
        } else {
            errorText.innerText = result.error;
        }

    } catch(error) {
        errorText.innerText = error.message;
    }
});