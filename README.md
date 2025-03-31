To run frontend 
cd frontend
npm run dev

To run backend 
cd backend
npm start


Mysql database has
obe_demo Schema


use obe_demo;

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department_code VARCHAR(10) NOT NULL UNIQUE,
    department_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


CREATE TABLE HeadOfDepartments (
    HOD_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Department_ID INT NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Phone_Number VARCHAR(15) UNIQUE,
    Qualification VARCHAR(255),
    Experience INT,
    Date_Joined DATE,
    Password VARCHAR(255) NOT NULL,
    FOREIGN KEY (Department_ID) REFERENCES departments(id)
);
