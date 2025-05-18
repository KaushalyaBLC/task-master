const express = require('express');
const router = express.Router();
const {getUsers, createTask, getTasks, CompleteTask} = require('../controllers/taskcontroller')

//POST to create a new task
router.post('/', (req, res) => {
  createTask(req, res); 
});

//GET to get all tasks
router.get('/', (req, res) => {
  getTasks(req, res); 
});

//PUT to change the status of a task
router.put('/:id', (req, res) => {
  CompleteTask(req, res);
});

module.exports = router;
