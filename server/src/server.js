import Server from 'socket.io';
import WebSocket from 'ws';
import * as activityAT from './action_types/activity'
import * as playerAT from './action_types/player'
import * as raceAT from './action_types/race'

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

        socket.on('startBlockchainListener', () => {
            //Don't start if already started
            if(!blockchainListenerStarted) {
                blockchainListenerStarted = true;
                console.log('Listening for blocks');
                // ws.send(JSON.stringify({"op":"ping_block"})); DEBUG
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
        let blockTitle;
        let blockDescription;
        let blockRand;
        let blockChoices;
        let blockSubject;
        let racePlayer;
        let racePlayerIndex;

        const block = JSON.parse(evt.data).x.hash;
        const totalPlayers = store.getState().getIn(['player', 'total']);
        let remainingPlayers = store.getState().getIn(['player', 'remainingPlayers']);
        const totalRaces = store.getState().getIn(['race', 'total']);
        let remainingRaces = store.getState().getIn(['race', 'remainingRaces']);

        //TODO - No block needed if last in remaining

        //Players
        if(remainingPlayers.size > 0) {
            // Slice block because javascript can't handle huge numbers
            blockRand = parseInt(block.slice(-10), 16) % remainingPlayers.size;
            blockSubject = remainingPlayers.get(blockRand);

            store.dispatch({
                type: playerAT.ADD_PLAYER,
                player: blockSubject,
                hash: block
            });

            blockTitle = blockSubject;
            blockDescription = `Player ${(totalPlayers - remainingPlayers.size) + 1} is ${blockSubject}`;
            blockChoices = remainingPlayers

        //Races
        } else {
            blockRand = parseInt(block.slice(-10), 16) % remainingRaces.size;
            blockSubject = remainingRaces.get(blockRand);
            racePlayerIndex = getPlayerForRace(totalRaces, remainingRaces.size, totalPlayers);
            racePlayer = store.getState().getIn(['player', 'players', racePlayerIndex, 'name' ]);

            store.dispatch({
                type: raceAT.REMOVE_RACE,
                race: blockSubject
            });

            store.dispatch({
                type: playerAT.ADD_RACE,
                race: blockSubject,
                playerIndex: racePlayerIndex,
                hash: block
            });

            blockTitle = blockSubject;
            blockDescription = `${racePlayer} receives ${blockSubject}`;
            blockChoices = remainingRaces;
        }

        store.dispatch({
            type: activityAT.SAVE_BLOCK,
            payload: {
                title: blockTitle,
                description: blockDescription,
                rand: blockRand,
                choices: blockChoices,
                block: block
            }
        });
    };

    function getPlayerForRace(totalRaces, remainingRaces, totalPlayers) {
        const racesPerPlayer = Math.floor( totalRaces/totalPlayers );
        const moduloRaces    = totalRaces % totalPlayers;
        const racesAssigned  = totalRaces - remainingRaces;
        const useModuloRaces = racesAssigned >= totalPlayers * racesPerPlayer;

        if(useModuloRaces) {
            return racesAssigned % totalPlayers + (totalPlayers - moduloRaces)
        } else {
            return racesAssigned % totalPlayers
        }
    }
}