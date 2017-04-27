# dht22-iot-project

Iot project to monitor data streaming from DHT22 wired to Arduino,
using Arduino, node.js, Mongodb, plotly, angulas.js.

## Goal of this work

How can you understand the change in temperature cause the change  in humidity or vice versa?

## Procedure of coding

### [1] Environment

 - Arduino
 - Node.js, Express server
 - Sublime Text 3
 - Mongo DB
 - Plotly.js
 - Angular.js

### [2] Overall design

1. Arduino coding with DHT22
2. Receive data from DHT22 using serialport.io & socket.io in node.js.
3. Store data in Mongo DB and emit data through socket
4. Start WEB server in node.js
5. Design MEAN WEB client to view streaming data.
6. Run WEB client to monitor DHT22 data streaming.

### [3] coding steps

1. Arduino: start DHT22Signal.ino (DHT22 sensor starts to make data)
2. Mongo db: mongod --dbpath D:\mongo\data  ( Mongo DB start )
3. node.js, SB3:   run data_dht22_mongodb.js   (Store data in Mongodb, ^B)
4. node.js: run express_dht.js (express WEB server with connection to Mongodb)

            node \path\express_dht.js
                         
5. MEAN WEB client: Connect and monitor signal from DHT22

   http://chaos.inje.ac.kr:3030/index_plotly.html
   
6. Data mining and visualization

### [4] Mining : R (transfer entropy, machine learning)

### [5] Visualization: plot.ly , R 

* Tip: Maintenance

MongoDB repair

mongod --dbpath /data/db --repair

When MongoDB will NOT be repaired, just make a new folder /data/db1 and restart mongod
