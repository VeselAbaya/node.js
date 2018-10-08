const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');
const uniqid = require('uniqid');

const app = express();
const port = process.env.PORT || 3000;

let statuses;
fs.readFile('statuses.json', (err, data) => {
  statuses = JSON.parse(data);
});

app.use(express.static(__dirname + '/html'));
app.use(express.static(__dirname + '/css'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('footerContent', () => `All the time in ${new Date().getFullYear()}`);
hbs.registerHelper('toUpperCase', (text) => text.toUpperCase());
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home.hbs', {
    paragraphContent: 'Nikto ne sosjot',
  });
});

app.get('/seregaSos', (req, res) => {
  res.render('seregaSosjot.hbs', {
    paragraphContent: 'Serega Sosjot',
  });
});

app.get('/status', (req, res) => {
  res.send(statuses);
});

app.get('/status/:id', (req, res) => {
  res.send(statuses.find(obj => obj.id === req.params.id));
});

app.post('/status', (req, res) => {
  const newObj = {
    ...req.body,
    id: uniqid()
  };

  statuses.push(newObj);
  fs.writeFile('statuses.json', JSON.stringify(statuses));
  res.send(newObj);
});

app.put('/status/:id', (req, res) => {
  const i = statuses.findIndex(obj => obj.id === req.params.id);
  if (i !== -1)
    statuses[i] = {
      ...req.body,
      id: req.params.id
    };

  fs.writeFile('statuses.json', JSON.stringify(statuses));
  res.send(statuses[i]);
});

app.delete('status/:id', (req, res) => {
  statuses.splice(statuses.findIndex(obj => obj.id === req.params.id), 1);
  fs.writeFile('statuses.json', JSON.stringify(statuses));
});

app.listen(port, () => {
  console.log(`Server up on port: ${port}`)
});

module.exports.app = app;
