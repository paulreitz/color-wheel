import React from 'react';

import Header from './Header';
import Content from './Content';

export default class Application extends React.Component {
    render() {
        return (
            <div className="application">
                <Header />
                <Content />
            </div>
        )
    }
}