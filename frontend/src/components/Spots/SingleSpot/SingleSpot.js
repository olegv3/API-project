import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from '../../../store/spots'
import * as reviewActions from "../../../store/reviews";
import ReserveForm from "./ReserveForm";
import "./SingleSpot.css"
import Reviews from "./Reviews";
import CreateReviewForm from "./Reviews/CreateReviewForm";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import ImageForm from "../SpotImages/ImageForm";
import DeleteImages from "../SpotImages/DeleteImages";

function SingleSpot() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const [showForm, setShowForm] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const formClick = () => {
        if (showForm) setShowForm(false)
        else setShowForm(true)
    }

    useEffect(() => {
        dispatch(spotActions.getSpotById(id))
        dispatch(reviewActions.spotReviews(id))
    }, [id, dispatch])

    const spot = useSelector(state => state.spots.singleSpot)
    const rating = spot.avgStarRating
    const reviews = Object.values(useSelector(state => state.reviews.spot))

    const handleImageError = (e) => {
        e.target.src = 'https://www.vermontframes.com/wp-content/uploads/2020/12/placeholder.png';
        e.target.onError = null;
    };

    if (!spot.Owner) return null
    return (
        <div className="wrapper-for-info">
            <div className="header">
                <h2 className="text spot-header">
                    {spot.name}
                </h2>
                <div className="sub-info">
                    <div className='ratings'>
                        <span style={{ "width": "4rem" }}><i className="fa-sharp fa-solid fa-star"></i>{isNaN(rating) ? 0 : rating}</span>
                        {spot.numReviews === 1 ?
                            <span style={{ "width": "5rem" }}>{spot.numReviews} review </span>
                            :
                            <span style={{ "width": "5rem" }}>{spot.numReviews} reviews </span>
                        }

                        <span style={{ "width": "20rem" }}>{spot.city}, {spot.state}, {spot.country}</span>
                    </div>
                    {user && user.id === spot.ownerId && <div className="imageFormButton">
                        <div className="demo-user-button cur">
                            <OpenModalMenuItem
                                className='imageFormButton'
                                style={{ "minWidth": "10em" }}
                                itemText="Add Image"
                                onItemClick={closeMenu}
                                modalComponent={<ImageForm spotId={spot.id} />}
                            />
                        </div>
                        <div className="demo-user-button cur">
                            <OpenModalMenuItem
                                className='imageFormButton'
                                style={{ "minWidth": "10em" }}
                                itemText="Delete Images"
                                onItemClick={closeMenu}
                                modalComponent={<DeleteImages images={spot.SpotImages} closeMenu={closeMenu} spotId={spot.id} />}
                            />
                        </div>
                        </div>}
                </div>
            </div>
            <div className="image-container">
                {spot.SpotImages?.map((image, i) => (
                    (i < 5 && (i === 0 ?
                        <img key={i} style={{ "objectFit": "cover" }} className="first_grid_item" src={image.url} alt={i} onError={handleImageError} />
                        : <img key={i} style={{ "objectFit": "cover" }} className={`grid_item border_${i}`} src={image.url} alt={i} onError={handleImageError} />))
                ))}
            </div>
            <div className="spotInfo">
                <div className="details">
                    <div className="houseInfo">
                        <div className="host bb pb">
                            <h3 style={{ "margin": "0", "minWidth": "13em" }}>
                                This home hosted by {spot.Owner.firstName}
                            </h3>
                            <i style={{ "fontSize": "30px" }} className="fa-solid fa-user"></i>
                        </div>
                        <div className="bb ptb">
                            <div className="fdc pb">
                                <span className="fwb">Self check-in</span>
                                <span className="fclg">Check yourself in with the keypad.</span>
                            </div>
                            <div className="fdc pb">
                                <span className="fwb">Great location</span>
                                <span className="fclg">100% of recent guests loved the area</span>
                            </div>
                            <div className="fdc">
                                <span className="fwb">Great experience</span>
                                <span className="fclg">100% of recent guests love to come back</span>
                            </div>
                        </div>
                        <div className="bb ptb fdc">
                            <img style={{ "width": "9em" }} className='pb' src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="AirCover"></img>
                            <span className="fclg">
                                Every booking includes free protection from Host cancellations,
                                listing inaccuracies, and other issues like trouble checking in.
                            </span>
                        </div>
                        <div className="bb ptb fdc">
                            <span className="fclg">{spot.description}</span>
                        </div>
                        <div className="bb ptb fdc g1">
                            <span style={{ "fontSize": "20px", "fontWeight": "500" }}>What this place offers</span>
                            <div className="fdr g1">
                                <div className="fdc aic g1" style={{ "gap": "1.37em" }}>
                                    <i className="fa-solid fa-fire-burner cb"></i>
                                    <i className="fa-solid fa-car"></i>
                                    <i className="fa-solid fa-wifi"></i>
                                    <i className="fa-solid fa-temperature-three-quarters"></i>
                                </div>
                                <div className="fdc g1">
                                    <span>Kitchen</span>
                                    <span>Parking on premises</span>
                                    <span>Wifi</span>
                                    <span>Air conditioning</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ReserveForm {...spot} />
                    </div>
                </div>
            </div>
            <div>
                {showForm ? (
                    <CreateReviewForm hideForm={() => setShowForm(false)} />
                ) : (
                    user && user.id !== spot.ownerId && <button className="create-review-button" onClick={formClick}>Create a review</button>
                )}
                {reviews.length ? (
                    <Reviews reviews={reviews} />
                ) : (<div className="tdu fwb" style={{ "marginTop": "1em" }}>No Reviews</div>)}
            </div>
        </div>
    )
}

export default SingleSpot
