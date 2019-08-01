import express from "express";
import { controllerErrorWrap as ceWrap } from "../../util/helpers";
import { login, validate } from "../../controllers/account";

const router = express.Router();

router.post("/login", validate("login"), ceWrap(login));

export default router;
