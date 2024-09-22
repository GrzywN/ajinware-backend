import express from 'express';
import coasters from './coasters.ts';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/coasters', coasters);

export default router;
