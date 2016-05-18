var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();
var postgres = require("./postgres.js");
var logFmt = require("logfmt");
app.set('views', __dirname + '/views') ;

app.get('/' , function(req,res) {
    res.sendfile('views/index.html');
});

app.get('/Login' , function(req,res) {
    postgres.Login(req, res);
} );

app.get('memberPaidARPPurchaseOptions', function(req,res){
    postgres.memberPaidARPPurchaseOptions(req,res);
});

app.get('affiliatePurchaseOptions', function(req,res){
    postgres.affiliatePaidARPPurchaseOptions(req,res);
});

app.post('recordARPMembershipPurchase', function(req,res){
    postgres.createTable(req,res);
});

// app.get('/db/dropTable', function(req,res){
//     postgres.dropTable(req,res);
// }); 

// app.set('port', process.env.PORT || 3001);
// app.use(express.static(__dirname + '/client'));  

// app.listen(app.get('port'), function () {
//     console.log('Express server listening on port ' + app.get('port'));
// });