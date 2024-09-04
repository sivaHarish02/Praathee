const mongoose = require('mongoose');

const employeeDataSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true

  },
  department: {
    type: String,
    required: true
  },
  hireDate: {
    type: Date,

  }
});

const EmployeeData = mongoose.model('employeeData', employeeDataSchema);

module.exports = EmployeeData;
