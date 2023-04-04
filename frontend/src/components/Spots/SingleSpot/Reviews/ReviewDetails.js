import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeReview } from "../../../../store/reviews"
import OpenModalMenuItem from "../../../Navigation/OpenModalMenuItem"
import './ReviewDetails.css'
import ReviewImages from "./ReviewImages"

export default function ReviewDetails (review) {

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)


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

    const closeMenu = () => setShowMenu(false);

    const deleteAReview = async () => {
        await dispatch(removeReview(review.id, review.spotId))
    }

    const created = new Date(review.createdAt)
    const monthName = created.toLocaleString('en-US', { month: 'long' });
    const year = created.getFullYear()

    if(!review.User) return null
    return (
        <div className="singleReviewContainer g1 bb fdc">
            <div>
                <div className="fdr aic g1">
                    <i style={{"fontSize":"30px"}} className="fa-solid fa-user"></i>
                    <div>
                        <h4 style={{"margin":"0px"}}>{review.User.firstName}</h4>
                        <span className="fclg">{monthName} {year}</span>
                    </div>
                </div>
            </div>
            <div>
                {review.review}
            </div>
            <div className="fdr">
                {review.ReviewImages.length ? (
                    <div style={{"listStyleType":"none", "textDecoration":"underline", "paddingLeft":"0px", "fontWeight":"600"}}>
                        <OpenModalMenuItem
                        className='imagesModalButton'
                        itemText="Show Pictures"
                        onItemClick={closeMenu}
                        modalComponent={<ReviewImages images={Object.values(review.ReviewImages)}/>}
                        />
                    </div>
                ) : (null)}
                {user && user.id === review.userId && (
                    <div style={{"display":"flex", "alignItems":"center"}}>
                        <button className="delete-review-button" onClick={deleteAReview}>Delete review</button>
                    </div>
                )}
            </div>
        </div>
    )
}
