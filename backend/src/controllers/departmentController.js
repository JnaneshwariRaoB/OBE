const Department = require('../models/Department');

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.getAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addDepartment = async (req, res) => {
  try {
    const { department_code, department_name } = req.body;
    if (!department_code || !department_name) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    await Department.create(department_code, department_name);
    res.status(201).json({ message: 'Department added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { department_code, department_name } = req.body;
    await Department.update(id, department_code, department_name);
    res.json({ message: 'Department updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    await Department.delete(id);
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
