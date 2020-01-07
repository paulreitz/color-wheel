import React from 'react';
import { connect } from 'react-redux';

import Setting from './Setting';

export class SettingsContainer extends React.Component {
    render() {
        return (
            <div className='settings-container'>
            {this.props.settings.map((setting, i) => {
                return (
                    <Setting setting={setting} index={i} key={i} />
                )
            })}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    settings: state.settings
});

export default connect(mapStateToProps)(SettingsContainer);