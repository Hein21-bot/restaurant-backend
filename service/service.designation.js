const restaurantDB = require('../database')

const selectDesignation = () => {
    return restaurantDB.selectDesignation()
}

const insertDesignation = (department, active, remark, userId, createdDate) => {
    return restaurantDB.insertDesignation(department, active, remark, userId, createdDate)
}

const editDesignation = (designation, active, remark, userId, designationId) => {
    return restaurantDB.editDesignation(designation, active, remark, userId, designationId)
}

module.exports={selectDesignation,insertDesignation,editDesignation}