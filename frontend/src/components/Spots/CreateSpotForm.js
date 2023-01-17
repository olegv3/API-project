import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createSpot } from "../../store/spots"
import './CreateSpotForm.css'

export default function CreateSpotForm () {
    const dispatch = useDispatch()
    const history = useHistory()
    const [ address, setAddress ] = useState('')
    const [ city, setCity ] = useState('')
    const [ state, setState ] = useState('')
    const [ country, setCountry ] = useState('')
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ url, setURL ] = useState('')
    const [ errors, setErrors ] = useState([])

    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateURL = (e) => setURL(e.target.value)

    const clearData = (createdSpot) => {
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setName('')
        setDescription('')
        setPrice('')
        setErrors([])

        history.push(`/spots/${createdSpot.id}`)
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

        const spotImage = {
            url,
            preview: true
        }

        await dispatch(createSpot(payload, spotImage)).then(createdSpot => clearData(createdSpot)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div style={{"display":"flex", "alignItems":"center", "justifyContent":"center"}}>
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <button onClick={() => history.push('/')} style={{"padding":"0px", "height":"0px", "color":"black", "width":"20px", "position":"relative", "right":"163px", "border":"none", "background":"none", "cursor":"pointer"}}>X</button>
                {errors.length !== 0 &&
                    <ul style={{"marginBottom":"0px"}}>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
                <h4 style={{"marginTop":"0px"}}>Create a listing</h4>
                <input style={{"borderRadius":"10px 10px 0px 0px"}}
                    type={'text'}
                    placeholder={'Address'}
                    required
                    value={address}
                    onChange={updateAddress}
                />
                <input
                    type={'text'}
                    placeholder={'City'}
                    required
                    value={city}
                    onChange={updateCity}
                />
                <input
                    type={'text'}
                    placeholder={'State'}
                    required
                    value={state}
                    onChange={updateState}
                />
                <input
                    type={'text'}
                    placeholder={'Country'}
                    required
                    value={country}
                    onChange={updateCountry}
                />
                <input
                    type={'text'}
                    placeholder={'Name of House'}
                    required
                    value={name}
                    onChange={updateName}
                />
                <input
                    type={'text'}
                    placeholder={'Description'}
                    required
                    value={description}
                    onChange={updateDescription}
                />
                <input style={{"borderRadius":"0px 0px 10px 10px", "marginBottom": "10px"}}
                    type={'number'}
                    placeholder={'Price per night'}
                    required
                    min={1}
                    value={price}
                    onChange={updatePrice}
                />
                <input style={{"borderRadius":"10px", "marginBottom": "10px"}}
                    type={'url'}
                    placeholder={'Cover image url'}
                    required
                    value={url}
                    onChange={updateURL}
                />
                <button className="submitButton">Submit</button>
            </form>
        </div>
    )
}
