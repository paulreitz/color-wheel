import React from 'react';

import ColorTool from './ColorTool';
import Output from './Output';

export default class Content extends React.Component {

    render() {
        return (
            <div className='content'>
                <ColorTool />
                <Output />
            </div>
        )
    }
}