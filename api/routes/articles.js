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

// Helper function
const isStringAndStringToArray = (value) => {
  if (typeof value !== 'object') {
    if (value.length === 1 || typeof value === 'number') {
      return [value.toString()];
    } else if (value === '') {
      return [];
    } else {
      return value.split(',').filter(entry => entry !== ' ' && entry !== '');
    }
  } else {
    return value;
  }
}

// GET finds and displays all the articles and basic info on their owners
router.get('/', asyncHandler(async (req, res) => {
  const articles = await Article.findAll({
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'topicId', 'published', 'credits'], 
    include: [ { model: User, attributes: ['firstName', 'lastName', 'emailAddress'] } ] });

  res.status(200).json(articles);
}));

// GET finds and sends back a specific articles by tag
router.get('/tag/:tag', asyncHandler(async (req, res) => {
  const articles = await Article.findAll({
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'topicId', 'published', 'credits'], 
    include: [{ model: User, attributes: ['firstName', 'lastName', 'emailAddress']}],
    where: { tags: { [Op.substring]: req.params.tag } }
  });

  if( articles ) {
    res.status(200).json(articles);
  } else {
    res.status(404).end();
  }
}));

// GET finds and sends back specific articles by query
router.get('/query/:query', asyncHandler(async (req, res) => {
  const articles = await Article.findAll({
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'topicId', 'published', 'credits'], 
    include: [{ model: User, attributes: ['firstName', 'lastName', 'emailAddress']}],
    where: { 
      [Op.or]: [
      { title: { [Op.substring]: req.params.query } },
      { topic: { [Op.substring]: req.params.query } },
      { intro: { [Op.substring]: req.params.query } },
      { body:  { [Op.substring]: req.params.query } },
      { tags:  { [Op.substring]: req.params.query } }
    ]}
  });

  if( articles ) {
    res.status(200).json(articles);
  } else {
    res.status(404).end();
  }
}));

// GET gets articles by researchers the user follow (sorted by most recent)
router.get('/following', authenticateLogin, asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { emailAddress: req.currentUser.emailAddress }});
  const following = isStringAndStringToArray(user.following);

  const articles = await Article.findAll({
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'topicId', 'published', 'credits'], 
    include: [{ model: User, attributes: ['firstName', 'lastName', 'emailAddress']}],
    where: { userId: { [Op.in]: following } },
    order: [['published', 'DESC']]
  });

  if( articles ) {
    res.status(200).json(articles);
  } else {
    res.status(404).end();
  }
}));

// GET finds specified article and basic info on its owner
router.get('/:id', asyncHandler(async (req, res) => {
  const article = await Article.findByPk(req.params.id, { 
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'published', 'credits'], 
    include: [ { model: User, attributes: { exclude: ['emailAddress', 'password', 'createdAt', 'updatedAt'] } } ] });
  if (article) {
    res.status(200).json(article);
  } else {
    res.status(404).end();
  }
}));

// GET finds and displays all the articles and basic info on their owners
router.get('/owner/:id', asyncHandler(async (req, res) => {
  const articles = await Article.findAll(({
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'published', 'credits'], 
    include: [{ model: User, attributes: ['firstName', 'lastName', 'emailAddress', 'accessLevel']}],
    where: { userId: req.params.id }
  }));

  if (articles) {
    res.status(200).json(articles);
  } else {
    res.status(404).end();
  }
}));

// POST creates a new article and assigns the logged authenticated user as its owner
router.post('/', authenticateLogin, asyncHandler(async (req, res) => {
  req.body.userId = req.currentUser.id;
  const topic = await Topic.findOne({ where: { name: req.body.topic } });
  if (topic) {
    req.body.topicId = topic.id;
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } else {
    res.status(400).send(`Unable to find '${req.body.topic}'.`);
  }
}));

// PUT updates the chosen article if the user is authenticated to do so
router.put('/:id', authenticateLogin, asyncHandler(async (req, res) => {
  const article = await Article.findOne({ where: { id: req.params.id } });
  const owner = await User.findOne({ where: { id: article.userId }});

  const isOwner = owner.emailAddress === req.currentUser.emailAddress;
  const isAdmin = req.currentUser.accessLevel === 'admin';

  if (isOwner || isAdmin) {
    await Article.update(req.body, { where: { id: req.params.id } })
      .then(response => {
        if (!response.name) {
          res.status(204).end()
        }
      });
  } else {
    res.status(403).end();
  }
}));

