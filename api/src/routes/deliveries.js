/* general imports */
const { Router } = require("express");
const router     = Router();

/* controllers import */
const DeliveryController = require("../controllers/DeliveryController");

/* middleware */
const auth = require("../middleware/auth");
router.use(auth);

/* http://localhost:3000/deliveries */
router.get( "/",               DeliveryController.index);
router.get( "/:delivery_id",   DeliveryController.findById);
router.post("/",               DeliveryController.create);
router.put("/:delivery_id",    DeliveryController.update);
router.delete("/:delivery_id", DeliveryController.delete);

module.exports = router;
