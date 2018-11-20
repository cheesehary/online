import { Request, Response } from 'express';
import { getChunkPath } from '../util/helpers';

export const home = (req: Request, res: Response) => {
  res.render('home', {
    title: 'Home',
    jsPath: getChunkPath('../public/manifest.json', 'home.js')
  });
};

export const app = (req: Request, res: Response) => {
  res.render('app', {
    jsPath: getChunkPath('../public/manifest.json', 'app.js')
  });
};
