const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    return res.json({ token: '46854889-ee359d90b7fed1ae23b4d9969' });
  }
  return res.status(401).json({ message: 'Unauthorized' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
