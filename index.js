// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:dateInput?", (req, res)=>{
  let dateInput = req.params.dateInput;
  let dateOutput;
  
  //return current date if string is empty
  !dateInput? dateOutput = new Date()
  :isNaN(dateInput)? dateOutput = new Date(dateInput)
  : dateOutput = new Date(parseInt(dateInput))
  
     dateOutput.toString() === 'Invalid Date'? res.json({error: dateOutput.toString()})
   : res.json({unix: dateOutput.getTime(),  utc:dateOutput.toUTCString()});
  });



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
