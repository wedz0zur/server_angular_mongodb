const express = require("express");
const cors = require('cors')
const {default: mongoose} = require("mongoose")
const PORT = process.env.PORT || 5000;
const authRouter = require("./authRoute");

const app = express();

app.use(cors())

app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017');
    app.listen(PORT, () => {
      console.clear();
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
