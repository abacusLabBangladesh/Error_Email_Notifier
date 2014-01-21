/*
step 1. export the module "EmailNotifier.js"
step 2. add 'nodemailer' as dependencies.
step 3. whenever an error occur the following method should be call:
    eventEmitter.emit("errorOccurred",err); //err is the error message return by the system

Error message will be mailed to : support_nerdcats@live.com

Login credential:
      user: "support_nerdcats@live.com",
      pass: "BangladeshNerd"

*/
var events = require('events');
var eventEmitter = new events.EventEmitter();
var nodemailer = require("nodemailer");
var config = require('./config.json');

var smtpTransport = nodemailer.createTransport("SMTP", config.authInfo);

var sendEmail = function sendEmail(err) {
    
    var mailOptions = {
    from: config.mailOptions.from, 
    to: config.mailOptions.to, 
    subject: config.mailOptions.subject,
    text: err.toString()
};
   smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else
    {
        console.log("Message sent: " + response.message);
    }
});
};
eventEmitter.on('errorOccurred', sendEmail);

module.exports.notify = function(error) {
    eventEmitter.emit("errorOccurred", error);
};


