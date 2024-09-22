import express from 'express';
import { registerCoaster } from '../interfaces/controllers/coaster.controller.ts';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(['😀', '😳', '🙄']);
});

router.post('/', registerCoaster);

export default router;
