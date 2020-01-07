import React from 'react';
import { connect } from 'react-redux';
import Color from 'color';
import { setSetting } from '../store/actions/SettingsActions';

export class Setting extends React.Component {
    state = {
        color: Color.hsv(0, 0, 100),
        baseColor: Color.hsv(0, 0, 100),
        saturation: 50,
        value: 50,
        title: '',
        setting: {}
    };
    saturation;
    value;
    render() {
        return (
            <div className='setting'>
                <div className='setting__preview' 
                style={{
                    backgroundColor: this.state.color
                }}>
                </div>
                <div className='setting--widget'>
                    <div className='setting--widget__title'>
                        {this.state.title}
                    </div>
                    <div className='setting--widget__controls'>
                        <div className='setting--widget__slider setting--widget__saturation-slider'>
                            <span>Saturation: {this.state.saturation}</span>
                            <input 
                                className='setting--widget__slider-input'
                                type='range'
                                min='0'
                                max='100'
                                value={this.state.saturation}
                                onChange={this.setSaturation}
                                />
                        </div>
                        <div className='setting--widget__slider setting--widget__value-slider'>
                            <span>Value: {this.state.value}</span>
                            <input 
                                type='range'
                                min='0'
                                max='100'
                                value={this.state.value}
                                onChange={this.setValue} 
                                />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getBaseColor() {
        const setting = this.props.settings[this.props.index];
        let baseColor;
        for (let i = 0; i < setting.fallback.length; i++) {
            const index = setting.fallback[i];
            if (index < this.props.colors.length) {
                baseColor = this.props.colors[index];
                break;
            }
        }
        return baseColor;
    }

    setColor() {
        const setting = this.props.settings[this.props.index];
        const baseColor = this.getBaseColor();
        const saturation = parseInt(setting.saturation);
        const value = parseInt(setting.value);
        const color = Color.hsv(baseColor.hue(), saturation, value);
        // console.log(color)
        const title = setting.title
        this.setState(() => {
            return {
                color,
                baseColor,
                saturation,
                value,
                title,
                setting
            };
        });
    }

    setSaturation = (e) => {
        const saturation = parseInt(e.target.value);
        if(saturation !== this.state.saturation) {
            const newSettings = {
                ...this.state.setting,
                saturation
            }
            this.props.setSetting(this.props.index, newSettings);
        }
        
    }

    setValue = (e) => {
        const value = parseInt(e.target.value);
        if (value !== this.state.value) {
            const newSettings = {
                ...this.state.setting,
                value
            }
            this.props.setSetting(this.props.index, newSettings);
        }
    }

    componentDidMount() {
        this.setColor();
    }

    componentDidUpdate(oldProps) {
        const newColor = this.getBaseColor();
        if (oldProps.settings[this.props.index].saturation !== this.state.saturation ||
            oldProps.settings[this.props.index].value !== this.state.value ||
            newColor.hue() !== this.state.baseColor.hue()){
                // console.log(this.props.index);
                this.setColor();
            }
        
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSetting: (index, setting) => dispatch(setSetting(index, setting))
});

const mapStateToProps = (state) => ({
    settings: state.settings,
    colors: state.colors.colors
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);