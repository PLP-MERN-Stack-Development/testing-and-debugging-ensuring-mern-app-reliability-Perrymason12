const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120
    },
    content: {
      type: String,
      required: true,
      minlength: 10
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published'
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    publishedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

postSchema.pre('validate', function generateSlug(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title);
  }
  next();
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post;

