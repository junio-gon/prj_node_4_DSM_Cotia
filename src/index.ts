import express from "express";
import dotenv from "dotenv";
import { initSentry } from "@infrasctructure/config/sentry";
import { sentryRequestHandler, sentryErrorHandler, fallbackErrorHandler } from '@infrasctructure/middlewares/sentry.middleware';
import { Database } from "infrasctructure/config/Database";

dotenv.config();

async function startApp() {
    // Require this first!
    // require(".../../../instrument.js");

    // All other imports below
    // Import with `import * as Sentry from "@sentry/node"` if you are using ESM
    // const Sentry = require("@sentry/node");
    // Sentry.init({
    //   dsn: "https://fc2d0d59633e127ed2d4b74fc7a5b441@o4504567848632320.ingest.us.sentry.io/4509378997714944",
    //   sendDefaultPii: true,
    // });
    initSentry();
    await Database.init();
    console.log("Banco de dados inicializado com sucesso!");

    const app = express();
    app.use(express.json());
    app.use(sentryRequestHandler);

    // Error handlers
    app.use(sentryErrorHandler);
    app.use(fallbackErrorHandler);

      // var aaa = Sentry.captureException(new Error("Erro de teste do Sentry!"));
      // console.log("Erro de teste enviado para o Sentry. " + aaa);

    const userRoutes = await import("@presentation/routes/userRoutes");
    app.use("/api", userRoutes.default);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Application is running on port ${PORT}`));
}

startApp();

/*
const app = express();
app.use(express.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Application is running on port ${PORT}`));
*/