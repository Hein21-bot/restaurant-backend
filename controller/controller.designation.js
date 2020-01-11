const response = require("../model/response");
const { designationService } = require("../service");

const selectDesignation = (req, res) => {
  designationService.selectDesignation()
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

const insertDesignation = (req, res) => {
  console.log(req.body);
  const designation = req.body.designation;
  const remark = req.body.remark;
  const active =  req.body.active ;
  const userId = req.body.userId;
  const createdDate = req.body.createdDate;

  designationService.checkDuplicateDesignation(designation)
    .then(data => {
      const DuplicateRows = data[0].DR;
      if (DuplicateRows > 0) {
        res.json(
          response({
            success: false,
            payload: null,
            message: "Designation Already Exist"
          })
        );
      } else {
        designationService.insertDesignation(designation, active, remark, userId, createdDate)
          .then(data => {
            console.log(data);

            if (data.length === 0) {
              res.json(
                response({
                  success: false,
                  message: "Designation Insertion Failed!"
                })
              );
            }

            res.json(
              response({
                success: true,
                message: "Designation Inserted!",
                payload: data
              })
            );
          });
      }
    })
    .catch(err => {
      res.json(response({ success: false, message: err }));
      console.log("insert des error")
    });
};

const editDesignation = (req, res) => {
  console.log(req.body);
  const designation = req.body.designation;
  const remark = req.body.remark;
  const active = req.body.active;
  const userId = req.body.userId;
  const designationId = req.body.designationId;
  designationService.checkDuplicateDesignation(designation, designationId)
    .then(data => {
      const DuplicateRows = data[0].DR;
      if (DuplicateRows > 0) {
        res.json(
          response({
            success: false,
            payload: null,
            message: "Designation Already Exist"
          })
        );
      } else {
        designationService.editDesignation(designation, active, remark, userId, designationId)
          .then(data => {
            console.log(data);

            if (data.length === 0) {
              res.json(
                response({
                  success: false,
                  message: "Designation Edition Failed!"
                })
              );
            }

            res.json(
              response({ success: true, message: "Designation Edited!" })
            );
          });
      }
    })
    .catch(err => {
      res.json(response({ success: false, message: err }));
    });
};

module.exports = { selectDesignation, insertDesignation, editDesignation };
