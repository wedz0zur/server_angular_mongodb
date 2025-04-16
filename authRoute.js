const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require('./midllewares/authMiddleware')

router.post("/registration", [
  check("username", "Имя пользователя не может быть пустым").trim().notEmpty(),
  check("password", "Пароль должен быть больше 6 символов и меньше 10 символов")
    .isLength({ min: 6, max: 10 })
    .notEmpty(),
  controller.reqistration,
]);
router.post("/login", controller.login);
router.get("/user", authMiddleware, controller.getUsers);
router.get("/profile", authMiddleware, controller.getMe);

module.exports = router;
