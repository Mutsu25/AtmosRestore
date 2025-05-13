#define TdsSensorPin 34  // Use an appropriate ADC-capable pin for the ESP32
#define VREF 3.3         // Reference voltage
#define SCOUNT 30        // Sample count for averaging

int analogBuffer[SCOUNT];    // Store analog readings
int analogBufferTemp[SCOUNT];
int analogBufferIndex = 0, copyIndex = 0;
float averageVoltage = 0, tdsValue = 0, temperature = 25.0;  // Assume temperature is 25°C

void setup() {
    Serial.begin(115200);
    pinMode(TdsSensorPin, INPUT);
}

void loop() {
    static unsigned long analogSampleTimepoint = millis();
    if (millis() - analogSampleTimepoint > 40) {  // Read every 40 ms
        analogSampleTimepoint = millis();
        analogBuffer[analogBufferIndex] = analogRead(TdsSensorPin);
        analogBufferIndex++;
        if (analogBufferIndex == SCOUNT) 
            analogBufferIndex = 0;
    }

    static unsigned long printTimepoint = millis();
    if (millis() - printTimepoint > 800) {  // Print every 800 ms
        printTimepoint = millis();
        for (copyIndex = 0; copyIndex < SCOUNT; copyIndex++)
            analogBufferTemp[copyIndex] = analogBuffer[copyIndex];

        averageVoltage = getMedianNum(analogBufferTemp, SCOUNT) * (float)VREF / 4095.0; // Voltage conversion

        float compensationCoefficient = 1.0 + 0.02 * (temperature - 25.0);
        float compensationVoltage = averageVoltage / compensationCoefficient;

        tdsValue = (133.42 * compensationVoltage * compensationVoltage * compensationVoltage
                    - 255.86 * compensationVoltage * compensationVoltage
                    + 857.39 * compensationVoltage) * 0.5;  // Convert voltage to TDS (ppm)

        float salinityValue = tdsValue / 1000;  // Convert ppm to ppt

        Serial.print("TDS Value: ");
        Serial.print(tdsValue, 0);
        Serial.print(" ppm");

        Serial.print(" | Salinity: ");
        Serial.print(salinityValue, 3);  // Print salinity in ppt with three decimal places
        Serial.println(" ppt");
    }
}

// Function to compute the median of an array
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