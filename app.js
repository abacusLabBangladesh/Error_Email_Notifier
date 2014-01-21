var fs = require('fs');
var emailNotifier = require('./EmailNotifier.js');

fs.readFile('thisFileNotExists.txt', function (err, data) {
     if (err) {
         emailNotifier.notify(err);
     };
  console.log(data);
});
