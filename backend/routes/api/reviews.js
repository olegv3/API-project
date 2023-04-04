const express = require('express')
const router = express.Router();
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { requireAuth } = require("../../utils/auth.js");
const { User, Spot, Booking, Review, SpotImage, ReviewImage } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')

router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const reviews = await Review.findAll({
        where: {
            userId
        },
        include: [
            {
                model: User,
                attributes: [ 'id', 'firstName', 'lastName' ]
            },
            {
                model: Spot,
                attributes: {
                    exclude: [ 'description', 'createdAt', 'updatedAt' ]
                },
                include: [
                    {
                        model: SpotImage
                    }
                ]
            },
            {
                model: ReviewImage,
                attributes: [ 'id', 'url' ]
            }
        ]
    })

    let reviewList = []
    reviews.forEach(review => {
        reviewList.push(review.toJSON())
    });

    reviewList.forEach(async (review) => {
        review.Spot.SpotImages.forEach(image => {
            if(image.preview === true){
                review.Spot.previewImage = image.url
            }
        });
        delete review.Spot.SpotImages
    });


    return res.json({
        Reviews: reviewList
    })
})

router.post('/:reviewId/images', singleMulterUpload("image"), requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const { url } = req.body
    const imageURL = await singlePublicFileUpload(req.file);
    const review = await Review.findOne({
        where: {
            id: req.params.reviewId
        },
        include: [
            {
                model: ReviewImage
            }
        ]
    })

    if (!review){
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    } else if(review.ReviewImages.length >= 10){
        res.status(403)
        return res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
    } else if(review.userId !== userId) {
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    const createdReviewImage = await ReviewImage.create({
        reviewId: review.id,
        url: imageURL
    })

    return res.json({
        id: createdReviewImage.id,
        url: createdReviewImage.url
    })

})

router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const { review, stars } = req.body
    const reviewToFind = await Review.findOne({
        where: {
            id: req.params.reviewId
        }
    })

    if (!reviewToFind){
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    } else if(reviewToFind.userId !== userId) {
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    } else if(!review || stars > 5 || stars < 1){
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "review": "Review text is required",
              "stars": "Stars must be an integer from 1 to 5",
            }
        })
    }

    reviewToFind.set({
        review,
        stars
    })

    await reviewToFind.save()

    return res.json(reviewToFind)
})

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)

    if(!review){
        res.status(404)
        return res.json({
            message: 'Review could not be found',
            "statusCode": 404
        })
    } else if (review.userId !== req.user.id){
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    } else {
        await review.destroy()

        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }

})


module.exports = router;
