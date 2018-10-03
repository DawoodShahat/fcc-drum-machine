import React from 'react';

export const VolumeSlider = (props) => {
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