const express = require('express');
const app = express();

// your routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// listen on port 3000 or environment port
app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
