import { csrfFetch } from "./csrf"

const CREATE = 'spots/CREATE'
const SINGLE = 'spots/SINGLE'
const LOAD = 'spots/LOAD'
const UPDATE = 'spots/UPDATE'
const DELETE = 'spots/DELETE'

const create = (spot) => {
    return {
        type: CREATE,
        spot
    }
}

const loadSpots = (spots) => {
    return {
        type: LOAD,
        spots
    }
}

const oneSpot = (spot) => {
    return {
        type: SINGLE,
        spot
    }
}

const update = (spot) => {
    return {
        type: UPDATE,
        spot
    }
}

const remove = (id) => {
    return {
        type: DELETE,
        id
    }
}

export const createSpot = (spot, spotImage) => async dispatch => {
    // need to implement spotImage and seperate data
    spot.lat = 32
    spot.lng = 43
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(spot)
      })

    if(response.ok) {
        const formData = new FormData();
        formData.append("image", spotImage.url)
        formData.append('preview', spotImage.preview)
        const spot = await response.json()
        const imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            headers: {"Content-Type": "multipart/form-data"},
            body: formData
          })

        if(imageResponse.ok){
            const image = await imageResponse.json()
            spot.previewImage = image.url
            dispatch(create(spot))
            return spot
        }
    }
}

export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots')

    if(response.ok) {
        const spots = await response.json()
        dispatch(loadSpots(spots))
    }
}

export const getSpotsOfUser = () => async dispatch => {
    const response = await fetch('/api/spots/current')

    if(response.ok){
        const spots = await response.json()
        return spots
    }
}

export const getSpotById = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`)

    if(response.ok) {
        const spot = await response.json()
        dispatch(oneSpot(spot))
    }
}

export const updateSpot = (id, spot, url, avgRating) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(spot)
      })

    if(response.ok) {
        const spot = await response.json()
        spot.previewImage = url || null
        spot.avgRating = avgRating
        dispatch(update(spot))
        return spot
    }
}

export const removeSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
      })

    if(response.ok) {
        const spot = await response.json()
        dispatch(remove(id))
        return spot
    }
}


const initialState = { allSpots: {}, singleSpot: {}}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE:
            newState = {...state, allSpots: {...state.allSpots}}
            newState.allSpots[action.spot.id] = action.spot
            return newState
        case LOAD:
            newState = {...state, allSpots: {...state.allSpots}}
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });
            return newState
        case SINGLE:
            newState = {...state, allSpots: {...state.allSpots}}
            newState.singleSpot = action.spot
            return newState
        case UPDATE:
            newState = {...state, allSpots: {...state.allSpots}}
            newState.allSpots[action.spot.id] = action.spot
            return newState
        case DELETE:
            newState = {...state, allSpots: {...state.allSpots} }
            delete newState.allSpots[action.id]
            return newState
        default:
            return state
    }
}

export default spotsReducer
