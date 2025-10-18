import React, { useCallback, useState } from "react";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  
  const handleSubmitForm = useCallback((e)=>{
    e.preventDefault()
    console.log({
      email,
      room
    })
  })
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
