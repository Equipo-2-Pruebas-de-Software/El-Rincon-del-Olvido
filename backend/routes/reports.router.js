const express = require('express');
const { getReport, createReport } = require('../controllers/reports');

const router = express.Router();

router.get('/get-report', getReport);
router.post('/add-report', createReport);

module.exports = router;