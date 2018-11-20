import express, { Request, Response, NextFunction } from 'express';
import apiRouter from './v1';
import pageRouter from './page';

const router = express.Router();

router.use('/', pageRouter);
router.use('/apiv1', apiRouter);

router.use(
  '/',
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({ code: -1, msg: err.message || 'Server Error' });
  }
);

export default router;
