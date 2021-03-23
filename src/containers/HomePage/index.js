import React, { useEffect, useState } from 'react';
import './style.css';
import Layout from '../../compenents/Layout';
import  { useDispatch, useSelector } from 'react-redux';
import { getRealtimeConversations, getRealtimeUsers, updateMessage } from '../../actions';
import {IoSend} from 'react-icons/io5'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));


//l'affichage de l'utilisateur qu'il soit connecté ou pas 
const User = (props) => {
  const classes = useStyles();
  const {user, onClick} = props;
    return (
      // un utilisateur
      <Paper className={classes.paper}>
      <Grid container wrap="nowrap" spacing={2}>
        
        <Grid item xs>
          <Typography>
      <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
    <img src={user.imageUrl} alt="" />
     </div>
       <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between',   margin: '0 10px'}}>
    <span style={{fontWeight: 500}}>{user.nom} {user.prenom} </span>
    <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
     </div>
    </div> 
    </Typography>
          </Grid>
        </Grid>
     </Paper>
    );

}


const HomePage = (props) => {
     
   const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState('');
    const [message, setMessage] = useState('');
    const [userUid, setUserUid] = useState(null);



    let unsubscribe;
    useEffect(() => {
        unsubscribe = dispatch(getRealtimeUsers(auth.email))
        .then(unsubscribe => {
          return unsubscribe;
        })
        .catch(error =>{
          console.log(error);
        })
    }, []);
  //compenentWillUnmount pour une faute!!
  useEffect(() => {
    return () => {
      //cleanup
      unsubscribe.then(f => f()).catch(error => console.log(error));
    }

  }, []);

  //initialisation de la conversation 
  const initChat = (user) => {

    setChatStarted(true)
    setChatUser(`${user.nom} ${user.prenom}`)
    setUserUid (user.email);

    console.log(user);

    dispatch(getRealtimeConversations({ uid_1: auth.email, uid_2: user.email }));
  }
 // la conversation
const submitMessage =(e) => {
  const msgObj = {
    user_uid_1: auth.email,
    user_uid_2: userUid,
    message
  }

  if(message !==""){
    dispatch(updateMessage(msgObj))
    .then(() => {
      setMessage('')
    });
  }
   //console.log(msgObj);
}
// var ImgName, ImgUrl;
// var Files = [];
// var reader = new FileReader();


//l'affichage de la liste des utilisateurs connecté et non connéctés
  return (
    <Layout>
    <section className="container">
    <div className="flex flex-col">
             
             
             {
               user.users.length > 0 ?
               user.users.map(user => {
                 return (
                 <User
                 onClick={initChat} 
                 key={user.email} 
                 user={user} />
                 );
               }) : null
             }

                
           








        
                
    </div>
    <div className="chatArea">
        <div className="chatHeader"> 

        {
          chatStarted ? chatUser : ''
        }

        </div>
        <div className="messageSections">
             {
               chatStarted ?
               user.conversations.map(con =>
                <div style={{ textAlign: con.user_uid_1 == auth.email ? 'right' : 'left' }}>
                <p className="messageStyle" >{con.message}</p>
            </div>)
                : null
             }
             </div>
              {
                chatStarted ?
                <div className="chatControls">
                  <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="write message"
                  />
                  <button style={{marginLeft:"5px"}} className="font-black focus:outline-none focus:ring-2 focus:ring-opacity-50" onClick={submitMessage}><IoSend className="h-10 w-10"></IoSend>Send </button>
                </div> : null
                
                
                
              } 
              
                
                    
                  
                   
              
              
    </div>
</section>
</Layout>
  );
}

export default HomePage;