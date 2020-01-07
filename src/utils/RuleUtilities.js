import Color from 'color';
import Rules from '../interfaces/Rules';
import { clampCircular } from './utils';

export default (rule, colors, __saved, setColors) => {
    // This is set up to allow someone to save their setup per color scheme.
    // Maybe I'll add this feature in, maybe I won't - depends on what feedback I get and how I feel.
    // But, for now, this attrocity will stay here.
    if (false) { 

    }
    else {
        switch (rule) {
            case Rules.ANALOGOUS:
                const analogous = setColorSet(
                    colors[0],
                    [
                        0, 
                        30, 
                        60, 
                        -30, 
                        -60
                    ]
                    );
                setColors(analogous);
                break;
            case Rules.COMPLEMENTARY:
                const complementary = setColorSet(
                    colors[0],
                    [0, 180]
                );
                setColors(complementary);
                break;
            case Rules.COMPOUND:
                const compound = setColorSet(
                    colors[0],
                    [
                        0,
                        180 + 15,
                        180 + 30,
                        180 - 15,
                        180 - 30
                    ]
                );
                setColors(compound)
                break;
            case Rules.CUSTOM:
                const custom = setColorSet(
                    colors[0],
                    [
                        0,
                        72,
                        144,
                        216,
                        288
                    ]
                );
                setColors(custom);
                break;
            case Rules.DOUBLE_COMPLEMENTARY:
                const doubleComplementary = setColorSet(
                    colors[0],
                    [
                        0,
                        30,
                        180,
                        180 + 30
                    ]
                );
                setColors(doubleComplementary);
                break;
            case Rules.SPLIT_COMPLEMENTARY:
                const splitComplementary = setColorSet(
                    colors[0],
                    [
                        0,
                        180 - 15,
                        180 + 15
                    ]
                );
                setColors(splitComplementary);
                break;
            case Rules.TETRADIC:
                const tetradic = setColorSet(
                    colors[0],
                    [0, 90, -90, 180]
                );
                setColors(tetradic);
                break;
            case Rules.TRIAD:
                const traidic = setColorSet(
                    colors[0],
                    [0, 120, -120]
                );
                setColors(traidic);
                break;
        }
    }
}

const setColorSet = (base, degrees) => {
    const baseHue = base.hue();
    const newColors = [];
    for (let i = 0; i < degrees.length; i++) {
        const d = clampCircular(baseHue + degrees[i]);
        const c = Color.hsv(d, 100, 100);
        newColors.push(c);
    }
    return newColors;
}