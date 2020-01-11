const response = require("../model/response");
const { adminService } = require("../service");

const selectRole = (req, res) => {
  adminService.selectRole().then(data => {
      console.log(data);

      if (data.length === 0) {
        res.json(
          response({
            success: false,
            payload: null,
            message: "Database Connection Fail!"
          })
        );
      } else {
        res.json(response({ success: true, payload: data }));
      }
    })
    .catch(err => {
      res.json(response({ success: false, message: err }));
    });
};

const insertRole = (req, res) => {
  console.log(req.body);
  const roleName = req.body.roleName;
  const remark = req.body.remark;
  const active = req.body.active;
  const userId = req.body.userId;
  const createdDate = req.body.createdDate;
  adminService.checkDuplicateRole(roleName)
    .then(data => {
      console.log("DuPlicate=======>>", data);
      const DuplicateRows = data[0].DR;
      if (DuplicateRows > 0) {
        res.json(
          response({
            success: false,
            payload: null,
            message: "Role Name Already Exist"
          })
        );
      } else {
        adminService.insertRole(roleName, remark, active, userId, createdDate)
          .then(data => {
            console.log(data);

            if (data.length === 0) {
              res.json(
                response({ success: false, message: "Role Insertion Failed!" })
              );
            }

            res.json(response({ success: true, message: "Role Inserted!" }));
          });
      }
    })
    .catch(err => {
      res.json(response({ success: false, message: err }));
    });
};

const editRole = (req, res) => {
  console.log(req.body);
  const roleId = req.body.roleId;
  const roleName = req.body.roleName;
  const remark = req.body.remark;
  const active = req.body.active === "true" ? 1 : 0;
  const userId = req.body.userId;
  adminService.checkDuplicateRole(roleName, roleId)
    .then(data => {
      const DuplicateRows = data[0].DR;
      if (DuplicateRows > 0) {
        res.json(
          response({
            success: false,
            payload: null,
            message: "Role Name Already Exist"
          })
        );
      } else {
        adminService.editRole(roleId, roleName, remark, active, userId)
          .then(data => {
            console.log(data);
            console.log(roleId)

            if (data.length === 0) {
              res.json(
                response({ success: false, message: "Role Edition Failed!" })
              );
            }

            res.json(response({ success: true, message: "Role Edited!" }));
          });
      }
    })
    .catch(err => {
      res.json(response({ success: false, message: err }));
    });
};

module.exports = { selectRole, insertRole, editRole };
