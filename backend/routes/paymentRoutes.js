const express = require("express");
const { checkout } = require("../controllers/paymentController");
const router = express.Router();
const {protected} = require('../middleware/authMiddleware')

router.route("/").post(protected, checkout);

module.exports = router;
