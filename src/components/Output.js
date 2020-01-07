import React from 'react';
import Demo from './Demo';
import CodeDisplay from './CodeDisplay';

export default class Output extends React.Component {
    render() {
        return (
            <div className='output'>
                <Demo />
                <CodeDisplay type='sass' />
                <CodeDisplay type='less' />
            </div>
        )
    }
}