import React from 'react';
import { DrumPad } from '../DrumPad/DrumPad';

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

export const DrumMachine = (props) => {
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