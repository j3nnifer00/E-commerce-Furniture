// File for Signup page content

// Hooks
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom"; // useNavigate를 import 합니다.
import "./auth.css"
 

const Signup = () => {
  // States
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    zip: '',
    country: '',
    isAdmin: false
  });

  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handler Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(newUser);

    if (!error) {
      navigate("/");
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newUser.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={newUser.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="street">Street:</label>
        <input
          type="text"
          id="street"
          name="street"
          value={newUser.street}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="apartment">Apartment:</label>
        <input
          type="text"
          id="apartment"
          name="apartment"
          value={newUser.apartment}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={newUser.city}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="zip">Zip:</label>
        <input
          type="text"
          id="zip"
          name="zip"
          value={newUser.zip}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={newUser.country}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="isAdmin">Is Admin:</label>
        <input
          type="checkbox"
          id="isAdmin"
          name="isAdmin"
          checked={newUser.isAdmin}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </button>

      {/* Display error message */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
