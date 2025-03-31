const HOD = require('../models/HeadOfDepartment');

exports.getHODs = async (req, res) => {
  try {
    const hods = await HOD.getHODs();
    res.json(hods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createHOD = async (req, res) => {
  try {
    await HOD.createHOD(req.body);
    res.status(201).json({ message: 'HOD added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
