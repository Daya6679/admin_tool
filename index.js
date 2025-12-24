// index.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // serve your frontend if any

app.listen(port, () => {
  console.log(`Admin Tool running at http://localhost:${port}`);
});
