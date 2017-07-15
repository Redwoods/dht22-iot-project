// Express
var express = require('express');
var app = express();
// Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dht01');  // 'dht01' -> db name
var Schema = mongoose.Schema;
var dataSchema = new Schema({
    date : String,
    temperature : String,
    humidity : String
});
// data model
var ThData = mongoose.model('ThData', dataSchema);

/*app.get('/', function (req, res) {
  res.send('Hello DHT22!');
});*/

// find all data
app.get('/api/sensor', function (req, res) {
	ThData.find(function(err, data) {
		res.json(data);
	});
});

// find data by id
app.get('/api/sensor/:id', function (req, res) {
	ThData.findById(req.params.id, function(err, data) {
		res.json(data);
	});
});

// Delete data by id
app.delete('/api/sensor/:id', function (req, res) {
	ThData.remove({_id: req.params.id}, function(err, doc) {
		console.log(err);
		console.log(doc);
		// Check what is left in sensord after removing one
		Sensor.find(function(err, data) {
			res.json(data);
		});
	});

});

app.use(express.static(__dirname + '/public'));
// localhost:3030/
app.listen(3030);
console.log("Express_DHT22 is running at port:3030");
