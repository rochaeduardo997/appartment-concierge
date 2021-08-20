/* general imports */
const { Router } = require("express");
const router     = Router();

/* controllers import */
const AppartmentController = require("../controllers/AppartmentController");

/* middleware */
const auth = require("../middleware/auth");
router.use(auth);

/* http://localhost:3000/appartments */
router.get("/",                  AppartmentController.index);
router.get("/:appartment_id",    AppartmentController.findById);
router.post("/",                 AppartmentController.create);
router.put("/:appartment_id",    AppartmentController.update);
router.delete("/:appartment_id", AppartmentController.delete);

module.exports = router;