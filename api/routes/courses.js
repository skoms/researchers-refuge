const express = require('express');
const router = express.Router();

// Import middlewares
const asyncHandler = require('../middleware/async-handler');
const authenticateLogin = require('../middleware/user-auth');

// Import Course Model
const { Course, User } = require('../models');

// GET finds and displays all the courses and basic info on their owners
router.get('/', asyncHandler(async (req, res) => {
  const courses = await Course.findAll(({
    attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId'], 
    include: [ { model: User, attributes: ['firstName', 'lastName', 'emailAddress'] } ] }));

  res.status(200).json(courses);
}));

// GET finds specified course and basic info on its owner
router.get('/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, { 
    attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId'], 
    include: [ { model: User, attributes: ['firstName', 'lastName', 'emailAddress'] } ] });
  if (course) {
    res.status(200).json(course);
  } else {
    res.status(404).end();
  }
}));

// POST creates a new course and assigns the logged authenticated user as its owner
router.post('/', authenticateLogin, asyncHandler(async (req, res) => {
  req.body.userId = req.currentUser.id;
  const course = await Course.create(req.body);

  res.location(`/api/courses/${course.id}`).status(201).end();
}));

// PUT updates the chosen course if the user is authenticated to do so
router.put('/:id', authenticateLogin, asyncHandler(async (req, res) => {
  const course = await Course.findOne({ where: { id: req.params.id } });
  const owner = await User.findOne({ where: { id: course.userId }});

  if (owner.emailAddress === req.currentUser.emailAddress) {
    await Course.update(req.body, { where: { id: req.params.id } })
      .then(response => {
        if (!response.name) {
          res.status(204).end()
        }
      });
  } else {
    res.status(403).end();
  }
}));

// DELETE deletes the chosen course if the user is authenticated to do so
router.delete('/:id', authenticateLogin, asyncHandler(async (req, res) => {
  const course = await Course.findOne({ where: { id: req.params.id } });
  const owner = await User.findOne({ where: { id: course.userId }});
  
  if (owner.emailAddress === req.currentUser.emailAddress) {
    await Course.destroy({ where: { id: req.params.id } })
      .then(res.status(204).end());
  } else {
    res.status(403).end();
  }
}));

module.exports = router;