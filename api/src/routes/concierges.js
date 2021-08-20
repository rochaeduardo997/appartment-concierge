/* general imports */
const { Router } = require("express");
const router     = Router();

/* controllers import */
const ConciergesController = require("../controllers/ConciergeController");

/* middleware */
const auth = require("../middleware/auth");

/* http://localhost:3000/concierges */
router.get("/",                 auth, ConciergesController.index);
router.get("/:concierge_id",    auth, ConciergesController.findById);
router.post("/",                auth, ConciergesController.create);
router.put("/:concierge_id",    auth, ConciergesController.update);
router.delete("/:concierge_id", auth, ConciergesController.delete);

router.post("/login", ConciergesController.login);

module.exports = router;