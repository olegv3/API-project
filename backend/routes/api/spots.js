const express = require('express')
const router = express.Router();
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { requireAuth } = require("../../utils/auth.js");
const { User, Spot, Booking, SpotImage, ReviewImage, Review } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')

router.get('/', async (req, res, next) => {

    const pagination = {}
    const where = {}
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

    if(!page) page = 1
    if(page > 10) page = 10
    if(!size || size > 20) size = 20

    if(parseInt(page) >= 1 && parseInt(size) >=1){
        pagination.limit = size
        pagination.offset = size * (page - 1)
    }

    if(page < 1 || size < 1 || isNaN(minLat) && minLat !== undefined || isNaN(maxLat) && maxLat !== undefined || isNaN(minLng) && minLng !== undefined || isNaN(maxLng) && maxLng !== undefined || minPrice < 0 || maxPrice < 0){
        res.status(400)
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
              "page": "Page must be greater than or equal to 1",
              "size": "Size must be greater than or equal to 1",
              "maxLat": "Maximum latitude is invalid",
              "minLat": "Minimum latitude is invalid",
              "minLng": "Maximum longitude is invalid",
              "maxLng": "Minimum longitude is invalid",
              "minPrice": "Maximum price must be greater than or equal to 0",
              "maxPrice": "Minimum price must be greater than or equal to 0"
            }
          })
    } else {
        if(minLat && maxLat) where.lat = { [Op.between]: [ minLat, maxLat ] }
        else if(minLat) where.lat = { [Op.gte]: minLat }
        else if(maxLat) where.lat = { [Op.lte]: maxLat }

        if(minLng && maxLng) where.lng = { [Op.between]: [ minLng, maxLng ] }
        else if(minLng) where.lng = { [Op.gte]: minLng }
        else if(maxLng) where.lng = { [Op.lte]: maxLng }

        if(minPrice && maxPrice) where.price = { [Op.between]: [ minPrice, maxPrice ] }
        else if(minPrice) where.price = { [Op.gte]: minPrice }
        else if(maxPrice) where.price = { [Op.lte]: maxPrice }
    }

    const spots = await Spot.findAll({
        where,
        include: [
            {
                model: SpotImage
            },
            {
                model: Review
            }
        ],
        ...pagination
    })

    let spotList = []
    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    });

    spotList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if(image.preview === true){
                spot.previewImage = image.url
            }
        })
        if(!spot.previewImage){
            spot.previewImage = 'no preview image found'
        }
        delete spot.SpotImages

        let total = 0
        spot.Reviews.forEach(review => {
            total += review.stars
        })
        spot.avgRating = (total / spot.Reviews.length).toFixed(2)
        delete spot.Reviews
    })

    page = Number(page)
    size = Number(size)

    return res.json({
        Spots: spotList,
        page,
        size
    })
})

router.post('/', requireAuth,  async (req, res, next) => {
    const ownerId = req.user.id
    const errors = []

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if(!address) errors.push("Street address is required")
    if(!city) errors.push("City is required")
    if(!state) errors.push("State is required")
    if(!country) errors.push("Country is required")
    // if(!lat) errors.push("Latitude is not valid")
    // if(!lng) errors.push("Longitude is not valid")
    if(name.length > 50) errors.push("Name must be less than 50 characters")
    if(name.length < 3) errors.push("Name must be more than 3 characters")
    if(!description) errors.push("Description is required")
    if(!price) errors.push("Price per day is required")

    if(errors.length) {
        const error = new Error()
        error.errors = errors
        error.status = 400
        error.message = "Validation error"
        return next(error)
      }

    // if(!address || !city || !state || !country || !lat || !lng || !name || !description || !price){
    //     res.status(400)
    //     return res.json({
    //         "message": "Validation Error",
    //         "statusCode": 400,
    //         "errors": {
    //           "address": "Street address is required",
    //           "city": "City is required",
    //           "state": "State is required",
    //           "country": "Country is required",
    //           "lat": "Latitude is not valid",
    //           "lng": "Longitude is not valid",
    //           "name": "Name must be less than 50 characters",
    //           "description": "Description is required",
    //           "price": "Price per day is required"
    //         }
    //       })
    // }

    const createdSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201)
    return res.json(createdSpot)
})

router.get('/current', requireAuth, async (req, res, next) => {
    const spotsOfUser = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: SpotImage
            }
        ]
    })

    const spots = []
    spotsOfUser.forEach(spot => {
        spots.push(spot.toJSON())
    });

    spots.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if(image.preview === true){
                spot.previewImage = image.url
            }
        })
        delete spot.SpotImages
    })

    return res.json({
        Spots: spots
    })
})

