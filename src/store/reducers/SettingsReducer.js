const defaultSettings = [
    {
        name: 'lightBackground',
        title: 'Light Background',
        fallback: [4, 3, 2, 1, 0],
        saturation: 5,
        value: 90
    },
    {
        name: 'lighterBackground',
        title: 'Lighter Background',
        fallback: [4, 3, 2, 1, 0],
        saturation: 2,
        value: 95
    },
    {
        name: 'darkBackground',
        title: 'Dark Background',
        fallback: [0],
        saturation: 75, 
        value: 50
    },
    {
        name: 'darkerBackground',
        title: 'Darker Background',
        fallback: [0],
        saturation: 75,
        value: 25
    },
    {
        name: 'titleFont',
        title: 'Title Font',
        fallback: [2, 1, 0],
        saturation: 65,
        value: 93
    },
    {
        name: 'lightFont',
        title: 'Light Font',
        fallback: [4, 2, 1, 0],
        saturation: 15,
        value: 90
    },
    {
        name: 'lighterFont',
        title: 'Lighter Font',
        fallback: [4, 2, 1, 0],
        saturation: 5,
        value: 95
    },
    {
        name: 'darkFont',
        title: 'Dark Font',
        fallback: [3, 1, 0],
        saturation: 15, 
        value: 35
    },
    {
        name: 'darkerFont',
        title: 'Darker Font',
        fallback: [3, 1, 0],
        saturation: 50, 
        value: 25
    }
]

export default (state = defaultSettings, action) => {
    switch(action.type) {
        case 'SET_THEME_ITEM':
            const index = action.index;
            const setting = action.setting;
            const theme = state.slice();
            theme[index] = setting;
            return theme;
        default:
            return state;
    }
}