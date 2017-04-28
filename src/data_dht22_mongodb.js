var serialport = require('serialport');
var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var portName = 'COM3';  // change to your port.
var port    =   process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/dht10'); // 'dht10' -> db name
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("mongo db connection OK.");
    });

var dataSchema = new Schema({
    date : String,
    temperature : String,
    humidity : String
});

dataSchema.methods.info = function () {
    var greeting = this.date
    ? "Current date is " + this.date +", Temp: " + this.temperature 
    + ", Humi: " + this.humidity 
    : "I don't have a date"
    console.log("info() - " + greeting);
}

// server listens for socket.io communication at port 3000
var io = require('socket.io').listen(port, function(req, res){
    console.log('Listening on port : ' + server.address().port);
});

var sp = new serialport.SerialPort(portName,{
    baudRate: 9600,   // 9600  38400
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\r\n")
});

// Check client connection & status
io.sockets.on('connection', function (socket) {
    // If socket.io receives message from the client browser then 
    // this call back will be executed.
    socket.on('message', function (msg) {
        console.log(msg);
    });
    // If a web browser disconnects from Socket.IO then this callback is called.
    socket.on('disconnect', function () {
        console.log('disconnected');
    });
});

var readData = '';  // this stores the buffer
var temp ='';
var humi ='';
var dht22data =[]; // this array stores date and data of temp, humi.
var firstcolonidx = 0;

var ThData = mongoose.model('ThData', dataSchema);

// When data arrive on serial port,
sp.on('data', function (data) { // call back when data is received
    readData += data.toString(); // append data to buffer
    firstcolonidx = readData.indexOf(':');
 
    if (readData.lastIndexOf(':') > firstcolonidx && firstcolonidx > 0) {
        temp = readData.substring(firstcolonidx + 1, readData.indexOf(','));
        humi = readData.substring(readData.indexOf(':', firstcolonidx+1) + 1, readData.lastIndexOf(','));
        //console.log(firstcolonidx + "," + readData.indexOf(':', firstcolonidx+1))
        readData = '';
        
        dStr = getDateString();
        dht22data[0]=dStr;  // Date
        dht22data[1]=temp;  // temperature data
        dht22data[2]=humi;  // humidity data
        //console.log(dht22data);

        var dht = new ThData({date: dStr, temperature: temp, humidity: humi});
        //console.log(dht.id);
        //console.log(dht);

        // save data to mongodb and display current message using info().
        dht.save(function(err, dht) { 
            if(err) return handleError(err);
            
            dht.info();
        });

        io.sockets.emit('message', dht22data);  // send data to all clients 

    } else {  // error 
        console.log(readData);
    }
    
});

// helper function to get a nicely formatted date string
function getDateString() {
    var time = new Date().getTime();
    // 32400000 is (GMT+9 Korea, GimHae)
    // for your timezone just multiply +/-GMT by 3600000
    var datestr = new Date(time +32400000).toISOString().replace(/T/, ' ').replace(/Z/, '');
    return datestr;
}
