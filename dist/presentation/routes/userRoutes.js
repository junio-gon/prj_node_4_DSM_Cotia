"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/users", (req, res) => { res.send("User rotes"); });
exports.default = router;
