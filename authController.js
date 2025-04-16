const User = require("./models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");
const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async reqistration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка регистрации", errors });
      }

      const { name, username, age, email, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }

      const hashPassword = bcrypt.hashSync(password, 8);
      const user = new User({
        name,
        username,
        age,
        email,
        password: hashPassword,
      });

      await user.save();
      return res.status(200).json("Регистрация прошла успешно");
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка регистрации" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Неправильный логин или пароль, повторите вход!` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res
          .status(400)
          .json({ message: "Введён неверный логин или пароль" });
      }
      const token = generateAccessToken(user._id);
      return res.status(200).json({ token: token });
    } catch (e) {
      console.log(e);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Ошибка при получении пользователей" });
    }
  }

  async getMe(req, res) {
    try {
      const user = await User.findOne(req.user._id);

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      res.json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Ошибка при получении пользователя" });
    }
  }
}

module.exports = new authController();
