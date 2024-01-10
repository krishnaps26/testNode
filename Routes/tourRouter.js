const express = require('express')
const tourController = require('./../Controllers/tourController')

const authController = require("./../Controllers/authController")

const router = express.Router()

router.route("/")
      .get(authController.protect, tourController.getAllTours)
      .post(tourController.createTour)

router.route("/:id")
      .delete(tourController.deleteTour)
      .patch(tourController.updateTour)
      .get(tourController.getOneTour)      

module.exports = router