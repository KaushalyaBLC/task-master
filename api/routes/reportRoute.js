const express = require('express');
const router = express.Router();
const {getSummaryReport,getTasksNext7Days, getTopTaskCreators} = require('../controllers/reportcontroller');

router.get('/', (req, res) => {
  getSummaryReport(req, res); 
});

router.get('/next7days', (req, res) => {
  getTasksNext7Days(req, res); 
});

module.exports = router;
