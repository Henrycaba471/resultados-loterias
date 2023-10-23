import express from 'express';
import { getLotResult, getLotResultPost } from '../controllers/results.js';

const router = express.Router();

router.get('/', getLotResult);
router.post('/traer-resultados', getLotResultPost);

export { router }