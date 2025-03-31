const pool = require('../config/db');

class Department {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM departments');
    return rows;
  }

  static async create(department_code, department_name) {
    const [result] = await pool.query(
      'INSERT INTO departments (department_code, department_name) VALUES (?, ?)',
      [department_code, department_name]
    );
    return result;
  }

  static async update(id, department_code, department_name) {
    const [result] = await pool.query(
      'UPDATE departments SET department_code = ?, department_name = ? WHERE id = ?',
      [department_code, department_name, id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM departments WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Department;
