const express=require('express');
const schoolController = require('../controllers/schoolController');
const schoolRouter = express.Router();
schoolRouter.post('/add-school',schoolController.addSchool);
schoolRouter.get('/get-schools', schoolController.getSchools);

module.exports=schoolRouter;