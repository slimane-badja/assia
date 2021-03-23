import React, { useState } from 'react';
import Layout from '../../compenents/Layout';
import Card from '../../compenents/UI/Card';
import { signup }   from '../../actions';
import   { useDispatch, useSelector }   from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
* @author
* @function RegisterPage
**/

const RegisterPage = (props) => {
  
    const [nom ,setnom] = useState('');
    const [prenom ,setprenom] = useState('');
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const registerUser = (e) => {
    e.preventDefault();
    
   
    const user = {
      nom, prenom, email, password
    }
  
    dispatch(signup(user))
   
  }

  if (auth.authenticated){
    return <Redirect to={'/'} />
  }




    return(
        <Layout>
           <div className="registerContainer">
             <Card>
               <form onSubmit={registerUser}>
                <h3>Sign up</h3> 
                <input
                name="nom" 
                type="text"
                value={nom}
                onChange={(e) => setnom(e.target.value)}
                placeholder="nom"
                />
                <input
                name="prenom" 
                type="text"
                value={prenom}
                onChange={(e) => setprenom(e.target.value)}
                placeholder="prenom"
                />

                <input
                name="email" 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                />

                <input
                name="password" 
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                />

                <div>
                  <button>Sign up</button>
                </div>

               </form>
               </Card>      

             </div> 
        </Layout>
           
        

      
    
   )

 }

export default RegisterPage