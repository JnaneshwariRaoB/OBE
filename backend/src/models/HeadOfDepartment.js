const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class HOD {
  static async createHOD({ name, department_id, email, phone_number, qualification, experience, date_joined, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO HeadOfDepartments (Name, Department_ID, Email, Phone_Number, Qualification, Experience, Date_Joined, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, department_id, email, phone_number, qualification, experience, date_joined, hashedPassword]
    );
    return result;
  }

  static async getHODs() {
    const [rows] = await pool.query(`
      SELECT hod.*, dep.department_name AS Department_Name 
      FROM HeadOfDepartments hod 
      JOIN departments dep ON hod.Department_ID = dep.id
    `);
    return rows;
  }
}

module.exports = HOD;
