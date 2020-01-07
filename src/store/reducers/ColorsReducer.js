import Color from 'color';

const color0 = Color.hsv(240, 100, 100);
const color1 = Color.hsv(120, 100, 100);
const color2 = Color.hsv(0, 100, 100);

const defaultColors = [
    color0,
    color1,
    color2
];

export default (state = {colors: defaultColors }, action) => {
    switch(action.type) {
        case 'SET_COLORS':
            return {
                colors: action.colors
            };
        default:
            return state
    }
}