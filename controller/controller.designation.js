const response = require("../model/response");
const { designationService } = require("../service");

const selectDesignation = (req, res) => {
  designationService.selectDesignation().then(data => {
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

const insertDesignation = (req, res) => {
  console.log(req.body);
  const designation = req.body.designation;
  const remark = req.body.remark;
  const active = req.body.active;
  const userId = req.body.userId;
  const createdDate = req.body.createdDate;

  designationService
    .insertDesignation(designation, active, remark, userId, createdDate)
    .then(data => {
      console.log(data);

      if (data.length === 0) {
        res.json(
          response({ success: false, message: "Designation Insertion Failed!" })
        );
      }

      res.json(response({ success: true, message: "Designation Inserted!" }));
    });
};

const editDesignation = (req, res) => {
  console.log(req.body);
  const designation = req.body.designation;
  const remark = req.body.remark;
  const active = req.body.active;
  const userId = req.body.userId;
  const designationId = req.body.designationId;

  designationService.editDesignation(designation, active, remark, userId, designationId).then(data => {
    console.log(data);

    if (data.length === 0) {
      res.json(response({ success: false, message: "Designation Edition Failed!" }));
    }

    res.json(response({ success: true, message: "Designation Edited!" }));
  });
};

module.exports = { selectDesignation, insertDesignation,editDesignation };
