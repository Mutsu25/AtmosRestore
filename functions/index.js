const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.relayProxy = functions.https.onRequest((req, res) => {
  // ✅ Set universal CORS headers
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  // ✅ Retrieve and validate query parameters
  const { relay, action, key } = req.query;
  const secretKey = "251101"; // Replace with same key as on ESP32

  // Debug logging for key comparison
  console.log("relayProxy: received params:", { relay, action, key });
  console.log("relayProxy: expected secretKey:", secretKey);
  if (!relay || !action || !key) {
    console.log("relayProxy: missing parameters");
    return res.status(400).send("Missing parameters");
  }

  if (key !== secretKey) {
    console.log(`relayProxy: forbidden - received key: '${key}', expected: '${secretKey}'`);
    return res.status(403).send("Forbidden: Invalid secret key");
  }

  // ✅ Forward to ESP32 via DuckDNS (must be public)
  const esp32URL = `http://esprelaynursery.duckdns.org/${relay}/${action}?key=${secretKey}`;

  fetch(esp32URL)
    .then(response => response.text())
    .then(text => {
      res.status(200).send(text);
    })
    .catch(error => {
      console.error("Error contacting ESP32:", error);
      res.status(500).send("Failed to reach ESP32");
    });
});