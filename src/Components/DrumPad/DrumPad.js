import React from 'react';

export const DrumPad = (props) => {
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