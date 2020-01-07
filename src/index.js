import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Application from './components/Application';
import 'normalize.css';
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';

import store from './store/configureStore';

// const store = configureStore();

const app = (
    <Provider store={store} >
        <Application />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
