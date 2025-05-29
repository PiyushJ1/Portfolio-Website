# Portfolio Frontend

https://piyushj.dev

This is the frontend for the portfolio website, built using basic HTML, CSS, and JavaScript. The single-page layout includes sections for About, Projects, and Contact.

---

## Technologies Used

- HTML
- CSS
- JavaScript (Vanilla)

---

## Overview

The website features a clean, responsive design with three main sections:

- **About:** Brief introduction and background.
- **Projects:** Showcase of completed work and portfolio items.
- **Contact:** A form allowing visitors to send messages directly to the backend API.

The contact form collects user inputs and submits them via a POST request to the backend `/send-message` endpoint.

---

## Integration

The frontend sends data to the backend API hosted separately. CORS is configured on the backend to allow requests from this frontend domain.

---

## Deployment

Deployed on GitHub Pages using a custom domain name.

---

## Additional Notes

- No frontend frameworks or build tools are used.
- Form submissions are handled using the Fetch API.
- Basic client-side validation ensures required fields are filled before submission.
