const AuthSchema = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Kullanıcı var mı kontrolü
    const user = await AuthSchema.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Böyle bir kullanıcı zaten var!!" });
    }

    // 2. Şifre uzunluğu kontrolü
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Şifre en az 6 karakter olmalıdır!!" });
    }

    // 3. Email formatı kontrolü
    if (!isEMail(email)) {
      return res
        .status(400)
        .json({ message: "Geçerli bir e-posta adresi giriniz!!" });
    }

    // 4. Şifre şifreleme
    const passwordHash = await bcrypt.hash(password, 12);

    // 5. Kullanıcı nesnesini oluşturma ve VERİTABANINA KAYDETME
    const newUser = new AuthSchema({
      username,
      email,
      password: passwordHash,
    });
    await newUser.save();

    // 6. Token Oluşturma
    const token = jwt.sign({ id: newUser._id }, "Secret Key", {
      expiresIn: "1h",
    });

    // 🔥 DÜZELTİLEN YER: "newUser" yerine "user: newUser" yapıldı
    res.status(201).json({
      status: "OK",
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthSchema.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Böyle bir kullanıcı bulunamadı!!" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ message: "Girilen şifre yanlış!!" });
    }

    const token = jwt.sign({ id: user._id }, "Secret Key", {
      expiresIn: "1h",
    });

    // Login zaten tertemiz "user" dönüyordu, ellemedik
    res.status(200).json({
      status: "OK",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function isEMail(email) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = {
  register,
  login,
};
