const Blog = require("../models/blogmodel");
const Subscriber = require("../models/subscribermodel");
const { sendnewsletter } = require("../utils/mailservice");
const cloudinary = require("../utils/cloudinary");

/* CREATE BLOG WITH IMAGE */
const createblog = async (req, res) => {
  try {
    // ✅ SAFE ACCESS
    const title = req.body?.title;
    const content = req.body?.content;
    const author = req.body?.author;

    if (!title || !content) {
      return res.status(400).json({ message: "title and content required" });
    }

    let imageUrl = "";

    if (req.file && req.file.buffer) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blogs" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const blog = await Blog.create({
      title,
      content,
      author,
      image: imageUrl,
    });

    const subscribers = await Subscriber.find();

    setImmediate(() => {
      sendnewsletter(subscribers, blog);
    });

    res.status(201).json({
      message: "blog created",
      data: blog,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL BLOGS */
const getblogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* GET SINGLE BLOG */
const getblogbyid = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    res.status(200).json({ data: blog });

  } catch (error)
   
   {
    console.log("createblog error:", error); // 👈 ADD THIS
    res.status(500).json({ message: error.message });
  }
};


/* UPDATE BLOG (OPTIONAL IMAGE UPDATE) */
const updateblog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    let updateData = { title, content, author };

    // 🔥 update image if provided
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blogs" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      updateData.image = uploadResult.secure_url;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    res.status(200).json({
      message: "blog updated successfully",
      data: blog,
    });

  } catch (error) {
    console.log("createblog error:", error); // 👈 ADD THIS
    res.status(500).json({ message: error.message });
  }
};


/* DELETE BLOG */
const deleteblog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    res.status(200).json({
      message: "blog deleted successfully",
    });

  } catch (error) {
    console.log("createblog error:", error); // 👈 ADD THIS
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createblog,
  getblogs,
  getblogbyid,
  updateblog,
  deleteblog,
};