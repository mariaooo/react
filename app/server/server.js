const path = require('path');
const express = require('express');
// const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

// app.use(cors());

app.get(/^(.+)$/, (req, res) => {
  if (req.params[0].match(/^(\/)$/)) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else if (req.params[0].match(/^(\/{/*demo */}(.+))$/)) {
    res.redirect('/');
  } else if (req.params[0].match(/^((\/)+health(.*))$/)) {
    res.end('status: OK');
  } else {
    res.sendFile(path.join(__dirname, req.params[0]));
  }
});

app.listen(port, () => {
  console.log(`start listening on port ${port}!`);
});
