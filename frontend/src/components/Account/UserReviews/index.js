import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userReviews } from "../../../store/reviews";
import UserReviewDetails from "./UserReviewDetails";

export default function UserReviews () {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const reviews = Object.values(useSelector(state => state.reviews.user));

    useEffect(() => {
        dispatch(userReviews())
            .then(() => setIsLoading(false));
    }, [dispatch]);

    if(isLoading) return <p>Loading...</p>

    return (
        <div style={{"margin":"40px", "padding":"0px 10px", "display":"flex", "flexDirection":"column", "border":"lightGray solid 1px", "borderRadius":"10px"}}>
            <h2 style={{"borderBottom":"solid lightgray 1px", "padding":"10px"}}>Your Reviews:</h2>
            {reviews.length ? (reviews.map((review) => (
                <UserReviewDetails key={review.id} {...review} />
                ))
            ) : (<h5>No reviews.</h5>)
            }
        </div>
    )
}
