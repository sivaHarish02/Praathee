const Employee = require('../models/employeeDataSchema');

exports.createEmployee = async (req, res) => {
  console.log("post data");

  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json({ message: 'Employee created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating employee' });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting employees' });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
    } else {
      res.json(employee);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting employee' });
  }
};

exports.updateEmployee = async (req, res) => {
  const { firstName, lastName, email, position, department, hireDate } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    employee.firstName = firstName || employee.firstName;
    employee.lastName = lastName || employee.lastName;
    employee.email = email || employee.email;
    employee.position = position || employee.position;
    employee.department = department || employee.department;
    employee.hireDate = hireDate || employee.hireDate;

    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    res.status(500).json({ message: error.message });
  }
};

