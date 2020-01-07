export default (type, colorObject) => {
    if (type === 'sass') {
        return generateSassCode(colorObject);
    }
    else {
        return generateLessCode(colorObject);
    }
}

const generateSassCode = (colorObject) => {
    return `// Background Colors:
$light-background: ${colorObject.lightBackground.hex().toString()};
$lighter-background: ${colorObject.lighterBackground.hex().toString()};
$dark-background: ${colorObject.darkBackground.hex().toString()};
$darker-background: ${colorObject.darkerBackground.hex().toString()};

// Font Colors:
$light-font: ${colorObject.lightFont.hex().toString()};
$lighter-font: ${colorObject.lighterFont.hex().toString()};
$dark-font: ${colorObject.darkFont.hex().toString()};
$darker-font: ${colorObject.darkerFont.hex().toString()};`;
}

const generateLessCode = (colorObject) => {
    return `// Background Colors:
@light-background: ${colorObject.lightBackground.hex().toString()};
@lighter-background: ${colorObject.lighterBackground.hex().toString()};
@dark-background: ${colorObject.darkBackground.hex().toString()};
@darker-background: ${colorObject.darkerBackground.hex().toString()};

// Font Colors:
@light-font: ${colorObject.lightFont.hex().toString()};
@lighter-font: ${colorObject.lighterFont.hex().toString()};
@dark-font: ${colorObject.darkFont.hex().toString()};
@darker-font: ${colorObject.darkerFont.hex().toString()};`;
}