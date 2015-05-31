var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var ObjectID = require('mongodb').ObjectID;
var format = require('util').format;

var phoneBook = null;
var url = 'mongodb://localhost:27017/test';
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
   
   //res.send('hello world');
});

app.get('/addContact',function(request,response)
{
  var insertData = {
    contact_id:     request.query.contact_id,
    name:           request.query.name,
    tel:         request.query.tel
  };

  phoneBook.insert(insertData,function()
  {
    response.send('Success');
  });
});

app.get('/getContact/:contact_id?',function(request,response)
{
  var find = {};

  if(request.params.contact_id)
    find.contact_id = request.params.contact_id;

  phoneBook.find(find).toArray(function(err,result)
  {
    response.send(JSON.stringify(result));
  });
});

app.get('/updateContact/:contact_id',function(request,response)
{
  var find = {};
  var newData = {};
  if(request.params.contact_id)
    find._id = new ObjectID(request.params.contact_id);

  if(request.query.name)
    newData.name = request.query.name;
  if(request.query.tel)
    newData.tel = request.query.tel;
 
    console.log(newData);

  phoneBook.update(find,{'$set':newData},function(err,result)
  {
    response.send('Success');
  });
});

app.get('/removeContact/:contact_id',function(request,response)
{
  var find = {};
  if(request.params.contact_id)
    find._id = new ObjectID(request.params.contact_id);

  phoneBook.remove(find,function(err,result)
  {
    if(err)
      response.send(err);
    else
    response.send('Success');
  });
});


MongoClient.connect(url, function(err, db) {
  if(err) throw err;
  phoneBook = db.collection('phone_book');
  app.listen(app.get('port')), function() {
                console.log("\nhttp://127.0.0.1:");
            }

});


app.listen(3000);


 
  
  









