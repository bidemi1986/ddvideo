import React from 'react';
import Iframe from 'react-iframe'
import './App.css';


const URL= "https://video-app-9613-dev.twil.io/?tt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzEzNTAyYzQ2ZmJlZjVkMDA1ZjE1NThmYWMxY2Q3YTFlLTE1ODkyODY3MDQiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJDaHJpc3RpYW4gS2VsbGVyIiwidmlkZW8iOnsicm9vbSI6InRyc2RmYWtqc2RmYTM0NTM0NTM0NWpraDM0NWs0NCJ9fSwiaWF0IjoxNTg5Mjg2NzA0LCJleHAiOjE1ODkyOTAzMDQsImlzcyI6IlNLMTM1MDJjNDZmYmVmNWQwMDVmMTU1OGZhYzFjZDdhMWUiLCJzdWIiOiJBQ2E1NDYxOGEzYThhMTQ2ZjIyZjZhZWIwNTAyOTg5OTZkIn0.EuRjWZ7t5Ttuu4UxkyFc99q-ekJI6RnYyclBVyN1Wss&tr=https://video-app-9613-dev.twil.io/?tt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzEzNTAyYzQ2ZmJlZjVkMDA1ZjE1NThmYWMxY2Q3YTFlLTE1ODkyODY3MDQiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJDaHJpc3RpYW4gS2VsbGVyIiwidmlkZW8iOnsicm9vbSI6InRyc2RmYWtqc2RmYTM0NTM0NTM0NWpraDM0NWs0NCJ9fSwiaWF0IjoxNTg5Mjg2NzA0LCJleHAiOjE1ODkyOTAzMDQsImlzcyI6IlNLMTM1MDJjNDZmYmVmNWQwMDVmMTU1OGZhYzFjZDdhMWUiLCJzdWIiOiJBQ2E1NDYxOGEzYThhMTQ2ZjIyZjZhZWIwNTAyOTg5OTZkIn0.EuRjWZ7t5Ttuu4UxkyFc99q-ekJI6RnYyclBVyN1Wss&tr=trsdfakjsdfa345345345jkh345k44"

function App() {
  return (
    <div className="App">
      <nav class="navbar nav shadow-sm">
        <span class="navbar-brand mb-0 h1">Tele-Video</span>
      </nav>
      
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:20}}>
        <div style={{display:"flex", justifyContent:"center", height:"90vh", width:"90%"}}>
        <Iframe url={URL}
            position="relative"
            width="100%"
            id="myId"
            className="myClassname"
            height="100%"
            styles={{height: "100%", alignSelf:"center"}}
      />
        </div>
     
      </div>
      
    </div>
  );
}

export default App;
