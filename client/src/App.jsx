import LobbyScreen from "./screens/Lobby";
import "./App.css";
import RoomPage from "./screens/RoomPage";
import {Routes,Route} from "react-router-dom";
function App(){
return <div className="App">
<Routes> 
  <Route path="/" element={<LobbyScreen/>}/>
  <Route path="/room/:roomid" element={<RoomPage/>}/>
</Routes>
</div>
}

export default App;