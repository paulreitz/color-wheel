export const clamp = (value, min, max) => {
    let val = value >= min ? value : min;
    val = val <= max ? val : max;
    return val;
}

export const clampCircular = (value) => {
    let val = value;
    while (val < 0) {
        val += 360;
    }
    while (val > 359) {
        val -= 360;
    }
    return val;
}

export const getClosestArc = (a, b) => {
    let finalAnswer = 999999;
    [
        Math.abs((a - 360) - b),
        Math.abs(a - b),
        Math.abs((a + 360) - b)
    ].forEach(i => {
        if (i < finalAnswer) {
            finalAnswer = i
        }
    });
    return finalAnswer;
}