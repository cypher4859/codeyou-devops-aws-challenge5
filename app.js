const express = require('express');
const app = express();

ap.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js App!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})