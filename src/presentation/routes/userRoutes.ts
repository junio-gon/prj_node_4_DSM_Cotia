import { Router } from "express";

const router = Router();

router.get("/users", (req, res) => { res.send("User rotes") });

export default router;