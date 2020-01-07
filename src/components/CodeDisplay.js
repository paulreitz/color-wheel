import React from 'react';
import { connect } from 'react-redux';
import Color from 'color';
import GenerateCode from '../utils/generator';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export class CodeDisplay extends React.Component {
    state = {
        code: `I'm some code...`
    }
    render() {
        return (
            <div className='code-display'>
                <div className='code-display__header'>
                    <div className='code-display__header-title'>{this.props.type}</div>
                    <div className='code-display__header-copy'>
                        <CopyToClipboard text={this.state.code}>
                            <button className='code-display__button'>
                                Copy to Clipboard
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
                <div className='code-display__display'>
                    <textarea readOnly={true} rows='25' cols='40' value={this.state.code}></textarea>
                </div>
            </div>
        );
    }

    setCodeTemplate() {
        const colorObject = {};
        this.props.settings.forEach(setting => {
            const baseColor = this.getColor(setting.fallback);
            const saturation = parseInt(setting.saturation);
            const value = parseInt(setting.value);
            const color = Color.hsv(baseColor.hue(), saturation, value);
            colorObject[setting.name] = color;
        });
        const codeString = GenerateCode(this.props.type, colorObject);
        if (codeString !== this.state.code) {
            this.setState(() => {
                return {
                    code: codeString
                };
            });
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
        this.setCodeTemplate();
    }

    componentDidUpdate() {
        this.setCodeTemplate();
    }
}

const mapStateToProps = (state) => ({
    colors: state.colors.colors,
    settings: state.settings
});

export default connect(mapStateToProps)(CodeDisplay);