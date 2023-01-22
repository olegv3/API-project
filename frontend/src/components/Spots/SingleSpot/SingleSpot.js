import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from '../../../store/spots'
import * as reviewActions from "../../../store/reviews";
import ReserveForm from "./ReserveForm";
import "./SingleSpot.css"
import Reviews from "./Reviews";
import CreateReviewForm from "./Reviews/CreateReviewForm";

function SingleSpot () {


    const dispatch = useDispatch()
    const { id } = useParams()

    const user = useSelector(state => state.session.user)

    const [ showForm, setShowForm ] = useState(false)

    const formClick = () => {
        if(showForm) setShowForm(false)
        else setShowForm(true)
    }

    useEffect(() => {
        dispatch(spotActions.getSpotById(id))
        dispatch(reviewActions.spotReviews(id))
    }, [id, dispatch])

    const spot = useSelector(state => state.spots.singleSpot)
    const rating = spot.avgStarRating
    const reviews = Object.values(useSelector(state => state.reviews.spot))

    const extraPhotos = () => {
        if(spot.SpotImages?.length === 1) return "https://sflands.com/wp-content/uploads/2021/05/Photos-Coming-Soon-830x620.jpg"
        if(spot.SpotImages?.length === 2) return "https://sflands.com/wp-content/uploads/2021/05/Photos-Coming-Soon-830x620.jpg"
        if(spot.SpotImages?.length === 3) return "https://sflands.com/wp-content/uploads/2021/05/Photos-Coming-Soon-830x620.jpg"
        if(spot.SpotImages?.length === 4) return "https://sflands.com/wp-content/uploads/2021/05/Photos-Coming-Soon-830x620.jpg"
        if(spot.SpotImages?.length === 5) return "https://sflands.com/wp-content/uploads/2021/05/Photos-Coming-Soon-830x620.jpg"
        // if(spot.SpotImages?.length >= 6) return "https://sflands.com/wp-content/uploads/2021/05/Photos-Coming-Soon-830x620.jpg"
    }



    if(!spot.Owner) return null
    return (
        <div className="wrapper-for-info">
            <div className="header">
                <h2 className="text spot-header">
                    {spot.name}
                </h2>
                <div className="sub-info width-for-info">
                    <div className='ratings'>
                        <span style={{"width":"4rem"}}><i className="fa-sharp fa-solid fa-star"></i>{isNaN(rating) ? 0 : rating}</span>
                        {spot.numReviews === 1 ? <span style={{"width":"5rem"}}>{spot.numReviews} review </span> : <span style={{"width":"5rem"}}>{spot.numReviews} reviews </span>}
                        <span style={{"width":"20rem"}}>{spot.city}, {spot.state}, {spot.country}</span>
                    </div>
                </div>
            </div>
            <div className="image-container">
            <img className="first-spot-image" src={spot.SpotImages[0].url} alt='first'/>
                <img className="spot-image" src={extraPhotos()} alt="extra1"/>
                <img className="spot-image" src={extraPhotos()} alt="extra2"/>
                <img className="spot-image" src={extraPhotos()} alt="extra3"/>
                <img className="spot-image" src={extraPhotos()} alt="extra4"/>
            </div>
            <div className="details">
                <div className="host">
                    <h3 style={{"width":"18rem"}}>This home hosted by {spot.Owner.firstName}</h3>
                    <div></div>

                </div>
                <div className="reserve-form"><ReserveForm {...spot} /></div>
            </div>
            <div>
                {showForm ? (
                    <CreateReviewForm hideForm={() => setShowForm(false)}/>
                ) : (
                    user && user.id !== spot.ownerId && <button className="create-review-button" onClick={formClick}>Create a review</button>
                )}
                {reviews.length ? (
                    <Reviews reviews={reviews} />
                ) : (<div>No Reviews</div>)}
            </div>
        </div>
    )
}

export default SingleSpot
