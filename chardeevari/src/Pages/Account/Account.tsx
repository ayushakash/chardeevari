import React from 'react'
import { getOrder } from '../../Slices/Orders/thunk'
import { useDispatch } from 'react-redux'
import { getAddress } from '../../Slices/User/thunk';
import { logout } from '../../Slices/Auth/thunk';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const getOrders = () =>{
        dispatch(getOrder())
    }
    const getAddresses = () =>{
        dispatch(getAddress());
    }
    const signOut = () =>{
        dispatch(logout())
    }
    const login = () =>{
        navigate("/login")
    }



  return (
    <div>
        <h3>Account</h3>
        <div onClick={signOut}>Login</div>
        <div onClick={getOrders}>My Orders</div>
        <div onClick={getAddresses}>My Addresses</div>
        <div onClick={login}>Sign out</div>
      
    </div>
  )
}

export default Account