router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)


    if(!spot) {
        res.status(404)
        return res.json({
            message: 'Spot could not be found',
            "statusCode": 404
        })
    }

    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: [ 'id', 'firstName', 'lastName' ]
            },
            {
                model: ReviewImage,
                attributes: [ 'id', 'url' ]
            }
        ]
    })

    return res.json({
        Reviews: reviews
    })
})

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    // const spot = await Spot.findOne({
    //     where: {
    //         id: req.params.spotId
    //     },
    //     include: [
    //         {
    //             model: Booking,
    //             // attributes: [ 'spotId', 'startDate', 'endDate' ],
    //             include: [
    //                 {
    //                     model: User,
    //                     attributes: [ 'id', 'firstName', 'lastName' ]
    //                 }
    //             ]
    //         }
    //     ]
    // })
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot){
        res.status(404)
        return res.json({
            message: 'Spot could not be found',
            "statusCode": 404
        })
    } else if(spot.ownerId === req.user.id) {
        const bookings = await Booking.findAll({
            include: [
                {
                    model: User,
                    attributes: [ 'id', 'firstName', 'lastName' ]
                },
            ],
            where: {
                spotId: req.params.spotId
            }
        })

        return res.json({
            Bookings: bookings
        })
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: [ 'spotId', 'startDate', 'endDate' ]
    })

    return res.json({
        Bookings: bookings
    })

    // bookingsInfo = []
    // spot.Bookings.forEach(booking => {
    //     const info = {}
    //     info.spotId = spot.id
    //     info.startDate = booking.startDate
    //     info.endDate = booking.endDate
    //     bookingsInfo.push(info)
    // });

    // if (spot.ownerId !== req.user.id){
    //     // Bookings: { spotId: spot.Bookings.spotId, startDate: spot.Bookings.startDate, endDate: spot.Bookings.endDate }
    //     res.json({
    //         Bookings: bookingsInfo
    //     })
    // }

    // res.json({
    //     Bookings: spot.Bookings
    // })
})

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const errors = []
    const { review, stars } = req.body
    const userId = req.user.id
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        include: [
            {
                model: Review
            }
        ]
    })



    if(!spot){
        res.status(404)
        return res.json({
            message: 'Spot could not be found',
            "statusCode": 404
        })
    }
    // else if(!review || stars > 5 || stars < 1){
    //     res.status(400)
    //     return res.json({
    //         "message": "Validation error",
    //         "statusCode": 400,
    //         "errors": {
    //             "review": "Review text is required",
    //             "stars": "Stars must be an integer from 1 to 5",
    //         }
    //     })
    // }

    const reviewOfUser = await Review.findAll({
        where: {
            userId: req.user.id,
            spotId: spot.id
        }
    })

    // if(reviewOfUser.length){
    //     res.status(403)
    //     return res.json({
    //         "message": "User already has a review for this spot",
    //         "statusCode": 403
    //     })
    // }

    if(reviewOfUser.length) errors.push("User already has a review for this spot")
    if(!review) errors.push("Review text is required")
    if(stars > 5 || stars < 1) errors.push("Stars must be an integer from 1 to 5")

    if(errors.length) {
        const error = new Error()
        error.errors = errors
        error.status = reviewOfUser.length ? 403 : 400
        error.message = "Validation error"
        return next(error)
    }

    const createdReview = await Review.create({
        spotId: spot.id,
        userId,
        review,
        stars
    })
    return res.json(createdReview)
})

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    const dateStart = new Date(startDate)
    const dateEnd = new Date(endDate)
    const userId = req.user.id
    const today = new Date(Date.now())

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        // include: [
        //     {
        //         model: Booking
        //     }
        // ]
    })

    console.log("\n\n\n\nHOURS---------------------------------------",today.getHours(), today.getHours() > 16, dateStart < today && today.getHours() > 16)

    if(!spot){
        res.status(404)
        return res.json({
            message: 'Spot could not be found',
            "statusCode": 404
        })
    } else if( Date.parse(startDate) > Date.parse(endDate) ) {
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "Checkout date cannot be on or before check-in date"
            }
          })
    } else if(Date.parse(startDate) === Date.parse(endDate)) {
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "Dates cannot be the same"
            }
        })
    } else if (dateStart < today && today.getHours() > 16) {
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "startDate": "You cannot create a booking that is in the past"
            }
          })
    } else if (userId === spot.ownerId){
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "You cannot create a booking as owner"
            }
          })
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    let taken = false


    bookings.forEach(booking => {

        const bookingStartDate = new Date(booking.startDate)
        const bookingEndDate = new Date(booking.endDate)

        // (dateStart.getTime() >= bookingStartDate.getTime() && dateStart.getTime() <= bookingEndDate.getTime() ||
        // dateEnd.getTime() >= bookingStartDate.getTime() && dateEnd.getTime() <= bookingEndDate.getTime() ||
        // dateStart.getTime() <= bookingStartDate.getTime() && dateEnd.getTime() >= bookingEndDate.getTime())

        if(dateStart <= bookingEndDate && dateEnd >= bookingStartDate) {
            taken = true
            return
        }
    });

    if(!taken){
        const createdBooking = await Booking.create({
            spotId: spot.id,
            userId,
            startDate,
            endDate,
        })

        return res.json(createdBooking)
    } else {
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
})


