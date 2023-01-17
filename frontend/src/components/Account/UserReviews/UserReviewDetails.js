import { useSelector } from "react-redux"

export default function UserReviewDetails (review) {

    const spot = useSelector(state => state.spots.allSpots[review.spotId])

    if(!review) return null
    return (
        <div style={{"display":"flex", "justifyContent":"space-between", "alignContent":"center", "gap":"40px", "borderBottom":"lightGray 1px solid"}}>
            <div>
                <h3 style={{"marginBottom":"0px"}}>{spot.name} - {review.stars} stars</h3>
                <p style={{"marginTop":"0px"}}>{review.review}</p>
            </div>
            <div style={{"display":"flex", "alignItems":"center", "gap":"10px"}}>
            </div>
        </div>
    )
}
