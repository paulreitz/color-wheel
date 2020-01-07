import React from 'react';

export default (props) => {
    return (
        <div className='titled-list'>
            <div className='titled-list__title'>{props.title}</div>
            <ul className='titled-list__list'>
                {props.items.map((item) => (
                    <li className='titled-list__list-item' key='item'>{item}</li>
                ))}
            </ul>
        </div>
    )
}