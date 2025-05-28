import express from "express";
import dotenv from "dotenv";
import { initSentry } from "@infrasctructure/config/sentry";
import { sentryRequestHandler, sentryErrorHandler, fallbackErrorHandler } from '@infrasctructure/middlewares/sentry.middleware';
import { Database } from "infrasctructure/config/Database";

dotenv.config();

async function startApp() {
    initSentry();
    await Database.init();
    console.log("Banco de dados inicializado com sucesso!");

    const app = express();
    app.use(express.json());
    app.use(sentryRequestHandler);

    // Error handlers
    app.use(sentryErrorHandler);
    app.use(fallbackErrorHandler);

    // var error = Sentry.captureException(new Error("Erro de teste do Sentry!"));
    // console.log("Erro de teste enviado para o Sentry. " + aaa);

    const userRoutes = await import("@presentation/routes/userRoutes");
    const authRoutes = await import("@presentation/routes/authRoutes");

    app.use("/api", userRoutes.default);
    app.use("/auth", authRoutes.default);

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