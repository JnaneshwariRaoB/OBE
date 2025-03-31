// backend/src/models/Admin.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class Admin {
  static async createAdmin(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO admins (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    return result;
  }

  static async findAdminByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
    return rows[0];
  }
}

module.exports = Admin;
