const response = require("../model/response");
const { employeeService } = require("../service");
const upload=require('../middleware')
const selectEmployee = (req, res) => {
  employeeService.selectEmployee().then(data => {
    if (data.length === 0) {
      res.json(
        response({
          success: false,
          payload: null,
          message: "Database Connection Fail!"
        })
      );
    }
    res.json(response({ success: true, payload: data }));
  });
};

const insertEmployee = (req, res) => {
    upload(req, res, function(err) {
        console.log("err ->", err);
        // console.log("Request  ====>", req);
        console.log("Request file ====>", req.file);
    
        const employeeName = req.body.employeeName;
        const employeeImage = `${
          req.file ? req.file.filename : req.body.employeeImage
        }`;
        const fatherName = req.body.fatherName;
        const dateOfBirth = req.body.dateOfBirth;
        const nrc = req.body.NRC;
        const joinDate = req.body.joinDate;
        const departmentId = req.body.departmentId;
        const designationId = req.body.designationId;
        const education = req.body.education;
        const gender = req.body.gender;
        const maritalStatus = req.body.maritalStatus;
        const address = req.body.address;
        const userId = req.body.userId;
        const createdDate = req.body.createdDate;
        const active = req.body.active;
    
        console.log(req.body);
  employeeService
    .insertEmployee(employeeName,employeeImage,fatherName,dateOfBirth,nrc,joinDate,departmentId,designationId,education,gender,maritalStatus,address,userId, createdDate, active)
    .then(data => {
      console.log(data);

      if (data.length === 0) {
        res.json(
          response({ success: false, message: "Insert Insertion Failed!" })
        );
      }

      res.json(response({ success: true, message: "Insert Inserted!" }));
    });
})
};

const editEmployee = (req, res) => {
    upload(req, res, function(err) {
        console.log("err ->", err);
        // console.log("Request  ====>", req);
        console.log("Request file ====>", req.file);
        const employeeId=req.body.employeeId
        const employeeName = req.body.employeeName;
        const employeeImage = `${
          req.file ? req.file.filename : req.body.employeeImage
        }`;
        const fatherName = req.body.fatherName;
        const dateOfBirth = req.body.dateOfBirth;
        const nrc = req.body.NRC;
        const joinDate = req.body.joinDate;
        const departmentId = req.body.departmentId;
        const designationId = req.body.designationId;
        const education = req.body.education;
        const gender = req.body.gender;
        const maritalStatus = req.body.maritalStatus;
        const address = req.body.address;
        const userId = req.body.userId;
        const createdDate = req.body.createdDate;
        const active = req.body.active;
    
        console.log(req.body);
  employeeService
    .editEmployee(employeeId,employeeName,employeeImage,fatherName,dateOfBirth,nrc,joinDate,departmentId,designationId,education,gender,maritalStatus,address,userId, createdDate, active)
    .then(data => {
      console.log(data);

      if (data.length === 0) {
        res.json(
          response({ success: false, message: "Edition Failed!" })
        );
      }

      res.json(response({ success: true, message: "Employee Edited!" }));
    });
})
};


module.exports = { selectEmployee,insertEmployee,editEmployee };
