import cloudinary from "../lib/cloudinary.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
import { sendCommentNotificationEmail } from "../emails/emailHandlers.js";
import e from "express";


export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ auther: { $in: req.user.connections } })
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name  profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getFeedPosts controller: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    let newPost;
    if (image) {
      const imageResult = await cloudinary.uploader.upload(image);
      newPost = new Post({
        auther: req.user._id,
        content,
        image: imageResult.secure_url,
      });
    } else {
      newPost = new Post({ auther: req.user._id, content });
    }
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error in createPost controller: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // check if the user is the author of the post
    if (post.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    // delete the image from cloudinary
    if (post.image) {
      const imageId = post.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imageId);
    }
    await post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost controller: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name  profilePicture username headline");

    res.status(200).json(post);
  } catch (error) {
    console.error("Error in getPostById controller: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    const post = await Post.findById(
      postId,
      {
        $push: { comments: { user: req.user._id, content } },
      },
      { new: true }
    ).populate("auther", "name email username headline profilePicture ");

    // create a notification if the comment is not the post author
    if (post.author.toString() !== req.user._id.toString()) {
      const newNotification = new Notification({
        recipient: post.author,
        type: "comment",
        relatedUser: req.user._id,
        relatedPost: postId,
      });

      await newNotification.save();
      try {
        const postUrl = process.env.CLIENT_URL + "/post/postId";
        await sendCommentNotificationEmail(
          post.author.email,
          post.auther.name,
          req.user.name,
          postUrl,
          content
        );
        
      } catch (error) {
        console.log("Error in sending email: ", error);
        
      }
    }
    res.status(200).json(post);

  } catch (error) {
    console.error("Error in createComment controller: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    const userId = req.user._id;

    if(post.likes.includes(userId)){
      // unlike the post
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    }else{
      // like the post
      post.likes.push(userId);
      // create a notification if the post owner is not the user who liked
      if(post.author.toString() !== userId.toString()){
        const newNotification = new Notification({
          recipient: post.author,
          type: "like",
          relatedUser: userId,
          relatedPost: postId,
        });
        await newNotification.save();
      }

    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error("Error in likePost controller: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};
