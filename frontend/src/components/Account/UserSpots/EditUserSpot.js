import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { updateSpot } from "../../../store/spots"
// import './EditUserSpot.css'


export default function EditUserSpot () {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const spot = useSelector(state => state.spots.allSpots[id])

    const [ address, setAddress ] = useState(spot.address)
    const [ city, setCity ] = useState(spot.city)
    const [ state, setState ] = useState(spot.state)
    const [ country, setCountry ] = useState(spot.country)
    const [ name, setName ] = useState(spot.name)
    const [ description, setDescription ] = useState(spot.description)
    const [ price, setPrice ] = useState(spot.price)

    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const [ errors, setErrors ] = useState([])

    const clearData = (updatedSpot) => {
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setName('')
        setDescription('')
        setPrice('')
        setErrors([])

        history.push(`/spots/${updatedSpot.id}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            address,
            city,
            state,
            country,
            name,
            description,
            price
        }

        let updatedSpot = await dispatch(updateSpot(id, payload, spot.previewImage, spot.avgRating)).then(updatedSpot => clearData(updatedSpot)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

        if(updatedSpot){
            history.push(`/spots/${updatedSpot.id}`)
            setAddress('')
            setCity('')
            setState('')
            setCountry('')
            setName('')
            setDescription('')
            setPrice('')
        }

    }
    return (
        <div>
            <form className="create-spot-form" onSubmit={handleSubmit}>
            <button onClick={() => history.push('/account/spots')} style={{"padding":"5px", "height":"0px","color":"black", "position":"relative", "bottom":"-8px","right":"155px", "border":"none", "background":"none", "cursor":"pointer"}}>X</button>
                {errors.length !== 0 &&
                <ul style={{"marginBottom":"0px"}}>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                }
                <h4 style={{"marginTop":"0px"}}>Update {spot.name}</h4>
                <input style={{"borderRadius":"10px 10px 10px 10px", "marginBottom": "10px"}}
                    type={'text'}
                    placeholder={'Address'}
                    required
                    value={address}
                    onChange={updateAddress}
                />
                <input style={{"borderRadius":"10px 10px 10px 10px", "marginBottom": "10px"}}
                    type={'text'}
                    placeholder={'City'}
                    required
                    value={city}
                    onChange={updateCity}
                />
                <input style={{"borderRadius":"10px 10px 10px 10px", "marginBottom": "10px"}}
                    type={'text'}
                    placeholder={'State'}
                    required
                    value={state}
                    onChange={updateState}
                />
                <input style={{"borderRadius":"10px 10px 10px 10px", "marginBottom": "10px" }}
                    type={'text'}
                    placeholder={'Country'}
                    required
                    value={country}
                    onChange={updateCountry}
                />
                <input style={{"borderRadius":"10px 10px 10px 10px", "marginBottom": "10px"}}
                    type={'text'}
                    placeholder={'Name of House'}
                    required
                    value={name}
                    onChange={updateName}
                />
                <input style={{"borderRadius":"10px 10px 10px 10px", "marginBottom": "10px"}}
                    type={'text'}
                    placeholder={'Description'}
                    required
                    value={description}
                    onChange={updateDescription}
                />
                <input style={{"borderRadius":"10px 10px 10px 10px", "marginBottom": "20px"}}
                    type={'number'}
                    placeholder={'Price per night'}
                    required
                    min={1}
                    value={price}
                    onChange={updatePrice}
                />
                <button className="submitButton">Submit</button>
            </form>
        </div>
    )
}
