import { Request, Response } from "express";
import path from "path";
import { getChunkPath } from "../util/helpers";

export const home = (req: Request, res: Response) => {
  res.render("home", {
    title: "Home",
    jsPath: getChunkPath(
      path.resolve(__dirname + "/../../dist/manifest.json"),
      "home.js"
    )
  });
};

export const app = (req: Request, res: Response) => {
  res.render("app", {
    jsPath: getChunkPath(
      path.resolve(__dirname + "/../../dist/manifest.json"),
      "app.js"
    )
  });
};
