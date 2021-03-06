const response = require("../model/response");
const { employeeService } = require("../service");
const { upload } = require("../middleware");

const selectEmployee = (req, res) => {
  employeeService.selectEmployee()
    .then(data => {
      if (data.length === 0) {
        res.json(
          response({
            success: false,
            payload: null,
            message: "Database Connection Fail!"
          })
        );
      }
      const EmpData = data[0];
      const DepData = data[1];
      const DesData = data[2];
      const CompoundData = [EmpData, DepData, DesData];
      console.log(CompoundData);

      res.json(response({ success: true, payload: CompoundData }));
    })
    .catch(err => {
      res.json(response({ success: false, message: err }));
      console.log("Select Emp Err")
    });
};

const insertEmployee = (req, res) => {
  upload(req, res, err => {
    console.log("err ->", err);
    console.log("Request file ====>", req.file);

    const employeeName = req.body.employeeName;
    const employeeImage = req.file ? req.file.filename : "";
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
    const active = req.body.active === "true" ? 1 : 0;
    const employeeId = req.body.employeeId;
    console.log(req.body);
    employeeService.checkDuplicateEmployee(employeeName, nrc, employeeId)
      .then(data => {
        const DuplicateRows = data[0][0].DR;
        const DuplicateNRCRows = data[1][0].DRNRC;
        if (DuplicateRows > 0) {
          res.json(
            response({
              success: false,
              payload: null,
              message: "Employee Name Already Exist",
              error: "E2601"
            })
          );
          return;
        } else if (DuplicateNRCRows > 0) {
          res.json(
            response({
              success: false,
              payload: null,
              message: "NRC Already Exist",
              error: "N2601"
            })
          );
          return;
        } else {
          employeeService.insertEmployee(employeeName, employeeImage, fatherName, dateOfBirth, nrc, joinDate, departmentId, designationId, education, gender, maritalStatus, address, userId, createdDate, active)
            .then(data => {
              console.log(data);
              if (data.length === 0) {
                res.json(
                  response({
                    success: false,
                    message: "Insert Insertion Failed!"
                  })
                );
              }

              res.json(
                response({ success: true, message: "Insert Inserted!" })
              );
            });
        }
      })
      .catch(err => {
        res.json(response({ success: false, message: err }));
      });
  });
};

const editEmployee = (req, res) => {
  upload(req, res, err => {
    console.log("err ->", err);
    console.log("Request file ====>", req.body);

    const employeeId = req.body.employeeId;
    const employeeName = req.body.employeeName;
    const employeeImage = req.file ? req.file.filename : "";
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
    console.log(employeeId);

    employeeService.checkDuplicateEmployee(employeeName, nrc, employeeId)
      .then(data => {

        const DuplicateRows = data[0][0].DR;
        const DuplicateNRCRows = data[1][0].DRNRC;


        if (DuplicateRows > 0) {
          res.json(
            response({
              success: false,
              payload: null,
              message: "Employee Name Already Exist",
              error: "E2601"
            })
          );
          return;
        } else if (DuplicateNRCRows > 0) {
          res.json(
            response({
              success: false,
              payload: null,
              message: "NRC Already Exist",
              error: "N2601"
            })
          );
          return;
        } else {
          employeeService.editEmployee(employeeId, employeeName, employeeImage, fatherName, dateOfBirth, nrc, joinDate, departmentId, designationId, education, gender, maritalStatus, address, userId, createdDate, active)
            .then(data => {
              console.log(data);


              if (data.length === 0) {
                res.json(
                  response({ success: false, message: "Edition Failed!" })
                );
              }

              res.json(
                response({ success: true, message: "Employee Edited!" })
              );
            });
        }
      })
      .catch(err => {
        res.json(response({ success: false, message: "Error", error: err }));
        console.log(err)


      });
  });
};

module.exports = { selectEmployee, insertEmployee, editEmployee };
