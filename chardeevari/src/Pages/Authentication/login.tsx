import React, { useState, FormEvent } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../../Slices/Auth/thunk';
import { useNavigate } from 'react-router-dom';

interface LoginFormState {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormState>({
    email: 'akash@gmail.com',
    password: '123456',
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
    const redirectUrl:any =localStorage.getItem("lastPageVisited"); 
    console.log("redirectUrl",redirectUrl);
    navigate(redirectUrl)
    //TODO:open the same page after click in which the page was opened 
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
