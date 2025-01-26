const express = require('express')
const { login, signup, logout, getUserProfile, updateUserProfile, deleteUser, getUserById, updateUser, getUsers } = require('../controllers/userController')
const {protected} = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)
router.get('/all', getUsers)
router.route('/profile').get(protected, getUserProfile).put(updateUserProfile)
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser)

module.exports = router