import "dotenv/config";
import http from "http";
import { createBot } from "./bot.js";

const PORT = Number(process.env.PORT || 3000);

function startHealth(port: number) {
  return new Promise<void>((resolve) => {
    const server = http.createServer((_, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("OK");
    });
    server.listen(port, "127.0.0.1", () => {
      console.log(`[health] http://127.0.0.1:${port}`);
      resolve();
    });
  });
}

(async () => {
  await startHealth(PORT);
  const bot = createBot();
  await bot.launch();
  console.log("Bot Telegram iniciado ✅");

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
})();
