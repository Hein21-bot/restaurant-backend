const restaurantDB = require('../database')

const selectDepartment = () => {
    return restaurantDB.selectDepartment()
}

const insertDepartment = (department, active, remark, userId, createdDate) => {
    return restaurantDB.insertDepartment(department, active, remark, userId, createdDate)
}

const editDepartment = (department, active, remark, userId, departmentId) => {
    return restaurantDB.editDepartment(department, active, remark, userId, departmentId)
}

const checkDuplicateDepartment=(department, departmentId)=>{
    return restaurantDB.checkDuplicateDepartment(department, departmentId)
}

module.exports={selectDepartment,insertDepartment,editDepartment,checkDuplicateDepartment}