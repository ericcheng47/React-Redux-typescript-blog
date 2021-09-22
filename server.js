//Install express server
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const server = require('http').createServer(app);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/build'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("upload"));

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/build/index.html'));
});

require("./server/routes/product.routes.js")(app);

// Start the app by listening on the default Heroku port
server.listen(process.env.PORT || 80, ()=>{
  console.log(`Server is running on port 80.`);
});
