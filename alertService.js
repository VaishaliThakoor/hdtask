const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/alert', (req, res) => {
  const { patientId, heartRate, bloodPressure, oxygenLevel } = req.body;

  // Check for abnormalities and trigger alerts if necessary
  if (heartRate > 100) {
    triggerAlert(patientId, 'High heart rate detected!');
  }

  if (bloodPressure[0] > 120 || bloodPressure[1] > 80) {
    triggerAlert(patientId, 'High blood pressure detected!');
  }

  if (oxygenLevel < 100) {
    triggerAlert(patientId, 'Low level oxygen detected!');
  }

  res.status(200).json({ message: 'Alert processed' });
});

function triggerAlert(patientId, message) {
  console.log(`ALERT - Patient ${patientId}: ${message}`);
}

app.listen(4000, () => {
  console.log('Alert Service listening on port 4000');
});

