const mysql = require("mysql2");
const util = require("util");

require("dotenv").config();

const mypool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const login = (username, password) => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `SELECT * FROM tbl_user WHERE password = '${password}' AND userName='${username}' `
  );
};

const navInfo = () => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    "SELECT tbl_user.userId,tbl_user.userName,tbl_employee.employeeImage,tbl_designation.designation FROM tbl_user JOIN tbl_employee tbl_employee ON tbl_user.employeeId=tbl_employee.employeeId JOIN tbl_designation ON tbl_employee.designationId=tbl_designation.designationId"
  );
};

const selectRole = () => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    "select user.userId,role.roleId,role.roleName,role.active,role.remark,role.createdDate,employee.employeeName from tbl_user as user INNER JOIN  tbl_role as role ON user.userID inner Join tbl_employee as employee ON user.employeeId=employee.employeeId ORDER BY role.roleName"
  );
};

const insertRole = (roleName, remark, active, userId, createdDate) => {

  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `INSERT INTO tbl_role (roleName, active, remark, createBy, createdDate) VALUES (trim("${roleName}"), ${
      active ? 1 : 0
    }, trim("${remark}"), '${userId}', '${createdDate}')`
  );
};
const editRole = (roleId,roleName, remark, active, userId) => {

  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `UPDATE tbl_role SET roleName = trim('${roleName}'),remark=trim("${remark}"),createBy=${userId},active=${
      active === true ? 1 : 0
    } WHERE roleId=${roleId}`
  );
};



module.exports = { login, navInfo, selectRole, insertRole,editRole };
