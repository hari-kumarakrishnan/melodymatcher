import React from 'react'
import PianoKey from './PianoKey'

export default class Piano extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedKeys: [],
      activeKeys: new Set(),
      chord: 0,
      curr: 0,
      duplicate: new Set()
    };
    this.cKeyOctave2Ref = React.createRef();
    this.csKeyOctave2Ref = React.createRef();
    this.dKeyOctave2Ref = React.createRef();
    this.dsKeyOctave2Ref = React.createRef();
    this.eKeyOctave2Ref = React.createRef();
    this.fKeyOctave2Ref = React.createRef();
    this.fsKeyOctave2Ref = React.createRef();
    this.gKeyOctave2Ref = React.createRef();
    this.gsKeyOctave2Ref = React.createRef();
    this.aKeyOctave2Ref = React.createRef();
    this.asKeyOctave2Ref = React.createRef();
    this.bKeyOctave2Ref = React.createRef();
    
    this.cKeyOctave3Ref = React.createRef();
    this.csKeyOctave3Ref = React.createRef();
    this.dKeyOctave3Ref = React.createRef();
    this.dsKeyOctave3Ref = React.createRef();
    this.eKeyOctave3Ref = React.createRef();
    this.fKeyOctave3Ref = React.createRef();
    this.fsKeyOctave3Ref = React.createRef();
    this.gKeyOctave3Ref = React.createRef();
    this.gsKeyOctave3Ref = React.createRef();
    this.aKeyOctave3Ref = React.createRef();
    this.asKeyOctave3Ref = React.createRef();
    this.bKeyOctave3Ref = React.createRef();
    this.c2KeyOctave4Ref = React.createRef();
    this.cKeyOctave4Ref = React.createRef();
    this.csKeyOctave4Ref = React.createRef();
    this.dKeyOctave4Ref = React.createRef();
    this.dsKeyOctave4Ref = React.createRef();
    this.eKeyOctave4Ref = React.createRef();
    this.fKeyOctave4Ref = React.createRef();
    this.fsKeyOctave4Ref = React.createRef();
    this.gKeyOctave4Ref = React.createRef();
    this.gsKeyOctave4Ref = React.createRef();
    this.aKeyOctave4Ref = React.createRef();
    this.asKeyOctave4Ref = React.createRef();
    this.bKeyOctave4Ref = React.createRef();
    

  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }
  componentDidUpdate(prevProps) {
    // Check if the clearKeys prop has changed to true
    if (this.props.clearKeys && !prevProps.clearKeys) {
      this.clearClickedKeys(); // Call a method to clear the state
    }
  }
  clearClickedKeys = () => {
    this.setState({
      clickedKeys: []
    }, () => {
    });
  }
  handleKeyDown = (event) => {
    // Prevent the default action to stop repeated events when holding down the key
    event.preventDefault();
    this.setState(prevState => ({
      curr: prevState.curr + 1
    }));    
    
    const keyToPianoKeyMap = {
      // Octave 2 Mappings
      'z': { ref: this.cKeyOctave2Ref, note: 'C2', index: 0 },
      's': { ref: this.csKeyOctave2Ref, note: 'C#2', index: 1 },
      'x': { ref: this.dKeyOctave2Ref, note: 'D2', index: 2 },
      'd': { ref: this.dsKeyOctave2Ref, note: 'D#2', index: 3 },
      'c': { ref: this.eKeyOctave2Ref, note: 'E2', index: 4 },
      'v': { ref: this.fKeyOctave2Ref, note: 'F2', index: 5 },
      'g': { ref: this.fsKeyOctave2Ref, note: 'F#2', index: 6 },
      'b': { ref: this.gKeyOctave2Ref, note: 'G2', index: 7 },
      'h': { ref: this.gsKeyOctave2Ref, note: 'G#2', index: 8 },
      'n': { ref: this.aKeyOctave2Ref, note: 'A2', index: 9 },
      'j': { ref: this.asKeyOctave2Ref, note: 'A#2', index: 10 },
      'm': { ref: this.bKeyOctave2Ref, note: 'B2', index: 11 },
    
      // Octave 3 Mappings (existing)
      'q': { ref: this.cKeyOctave3Ref, note: 'C3', index: 0 },
      '2': { ref: this.csKeyOctave3Ref, note: 'C#3', index: 1 },
      'w': { ref: this.dKeyOctave3Ref, note: 'D3', index: 2 },
      '3': { ref: this.dsKeyOctave3Ref, note: 'D#3', index: 3 },
      'e': { ref: this.eKeyOctave3Ref, note: 'E3', index: 4 },
      'r': { ref: this.fKeyOctave3Ref, note: 'F3', index: 5 },
      '4': { ref: this.fsKeyOctave3Ref, note: 'F#3', index: 6 },
      't': { ref: this.gKeyOctave3Ref, note: 'G3', index: 7 },
      '5': { ref: this.gsKeyOctave3Ref, note: 'G#3', index: 8 }, // Notice the index for '4' is repeated; consider using a different key for gsKeyOctave3Ref
      'y': { ref: this.aKeyOctave3Ref, note: 'A3', index: 9 },
      '6': { ref: this.asKeyOctave3Ref, note: 'A#3', index: 10 }, // Notice the index for '4' is repeated; consider using a different key for asKeyOctave3Ref
      'u': { ref: this.bKeyOctave3Ref, note: 'B3', index: 11 }
    }
  
    const pianoKeyDetails = keyToPianoKeyMap[event.key];
  
    if (pianoKeyDetails && !this.state.activeKeys.has(pianoKeyDetails.index)) {

      pianoKeyDetails.ref.current && pianoKeyDetails.ref.current.onStart();

      this.setState(prevState => ({
        activeKeys: new Set(prevState.activeKeys).add(pianoKeyDetails.index),
        duplicate: new Set(prevState.activeKeys).add(pianoKeyDetails.note)
      }));
    }
  };
  


  handleKeyUp = (event) => {

    const keyToPianoKeyMap = {
      // Octave 2 Mappings
      'z': { ref: this.cKeyOctave2Ref, note: 'C2', index: 0 },
      's': { ref: this.csKeyOctave2Ref, note: 'C#2', index: 1 },
      'x': { ref: this.dKeyOctave2Ref, note: 'D2', index: 2 },
      'd': { ref: this.dsKeyOctave2Ref, note: 'D#2', index: 3 },
      'c': { ref: this.eKeyOctave2Ref, note: 'E2', index: 4 },
      'v': { ref: this.fKeyOctave2Ref, note: 'F2', index: 5 },
      'g': { ref: this.fsKeyOctave2Ref, note: 'F#2', index: 6 },
      'b': { ref: this.gKeyOctave2Ref, note: 'G2', index: 7 },
      'h': { ref: this.gsKeyOctave2Ref, note: 'G#2', index: 8 },
      'n': { ref: this.aKeyOctave2Ref, note: 'A2', index: 9 },
      'j': { ref: this.asKeyOctave2Ref, note: 'A#2', index: 10 },
      'm': { ref: this.bKeyOctave2Ref, note: 'B2', index: 11 },
      'q': { ref: this.cKeyOctave3Ref, note: 'C3', index: 0 },
      '2': { ref: this.csKeyOctave3Ref, note: 'C#3', index: 1 },
      'w': { ref: this.dKeyOctave3Ref, note: 'D3', index: 2 },
      '3': { ref: this.dsKeyOctave3Ref, note: 'D#3', index: 3 },
      'e': { ref: this.eKeyOctave3Ref, note: 'E3', index: 4 },
      'r': { ref: this.fKeyOctave3Ref, note: 'F3', index: 5 },
      '4': { ref: this.fsKeyOctave3Ref, note: 'F#3', index: 6 },
      't': { ref: this.gKeyOctave3Ref, note: 'G3', index: 7 },
      '5': { ref: this.gsKeyOctave3Ref, note: 'G#3', index: 8 }, // Notice the index for '4' is repeated; consider using a different key for gsKeyOctave3Ref
      'y': { ref: this.aKeyOctave3Ref, note: 'A3', index: 9 },
      '6': { ref: this.asKeyOctave3Ref, note: 'A#3', index: 10 }, // Notice the index for '4' is repeated; consider using a different key for asKeyOctave3Ref
      'u': { ref: this.bKeyOctave3Ref, note: 'B3', index: 11 }
    }

    
    const pianoKeyDetails = keyToPianoKeyMap[event.key];
  
    if (pianoKeyDetails && this.state.activeKeys.has(pianoKeyDetails.index)) {
      pianoKeyDetails.ref.current && pianoKeyDetails.ref.current.onStop();
      if (this.state.curr > 0) {
        this.handleKeyClick(this.state.activeKeys);
      }
      this.setState(prevState => {
        const updatedActiveKeys = new Set(prevState.activeKeys);
        const updatedActiveKeys2 = new Set(prevState.activeKeys);

        updatedActiveKeys.delete(pianoKeyDetails.index);
        updatedActiveKeys2.delete(pianoKeyDetails.index);

        return { activeKeys: updatedActiveKeys, duplicate : updatedActiveKeys2 };
      }, () => {
        
        }); 
    }
    this.setState({curr: 0});
  };
  handleKeyClick = (pos) => {
    if (!this.props.isRecording) {
      return; 
    }
    this.setState(prevState => ({
      clickedKeys: [...prevState.clickedKeys, this.setKeyIndex(pos)]
    }), () => {
      this.props.onKeyClick(this.state.clickedKeys);
    });
  }

  setKeyIndex = (indexes) => {
    const arr = new Array(12).fill(0);
    const setIter = this.state.activeKeys.keys();
    if (indexes) {
      if (indexes.size <= 1) {
        arr[setIter.next().value] = 1;
      }
      else if (indexes.length == 1) {
        arr[indexes[0]] = 1;
      }
      else {
        for (let i = 0; i < indexes.size; i++) {
          arr[setIter.next().value] = 1;
        }
      }
    }
    return arr;
  }
  
  render() {
    const { onStop, onStart } = this.props 
    
    return (
      <React.Fragment>
        <PianoKey
          onStart={onStart}
          onStop={onStop}
          note="C"
          octave={2}
          ref={this.cKeyOctave2Ref}
          isHalfStep         
        /> 
        <PianoKey
          onStart={() => this.handleKeyClick([1])}
          onStop={onStop}
          note="Db"
          octave={2}
          ref={this.csKeyOctave2Ref}
          isFlat
        />
        <PianoKey onStart={() => this.handleKeyClick([2])} onStop={onStop} note="D" octave={2} />
        <PianoKey
          onStart={() => this.handleKeyClick([3])}
          onStop={onStop}
          note="Eb"
          octave={2}
          isFlat
        />
        <PianoKey onStart={() => this.handleKeyClick([4])} onStop={onStop} note="E" octave={2} />
        <PianoKey
          onStart={() => this.handleKeyClick([5])}
          onStop={onStop}
          note="F"
          octave={2}
          isHalfStep

        />
        <PianoKey
          onStart={() => this.handleKeyClick([6])}
          onStop={onStop}
          note="Gb"
          octave={2}
          isFlat
        />
        <PianoKey onStart={() => this.handleKeyClick([7])} onStop={onStop} note="G" octave={2} />
        <PianoKey
          onStart={onStart}
          onStop={onStop}
          note="Ab"
          octave={2}
          isFlat
        />
        <PianoKey onStart={() => this.handleKeyClick([9])} onStop={onStop} note="A" octave={2} />
        <PianoKey
          onStart={onStart}
          onStop={onStop}
          note="Bb"
          octave={2}
          isFlat
        />
        <PianoKey onStart={() => this.handleKeyClick([11])} onStop={onStop} note="B" octave={2} />
        <PianoKey
          onStart={onStart}
          onStop={onStop}
          note="C"
          ref={this.cKeyOctave3Ref}
          octave={3}
          isHalfStep
          isActive={this.state.activeKeys.has(0)}
        />

        <PianoKey
          onStart={onStart}
          onStop={onStop}
          ref={this.csKeyOctave3Ref}
          note="Db"
          octave={3}
          isFlat
        />
        <PianoKey isActive={this.state.activeKeys.has(2)} onStart={onStart} onStop={onStop} note="D" octave={3} ref={this.dKeyOctave3Ref} />

        <PianoKey
          onStart={onStart}
          ref={this.dsKeyOctave3Ref}
          onStop={onStop}
          note="Eb"
          octave={3}
          isFlat
        />
        <PianoKey onStart={onStart} isActive={this.state.activeKeys.has(4)} onStop={onStop} note="E" octave={3} ref={this.eKeyOctave3Ref}/>
        <PianoKey A 
          onStart={onStart}
          onStop={onStop}
          note="F"
          octave={3}
          isActive={this.state.activeKeys.has(5   )}
          ref={this.fKeyOctave3Ref}
          isHalfStep
        />
        <PianoKey
          onStart={onStart}
          onStop={onStop}
          note="Gb"
          octave={3}
          ref={this.fsKeyOctave3Ref}
          isFlat
        />
        <PianoKey onStart={onStart} isActive={this.state.activeKeys.has(7)} onStop={onStop} note="G" octave={3} ref={this.gKeyOctave3Ref}/>
        <PianoKey
          onStart={onStart}
          onStop={onStop}
          note="Ab"
          octave={3}
          ref={this.gsKeyOctave3Ref}

          isFlat
        />
        <PianoKey onStart={onStart} isActive={this.state.activeKeys.has(9)}onStop={onStop} note="A" octave={3} ref={this.aKeyOctave3Ref} />
        <PianoKey
          onStart={onStart}
          onStop={onStop}
          note="Bb"
          octave={3}
          ref={this.asKeyOctave3Ref}

          isFlat
        />
        <PianoKey onStart={onStart} onStop={onStop} isActive={this.state.activeKeys.has(11)} note="B" octave={3} ref={this.bKeyOctave3Ref}/>
        <PianoKey
          onStart={onStart}
          onStop={onStop}
          note="C"
          octave={4}
          isHalfStep
          ref={this.c2KeyOctave3Ref}
        />

        <PianoKey
          onStart={onStart}
          onStop={onStop}
          note="Db"
          octave={4}
          isFlat
        />
        <PianoKey onStart={() => this.handleKeyClick([2])} onStop={onStop} note="D" octave={4} />
        <PianoKey
          onStart={() => this.handleKeyClick([3])}
          onStop={onStop}
          note="Eb"
          octave={4}
          isFlat
        />
        <PianoKey onStart={() => this.handleKeyClick([4])} onStop={onStop} note="E" octave={4} />
        <PianoKey
          onStart={() => this.handleKeyClick([5])}
          onStop={onStop}
          note="F"
          octave={4}
          isHalfStep
        />
        <PianoKey
          onStart={() => this.handleKeyClick([6])}
          onStop={onStop}
          note="Gb"
          octave={4}
          isFlat
        />
        <PianoKey onStart={() => this.handleKeyClick([7])} onStop={onStop} note="G" octave={4} />
        <PianoKey
          onStart={() => this.handleKeyClick([8])}
          onStop={onStop}
          note="Ab"
          octave={4}
          isFlat
        />
        <PianoKey onStart={() => this.handleKeyClick([9])} onStop={onStop} note="A" octave={4} />
        <PianoKey
          onStart={() => this.handleKeyClick([10])}
          onStop={onStop}
          note="Bb"
          octave={4}
          isFlat
        />
        <PianoKey onStart={() => this.handleKeyClick([11])} onStop={onStop} note="B" octave={4} />

        <PianoKey
          onStart={onStart}
          onStop={onStop}
          isHalfStep
          note="C"
          octave={5}
        />
      </React.Fragment>
    )
  }
}
