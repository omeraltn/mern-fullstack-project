const PostSchema = require("../models/post");

const getPosts = async (req, res) => {
  try {
    const posts = await PostSchema.find(); // Değişken ismini getPosts yerine posts yaptık (karışıklık olmasın)
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPosts = async (req, res) => {
  try {
    // Gelen veriyi güvene almak için destruct edebilirsin
    const { user, title, description } = req.body;

    const newPost = await PostSchema.create({
      user,
      title,
      description,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePosts = async (req, res) => {
  try {
    // 🔥 DÜZELTME: req.body ikinci parametre olarak eklendi
    const update = await PostSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePosts = async (req, res) => {
  try {
    await PostSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post başarıyla silindi!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
};
