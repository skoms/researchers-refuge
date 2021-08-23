const express = require('express');
const router = express.Router();

// Import middlewares
const asyncHandler = require('../middleware/async-handler');

// Import Models
const { Article, User, Topic, Category } = require('../models');

// GET finds and sends back all the categories and all the topics that are a part of it
router.get('/', asyncHandler(async (req, res) => {
  const categories = await Category.findAll({
    attributes: ['id', 'name'], 
    include: [{ model: Topic, attributes: ['categoryId','id', 'name', 'relatedTags'] }]});

  res.status(200).json(categories);
}));

// GET finds specified category and basic info on its owner
router.get('/:id', asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    attributes: ['id', 'name'], 
    include: [{ model: Topic, attributes: ['categoryId','id', 'name', 'relatedTags'] }]});
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).end();
  }
}));

module.exports = router;