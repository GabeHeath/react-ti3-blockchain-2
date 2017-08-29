import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import remoteActionMiddleware from './remote_action_middleware';
import { devToolsEnhancer } from 'redux-devtools-extension';
import io from 'socket.io-client';
import {setState} from './action_creators/root';
import reducer from './reducers/rootReducer';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export const socket = io('http://localhost:8090');

const enhancers = compose(
    applyMiddleware(
        remoteActionMiddleware(socket)
    ),
    devToolsEnhancer()
);

const store = createStore(
    reducer,
    enhancers
);

socket.on('state', state =>
    store.dispatch(setState(state))
);

ReactDOM.render(
    (<Provider store={store}>
        <App socket={socket}/>
    </Provider>),
    document.getElementById('root'));

registerServiceWorker();
