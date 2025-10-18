import React,{useCallback, useEffect, useState} from 'react'
import { useSocket } from '../context/SocketProvider'

const RoomPage = () => {

const socket = useSocket();

const [remoteSocketId,setRemoteSocketId] = useState(null);

const handleUserJoined = useCallback((data)=>{
  const {email,id} = data;
  console.log(`User joined: ${email} with id: ${id}`);
  setRemoteSocketId(id);
},[]);

useEffect(() => {
  socket.on("user:joined", handleUserJoined);
  return () => {
    socket.off("user:joined", handleUserJoined);
  };
}, [socket, handleUserJoined]);

  return (
    <div>
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? `Remote user ID: ${remoteSocketId}` : "No user joined"}</h4>
      {
        remoteSocketId && <button>Call</button>
      }
    </div>
  )
}

export default RoomPage
