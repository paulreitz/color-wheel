import React from 'react';
import { connect } from 'react-redux';

import { setRule, setSaved } from '../store/actions/RulesActions';
import { setColors } from '../store/actions/ColorsActions';
import Rules from '../interfaces/Rules';
import updateColors from '../utils/RuleUtilities';

export class RuleSelector extends React.Component {
    render() {
        const rules = [];
        for (const key in Rules) {
            rules.push(key)
        }
        return (
            <div className='rules-selector'>
                <form onSubmit={this.onRuleChange} className="rules-selector__form">
                    {rules.map((rule) => { 
                        const selected = this.props.rule === Rules[rule];
                        return (<label key={rule} className="rules-selector__form-label">
                            <input onChange={this.onRuleChange} type='radio' name='rule' value={Rules[rule]} checked={selected} />
                            <span className='rules-selector__form-name'>
                            {this.addSpaces(Rules[rule])}
                            </span>
                        </label>)
                    })}
                </form>
            </div>
        )
    }

    onRuleChange = (e) => {
        if (e.target.checked) {
            this.props.setSaved(this.props.colors);
            this.props.setRule(e.target.value);
            updateColors(e.target.value, this.props.colors, this.props.saved, this.props.setColors);
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    addSpaces(val) {
        return val ? val.replace(/([A-Z]+)*([A-Z][a-z])/g, ' $2').trim() : '';
    }
}

const mapDispatchToProps = (dispatch) => ({
    setRule: (rule) => dispatch(setRule(rule)),
    setSaved: (colors) => dispatch(setSaved(colors)),
    setColors: (colors) => dispatch(setColors(colors))
});

const mapStateToProps = (state) => {
    return {
        rule: state.rule.rule,
        saved: state.rule.saved,
        colors: state.colors.colors
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RuleSelector);