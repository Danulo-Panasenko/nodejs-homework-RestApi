const express = require("express");
const ctrl = require("../../controllers/user-controllers");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/user-schema");
const { authenticate } = require("../../middlewares");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
module.exports = router;