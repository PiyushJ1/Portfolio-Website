document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.querySelector('send-button');

    sendBtn.addEventListener('click', async () => {
        const data = {
            firstName: document.querySelector('input[placeholder="First Name"]').value,
            lastName: document.querySelector('input[placeholder="Last Name"]').value,
            email: document.querySelector('input[placeholder="Email"]').value,
            message: document.querySelector('input[placeholder="Your Message"]').value,
        };
    });

    if (!data.firstName || !data.lastName || !data.email || !data.message) {
        alert('Please fill in all fields');
        return;
    }

    // try {
    //     const res = await fetch
    // }
});