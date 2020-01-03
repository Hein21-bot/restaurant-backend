const response = require("../model/response");
const { adminService } = require("../service");

const selectRole = (req, res) => {
  adminService.selectRole().then(data => {
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

const insertRole = (req, res) => {
  console.log(req.body);
  const roleName = req.body.roleName;
  const remark = req.body.remark;
  const active = req.body.active;
  const userId = req.body.userId;
  const createdDate = req.body.createdDate;

  adminService
    .insertRole(roleName, remark, active, userId, createdDate)
    .then(data => {
      console.log(data);

      if (data.length === 0) {
        res.json(
          response({
            success: false,
            message: "Role Insertion Failed!"
          })
        );
      }

      res.json(response({ success: true, message: "Role Inserted!" }));
    });
};

const editRole = (req, res) => {
  console.log(req.body);
  const roleId = req.body.roleId;
  const roleName = req.body.roleName;
  const remark = req.body.remark;
  const active = req.body.active;
  const userId = req.body.userId;
  

  adminService
    .editRole(roleId,roleName, remark, active, userId)
    .then(data => {
      console.log(data);

      if (data.length === 0) {
        res.json(
          response({
            success: false,
            message: "Role Edition Failed!"
          })
        );
      }

      res.json(response({ success: true, message: "Role Edited!" }));
    });
};

module.exports = { selectRole, insertRole,editRole };
