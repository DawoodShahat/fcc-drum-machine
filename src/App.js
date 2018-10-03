import React, { Component } from 'react';
import './App.css';

let drumPadData = [
  {
    name: 'Q',
    id: 'Heater-1',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, 
   {
    name: 'W',
    id: 'Heater-2',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    name: 'E',
    id: 'Heater-3',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, 
   {
    name: 'A',
    id: 'Heater-4',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    name: 'S',
    id: 'Heater-6',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, 
   {
    name: 'D',
    id: 'Dsc-Oh',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    name: 'Z',
    id: 'Kick_n_Hat',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, 
   {
    name: 'X',
    id: 'RP4_KICK_1',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    name: 'C',
    id: 'Cev_H2',
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
    const { handleClick } = props;

    const drumPads = drumPadData.map( item => {
        return (
            <DrumPad
                key={item.id}
                drumName={item.name}
                id={item.name}
                soundSrc={item.src}
                handleClick={handleClick}
                drumId={item.id}
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
        handleClick,
        drumId
    } = props;

    return (
        <div className="drum-pad" id={drumId} onClick={handleClick}>
            {drumName}
            <audio
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
        <div className="display" id="display">
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
        this.handleClick = this.handleClick.bind(this);
        this.setDisplayText = this.setDisplayText.bind(this);
        this.setAudioControls = this.setAudioControls.bind(this);
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

        this.setDisplayText(audio.id);
        this.setAudioControls(audio);
        audio.parentElement.classList.add('key-pressed');
    }

    setAudioControls(audio){
        audio.volume = this.state.volume;
        audio.muted = !this.state.togglePower;
        audio.currentTime = 0;
        audio.play();
    }

    setDisplayText(id){
        // if it is powered off then, show nothing on display
        if(!this.state.togglePower){
            this.setState({
                displayText: ''
            });
        }else {
            this.setState({
                displayText: soundNames[id]
            });
        }
    }

    handleClick(e){
        let audio = document.getElementById(e.target.textContent);

        if(!audio) return;

        this.setDisplayText(audio.id);
        this.setAudioControls(audio);
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
            togglePower
        } = this.state;

        return(
            <div className="app">
                <DrumMachine
                    handleClick={this.handleClick}
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
