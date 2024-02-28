  import React from 'react';
  import uuid from 'uuid/v4';
  import ToggleButton from '@mui/material/ToggleButton';
  import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
  import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
  import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
  import PianoScale from './PianoScale';
  import PianoBrand from './PianoBrand';
  import PianoTracks from './PianoTracks';
  import PianoKeys from './PianoKeys'
  import AppBar from '@mui/material/AppBar';
  import DeleteIcon from '@mui/icons-material/Delete';
  import Toolbar from '@mui/material/Toolbar';
  import Typography from '@mui/material/Typography';
  import MicIcon from '@mui/icons-material/Mic';
  import myImage from './MelodyMatchLogo.png'; // Adjust the path as needed

  import './Piano.css'
  import NestedList from './components/NestedList';
  export default class Piano extends React.Component {
    state = {
      isRecording: false,
      done: false,
      record: {
        starts_at: 0,
        sounds: {}
      },
      tracks: [],
      clickedKeys: [],
      animateIcon: false,
      lettered: [],
      shouldClearKeys: false, 
      songData: []
    }
  
    onStart = data => {
      if (this.state.isRecording) {
        this.setState({
          record: {
            ...this.state.record,
            sounds: {
              ...this.state.record.sounds,
              [data.id]: {
                id: data.id,
                note: data.note,
                octave: data.octave,
                starts_at: data.time,
                finish_at: undefined
              }
            }
          }
        })
      }
    }

    onStop = data => {
      if (this.state.isRecording) {
        this.setState({
          record: {
            ...this.state.record,
            sounds: {
              ...this.state.record.sounds,
              [data.id]: {
                id: data.id,
                note: data.note,
                octave: data.octave,
                starts_at: this.state.record.sounds[data.id].starts_at,
                finish_at: data.time
              }
            }
          }
        })
      }
    }

    onToggleRecording = () => {
      
      this.setState({ isRecording: !this.state.isRecording});
      
    };
    onToggleRecording2 = () => {
      this.sendDataToAPI();
      this.setState({ isRecording: !this.state.isRecording});
      this.handleEmpty();
    };

    sendDataToAPI = async () => {
      console.log(this.state.clickedKeys);
      try {
        const response = await fetch('http://127.0.0.1:5000/predict', {  // Update this URL to your Flask API's URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.clickedKeys) // Make sure this state contains the data you want to send
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        this.setState({songData: responseData})
        console.log(this.state);

      } catch (error) {
        console.error('Error sending data to API:', error);
      }
    };
    // Inside Piano component
    handleClickedKeys = (clickedKeys) => {
      this.setState(prevState => {
        const keyToPianoKeyMap = {
          '0': { note: 'C', index: 0 },
          '1': { note: 'C#', index: 1 },
          '2': { note: 'D', index: 2 },
          '3': { note: 'D#', index: 3 },
          '4': { note: 'E', index: 4 },
          '5': { note: 'F', index: 5 },
          '6': { note: 'F#', index: 6 },
          '7': { note: 'G', index: 7 },
          '8': { note: 'G#', index: 8 },
          '9': { note: 'A', index: 9 },
          '10': { note: 'A#', index: 10 },
          '11': { note: 'B', index: 11 }
        };
    
        let temp = [];
        let count = 0;
        clickedKeys.forEach(arr => {
          for (let j = 0; j < 12; j++) {
            if (arr[j] === 1 && count < 10 ) {
              const note = keyToPianoKeyMap[j.toString()].note; // Ensure the key is a string
              temp.push(note);
            }
          }
          if (count < 10) {
            count++;
            temp.push("|");
          }
          else {
          }
        });
        return {
          clickedKeys: clickedKeys,
          lettered: temp
        };
      });
    };
    handleEmpty = () => {
      this.setState({
        clickedKeys: [],
        lettered: [],
        shouldClearKeys: true, // Add this line
      }, () => {
        this.setState({ shouldClearKeys: false, isRecording: false });
      });
    }
    render() {
      return (
        <React.Fragment>
          

          <AppBar position="static">
            <Toolbar style={{backgroundColor: "#1c1c1c"}}>
              <img src={myImage} style={{ width: '60px', height: '60px', float: 'left' }} alt="Description" />
            </Toolbar>
          </AppBar>
          <div className="delete-button-wrapper">
            {this.state.isRecording && <DeleteIcon onClick={this.handleEmpty} style={{ color: 'white', width: "80px", height: "80px", opacity: 1}}/>}
          </div>
          <div className="delete-button-wrapper">
            {!this.state.isRecording && <DeleteIcon style={{ color: "white", width: "80px", height: "80px", opacity: 0.5}}/>}
          </div>
          <div className='song-wrapper'>
            {this.state.songData.length > 0 && <NestedList songs={this.state.songData} />}
          </div>
          <div className="record-button-wrapper">
            {/* <ToggleButton
              value="record"
              selected={this.state.isRecording}
              onChange={this.onToggleRecording}
              style={{ width: "80px", height: "80px", color:"white"}}
              > */}
              {!this.state.isRecording &&  <MicIcon onClick={this.onToggleRecording} style={{width: "80px", height: "80px", color: "white"}}/>}
              {this.state.isRecording &&  <StopCircleOutlinedIcon onClick={this.onToggleRecording2} style={{width: "80px", height: "80px", color: "red"}}/>}

            {/* </ToggleButton> */}
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              value={this.state.lettered.join(' ')}
              readOnly
              className='list-box'
            />
        </div>
          <div className="piano">
            <PianoScale>
              <PianoKeys onStart={this.onStart} isRecording={this.state.isRecording} onStop={this.onStop} clearKeys={this.state.shouldClearKeys} onKeyClick={this.handleClickedKeys}  />
            </PianoScale>
          </div>         
        </React.Fragment>
      )
    }
  }
