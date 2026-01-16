/// Sample comment
const express = require('express');
const bodyParser = require('body-parser');
require('./db'); // Connect to MongoDB

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/students', require('./routes/students'));
app.use('/api/addresses', require('./routes/addresses'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});