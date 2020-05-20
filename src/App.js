import React, { useEffect, useState } from 'react';
import Iframe from 'react-iframe'
import './App.css';
import Chat from './components/chats/Chat'


let teetee = ""
let teer = ""
let wcee = ""

const TWILIO_SERVICE_URL = "https://video-app-9613-dev.twil.io/?"
//const VIDEO_URL = TWILIO_SERVICE_URL + "tt=" + teetee+ "&tr=" +teer
const URL = "https://video-app-9613-dev.twil.io/?tt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzEzNTAyYzQ2ZmJlZjVkMDA1ZjE1NThmYWMxY2Q3YTFlLTE1ODkyODY3MDQiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJDaHJpc3RpYW4gS2VsbGVyIiwidmlkZW8iOnsicm9vbSI6InRyc2RmYWtqc2RmYTM0NTM0NTM0NWpraDM0NWs0NCJ9fSwiaWF0IjoxNTg5Mjg2NzA0LCJleHAiOjE1ODkyOTAzMDQsImlzcyI6IlNLMTM1MDJjNDZmYmVmNWQwMDVmMTU1OGZhYzFjZDdhMWUiLCJzdWIiOiJBQ2E1NDYxOGEzYThhMTQ2ZjIyZjZhZWIwNTAyOTg5OTZkIn0.EuRjWZ7t5Ttuu4UxkyFc99q-ekJI6RnYyclBVyN1Wss&tr=https://video-app-9613-dev.twil.io/?tt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzEzNTAyYzQ2ZmJlZjVkMDA1ZjE1NThmYWMxY2Q3YTFlLTE1ODkyODY3MDQiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJDaHJpc3RpYW4gS2VsbGVyIiwidmlkZW8iOnsicm9vbSI6InRyc2RmYWtqc2RmYTM0NTM0NTM0NWpraDM0NWs0NCJ9fSwiaWF0IjoxNTg5Mjg2NzA0LCJleHAiOjE1ODkyOTAzMDQsImlzcyI6IlNLMTM1MDJjNDZmYmVmNWQwMDVmMTU1OGZhYzFjZDdhMWUiLCJzdWIiOiJBQ2E1NDYxOGEzYThhMTQ2ZjIyZjZhZWIwNTAyOTg5OTZkIn0.EuRjWZ7t5Ttuu4UxkyFc99q-ekJI6RnYyclBVyN1Wss&tr=trsdfakjsdfa345345345jkh345k44"




function App() {

  const [tt, setTT] = useState("")
  const [tr, setTR] = useState("")
  const [wc, setWC] = useState("")
  const [viewMod, setViewMod] = useState("")
  const [videoURL, setVIDEOURL] = useState("")


  const parseURL = async () => {

      //const fullURL = window.location.href.split('#')[0]
      const fullURL = window.location.href
      const fullURLsubStrings = fullURL.split('/');
      console.log("tt is: ", fullURLsubStrings[3], "\ntr is: ", fullURLsubStrings[4], "\nwc is: ", fullURLsubStrings[5]);

      teetee = fullURLsubStrings[3]
      teer = fullURLsubStrings[4]
      wcee = fullURLsubStrings[5]

      setTT(fullURLsubStrings[3])
      setTR(fullURLsubStrings[4])
      setWC(fullURLsubStrings[5])
      setViewMod(fullURLsubStrings[6])
      // return fullURLsubStrings[2]; 
    
  }

  useEffect(() => {
    parseURL()
  }, [])


  useEffect(() => {
    setVIDEOURL(`${TWILIO_SERVICE_URL + "tt=" + tt + "&tr=" + tr}`)
    console.log("videoURL is ", videoURL)
  }, [videoURL])



  return (
    <div className="App">
      {viewMod == 2 && <nav class="navbar nav shadow-sm">
        <span class="navbar-brand mb-0 h1">Tele-Video</span>
      </nav>}

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: viewMod == 2?20:0 }}>
        <div style={{ display: "flex", justifyContent: "center", height: viewMod == 2 ? "90vh":"100vh", width: viewMod == 2 ? "90%":"100%" }}>
          {(tt.length > 1 && tr.length > 1) && <Iframe 
            url={videoURL}
            position="relative"
            width="100%"
            id="myId"
            className="myClassname"
            height="100%"
            styles={{ height: "100%", alignSelf: "center" }}
            allow="camera"
          />}
        </div>
        {viewMod == 2 && <Chat wcChat={wc}/>}
      </div>

    </div>
  );
}

export default App;
