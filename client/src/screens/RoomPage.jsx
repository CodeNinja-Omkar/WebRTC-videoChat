import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketProvider";

const RoomPage = () => {
  const socket = useSocket();
  const videoRef = useRef();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`User joined: ${email} with id: ${id}`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setMyStream(stream);
  }, []);

  // ✅ Attach stream to video after render
  useEffect(() => {
    if (videoRef.current && myStream) {
      videoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);

  return (
    <div>
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? "You are connected" : "No user joined"}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {myStream && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          width="400"
          height="300"
          style={{ backgroundColor: "black" }}
        />
      )}
    </div>
  );
};

export default RoomPage;
