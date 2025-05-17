import express from "express";
import router from "./routes";
import cors from "cors";

function createApp() {
  const app = express();

  app.use(
    cors({
      //origin: "https://vaccinecontrol.vercel.app",
      origin: "http://localhost:4200",
    })
  );

  app.options("*", cors());

  app.use(express.json());
  app.use("/", router);

  return app;
}

export default createApp;
