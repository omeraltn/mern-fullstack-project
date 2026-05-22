// Önce çekirdek paketleri import edin
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// 🔥 EN KRİTİK DÜZELTME: Kendi dosyalarımızı çağırmadan ÖNCE .env dosyasını yüklüyoruz!
dotenv.config();

// Çevre değişkenleri yüklendikten sonra veritabanı ve rota dosyalarını çağırıyoruz
const database = require("./config/databese");
const authRouter = require("./routers/auth");
const postRouter = require("./routers/post.js");

// Express uygulamasını başlatın
const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware'ler (Rotalardan ÖNCE gelmeli)
app.use(cors());

// BodyParser ayarları
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Rotaları tanımlayın
app.use("/", authRouter);
app.use("/", postRouter);

// Veritabanı bağlantısını kurun (Artık MONGO_URI'yi sorunsuz okuyacak)
database();

// Sunucuyu ayağa kaldırın
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
