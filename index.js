const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const title = req.body.title;
  const script = req.body.script;
  const description = req.body.description;

  const data = {
    title,
    script,
    description,
  };

  let alyssescripts = [];
  try {
    alyssescripts = JSON.parse(fs.readFileSync('scripts.json'));
  } catch (err) {
    console.error('error reading data:', err.message);
  }

  alyssescripts.unshift(data);

  fs.writeFile('scripts.json', JSON.stringify(alyssescripts, null, 2), (err) => {
    if (err) {
      console.error('error:', err.message);
      res.status(500).send('server error');
    } else {
      console.log('successfully wrriten.');
      res.redirect('/');
    }
  });
});

app.listen(port, () => {
  console.log(`alysse server is running`);
});
