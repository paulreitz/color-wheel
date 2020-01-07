import React from 'react';

import RulesSelector from './RuleSelector';
import ColorWheelContainer from './ColorWheelContainer';
import ColorDisplay from './ColorDisplay';
import SettingsContainer from './SettingsContainer';

export default class ColorTool extends React.Component {
    render() {
        return (
            <div className='color-tool'>
                <RulesSelector />
                <ColorWheelContainer />
                <ColorDisplay />
                <SettingsContainer />
            </div>
        )
    }
}