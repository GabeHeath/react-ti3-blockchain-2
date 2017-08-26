import Server from 'socket.io';
import WebSocket from 'ws';
import * as actionTypes from './action_types/activity'

export default function startServer(store) {
    const io = new Server().attach(8090);
    const ws = new WebSocket('wss://ws.blockchain.info/inv');
    let blockchainListenerStarted = false;

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        console.log('Connected to client via socket.io');
        socket.emit('state', store.getState());

        socket.on('action', store.dispatch.bind(store));

        // socket.on('action', function(e) {
            // console.log('------------', e);
            // console.log('State: ', store.getState().toJS());
        // });

        socket.on('startBlockchainListener', () => {
            //Don't start if already started
            if(!blockchainListenerStarted) {
                blockchainListenerStarted = true;
                console.log('Listening for blocks');
                ws.send(JSON.stringify({"op":"ping_block"})); //TODO DEBUG ONLY
                ws.send(JSON.stringify({"op":"blocks_sub"}));
            }
        });

        socket.on('stopBlockchainListener', () => {
            if(blockchainListenerStarted) {
                console.log('No longer listening for blocks');
                ws.send(JSON.stringify({"op":"blocks_unsub"}));
            }
        });
    });

    ws.onopen = () => {
        console.log('Connected to blockchain.info websocket');
    };

    ws.onmessage = evt => {
        console.log('Received block');
        const block = JSON.parse(evt.data).x.hash;
        store.dispatch({
            type: actionTypes.SAVE_BLOCK,
            block
        })
    };

    // setTimeout(function () {
    //     const block = "11111111"
    //     store.dispatch({
    //         type: actionTypes.SAVE_BLOCK,
    //         block
    //     })
    // }, 10000);
    //
    // setTimeout(function () {
    //     const block = "22222222"
    //     store.dispatch({
    //         type: actionTypes.SAVE_BLOCK,
    //         block
    //     })
    // }, 12000);
    //
    // setTimeout(function () {
    //     const block = "3333333333333"
    //     store.dispatch({
    //         type: actionTypes.SAVE_BLOCK,
    //         block
    //     })
    // }, 15000);
}