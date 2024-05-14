import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middlewares/error.middleware";
import router from "./router";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL as string,
      process.env.ADMIN_URL as string,
      "http://localhost:3000",
      "http://localhost:3011",
      "http://localhost:3012",
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/uploads", express.static("src/uploads"));

app.use("/api", router);

// Обработка несуществующих маршрутов
app.use((req: Request, res: Response) => {
  res.status(404).send("Страница не найдена");
});

//обработчик ошибок
app.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("Подключение к базе данных прошло успешно!");
    // Запуск сервера
    app.listen(port, () => {
      console.log(`Сервер запущен по адресу http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Подключение к базе данных не удалось:", err);
  });
