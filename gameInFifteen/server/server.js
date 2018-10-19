const express = require('express');
const path = require('path')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => {
  res.render('index.html')
})

app.listen(port, () => {
  console.log(`Server up at port ${port}`)
})