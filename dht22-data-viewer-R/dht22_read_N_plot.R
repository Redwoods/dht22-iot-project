library(jsonlite)

dht <- fromJSON("DHT22_170303_6weeks.json", flatten=TRUE)
colnames(dht)
summary(dht)
head(dht)
tail(dht)

str(dht)

# graph
par(mfrow=c(2,1))
plot(dht$temperature, type = "b", pch = 19, ylim=c(0,1.1*max(as.numeric(dht$temperature))), 
     xlab = "Temperature", main = "T & H from DHT22")
plot(dht$humidity, type = "b", pch = 19, ylim=c(0,1.1*max(as.numeric(dht$humidity))), xlab = "Humidity")

par(mfrow=c(1,1))
matplot(cbind(dht$temperature,dht$humidity), ylim=c(0,1.1*max(as.numeric(dht$temperature),as.numeric(dht$humidity))), pch = 18:19, col=2:3, xlab = "data index", main = "T & H from DHT22")
legend(1,60,c("Temp", "Humi"), pch = c(18,19), col=c(2,3), lty = c(1,2))
