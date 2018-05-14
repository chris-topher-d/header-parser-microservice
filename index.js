const express = require('express');
const app = express();
const os = require('os');
const parser = require('ua-parser-js');

app.get('/', (req, res) => {
  let ip = getAddress();
  let language = req.headers['accept-language'].split(',')[0];
  let ua = parser(req.headers['user-agent']);

  res.send({
    ipaddress: ip,
    language: language,
    software: ua.os.name + " " + ua.os.version
  });
});


function getAddress() {
  let ifaces = os.networkInterfaces();
  let address;

  Object.keys(ifaces).forEach(key => {
    ifaces[key].filter(obj => {
      if (obj.family === 'IPv4' && obj.internal === false) {
        address = obj.address;
      }
    });
  });

  return address;
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
