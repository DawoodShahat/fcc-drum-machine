import React from 'react';

export const Toggle = (props) => {

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