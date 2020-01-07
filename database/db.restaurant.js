const mysql = require("mysql2");
const util = require("util");

require("dotenv").config();

const mypool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

const login = (username, password) => {
  console.log("hello", username, password);

  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `SELECT * FROM tbl_user WHERE password = '${password}' AND userName='${username}' `
    // `CALL getUser('${username}','${password}')`
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
const editRole = (roleId, roleName, remark, active, userId) => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `UPDATE tbl_role SET roleName = trim('${roleName}'),remark=trim("${remark}"),createBy=${userId},active=${
      active === true ? 1 : 0
    } WHERE roleId=${roleId}`
  );
};

const selectDepartment = () => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    "select user.userId,department.departmentId,department.department,department.active,department.remark,department.createdDate,employee.employeeName from tbl_user as user INNER JOIN  tbl_department as department ON user.userID inner Join tbl_employee as employee ON user.employeeId=employee.employeeId ORDER BY department.department"
  );
};

const insertDepartment = (department, active, remark, userId, createdDate) => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `INSERT INTO tbl_department( department, active, remark, createBy, createdDate) VALUES (trim('${department}'), ${
      active ? 1 : 0
    }, trim("${remark}"),${userId}, '${createdDate}')`
  );
};

const editDepartment = (department, active, remark, userId, departmentId) => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `UPDATE tbl_department SET department = trim('${department}'),remark=trim("${remark}"),createBy=${userId},active=${
      active === true ? 1 : 0
    } WHERE departmentId=${departmentId}`
  );
};

const selectDesignation = () => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    "select user.userId,designation.designationId,designation.designation,designation.active,designation.remark,designation.createdDate,employee.employeeName from tbl_user as user INNER JOIN  tbl_designation as designation ON user.userID inner Join tbl_employee as employee ON user.employeeId=employee.employeeId ORDER BY designation.designation"
  );
};

const insertDesignation = (
  designation,
  active,
  remark,
  userId,
  createdDate
) => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `INSERT INTO tbl_designation (designation, active, remark, createBy, createdDate) VALUES (trim('${designation}'), ${
      active ? 1 : 0
    }, trim("${remark}"), ${userId}, '${createdDate}')`
  );
};

const editDesignation = (
  designation,
  active,
  remark,
  userId,
  designationId
) => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `UPDATE tbl_designation SET designation = trim('${designation}'),remark=trim("${remark}"),createBy=${userId},active=${
      active === true ? 1 : 0
    } WHERE designationId='${designationId}'`
  );
};

const selectEmployee = () => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    "select user.userId,department.departmentId,designation.designationId,employee.employeeId,employee.employeeImage,employee.employeeName,employee.fatherName,employee.dateOfBirth,employee.nrcNo,employee.joinDate,employee.education,employee.gender,employee.maritalStatus,employee.address,employee.createdBy,employee.createdDate,employee.active,department.department,designation.designation,user.userName as createdBy from tbl_employee as employee INNER JOIN tbl_department as department ON employee.departmentId=department.departmentId INNER JOIN tbl_designation as designation on employee.designationId=designation.designationId INNER JOIN tbl_user as user on employee.createdBy=user.userId;Select departmentId as value,department as label from tbl_department;Select designationId as value,designation as label from tbl_designation"
  );
};

const insertEmployee = (
  employeeName,
  employeeImage,
  fatherName,
  dateOfBirth,
  nrc,
  joinDate,
  departmentId,
  designationId,
  education,
  gender,
  maritalStatus,
  address,
  userId,
  createdDate,
  active
) => {
  console.log(createdDate);
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `INSERT INTO restaurant.tbl_employee (employeeImage, employeeName, fatherName, dateOfBirth, nrcNo, joinDate, departmentId, designationId, education, gender, maritalStatus, address, createdBy, createdDate, active) VALUES ('${employeeImage}', '${employeeName}', '${fatherName}', '${dateOfBirth}', '${nrc}', '${joinDate}', ${departmentId}, ${designationId},'${education}', '${gender}', '${maritalStatus}', '${address}', '${userId}', '${createdDate}', ${active})`
  );
};

const editEmployee = (
  employeeId,
  employeeName,
  employeeImage,
  fatherName,
  dateOfBirth,
  nrc,
  joinDate,
  departmentId,
  designationId,
  education,
  gender,
  maritalStatus,
  address,
  userId,
  createdDate,
  active
) => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `UPDATE restaurant.tbl_employee SET employeeImage = '${employeeImage}', employeeName = '${employeeName}', fatherName = '${fatherName}', dateOfBirth = '${dateOfBirth}', nrcNo = '${nrc}', joinDate = '${joinDate}', departmentId = ${departmentId}, designationId = ${designationId}, education = '${education}', gender = '${gender}', maritalStatus = '${maritalStatus}', address = '${address}', createdBy = '${userId}', createdDate = '${createdDate}', active = ${active} WHERE employeeId=${employeeId}`
  );
};

const checkDuplicateRole = (roleName, roleId) => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `Select Count(*) as DR from tbl_role where roleName=trim('${roleName}') and roleId<>'${roleId}'`
  );
};

const checkDuplicateDepartment = (department, departmentId) => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `Select Count(*) as DR from tbl_department where department=trim('${department}') and departmentId<>'${departmentId}'`
  );
};

const checkDuplicateDesignation = (designation, designationId) => {
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `Select Count(*) as DR from tbl_designation where designation=trim('${designation}') and designationId<>'${designationId}'`
  );
};

const checkDuplicateEmployee = (employee,nrc,employeeId) => {
  console.log(employeeId,nrc,employee);
  
  query = util.promisify(mypool.query).bind(mypool);
  return query(
    `Select Count(*) as DR from tbl_employee where employeeName=trim('${employee}') and employeeId<>'${employeeId}';Select Count(*) as DRNRC from tbl_employee where nrcNo=trim('${nrc}') and employeeId<>'${employeeId}'`
  );
};

module.exports = {
  login,
  navInfo,
  selectRole,
  insertRole,
  editRole,
  selectDepartment,
  insertDepartment,
  editDepartment,
  selectDesignation,
  insertDesignation,
  editDesignation,
  selectEmployee,
  insertEmployee,
  editEmployee,
  checkDuplicateRole,
  checkDuplicateDepartment,
  checkDuplicateDesignation,
  checkDuplicateEmployee
};
