import mongoose from 'mongoose';
import Article from '../models/articles.js';

export async function getAllArticles(req, res) {
  try {
    const articles = await Article.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    return res.status(200).json(articles);
  } catch (error) {
    console.error('Could not get articles:', error);
    return res.status(500).json({ message: 'Unable to get articles.' });
  }
}

export async function getArticleById(req, res){
  try{
    const {id} = req.params;
    const article = await Article.findById(id).populate('author', 'name');
    if (!article){
      return res.status(404).json({ message: 'Article not found.' });
    }
     return res.status(200).json(article);
  } catch (error) {
    console.error('Could not get article:', error); 
    return res.status(500).json({ message: 'Unable to get article.' });
  }
}

export async function createArticle(req, res) {
  try {
    const { title, content, imageUrl, category, excerpt } = req.body;
    if (!title || !content || !category || !excerpt) {
      return res.status(400).json({ message: 'Title, story, category, and description are required.' });
    }

    const article = await Article.create({
      title,
      content,
      imageUrl,
      category,
      excerpt,
      author: req.user._id,
    });
    return res.status(201).json(article);
  } catch (error) {
    console.error('Could not create article:', error);
    return res.status(500).json({ message: 'Unable to create this article.' });
  }
}

export async function updateArticle(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid article id.' });
    }

    const { title, content, imageUrl, category, excerpt } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content, imageUrl, category, excerpt },
      { new: true, runValidators: true },
    );
    if (!article) {
      return res.status(404).json({ message: 'Article not found.' });
    }
    return res.status(200).json(article);
  } catch (error) {
    console.error('Could not update article:', error);
    return res.status(500).json({ message: 'Unable to update this article.' });
  }
}

export async function deleteArticle(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid article id.' });
    }

    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found.' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('Could not delete article:', error);
    return res.status(500).json({ message: 'Unable to delete this article.' });
  }
}
