import { Button,  FormControl, Input, InputLabel } from '@material-ui/core';
import React , {forwardRef , useEffect, useState } from 'react'
import './App.css';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

function App() {
  const [input, setInput] = useState('');
  // console.log(input);
  const [messages, setMessages] = useState([]);
  // console.log(messages);
  const [username, setUsername] = useState('');


  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp','asc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  },[])
  useEffect(() => {
    setUsername(prompt("please enter your name"))
  }, [])
  
  const sendMessage = (event) => {
    event.preventDefault();                    //prevents refreshing of the page
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })


    setMessages([...messages, {username: username, message: input}]);         //spread operator use to append the input to existing msg list
    setInput('');                              //clears input field after msg sent
    

  }
  return (
    <div className="App">
      <h1>ChIt-ChAt📧</h1>
      <h2>welcome {username} </h2>
      
      <form>
      <FormControl>
        <InputLabel>Enter a message</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)} />
        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send Message</Button>
      </FormControl>
      
      
      
      </form>


      <FlipMove> {
        messages.map(({id, message}) => (
          <Message key={id} username={username} message={message}/>
          
        
        ))
      }</FlipMove>
     
        
    </div>
  );
}

export default App;
