const restaurantDB = require('../database')

const selectDesignation = () => {
    return restaurantDB.selectDesignation()
}

const insertDesignation = (designation, active, remark, userId, createdDate) => {
    return restaurantDB.insertDesignation(designation, active, remark, userId, createdDate)
}

const editDesignation = (designation, active, remark, userId, designationId) => {
    return restaurantDB.editDesignation(designation, active, remark, userId, designationId)
}

const checkDuplicateDesignation=(designation, designationId)=>{
    return restaurantDB.checkDuplicateDesignation(designation, designationId)
}

module.exports={selectDesignation,insertDesignation,editDesignation,checkDuplicateDesignation}