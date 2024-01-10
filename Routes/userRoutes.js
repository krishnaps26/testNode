const express = require('express')
const userController = require('./../Controllers/userController')

const tourController = require("./../Controllers/tourController")

const authController = require('./../Controllers/authController')

const router = express.Router()

router.route("/signup").post(authController.signUp)
router.route("/login").post(authController.login)
//router.route("/").get(authController.protect, tourController.getAllTours)

module.exports = router