import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import {
  getSummary,
  downloadReport,
  getChartData,
  getAnomalies
} from '../controllers/report.controller.js';

const router = express.Router();

router.use(auth);

router.get('/summary', getSummary);
router.get('/download', downloadReport);
router.get('/chart-data', getChartData);
router.get('/anomalies', getAnomalies);

export default router;
