const express = require('express');
const router = express.Router();
const {getUsers, createTask, getTasks, CompleteTask} = require('../controllers/taskcontroller')

router.post('/', (req, res) => {
  createTask(req, res); 
});

router.get('/', (req, res) => {
  getTasks(req, res); 
});

router.put('/:id', (req, res) => {
  CompleteTask(req, res);
});

module.exports = router;
