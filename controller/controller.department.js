const response = require("../model/response");
const { departmentService } = require("../service");

const selectDepartment = (req, res) => {
  departmentService
  .selectDepartment()
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

      res.json(response({ success: true, payload: data }));
    })
    .catch(err => {
      res.json(response({ success: false, message: err }));
    });
};

const insertDepartment = (req, res) => {
  console.log(req.body);
  const department = req.body.department;
  const remark = req.body.remark;
  const active = req.body.active === true ? 1 : 0;
  const userId = req.body.userId;
  const createdDate = req.body.createdDate;
  departmentService
  .checkDuplicateDepartment(department)
    .then(data => {
      const DuplicateRows = data[0].DR;
      if (DuplicateRows > 0) {
        res.json(
          response({
            success: false,
            payload: null,
            message: "Department Already Exist"
          })
        );
      } else {
        departmentService
        .insertDepartment(department, active, remark, userId, createdDate)
          .then(data => {
            console.log(data);

            if (data.length === 0) {
              res.json(
                response({
                  success: false,
                  message: "Department Insertion Failed!"
                })
              );
            }

            res.json(
              response({ success: true, message: "Department Inserted!" })
            );
          });
      }
    })
    .catch(err => {
      res.json(response({ success: false, message: err }));
      console.log("dp insert error")
    });
};

const editDepartment = (req, res) => {
  console.log(req.body);
  const department = req.body.department;
  const remark = req.body.remark;
  const active = req.body.active;
  const userId = req.body.userId;
  const departmentId = req.body.departmentId;
  departmentService
  .checkDuplicateDepartment(department, departmentId)
    .then(data => {
      const DuplicateRows = data[0].DR;
      if (DuplicateRows > 0) {
        res.json(
          response({
            success: false,
            payload: null,
            message: "Department Already Exist"
          })
        );
      } else {
        departmentService
        .editDepartment(department, active, remark, userId, departmentId)
          .then(data => {
            console.log(data);

            if (data.length === 0) {
              res.json(
                response({
                  success: false,
                  message: "Department Edition Failed!"
                })
              );
            }

            res.json(
              response({ success: true, message: "Department Edited!" })
            );
          });
      }
    })
    .catch(err => {
      res.json(response({ success: false, message: err }));
    });
};
module.exports = { selectDepartment, insertDepartment, editDepartment };
