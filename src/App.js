import React, { Component } from 'react';
import PubNub from 'pubnub';
import './App.css';
import "../node_modules/video-react/dist/video-react.css"; // import css
import { Player, ControlBar } from 'video-react';
 
 
const sources = {
  sintelTrailer: './Correct.mp4',
  bunnyTrailer: './Wrong.mp4'
};
 
 
class App extends Component {
 
  constructor(props) {
    super(props);
    // this.myvariable = {};
    this.pubnub = new PubNub({
      publishKey: 'pub-c-34594ec4-ac63-48c4-b347-ea229241e0a4',
      subscribeKey: 'sub-c-3e0fe9a0-6e87-11ea-bbe3-3ec3e5ef3302',
    });
 
    this.state = {
      source: sources.test
    };
 
  }
 
  componentDidMount(){
 
    let that = this;
 
    // subscribe to a channel
    this.pubnub.subscribe({
      channels: ['iotchannel']
    });
 
    //listen for any messages
    this.pubnub.addListener({
      status: function (statusEvent) {
        //handel status events
      },
      message: function (msg) {
 
        // ------------  here is where I get the messages from pubnub ---------------//
        console.log(msg.message.eon.button);
        // console.log(msg.message.video);
 // eslint-disable-next-line
        if(msg.message.eon.button == '1270255'){
 
          that.setState({
            source: sources["sintelTrailer"]
          });
          that.player.load();
          that.player.play();
 // eslint-disable-next-line
        }else  if(msg.message.eon.button == '00255'){
          that.setState({
            source: sources["bunnyTrailer"]
          });
          that.player.load();
          that.player.play();
 
        }
 
 
 
      },
      presence: function (presenceEvent) {
        // handle presence events
      }
    })
 
  }
 
  //This is what gets draw to the screen
  render() {
    return (
      <div> 
       <h1 style={{color: "#858381"}}>Hue Music</h1>
      <p style={{color: "#B0AEAC"}}>Hue music is an educational game which intends to teach people about chromesthesia. 
        Chromesthesia is a type of synaesthesia in which sounds relate to colours. 
        Once you hear the first sound press the button to start playing the game.</p>
        <Player
      ref={player => {
        this.player = player;
      }}
      autoPlay
    >
      <source src={this.state.source} />
      <ControlBar disableCompletely={true} />
    </Player>

    </div>
    );
  }
 
}

export default App;