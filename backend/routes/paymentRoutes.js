const express = require("express");
const { checkout, stripeKey } = require("../controllers/paymentController");
const router = express.Router();
const {protected} = require('../middleware/authMiddleware')

router.route("/").post(protected, checkout);
router.route("/key").get(protected, stripeKey);

module.exports = router;