// PUT updates an articles credits (accredits or discredits article) 
router.put('/credit/:id', authenticateLogin, asyncHandler(async (req, res) => {
  const article = await Article.findOne({ where: { id: req.params.id } });
  const creditor = await User.findOne({ where: {emailAddress: req.currentUser.emailAddress} });

  const accreditedArticles = isStringAndStringToArray(creditor.accreditedArticles);
  const alreadyAccredited = accreditedArticles.includes(article.id.toString());

  const discreditedArticles = isStringAndStringToArray(creditor.discreditedArticles);
  const alreadyDiscredited = discreditedArticles.includes(article.id.toString());

  const isAccrediting = req.body.credit === 'accredit';

  let updatedCredits;
  if (isAccrediting && alreadyDiscredited) {
    updatedCredits = article.credits + 2 
  } else if (isAccrediting && !alreadyAccredited) {
    updatedCredits = article.credits + 1 
  } else if (!isAccrediting && alreadyDiscredited) {
    updatedCredits = article.credits + 1 
  } else if (isAccrediting && alreadyAccredited) {
    updatedCredits = article.credits - 1 
  } else if (!isAccrediting && !alreadyAccredited) {
    updatedCredits = article.credits - 1 
  } else if (!isAccrediting && alreadyAccredited) {
    updatedCredits = article.credits - 2 
  }

  if (article) {
    await Article.update(
      { credits: updatedCredits }, 
      { where: { id: req.params.id } })
      .then( async (response) => {
        if (!response.name) {
          let updatedAccreditedArticles;
          let updatedDiscretitedArticles;

          if (isAccrediting && !alreadyAccredited) {
            updatedAccreditedArticles = [...accreditedArticles, article.id.toString()];
          } else if (isAccrediting && alreadyAccredited) {
            updatedAccreditedArticles = accreditedArticles.filter( id => id !== article.id.toString());
          } else if (!isAccrediting && alreadyAccredited) {
            updatedAccreditedArticles = accreditedArticles.filter( id => id !== article.id.toString());
          }

          if (!isAccrediting && !alreadyDiscredited) {
            updatedDiscretitedArticles = [...discreditedArticles, article.id.toString()];
          } else if (!isAccrediting && alreadyDiscredited) {
            updatedDiscretitedArticles = discreditedArticles.filter( id => id !== article.id.toString());
          } else if (isAccrediting && alreadyDiscredited) {
            updatedDiscretitedArticles = discreditedArticles.filter( id => id !== article.id.toString());
          }

          await User.update(
            { 
              accreditedArticles: updatedAccreditedArticles,
              discreditedArticles: updatedDiscretitedArticles 
            },
            { where: { id: creditor.id } })
            .then( async (response) => {
              if (!response.name) {
                const updatedUser = await User.findOne({ 
                  attributes: { exclude: ['password', 'createdAt'] }, 
                  where: { emailAddress: req.currentUser.emailAddress } 
                });
                const updatedArticle = await Article.findOne({ 
                  where: { id: req.params.id } 
                });
                res.status(200).json({ user: updatedUser, article: updatedArticle });
              }
            });
        }
      });
  } else {
    res.status(403).end();
  }
}));

// DELETE deletes the chosen article if the user is authenticated to do so
router.delete('/:id', authenticateLogin, asyncHandler(async (req, res) => {
  const article = await Article.findOne({ where: { id: req.params.id } });
  const owner = await User.findOne({ where: { id: article.userId }});
  
  const isOwner = owner.emailAddress === req.currentUser.emailAddress;
  const isAdmin = req.currentUser.accessLevel === 'admin';

  if (isOwner || isAdmin) {
    await Article.destroy({ where: { id: req.params.id } })
      .then(res.status(204).end());
  } else {
    res.status(403).end();
  }
}));

module.exports = router;