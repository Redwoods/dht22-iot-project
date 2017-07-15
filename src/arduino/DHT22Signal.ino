// DHT22 Project
// It is necessary to install DHT driver in Arduino environment.
// Copy DHT driver folder in Arduino libraries folder
//

#include "DHT.h"

#define DHTPIN 4
#define DHTTYPE DHT22 
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  dht.begin();
  Serial.begin(9600);
}

void loop() {

  float temp, humi, ftemp;

  // Reading temperature or humidity takes a given interval!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  humi = dht.readHumidity();
  // Read temperature as Celsius (the default)
  temp = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  ftemp = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(humi) || isnan(temp) || isnan(ftemp)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  else {
    // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(ftemp, humi);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(temp, humi, false);
  
    Serial.print("temperature:");
    Serial.print(temp,1);
    Serial.print(", humidity:");
    Serial.print(humi,1);
    Serial.print(", Heat index:");
    Serial.print(hic,0);
    Serial.println();
  }
  delay(60000);  // a data per 6 min = 6 * 60 * 1000 = 360000
}
