import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import RulesReducer from './reducers/RulesReducer';
import ColorsReducer from './reducers/ColorsReducer';
import SettingsReducer from './reducers/SettingsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        rule: RulesReducer,
        colors: ColorsReducer,
        settings: SettingsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);
export default store;