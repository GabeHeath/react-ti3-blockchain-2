import Server from 'socket.io';

export default function startServer(store) {
    const io = new Server().attach(8090);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        console.log('connected');
        socket.emit('state', store.getState());
        socket.on('action', store.dispatch.bind(store));
        socket.on('action', function(e) {
            console.log('------------', e);
            console.log('State: ', store.getState().toJS());
        });
    });
}