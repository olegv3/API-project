import React from "react";
import { Link } from "react-router-dom";
import './SpotDetailCard.css'

function SpotDetailCard(spot) {
    const rating = spot.avgRating

    if(!spot) return null
    return (
        <div className="spot-card">
        <Link to={`/spots/${spot.id}`}>
            <img className={'image'} src={spot.previewImage} alt="sample"></img>
            <p className="location">{spot.city}, {spot.state}<span style={{"fontWeight":"normal"}}><i className="fa-sharp fa-solid fa-star"></i>{isNaN(rating) ? 'No Reviews' : rating}</span></p>
            <div style={{'fontSize': '12px'}}>
                <span style={{'fontWeight': 'bold', 'fontSize': '13px'}}>
                    ${spot.price} {" "}
                </span>
                night
            </div>
        </Link>
        </div>
    )
}

export default SpotDetailCard
