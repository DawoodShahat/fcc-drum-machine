import React, { Component } from 'react';
import './App.css';


let drumPadData = [
  {
    name: 'Q',
    id: 'Q',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, 
   {
    name: 'W',
    id: 'W',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    name: 'E',
    id: 'E',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, 
   {
    name: 'A',
    id: 'A',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    name: 'S',
    id: 'S',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, 
   {
    name: 'D',
    id: 'D',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    name: 'Z',
    id: 'Z',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, 
   {
    name: 'X',
    id: 'X',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    name: 'C',
    id: 'C',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }, 
];

const DrumMachine = (props) => {


    const drumPads = drumPadData.map( item => {
        return (
            <DrumPad
                key={item.id}
                drumName={item.name}
                id={item.id}
                soundSrc={item.src}
            />
        );       
    });

    return (
        <div className="drum-machine" id="drum-machine">
            {drumPads}
        </div>
    );
}

const DrumPad = (props) => {
    const {
        drumName,
        id,
        soundSrc = '',
        className
    } = props;

    let myRef = React.createRef();



    function handleClick(e){
        myRef.current.currentTime = 0;
        myRef.current.play();
        console.log(myRef.current.id);
    }

    return (
        <div className="drum-pad" onClick={handleClick}>
            {drumName}
            <audio
                ref={myRef}
                src={soundSrc}
                id={id}
                className="clip"
            ></audio>
        </div>
    );
}

//"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" 

class App extends Component {
    constructor(props){
        super(props);
        this.handleKeyboardKey = this.handleKeyboardKey.bind(this);
        this.keyUp = this.keyUp.bind(this);
    }


    componentDidMount(){
        window.addEventListener('keydown', this.handleKeyboardKey);
        window.addEventListener('keyup', this.keyUp);
    } 

    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleKeyboardKey);
        window.removeEventListener('keyup', this.keyUp);
    } 


    handleKeyboardKey(e){
        let audio = document.getElementById(String.fromCharCode(e.keyCode));
        if(!audio) return;
        audio.parentElement.classList.toggle('key-pressed');
        audio.currentTime = 0;
        audio.play();
    }

    keyUp(e){
        let audio = document.getElementById(String.fromCharCode(e.keyCode));
        audio.parentElement.classList.toggle('key-pressed');
    }

    render(){
        return(
            <div className="app">
                <DrumMachine />
            </div>
        );
    }
}

export default App;
