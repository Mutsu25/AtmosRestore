#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define TdsSensorPin 34
#define VREF 3.3
#define SCOUNT 30
#define ONE_WIRE_BUS 2

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
LiquidCrystal_I2C lcd(0x27, 20, 4);

int analogBuffer[SCOUNT];
int analogBufferTemp[SCOUNT];
int analogBufferIndex = 0, copyIndex = 0;
float averageVoltage = 0, tdsValue = 0;
float temperature = 25.0;

void showWelcomePage() {
    lcd.clear();
    const char* line1 = "Presenting";
    const char* line2 = "AtmosPrecision";
    lcd.setCursor((20 - strlen(line1)) / 2, 0);
    lcd.print(line1);
    lcd.setCursor((20 - strlen(line2)) / 2, 2);
    lcd.print(line2);
    delay(3000);
}

void showInitiationPage() {
    lcd.clear();
    const char* line1 = "System Initializing";
    const char* line2 = "Please Wait.....";
    lcd.setCursor((20 - strlen(line1)) / 2, 0);
    lcd.print(line1);
    lcd.setCursor((20 - strlen(line2)) / 2, 2);
    lcd.print(line2);
    delay(3000);
}

void setup() {
    Serial.begin(115200);
    pinMode(TdsSensorPin, INPUT);
    sensors.begin();
    lcd.init();
    lcd.backlight();
    showWelcomePage();
    showInitiationPage();
}

void loop() {
    static unsigned long analogSampleTimepoint = millis();
    if (millis() - analogSampleTimepoint > 40) {
        analogSampleTimepoint = millis();
        analogBuffer[analogBufferIndex] = analogRead(TdsSensorPin);
        analogBufferIndex++;
        if (analogBufferIndex == SCOUNT)
            analogBufferIndex = 0;
    }

    static unsigned long printTimepoint = millis();
    if (millis() - printTimepoint > 800) {
        printTimepoint = millis();
        sensors.requestTemperatures();
        temperature = sensors.getTempCByIndex(0);

        for (copyIndex = 0; copyIndex < SCOUNT; copyIndex++)
            analogBufferTemp[copyIndex] = analogBuffer[copyIndex];

        averageVoltage = getMedianNum(analogBufferTemp, SCOUNT) * VREF / 4095.0;
        float compensationCoefficient = 1.0 + 0.02 * (temperature - 25.0);
        float compensationVoltage = averageVoltage / compensationCoefficient;

        tdsValue = (133.42 * compensationVoltage * compensationVoltage * compensationVoltage
                    - 255.86 * compensationVoltage * compensationVoltage
                    + 857.39 * compensationVoltage) * 0.5;

        Serial.print("Temperature: ");
        Serial.print(temperature);
        Serial.println(" °C");
        Serial.print("Salinity: ");
        Serial.print(tdsValue / 1000, 3);
        Serial.println(" PPT");
        Serial.print("TDS: ");
        Serial.print(tdsValue, 0);
        Serial.println(" PPM");

        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Temp: ");
        lcd.print(temperature, 1);
        lcd.print(" C");
        
        lcd.setCursor(0, 1);
        lcd.print("Salinity: ");
        lcd.print(tdsValue / 1000, 3);
        lcd.print(" PPT");
        
        lcd.setCursor(0, 2);
        lcd.print("TDS: ");
        lcd.print(tdsValue, 0);
        lcd.print(" PPM");
    }
}

int getMedianNum(int bArray[], int iFilterLen) {
    int bTab[iFilterLen];
    for (byte i = 0; i < iFilterLen; i++)
        bTab[i] = bArray[i];
    int i, j, bTemp;
    for (j = 0; j < iFilterLen - 1; j++) {
        for (i = 0; i < iFilterLen - j - 1; i++) {
            if (bTab[i] > bTab[i + 1]) {
                bTemp = bTab[i];
                bTab[i] = bTab[i + 1];
                bTab[i + 1] = bTemp;
            }
        }
    }
    if ((iFilterLen & 1) > 0)
        bTemp = bTab[(iFilterLen - 1) / 2];
    else
        bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
    return bTemp;
}
