import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="sign-up-form">
      <button className="exit-button" onClick={closeModal}>X</button>
      <h4 className="sign-up-header">Sign Up</h4>
      <form className="form-of-sign" onSubmit={handleSubmit}>
        <h2>Welcome to Luxbnb</h2>
        {errors.length !== 0 &&
          <ul className="ul-errors">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        }
        <div className="fields-for-input">
            <input
            style={{"borderRadius":"10px 10px 10px 10px", "marginBottom":"5px", border: "1px solid gray"}}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />

            <input style={{"borderRadius":"10px 10px 10px 10px", "marginBottom":"5px", border: "1px solid gray"}}
              type="text"
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input style={{"borderRadius":"10px 10px 10px 10px", "marginBottom":"5px", border: "1px solid gray"}}
              type="text"
              value={firstName}
              placeholder='First Name'
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <input style={{"borderRadius":"10px 10px 10px 10px", "marginBottom":"5px", border: "1px solid gray"}}
              type="text"
              value={lastName}
              placeholder='Last Name'
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <input style={{"borderRadius":"10px 10px 10px 10px", "marginBottom":"5px", border: "1px solid gray"}}
              type="password"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input style={{"borderRadius":"10px 10px 10px 10px", "marginBottom":"5px", border: "1px solid gray"}}
              type="password"
              value={confirmPassword}
              placeholder='Confirm Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
