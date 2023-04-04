import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateSpot } from "../../../store/spots";
// import Spinner from "../../Spinner";

export default function EditUserSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots.allSpots[id]);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (spot) {
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setCountry(spot.country);
      setName(spot.name);
      setDescription(spot.description);
      setPrice(spot.price);
      setLoading(false);
    }
  }, [spot]);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const clearData = (updatedSpot) => {
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setName("");
    setDescription("");
    setPrice("");
    setErrors([]);

    history.push(`/spots/${updatedSpot.id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
    };
    let updatedSpot = await dispatch(
      updateSpot(id, payload, spot.previewImage, spot.avgRating)
    )
      .then((updatedSpot) => clearData(updatedSpot))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

    if (updatedSpot) {
      history.push(`/spots/${updatedSpot.id}`);
      setAddress("");
      setCity("");
      setState("");
      setCountry("");
      setName("");
      setDescription("");
      setPrice("");
    }
  };

  if (loading) {
    return
  }

  return (
    <div>
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <button
          onClick={() => history.push("/account/spots")}
          style={{
            padding: "0px",
            height: "0px",
            color: "black",
            position: "relative",
            right: "155px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          X
        </button>
        {errors.length !== 0 && (
          <ul style={{ marginBottom: "  0px" }}>
            {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))}
            </ul>
        )}
        <h4 style={{ marginTop: "0px" }}>Edit your listing</h4>
        <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={updateAddress}
            required
        />
        <input
            type="text"
            placeholder="City"
            value={city}
            onChange={updateCity}
            required
        />
        <input
            type="text"
            placeholder="State"
            value={state}
            onChange={updateState}
            required
        />
        <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={updateCountry}
            required
        />
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={updateName}
            required
        />
        <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={updateDescription}
            required
        />
        <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={updatePrice}
            required
        />
        <button type="submit">Update</button>
        </form>
    </div>
    );
}



//   return (
//     <div>
//       <form className="create-spot-form" onSubmit={handleSubmit}>
//         <button
//           onClick={() => history.push("/account/spots")}
//           style={{
//             padding: "0px",
//             height: "0px",
//             color: "black",
//             position: "relative",
//             right: "155px",
//             border: "none",
//             background: "none",
//             cursor: "pointer",
//           }}
//         >
//           X
//         </button>
//         {errors.length !== 0 && (
//           <ul style={{ marginBottom: "0px" }}>
//             {errors.map((error, idx) => (
//               <li key={idx}>{error}</li>
//             ))}
//           </ul>
//         )}
//         <h4 style={{ marginTop: "0px" }}>Edit your listing</h4>
//         <input
//             style={{ borderRadius: "10px 10px 0px 0px" }}
//             type={"text"}
//             placeholder={"Address"}
//             required
//             value={address}
//             onChange={updateAddress}
//             />
//             <input
//             type={"text"}
//             placeholder={"City"}
//             required
//             value={city}
//             onChange={updateCity}
//             />
//             <input
//             type={"text"}
//             placeholder={"State"}
//             required
//             value={state}
//             onChange={updateState}
//             />
//             <input
//             type={"text"}
//             placeholder={"Country"}
//             required
//             value={country}
//             onChange={updateCountry}
//             />
//             <input
//             type={"text"}
//             placeholder={"Name"}
//             required
//             value={name}
//             onChange={updateName}
//             />
//             <input
//             type={"text"}
//             placeholder={"Description"}
//             required
//             value={description}
//             onChange={updateDescription}
//             />
//             <input
//             type={"text"}
//             placeholder={"Price"}
//             required
//             value={price}
//             onChange={updatePrice}
//             />
//         <button
//             style={{
//             borderRadius: "0px 0px 10px 10px",
//             width: "100%",
//             height: "40px",
//             }}
//             type="submit"
//         >
//             Update
//         </button>
//         </form>
//     </div>
//     );
// }
