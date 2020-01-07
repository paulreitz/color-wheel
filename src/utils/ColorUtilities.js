import Color from 'color';

import Rules from '../interfaces/Rules';
import { clamp, clampCircular, getClosestArc } from './utils';
import store from '../store/configureStore';

export default (rule, index, hue, setColors) => {
    const colors = store.getState().colors.colors;
    if (index === 0) {
        const diff = colors[0].hue() - hue;
        const newColors = colors.map((color => {
            const h = clampCircular(color.hue() - diff);
            return Color.hsv(h, 100, 100);
        }));
        setColors(newColors);
    }
    else {
        switch(rule) {
            case Rules.ANALOGOUS:
                const analogous = updateAnalogous(colors, index, hue);
                setColors(analogous);
                break;
            case Rules.COMPLEMENTARY:
                const complementary = updateComplimentary(colors, index, hue);
                setColors(complementary);
                break;
            case Rules.COMPOUND:
                const compound = updateCompound(colors, index, hue);
                setColors(compound);
                break;
            case Rules.CUSTOM:
                const custom = updateCustom(colors, index, hue);
                setColors(custom);
                break;
            case Rules.DOUBLE_COMPLEMENTARY:
                const doubleComplementary = updateDoubleComplementary(colors, index, hue);
                setColors(doubleComplementary);
                break;
            case Rules.SPLIT_COMPLEMENTARY:
                const splitComplementary = updateSplitComplementary(colors, index, hue);
                setColors(splitComplementary);
                break;
            case Rules.TETRADIC:
                const tetradic = updateTetradic(colors, index, hue);
                setColors(tetradic);
                break;
            case Rules.TRIAD:
                const triadic = updateTriadic(colors, index, hue);
                setColors(triadic);
                break;
        }
    }
    
}

const updateTriadic = (colors, index, hue) => {
    const diff = colors[index].hue() - hue;
    const newColors = colors.map((color) => {
        const h = clampCircular(color.hue() - diff);
        return Color.hsv(h, 100, 100);
    })
    return newColors;
}

const updateTetradic = (colors, index, hue) => {
    const diff = colors[index].hue() - hue;
    const newColors = colors.map((color) => {
        const h = clampCircular(color.hue() - diff);
        return Color.hsv(h, 100, 100);
    });
    return newColors;
}

const updateComplimentary = (colors, index, hue) => {
    const diff = colors[index].hue() - hue;
    const newColors = colors.map((color) => {
        const h = clampCircular(color.hue() - diff);
        return Color.hsv(h, 100, 100);
    });
    return newColors;
}

const updateAnalogous = (colors, index, hue) => {
    const diff = colors[index].hue() - hue;
    const hues = colors.map(color => color.hue());
    const base = colors[0].hue();
    const proposed = getClosestArc(base, colors[index].hue() - diff);
    let inner, outer, change;
    if (index % 2) {
        change = (proposed > 10 && proposed < 60)
        inner = proposed;
        outer = proposed * 2;
    }
    else {
        change = (proposed > 20 && proposed < 120)
        inner = proposed / 2;
        outer = proposed
    }
    if (change) {
        hues[1] = base + inner;
        hues[2] = base + outer;
        hues[3] = base - inner;
        hues[4] = base - outer;
    }
    return hues.map(hue => {
        const h = clampCircular(hue);
        return Color.hsv(h, 100, 100);
    });
}

const updateSplitComplementary = (colors, index, hue) => {
    const hues = colors.map(color => color.hue());
    const center = clampCircular(colors[0].hue() + 180);
    const diff = colors[index].hue() - hue;
    const proposed = getClosestArc(center, colors[index].hue() - diff);
    if (proposed > 10 && proposed < 60) {
        hues[1] = center - proposed;
        hues[2] = center + proposed;
    }
    return hues.map(hue => {
        const h = clampCircular(hue);
        return Color.hsv(h, 100, 100);
    });
}

const updateDoubleComplementary = (colors, index, hue) => {
    let hues = colors.map(color => color.hue());
    const diff = colors[index].hue() - hue;
    const topCenter = clampCircular(colors[0].hue() + (getClosestArc(colors[0].hue(), colors[1].hue()) / 2));
    const bottomCenter = clampCircular(colors[2].hue() + (getClosestArc(colors[2].hue(), colors[3].hue()) / 2));
    const currentCenter = index === 1 ? topCenter : bottomCenter;
    const proposed = getClosestArc(currentCenter, colors[index].hue() - diff);
    if (proposed > 10 && proposed < 30 && !!(index % 2)) {
        hues[1] = topCenter + proposed;
        hues[3] = bottomCenter + proposed;
    }
    else if (index === 2) {
        hues = colors.map(color => {
            return clampCircular(color.hue() - diff)
        })
    }
    return hues.map(hue => {
        const h = clampCircular(hue);
        return Color.hsv(h, 100, 100);
    })
}

const updateCompound = (colors, index, hue) => {
    const diff = colors[index].hue() - hue;
    const hues = colors.map(color => color.hue());
    const base = clampCircular(colors[0].hue() + 180);
    const proposed = getClosestArc(base, colors[index].hue() - diff);
    let inner, outer, change;
    if (index % 2) {
        change = (proposed > 10 && proposed < 60)
        inner = proposed;
        outer = proposed * 2;
    }
    else {
        change = (proposed > 20 && proposed < 120)
        inner = proposed / 2;
        outer = proposed
    }
    if (change) {
        hues[1] = base + inner;
        hues[2] = base + outer;
        hues[3] = base - inner;
        hues[4] = base - outer;
    }
    return hues.map(hue => {
        const h = clampCircular(hue);
        return Color.hsv(h, 100, 100);
    });
}

const updateCustom = (colors, index, hue) => {
    const updatedColors = colors.slice();
    const color = Color.hsv(hue, 100, 100);
    updatedColors[index] = color;
    return updatedColors;
}