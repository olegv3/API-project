import "./SingleSpot.css"

export default function ReserveForm (spot) {
    const rating = spot.avgStarRating
    return (
        <div className="form-container">
            <div>
                <div className="sub-info gap-for-reserve">
                    <div><span style={{"fontWeight": "bold"}}>${spot.price}</span> night</div>
                    {/* <div>
                        <span><i className="fa-sharp fa-solid fa-star"></i>{isNaN(rating) ? 0 : rating} ·</span>
                        {spot.numReviews === 1 ? <span>{spot.numReviews} review </span> : <span>{spot.numReviews} reviews </span>}
                    </div> */}
                </div>
            </div>
        </div>
    )
}
