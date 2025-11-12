const mongoose = require('mongoose');
const Post = require('../models/Post');
const slugify = require('../utils/slugify');

const ensureObjectId = (value, fieldName) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    const error = new Error(`Invalid ${fieldName} provided`);
    error.statusCode = 400;
    throw error;
  }

  return new mongoose.Types.ObjectId(value);
};

const buildSlug = async (title) => {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let suffix = 1;

  while (await Post.exists({ slug })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
};

const createPost = async (req, res, next) => {
  try {
    const { title, content, category, tags = [] } = req.body;

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ error: 'Title, content and category are required' });
    }

    const authorId = ensureObjectId(req.user.sub, 'author');
    const categoryId = ensureObjectId(category, 'category');

    const post = await Post.create({
      title,
      content,
      category: categoryId,
      author: authorId,
      tags,
      slug: await buildSlug(title)
    });

    res.status(201).json(post.toObject());
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const {
      category,
      page = 1,
      limit = 10,
      status = 'published'
    } = req.query;

    const query = {};

    if (category) {
      query.category = ensureObjectId(category, 'category');
    }

    if (status) {
      query.status = status;
    }

    const parsedLimit = Math.min(Number(limit) || 10, 50);
    const parsedPage = Math.max(Number(page) || 1, 1);

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit)
      .lean();

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).lean();

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.toString() !== req.user.sub) {
      return res.status(403).json({ error: 'You are not allowed to edit this post' });
    }

    if (updates.title && updates.title !== post.title) {
      post.slug = await buildSlug(updates.title);
    }

    Object.assign(post, updates);
    await post.save();

    res.json(post.toObject());
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.toString() !== req.user.sub) {
      return res
        .status(403)
        .json({ error: 'You are not allowed to delete this post' });
    }

    await post.deleteOne();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
};

