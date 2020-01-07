import React from 'react';
import { connect } from 'react-redux';

import { setColors } from '../store/actions/ColorsActions';
import { clampCircular } from '../utils/utils';
import updateColors from '../utils/ColorUtilities';

export class ColorSelector extends React.Component {
    state = {
        x: 150,
        y: 20,
    }

    isActive = false;
    render() {
        return (
            <div className='color-selector'
                onMouseDown={this.onMouseDown}
            >
                <div className={`color-selector__indicator index-${this.props.index}`}
                    style={
                        {
                            left: this.state.x,
                            top: this.state.y
                        }
                    }
                ></div>
            </div>
        )
    }

    setPosition() {
        const c = this.props.colors[this.props.index];
        const rads = c.hue() * Math.PI / 180;
        const newX = Math.floor(((Math.cos(rads) * (150 - 18)) + 150) - 15);
        const newY = Math.floor(((Math.sin(rads) * (150 - 18)) + 150) - 15);
        this.setState(() => {
            return {
                x: newX,
                y: newY
            }
        })
    }

    componentDidMount() {
        if (this.props.colors && this.props.colors.length) {
            this.setPosition();
        }
    }

    componentDidUpdate(oldProps) {
        if (oldProps.colors[this.props.index] !== this.props.colors[this.props.index]) {
            this.setPosition();
        }
    }

    onMouseDown = (e) => {
        this.isActive = true;
        const element = document.getElementById('color-wheel-widget');
        element.addEventListener('mousemove', this.onMouseMove);
        element.addEventListener('mouseleave', this.onMouseOut);
        element.addEventListener('mouseup', this.onMouseOut);
    }

    onMouseOut = (e) => {
        this.isActive = false;
        const element = document.getElementById('color-wheel-widget');
        element.removeEventListener('mousemove', this.onMouseMove);
        element.removeEventListener('mouseleave', this.onMouseOut);
        element.removeEventListener('mouseup', this.onMouseOut);
    }

    onMouseMove = (e) => {
        if (this.isActive) {
            const element = document.getElementById('color-wheel-widget');
            const newX = e.clientX - element.getBoundingClientRect().x;
            const newY = e.clientY - element.getBoundingClientRect().y;
            const degrees = this.calculateDegrees(newX, newY);
            updateColors(
                this.props.rule,
                this.props.index,
                degrees,
                this.props.setColors
            );
        }
    }

    calculateDegrees(x, y) {
        const a = x - 150 + 18;
        const b = y - 150 + 18;
        const radians = Math.atan2(b, a);
        const degrees = clampCircular(radians * (180/Math.PI));
        if(degrees > this.props.colors[this.props.index].hue()) {
            return Math.ceil(degrees)
        }
        return Math.floor(degrees);
    }
}

const mapDispatchToProps = (dispatch) => ({
    setColors: (colors) => (dispatch(setColors(colors)))
});

const mapStateToProps = (state) => ({
    rule: state.rule.rule,
    colors: state.colors.colors
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorSelector);
