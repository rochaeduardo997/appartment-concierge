/* general imports */
const { Router } = require("express");
const router     = Router();

/* controllers import */
const ResidentController = require("../controllers/ResidentController");

/* middleware */
const auth = require("../middleware/auth");

/* http://localhost:3000/residents */
router.get( "/",               auth, ResidentController.index);
router.get( "/:resident_id",   auth, ResidentController.findById);
router.post("/",               auth, ResidentController.create);
router.put("/:resident_id",    auth, ResidentController.update);
router.delete("/:resident_id", auth, ResidentController.delete);

router.post("/login", ResidentController.login);

module.exports = router;