router.post('/:spotId/images', singleMulterUpload("image"), requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const { preview } = req.body

    const imageURL = await singlePublicFileUpload(req.file);

    if(!spot){
        res.status(404)
        return res.json({
            message: 'Spot could not be found',
            "statusCode": 404
        })
    } else if (spot.ownerId !== req.user.id){
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }


    const createdSpotImage = await SpotImage.create({
        spotId: spot.id,
        url: imageURL,
        preview: preview || false
    })

    if(!createdSpotImage){
        res.status(400)
        return res.json({
            message: 'Need to provide url and preview values'
        })
    }

    const imageForSpot = await SpotImage.findOne({
        where: {
            spotId: req.params.spotId
        }
    })

    if(!imageForSpot) {
        res.status(404)
        return res.json({
            message: 'Image for spot was not created'
        })
    }

    return res.json({
        id: createdSpotImage.id,
        url: createdSpotImage.url,
        preview: createdSpotImage.preview
    })
})

router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot){
        res.status(404)
        return res.json({
            message: 'Spot could not be found',
            "statusCode": 404
        })
    } else if (spot.ownerId !== req.user.id){
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    const errors = []

    if(!address) errors.push("Street address is required")
    if(!city) errors.push("City is required")
    if(!state) errors.push("State is required")
    if(!country) errors.push("Country is required")
    // if(!lat) errors.push("Latitude is not valid")
    // if(!lng) errors.push("Longitude is not valid")
    if(name.length > 50) errors.push("Name must be less than 50 characters")
    if(name.length < 3) errors.push("Name must be more than 3 characters")
    if(!description) errors.push("Description is required")
    if(!price) errors.push("Price per day is required")

    if(errors.length) {
        const error = new Error()
        error.errors = errors
        error.status = 400
        error.message = "Validation error"
        return next(error)
      }

    // if(!address || !city || !state || !country || !lat || !lng || !name || !description || !price){
    //     res.status(400)
    //     return res.json({
    //         "message": "Validation Error",
    //         "statusCode": 400,
    //         "errors": {
    //           "address": "Street address is required",
    //           "city": "City is required",
    //           "state": "State is required",
    //           "country": "Country is required",
    //           "lat": "Latitude is not valid",
    //           "lng": "Longitude is not valid",
    //           "name": "Name must be less than 50 characters",
    //           "description": "Description is required",
    //           "price": "Price per day is required"
    //         }
    //       })
    // }

    spot.set({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    await spot.save()

    return res.json(spot)

})


router.get('/:spotId', async (req, res, next) => {
    let spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })

    if(!spot){
        // const err = new Error("Spot couldn't be found");
        // err.status = 404;
        // err.title = "No spot";
        // err.errors = ["Spot couldn't be found"];
        // return next(err);
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    spot = spot.toJSON()

    spot.numReviews = await Review.count({
        where: {
            spotId: req.params.spotId
        }
    })

    const starRatings = await Review.sum('stars',{
        where: {
            spotId: req.params.spotId
        }
    })

    const starCount = await Review.count({
        where: {
            spotId: req.params.spotId
        }
    })

    spot.avgStarRating = (starRatings / starCount).toFixed(2)

    spot.SpotImages = await SpotImage.findAll({
        attributes: ['id', 'url', 'preview'],
        where: {
            spotId: req.params.spotId
        }
    })

    spot.Owner = await User.findOne({
        attributes: ['id', 'firstName', 'lastName'],
        where: {
            id: spot.ownerId
        },
    })

    return res.json(spot)
})

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot){
        res.status(404)
        return res.json({
            message: 'Spot could not be found',
            "statusCode": 404
        })
    } else if (spot.ownerId !== req.user.id){
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    } else {
        await spot.destroy()

        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }

})


module.exports = router;
