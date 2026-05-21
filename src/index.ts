import app from "../src/app";
import config from "./config";
import { initDB } from "./config/db";

const main = () => {
  initDB();
  app.listen(config.port, () => {
    console.log(`Server Running on the port : ${config.port}`);
  });
};

main();






