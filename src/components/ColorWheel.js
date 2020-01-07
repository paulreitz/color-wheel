import React from 'react';
import Color from 'color';

export default class ColorWheel extends React.Component {
    centerX = 150;
    centerY = 150;
    centerRadius = 5;
    outerRadius = 150;
    canvasWidth = 300;
    canvasHeight = 300;

    render() {
        return (
            <div className='color-wheel'>
                <canvas className='color-wheel__canvas' id='canvas' width={this.canvasWidth} height={this.canvasHeight}/>
            </div>
        )
    }

    componentDidMount() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        for (let i = 0; i < 360; i++) {
            const c = Color.hsv(i, 100, 100);
            const rads = i * Math.PI / 180;
            const startX = (Math.cos(rads) * this.centerRadius) + this.centerX;
            const startY = (Math.sin(rads) * this.centerRadius) + this.centerY;
            const locX = (Math.cos(rads) * this.outerRadius) + this.centerX;
            const locY = (Math.sin(rads) * this.outerRadius) + this.centerY;
            ctx.strokeStyle = c.hex().toString();
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(locX, locY);
            ctx.stroke();
        }

        // ctx.beginPath();
        // ctx.arc(100, 100, 10, 0, 2 * Math.PI);
        // ctx.fillStyle = 'black';
        // ctx.fill();
    }
}