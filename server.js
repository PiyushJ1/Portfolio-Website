const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const { prototype } = require('events');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://www.piyushj.dev'
}));
app.use(express.json());
app.use(express.static('public'));

app.post('/send-message', (req, res) => {
    const data = req.body;

    const filePath = path.join(__dirname, 'messages.json');
    let messages = [];

    if (fs.existsSync(filePath)) {
        messages = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    messages.push(data);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
    res.status(200).json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));