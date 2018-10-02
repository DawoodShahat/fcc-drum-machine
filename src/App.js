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

let soundNames = {
    'Q' : 'Heater-1',
    'W' : 'Heater-2',
    'E' : 'Heater-3',
    'A' : 'Heater-4',
    'S' : 'Heater-6',
    'D' : 'Dsc-Oh',
    'Z' : 'Kick_n_Hat',
    'X' : 'RP4_KICK_1',
    'C' : 'Cev_H2'
}

const DrumMachine = (props) => {
    const {
        volume,
        togglePower
    } = props;

    const drumPads = drumPadData.map( item => {
        return (
            <DrumPad
                key={item.id}
                drumName={item.name}
                id={item.id}
                soundSrc={item.src}
                volume={volume}
                togglePower={togglePower}
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
        volume,
        togglePower,
    } = props;

    let myRef = React.createRef();



    function handleClick(e){
        myRef.current.volume = volume;
        myRef.current.currentTime = 0;
        myRef.current.muted = !togglePower;
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

const Toggle = (props) => {

    const {
        handleToggle,
        className
    } = props;
    return (
		<div id="toggle" className="toggle" onClick={handleToggle}>
			<div className={className}></div>
		</div>	
    );
}

const Display = (props) => {

    const { text } = props;
    return (
        <div className="display">
            {text}
        </div>
    );
}

const VolumeSlider = (props) => {
    const { handleChange } = props;
    return (
        <input
            onChange={handleChange}
            className="volume-slider"
            type="range"
            min="0"
            max="100"
        />
    );
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            volume: 0.5,
            displayText: '',
            togglePower: true
        }

        this.handleKeyboardKey = this.handleKeyboardKey.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
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

        // if it is powered off then show nothing on display
        if(!this.state.togglePower){
            this.setState({
            displayText: ''
            });
        }else {
            this.setState({
                displayText: soundNames[audio.id]
            });
        }

        audio.volume = this.state.volume;
        audio.muted = !this.state.togglePower;
        audio.currentTime = 0;
        audio.parentElement.classList.add('key-pressed');
        audio.play();
    }

    keyUp(e){
        let audio = document.getElementById(String.fromCharCode(e.keyCode));
        if(!audio) return;
        audio.parentElement.classList.remove('key-pressed');
    }

    handleChange(e){
        this.setState({
            volume: e.target.value / 100,
            displayText: e.target.value 
        
        });
    }

    handleToggle(e){
        const { togglePower } = this.state;
        const powerStatus = togglePower ? 'Power Off' : 'Power On';

        this.setState({
            togglePower: !togglePower,
            displayText: powerStatus
        });
    }

    render(){
        const {
            displayText,
            volume,
            togglePower
        } = this.state;

        return(
            <div className="app">
                <DrumMachine
                    volume={volume}
                    togglePower={togglePower}
                />
                <div className="controller">
                    <Toggle
                        handleToggle={this.handleToggle}
                        className={`toggle-box ${ togglePower ? 'changed' : '' }`}
                    />
                    <Display text={displayText} />
                    <VolumeSlider handleChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

export default App;
