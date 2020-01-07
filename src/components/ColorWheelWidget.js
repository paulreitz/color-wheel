import React from 'react';
import { connect } from 'react-redux';

import { setColors } from '../store/actions/ColorsActions';

import ColorSelector from './ColorSelector';

export class ColorWheelWidget extends React.Component {
    render() {
        return (
            <div className='color-wheel-widget' id='color-wheel-widget'>
                {this.props.colors.map((color, i) => {
                    return (
                        <ColorSelector index={i} key={i} />
                    )
                })}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setColors: (colors) => dispatch(setColors(colors))
});

const mapStateToProps = (state) => ({
    rule: state.rule.rule,
    colors: state.colors.colors
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorWheelWidget);