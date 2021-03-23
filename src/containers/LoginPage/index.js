import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { signin, signup } from '../../actions';
import Layout from '../../compenents/Layout';
import Card from '../../compenents/UI/Card';
import "./style.css";
/**
* @author
* @function Loginpage
**/

const Loginpage = (props) => {
  const [email, setEmail]  = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector (state => state.auth);
  
  const userLogin = (e) => {
    e.preventDefault();
    if(email == ""){
      alert("Email is required");
      return;
    }
    if(password == ""){
      alert("password is required");
      return;
    }
    dispatch(signin({email, password}));
  }
  if (auth.authenticated){
    return <Redirect to={'/'} />
  }
  return(
    
    <div className="loginContainer">
    <Card>
        <form onSubmit={userLogin}>
          <input
          name= "email"
          type= "text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
         />
         <input
          name= "password"
          type= "password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
         />

         <div>
           <button>login</button>  
         </div>
        </form>
      </Card>
    </div>
    
   )

 }

export default Loginpage