const express = require("express");
const ctrl = require("../../controllers/user-controllers");
const { validateBody } = require("../../utils");

const { schemas, emailSchema } = require("../../models/user-schema");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", validateBody(emailSchema), ctrl.resendVerifyEmail);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
