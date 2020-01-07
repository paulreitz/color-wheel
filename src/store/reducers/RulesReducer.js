import Rules from '../../interfaces/Rules';

const defaultRule = { 
    rule: Rules.TRIAD,
    saved: {}
};

export default (state = defaultRule, action) => {
    switch(action.type) {
        case 'SET_RULE': 
            let validRule = false;
            for (const key in Rules) {
                if (Rules[key] === action.rule) {
                    validRule = true;
                }
            }
            if (validRule) {
                const rule = action.rule;
                return {
                    ...state,
                    rule
                };
            }
            return state;
        case 'SET_SAVED':
            const saved = state.saved;
            const lastRule = state.rule;
            saved[lastRule] = action.colors;
            return {
                ...state,
                saved
            }
        default: 
            return state;
    }
}