document.getElementById('send-button').addEventListener('click', async () => {
    const data = {
            firstName: document.querySelector('input[placeholder="First Name"]').value,
            lastName: document.querySelector('input[placeholder="Last Name"]').value,
            email: document.querySelector('input[placeholder="Email"]').value,
            message: document.querySelector('input[placeholder="Your Message"]').value,
    };


    const res = await fetch()

});
