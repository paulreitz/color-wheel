import React from 'react';
import Color from 'color';
import { connect } from 'react-redux';

export class Demo extends React.Component {
    state = {
        lightBackground: Color.hsv(0, 0, 100),
        lighterBackground: Color.hsv(0, 0, 100),
        darkBackground: Color.hsv(0, 0, 100),
        darkerBackground: Color.hsv(0, 0, 100),
        titleFont: Color.hsv(0, 0, 100),
        lightFont: Color.hsv(0, 0, 100),
        lighterFont: Color.hsv(0, 0, 100),
        darkFont: Color.hsv(0, 0, 100),
        darkerFont: Color.hsv(0, 0, 100)
    }
    render() {
        return (
            <div className='demo'
                style={{
                    backgroundColor: this.state.lighterBackground
                }}
            >
                <div className='demo__header'
                    style={{
                        backgroundColor: this.state.darkBackground,
                        color: this.state.titleFont
                    }}    
                >
                    Lorem Ipsum
                </div>
                <div className='demo--body'>
                    <div className='demo--body__content'>
                        <h1
                            style={{
                                color: this.state.darkFont
                            }}
                        >Lorem Ipsum Dolor Sit</h1>
                        <p
                            style={{
                                color: this.state.darkerFont
                            }}
                        >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis diam orci, non placerat nisl pulvinar sit amet. Mauris metus quam, accumsan ac posuere id, volutpat non lectus. Curabitur ac erat eget tortor pretium efficitur. Nulla augue lacus, semper non cursus sed, vehicula non felis. Phasellus commodo quam quis commodo viverra. Nullam non tortor lacus. Nunc luctus ultricies turpis, sit amet interdum justo efficitur et.
                        </p>
                    </div>
                    <aside className='demo--body__aside'>
                        <div className='demo--body__aside-content demo--body__aside-dark'
                            style={{
                                backgroundColor: this.state.darkBackground,
                                color: this.state.lighterFont
                            }}
                        >
                            <h2
                                style={{
                                    color: this.state.lightFont
                                }}
                            >Lorem Ipsum Dolor Sit</h2>
                            <ul>
                            <li>Lorem</li>
                            <li>Ipsum</li>
                            <li>Dolor</li>
                            <li>Sit</li>
                            </ul>
                        </div>
                        <div className='demo--body__aside-content demo--body__aside-lighter'
                            style={{
                                backgroundColor: this.state.lightBackground,
                                color: this.state.darkerFont
                            }}
                        >
                            <h2
                                style={{
                                    color: this.state.darkFont
                                }}
                            >Lorem Ipsum Dolor Sit</h2>
                            <ul>
                            <li>Lorem</li>
                            <li>Ipsum</li>
                            <li>Dolor</li>
                            <li>Sit</li>
                            </ul>
                        </div>
                        <div className='demo--body__aside-content demo--body__aside-darker'
                                style={{
                                    backgroundColor: this.state.darkerBackground,
                                    color: this.state.lighterFont
                                }}
                        >
                            <h2
                                style={{
                                    color: this.state.lightFont
                                }}
                            >Lorem Ipsum Dolor Sit</h2>
                            <ul>
                            <li>Lorem</li>
                            <li>Ipsum</li>
                            <li>Dolor</li>
                            <li>Sit</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        );
    }

    setupProps() {
        const stateObject = {}
        this.props.settings.forEach((setting) => {
            const baseColor = this.getColor(setting.fallback);
            const saturation = parseInt(setting.saturation);
            const value = parseInt(setting.value);
            const color = Color.hsv(baseColor.hue(), saturation, value);
            stateObject[setting.name] = color;
        });
        let update = false;
        for (let key in stateObject) {
            const oldColor = this.state[key];
            const newColor = stateObject[key];
            if (!oldColor || !newColor) {
                update = true;
            }
            else {
                [
                    oldColor.color[0] !== newColor.color[0],
                    oldColor.color[1] !== newColor.color[1],
                    oldColor.color[2] !== newColor.color[2]
                ].forEach((value) => {
                    if (value) update = true;
                })
            }
        }
        if (update) {
            this.setState(() => stateObject)
        }
    }

    getColor(fallback) {
        for (let i = 0; i < fallback.length; i++) {
            if (fallback[i] < this.props.colors.length) {
                return this.props.colors[fallback[i]];
            }
        }
    }

    componentDidMount() {
        this.setupProps();
    }

    componentDidUpdate(oldProps) {
        this.setupProps();
    }
}

const mapStateToProps = (state) => ({
    settings: state.settings,
    colors: state.colors.colors
});

export default connect(mapStateToProps)(Demo);