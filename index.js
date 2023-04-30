const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();

app.use(express.json());
app.use("/", router);
app.set("json spaces", 4);
app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('404 Not Found')
});

app.listen(app.get('port'), () => {
  console.log('Server started on port', app.get('port'));
});
