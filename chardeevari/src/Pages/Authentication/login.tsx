import React, { useState, FormEvent } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../../Slices/Auth/thunk';

interface LoginFormState {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {

  const dispatch = useDispatch<any>();
  const [formData, setFormData] = useState<LoginFormState>({
    email: 'johd@exam.com',
    password: 'password123',
  });

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const requestData = {
      email,
      password,
    };

    // Send the login request to the backend API
    dispatch(login(requestData));

    // Reset the form
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container">
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
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
