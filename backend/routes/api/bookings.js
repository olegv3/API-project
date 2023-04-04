const express = require('express')
const router = express.Router();
const sequelize = require('sequelize');
const { requireAuth } = require("../../utils/auth.js");
const { User, Spot, Booking, SpotImage, ReviewImage, Review } = require('../../db/models');

router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id

    const bookingsOfUser = await Booking.findAll({
        where: {
            userId
        },
        include: [
            {
                model: Spot,
                attributes: [ 'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price' ],
                include: [
                    {
                        model: SpotImage,
                        attributes: ['url']
                    }
                ]
            },
        ]
    })

    let bookingList = []
    bookingsOfUser.forEach(booking => {
        bookingList.push(booking.toJSON())
    })


    const newBookings = []
    bookingList.forEach((booking) => {
        // verify that there is a spotimage
        if(booking.Spot.SpotImages.length){
            booking.Spot.previewImage = booking.Spot.SpotImages[0].url
        }

        delete booking.Spot.SpotImages
        newBookings.push(booking)
    });



    return res.json({
        Bookings: newBookings
    })
})

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    const dateStart = new Date(startDate)
    const dateEnd = new Date(endDate)
    const booking = await Booking.findByPk(req.params.bookingId)

    if(!booking){
        res.status(404)
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    const bookingStartDate = new Date(booking.startDate)
    const bookingEndDate = new Date(booking.endDate)

    const today = new Date()
    const allBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        }
    })

    let taken = false

    if(today.getTime() >= bookingEndDate.getTime()) {
        res.status(403)
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
          })
    } else if(booking.userId !== req.user.id){
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    allBookings.forEach(bookingindex => {

        const bookingStartDate = new Date(bookingindex.startDate)
        const bookingEndDate = new Date(bookingindex.endDate)

        if(dateStart.getTime() >= bookingStartDate.getTime() && dateStart.getTime() <= bookingEndDate.getTime() ||
        dateEnd.getTime() >= bookingStartDate.getTime() && dateEnd.getTime() <= bookingEndDate.getTime() ||
        dateStart.getTime() <= bookingStartDate.getTime() && dateEnd.getTime() >= bookingEndDate.getTime()) {
            taken = true
            res.status(403)
            return res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
                }
            })
        }
    });

    if(!taken) {
        booking.set({
            startDate,
            endDate
        })

        await booking.save()

        return res.json(booking)
    }

})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findOne({
        where: {
            id: req.params.bookingId
        }
    })

    if(!booking){
        res.status(404)
        return res.json({
            message: 'Booking could not be found',
            "statusCode": 404
        })
    }

    const spot = await Spot.findOne({
        where: {
            id: booking.spotId
        }
    })

    const userId = req.user.id
    const spotOwnerId = spot.ownerId
    const bookingStartDate = new Date(booking.startDate)
    const today = new Date()

    if (userId !== booking.userId){
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    } else if(today.getTime() >= bookingStartDate.getTime() && today.getHours() > 16) {
        res.status(403)
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
          })
    }

    await booking.destroy()

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})

module.exports = router;
