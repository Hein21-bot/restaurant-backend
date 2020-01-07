const restaurantDB = require('../database')

const navInfo = () => {
    return restaurantDB.navInfo()
}

const selectRole = () => {
    return restaurantDB.selectRole()
}

const insertRole = (roleName, remark, active, userId, createdDate) => {
    return restaurantDB.insertRole(roleName, remark, active, userId, createdDate)
}

const editRole = (roleId, roleName, remark, active, userId) => {
    return restaurantDB.editRole(roleId, roleName, remark, active, userId)
}

const checkDuplicateRole=(roleName,roleId)=>{
    return restaurantDB.checkDuplicateRole(roleName,roleId)
}

module.exports = { navInfo, selectRole, insertRole, editRole,checkDuplicateRole }