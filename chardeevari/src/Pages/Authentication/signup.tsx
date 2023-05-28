import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../../Slices/Auth/thunk';

interface SignUpFormState {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {

  const dispatch = useDispatch<any>();
  const [formData, setFormData] = useState<SignUpFormState>({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, phone, email, password, confirmPassword } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password don't match");
      return;
    }

    const requestData = {
      name,
      phone,
      email,
      password, // Send only the password to the backend
    };

    // Send the form data to the backend API
    dispatch(signup(requestData))

    // Reset the form
    setFormData({
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
      email: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone:
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
