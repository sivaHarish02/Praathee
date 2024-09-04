const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/create', employeeController.createEmployee);
router.get('/get', employeeController.getEmployees);
router.put('/update/:id', employeeController.updateEmployee);
router.delete('/delete/:id', employeeController.deleteEmployee);


module.exports = router;