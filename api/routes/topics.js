const express = require('express');
const router = express.Router();

// Import middlewares
const asyncHandler = require('../middleware/async-handler');
const authenticateLogin = require('../middleware/user-auth');

// Import Models
const { Article, User, Topic, Category } = require('../models');

// Import Op
const { Sequelize } = require('../models');
const { Op } = Sequelize;


// GET finds and displays all topics
router.get('/', asyncHandler(async (req, res) => {
  const topics = await Topic.findAll({
    attributes: ['id', 'name', 'relatedTags', 'categoryId'],
    include: [ { 
      model: Article, 
      attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'topicId', 'published', 'credits'],
      include: [{
        model: User,
        attributes: ['firstName', 'lastName']
      }] 
    }]
  });

  res.status(200).json(topics);
}));

// GET finds and sends back a specific topics by tag
router.get('/tag/:tag', asyncHandler(async (req, res) => {
  const topics = await Topic.findAll({
    attributes: ['id', 'name', 'relatedTags', 'categoryId'],
    include: [ { 
      model: Article, 
      attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'topicId', 'published', 'credits'],
      include: [{
        model: User,
        attributes: ['firstName', 'lastName']
      }] 
    }],
    where: { relatedTags: { [Op.substring]: req.params.tag } }
  });

  if( topics ) {
    res.status(200).json(topics);
  } else {
    res.status(404).end();
  }
}));

// GET finds and sends back specific topics by query
router.get('/query/:query', asyncHandler(async (req, res) => {
  const topics = await Topic.findAll({
    attributes: ['id', 'name', 'relatedTags', 'categoryId'],
    include: [ { 
      model: Article, 
      attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'topicId', 'published', 'credits'],
      include: [{
        model: User,
        attributes: ['firstName', 'lastName']
      }] 
    }],
    where: { 
      [Op.or]: [
      { name: { [Op.substring]: req.params.query } },
      { relatedTags: { [Op.substring]: req.params.query } }
    ]}
  });

  if( topics ) {
    res.status(200).json(topics);
  } else {
    res.status(404).end();
  }
}));

// GET finds and displays a specific topic by name
router.get('/name/:name', asyncHandler(async (req, res) => {
  const topic = await Topic.findOne({
    attributes: ['id', 'name', 'relatedTags', 'categoryId'],
    include: [{ 
      model: Article, 
      attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'topicId', 'published', 'credits'],
      include: [{
        model: User,
        attributes: ['firstName', 'lastName']
      }]
    }],
    where: { name: req.params.name }
  });

  if( topic ) {
    res.status(200).json(topic);
  } else {
    res.status(404).end();
  }
}));

// GET finds and displays a specific topic by ID
router.get('/id/:id', asyncHandler(async (req, res) => {
  const topic = await Topic.findByPk(req.params.id, {
    attributes: ['id', 'name', 'relatedTags', 'categoryId'],
    include: [ { 
      model: Article, 
      attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'topicId', 'published', 'credits'],
      include: [{
        model: User,
        attributes: ['firstName', 'lastName']
      }] 
    }]
  });

  if( topic ) {
    res.status(200).json(topics);
  } else {
    res.status(404).end();
  }
}));

// POST creates a new topic ( Admin Only )
router.post('/', authenticateLogin, asyncHandler(async (req, res) => {
  const isAdmin = req.currentUser.accessLevel === 'admin';
  if (isAdmin) {
    const topic = await Topic.create(req.body);
    res.location(`/api/topics/${topic.id}`).status(201).end();
  } else {
    res.status(403).end();
  }
}));

// PUT updates the chosen topic ( Admin Only )
router.put('/:id', authenticateLogin, asyncHandler(async (req, res) => {
  const isAdmin = req.currentUser.accessLevel === 'admin';
  if (isAdmin) {
    await Topic.update(req.body, { where: { id: req.params.id } })
      .then(response => {
        if (!response.name) {
          res.status(204).end()
        }
      });
  } else {
    res.status(403).end();
  }
}));

// DELETE deletes the chosen topic ( Admin Only )
router.delete('/:id', authenticateLogin, asyncHandler(async (req, res) => {
  const isAdmin = req.currentUser.accessLevel === 'admin';
  if (isAdmin) {
    await Topic.destroy({ where: { id: req.params.id } })
      .then(res.status(204).end());
  } else {
    res.status(403).end();
  }
}));

module.exports = router;