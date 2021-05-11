// import {  FormControl } from '@material-ui/core';
import React , { useEffect, useRef, useState } from 'react'
import './App.css';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
// import { IconButton } from '@material-ui/core';


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
  
  const dummy = useRef();
  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    dummy.current.scrollIntoView({ behavior: "smooth" });


    setMessages([...messages, {username: username, message: input}]);         //spread operator use to append the input to existing msg list
    setInput('');                              //clears input field after msg sent
    
    
  }
  return (
    <div className="App">

      <header>
      <h1>ChIt-ChAt📧</h1>
      <h2>{username} </h2>
      </header>
      <section>
      
      
      <form className="app__form">
      {/* <FormControl className="app__formControl"> */}
        {/* <InputLabel>Enter a message</InputLabel> */}
        <input className="app__input" placeholder={"enter a message"} value={input} onChange={event => setInput(event.target.value)} />

        <button className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>

          <SendIcon></SendIcon>
        </button>
        {/* <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send Message</Button> */}
      {/* </FormControl> */}
      
      </form>
      
      <main>
      {/* <FlipMove> */}
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
        <span ref={dummy}></span>
      {/* </FlipMove> */}
      
      </main>
      </section>
    </div>
  );
}

export default App;
