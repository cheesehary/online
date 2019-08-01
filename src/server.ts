import app from "./app";
import logger from "./util/logger";

const server = app.listen(app.get("port"), () => {
  logger.info(
    `app is running at port ${app.get("port")} in ${app.get("env")} mode`
  );
});

export default server;
