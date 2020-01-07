export const setSetting = (index, setting) => {
    return {
        type: 'SET_THEME_ITEM',
        index, 
        setting
    }
}