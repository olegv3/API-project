import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { bookingCreate } from "../../../store/bookings"
import "./SingleSpot.css"
import "./ReserveForm.css"

export default function ReserveForm(spot) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [guest, setGuest] = useState(1)
    const date = new Date()
    const month = date.getMonth() + 1
    const today = `${date.getFullYear()}-${month < 9 ? '0' + String(month) : month}-${date.getDate()}`
    const futureDate = `${date.getFullYear()}-${month < 9 ? '0' + String(month) : month}-${date.getDate() + 5}`
    const [checkIn, setCheckIn] = useState(today)
    const [checkout, setCheckout] = useState(futureDate)
    const [errors, setErrors] = useState([])

    const thisDate = new Date(checkout) - new Date(checkIn)
    const numDays = Math.ceil(thisDate / (1000 * 3600 * 24));

    const updateCheckIn = (e) => setCheckIn(e.target.value)
    const updateCheckout = (e) => setCheckout(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            startDate: checkIn,
            endDate: checkout
        }
        await dispatch(bookingCreate(spot.id, payload))
            .then(() => {
                setErrors([])
                alert('Your booking has been reserved!')
                setCheckIn(today)
                setCheckout(futureDate)
            })
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                }
            );
    }
    const rating = spot.avgStarRating

    return (
        <div className="form-container p1">
            <div>
                <div className="sub-info g1 aic">
                    <div><span style={{ "fontWeight": "bold" }}>${spot.price}</span> night</div>
                    <div className="reserveReviewInfo">
                        <span className="aic"><i className="fa-sharp fa-solid fa-star" style={{ "fontSize": "12px" }}></i>{isNaN(rating) ? 0 : rating} ·</span>
                        <span>{spot.numReviews} {spot.numReviews === 1 ? 'review' : 'reviews'} </span>
                    </div>
                </div>
                <form
                    className="formReserve"
                    onSubmit={handleSubmit}>
                    {errors.length !== 0 &&
                        <ul style={{ "marginBottom": "0px" }}>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    }
                    <div className="inputContainer">
                        <div>
                            <label className="reserveFormLabels fss fwb">
                                CHECK-IN
                            </label>
                            <input
                                className="reserveFormInputs"
                                type={'date'}
                                name={'check-in'}
                                placeholder={'Add date'}
                                min={today}
                                value={checkIn}
                                onChange={updateCheckIn}
                            />
                        </div>
                        <div>
                            <label className="reserveFormLabels fss fwb">
                                CHECKOUT
                            </label>
                            <input
                                className="reserveFormInputs"
                                type={'date'}
                                name={'checkout'}
                                min={checkIn}
                                placeholder={'Add date'}
                                value={checkout}
                                onChange={updateCheckout}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="reserveFormLabels fss fwb">
                            GUEST
                        </label>
                        <input
                            className="reserveFormInputs"
                            type={'number'}
                            name={'guest'}
                            placeholder={'1 guest'}
                            value={guest}
                            onChange={(e) => setGuest(e.target.value)}
                        />
                    </div>
                    {user && user.id !== spot.ownerId && checkIn !== today && checkout !== futureDate ? (
                        <button className="reserveFormButton">Reserve</button>
                    ) : null}

                </form>
            </div>

            <div>
                You will not be charged yet
            </div>
            <div>
        {checkIn && checkout && (
            <>
                <div className="spacing">
                    <span className="tdu">${spot.price} x {isNaN(numDays) ? 0 : numDays} nights</span>
                    <span>${isNaN(spot.price * numDays) ? 0 : spot.price * numDays}</span>
                </div>
                <div className="spacing">
                    <span className="tdu">Cleaning Fee</span>
                    <span>${isNaN(35 * numDays) ? 0 : 35 * numDays}</span>
                </div>
                <div className="spacing">
                    <span className="tdu">Service Fee</span>
                    <span>${isNaN(25 * numDays) ? 0 : 25 * numDays}</span>
                </div>
            </>
        )}
    </div>
        </div>
    )

}
