import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider.jsx";
const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");


  const socket = useSocket();

  
  const handleSubmitForm = useCallback((e)=>{
    e.preventDefault();
    socket.emit("room:join",{email,room});
    setEmail("");
    setRoom("");
    
    
  },[email,room,socket]);

useEffect(() => {
  
  socket.on("room:join", (data) => {
    console.log(`Data from backend ${data}`);
  });
  
}, [socket])  




  return (
    <div>
      <h1>Lobby Screen</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label htmlFor="room">Room</label>
        <input
          type="text"
          name="room"
          id="room"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
