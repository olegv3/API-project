import { useDispatch, useSelector } from "react-redux"
import { removeReview } from "../../../../store/reviews"
import './ReviewDetails.css'

export default function ReviewDetails (review) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const deleteAReview = async () => {
        const deletedReview = await dispatch(removeReview(review.id, review.spotId))
        console.log(deletedReview)
        console.log('success')
    }

    if(!review.User) return null
    return (
        <div style={{"display":"flex", "gap":"100px", "borderBottom":"lightGray 1px solid"}}>
            <div>
                <h4 style={{"marginBottom":"0px"}}>
                    {review.User.firstName} {review.User.lastName} {review.stars}
                </h4>
                <p style={{"marginTop":"0px", "width":"10rem"}}>
                    {review.review}
                </p>
            </div>
            {review.ReviewImages.length ? (
                <div style={{"display":"flex", "alignItems":"center"}}>
                    <img style={{"height":"100px", "width":"100px"}} src={review.ReviewImages[0].url} alt={'pic'}/>
                </div>
            ) : (null)}

            {user && user.id === review.userId && (
                <div style={{"display":"flex", "alignItems":"center"}}>
                    <button className="delete-review-button" onClick={deleteAReview}>Delete review</button>
                </div>
            )}
        </div>
    )
}
