import React, { Component } from 'react';
import '../..//App.css';

import { Display } from '../Display/Display';
import { DrumMachine } from '../DrumMachine/DrumMachine';
import { Toggle } from '../Toggle/Toggle';
import { VolumeSlider } from '../VolumeSlider/VolumeSlider';


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
