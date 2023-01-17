import ReviewDetails from "./ReviewDetails"

export default function Reviews ({reviews}) {

    return (
        <div>
            {reviews.map(review => (
                <ReviewDetails key={review.id} {...review}/>
            ))}
        </div>
    )
}
