import React from 'react';

import ColorWheel from './ColorWheel';
import ColorSelectorWidget from './ColorWheelWidget';

export default class ColorWheelContainer extends React.Component {
    render() {
        return (
            <div className='color-wheel-container'>
                <ColorWheel />
                <ColorSelectorWidget />
            </div>
        )
    }
}