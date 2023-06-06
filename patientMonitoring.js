const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.post('/data', (req, res) => {
  const { patientId } = req.body;
  const heartRate = getHeartRate();
  const bloodPressure = getBloodPressure();
  const oxygenLevel = getOxygenLevel();

  const data = {
    patientId,
    heartRate,
    bloodPressure,
    oxygenLevel,
  };

  sendToAlertService(data);

  res.status(200).json({ message: 'Data collected and sent to alert service' });
});

function getHeartRate() {
  // Generate a new random heart rate value
  return Math.floor(Math.random() * (100 - 60 + 1)) + 60;
}

function getBloodPressure() {
  // Generate new random systolic and diastolic blood pressure values
  const systolic = Math.floor(Math.random() * (120 - 80 + 1)) + 80;
  const diastolic = Math.floor(Math.random() * (80 - 50 + 1)) + 50;
  return [systolic, diastolic];
}

function getOxygenLevel() {
  // Generate a new random oxygen level value
  return Math.floor(Math.random() * (100 - 90 + 1)) + 90;
}

function sendToAlertService(data) {
  //http://localhost:4000/alert//
  axios.post('http://alert-service:4000/alert', data)
    .then(response => {
      console.log('Alert service response:', response.data);
    })
    .catch(error => {
      console.error('Failed to send data to alert service:', error.message);
    });
}

app.listen(3000, () => {
  console.log('Patient Monitoring Microservice listening on port 3000');
});
