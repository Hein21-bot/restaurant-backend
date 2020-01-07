const restaurantDB = require('../database')

const selectEmployee = () => {
    return restaurantDB.selectEmployee()
}

const insertEmployee = (employeeName,employeeImage,fatherName,dateOfBirth,nrc,joinDate,departmentId,designationId,education,gender,maritalStatus,address,userId, createdDate, active) => {
    return restaurantDB.insertEmployee(employeeName,employeeImage,fatherName,dateOfBirth,nrc,joinDate,departmentId,designationId,education,gender,maritalStatus,address,userId, createdDate, active)
}

const editEmployee = (employeeId,employeeName,employeeImage,fatherName,dateOfBirth,nrc,joinDate,departmentId,designationId,education,gender,maritalStatus,address,userId, createdDate, active) => {
    return restaurantDB.editEmployee(employeeId,employeeName,employeeImage,fatherName,dateOfBirth,nrc,joinDate,departmentId,designationId,education,gender,maritalStatus,address,userId, createdDate, active)
}

const checkDuplicateEmployee=(employee, nrc,employeeId)=>{
    return restaurantDB.checkDuplicateEmployee(employee, nrc, employeeId)
}
module.exports={selectEmployee,insertEmployee,editEmployee,checkDuplicateEmployee}