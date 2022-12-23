const express = require('express')
const router = express.Router();
const { requireAuth } = require("../../utils/auth.js");
const { Spot, SpotImage } = require('../../db/models');

router.delete('/:imageId', requireAuth, async (req, res) => {
    const spotImage = await SpotImage.findOne({
        where: {
            id: req.params.imageId
        },
        include: [
            {
                model: Spot
            }
        ]
    })

    if(!spotImage){
        res.status(404)
        return res.json({
            message: 'Spot Image could not be found',
            "statusCode": 404
        })
    } else if (spotImage.Spot.ownerId !== req.user.id){
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    } else {
        await spotImage.destroy()

        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
})


module.exports = router;
