const express = require("express");
const {
  login,
  signup,
  logout,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
  getUsers,
  userCount,
} = require("../controllers/userController");
const { protected, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/all", protected, admin, getUsers);
router
  .route("/profile")
  .get(protected, getUserProfile)
  .put(protected, updateUserProfile);
router.route("/count").get(protected, admin, userCount);
router
  .route("/:id")
  .delete(protected, admin, deleteUser)
  .get(protected, admin, getUserById)
  .put(protected, admin, updateUser);

module.exports = router;
