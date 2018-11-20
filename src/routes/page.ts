import express from 'express';
import { home, app } from '../controllers/page';

const router = express.Router();

router.get('/', home);
router.get('/app', app);

export default router;
