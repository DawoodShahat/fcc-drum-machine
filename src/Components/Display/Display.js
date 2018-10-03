import React from 'react';

export const Display = (props) => {

    const { text } = props;
    return (
        <div className="display" id="display">
            {text}
        </div>
    );
}