import React from 'react';
import { connect } from 'react-redux';

export const ColorDisplay = (props) => {
    return (
        <div className='color-display'>
            {props.colors.map((color, i) => {
                const c = color.hex().toString();
                const style = {
                    background: c
                };
                return (<div className='color-display__display' key={i} style={style}></div>);
            })}
        </div>
    )
}

const mapStateToProps = (state) => ({
    colors: state.colors.colors
});

export default connect(mapStateToProps)(ColorDisplay);