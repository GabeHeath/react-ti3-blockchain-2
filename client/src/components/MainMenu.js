import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {setPlayers} from "../action_creators/root"
import {setRaces, startRandomizer} from "../action_creators/root"

import {Alert, Button, Checkbox, Col, FormControl, Modal, Panel} from 'react-bootstrap'

const spacer = {
    marginBottom: '35px'
};

const baseGameRaces = List([
    'The Barony of Letnev',
    'The Emirates of Hacan',
    'The Federation of Sol',
    'The L1Z1X Mindnet',
    'The Mentak Coalition',
    'The Naalu Collective',
    'The Sardakk N\'orr',
    'The Universities of Jol-Nar',
    'The Xxcha Kingdom',
    'The Yssaril Tribes'
]);

const shatteredEmpireRaces = List([
    'The Brotherhood of Yin',
    'The Clan of Saar',
    'The Embers of Muaat',
    'The Winnu'
]);

const shardsOfTheThroneRaces = List([
    'The Arborec',
    'The Ghosts of Creuss',
    'The Lazax',
    'The Nekro Virus'
]);

class MainMenu extends Component {

    state = {
        players: List(),
        races: baseGameRaces.concat(shatteredEmpireRaces, shardsOfTheThroneRaces).delete(16), //Removes The Lazax
        errorMsg: null,
        showModal: false,
        isAdmin: false
    };

    handleCheck(event) {
        let newState;

        if (event.target.checked) {
            newState = this.state.races.push(event.target.value);
        } else {
            newState = this.state.races.delete(
                this.state.races.findIndex(
                    (race) => {
                        return race === event.target.value;
                    }
                )
            )
        }

        this.setState({
            races: newState
        });
    }

    handlePlayers(event) {
        this.setState({
            players: this.state.players.set(event.target.placeholder.split(' ').pop() - 1, event.target.value)
        })
    }

    handleAdmin(event) {
        this.setState({
            isAdmin: event.target.value === process.env.REACT_APP_PASSWORD
        })
    }

    handleStart() {
        const players = this.state.players.filter(p => p !== undefined && p.length > 0);
        const totalPlayers = players.size;
        const totalRaces = this.state.races.size;

        if(!this.state.isAdmin) {
            this.setState({
                showModal: false,
                errorMsg: 'Password is incorrect'
            });
            return false;
        }
        this.setState({ showModal: false });

        if (totalPlayers < 2) {
            this.setState({errorMsg: 'Not enough players'});
            return false;
        }

        if (totalPlayers > totalRaces) {
            this.setState({errorMsg: 'Not enough races selected for number of players'});
            return false;
        }

        if (totalPlayers !== players.toSet().size) {
            this.setState({errorMsg: 'Player names must be unique'});
            return false;
        }

        this.props.setRaces( this.state.races, totalRaces );
        this.props.setPlayers( players, totalPlayers );
        this.props.startRandomizer();
    };

    handleAlertDismiss() {
        this.setState({errorMsg: null});
    }

    openModal() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <Col md={10} mdOffset={1}>

                <Col md={10} mdOffset={1} style={spacer}>
                    <h1>Twilight Imperium 3 Blockchain Randomizer</h1>
                </Col>

                <Col md={3} mdOffset={1}>
                    <Panel header={<h3>Players</h3>} bsStyle="primary" id="players-form">
                        {[...new Array(8)].map((e, i) => <FormControl key={i} onChange={this.handlePlayers.bind(this)}
                                                                      placeholder={`Player ${i + 1}`}/>)}
                    </Panel>

                    {this.state.errorMsg ? <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
                        <h4>{this.state.errorMsg}</h4></Alert> : null}

                    <Button style={spacer} bsStyle="danger" bsSize="large" block onClick={this.openModal.bind(this)}>
                        Start Randomizer
                    </Button>
                </Col>

                <Col md={6} mdOffset={1}>
                    <Panel header={<h3>Base Game Races</h3>} bsStyle="primary">
                        <Col md={6}>
                            {baseGameRaces.map((race, i) => {
                                if (i % 2 === 0) {
                                    return <Checkbox key={i} defaultChecked value={race}
                                                     onChange={this.handleCheck.bind(this)}>{race}</Checkbox>
                                }
                                return false
                            })}
                        </Col>

                        <Col md={6}>
                            {baseGameRaces.map((race, i) => {
                                if (i % 2 !== 0) {
                                    return <Checkbox key={i} defaultChecked value={race}
                                                     onChange={this.handleCheck.bind(this)}>{race}</Checkbox>
                                }
                                return false
                            })}
                        </Col>
                    </Panel>

                    <Panel header={<h3>Shattered Empire Races</h3>} bsStyle="primary">
                        <Col md={6}>
                            {shatteredEmpireRaces.map((race, i) => {
                                if (i % 2 === 0) {
                                    return <Checkbox key={i} defaultChecked value={race}
                                                     onChange={this.handleCheck.bind(this)}>{race}</Checkbox>
                                }
                                return false
                            })}
                        </Col>

                        <Col md={6}>
                            {shatteredEmpireRaces.map((race, i) => {
                                if (i % 2 !== 0) {
                                    return <Checkbox key={i} defaultChecked value={race}
                                                     onChange={this.handleCheck.bind(this)}>{race}</Checkbox>
                                }
                                return false
                            })}
                        </Col>
                    </Panel>

                    <Panel header={<h3>Shards of the Throne Races</h3>} bsStyle="primary">
                        <Col md={6}>
                            {shardsOfTheThroneRaces.map((race, i) => {
                                if (i % 2 === 0) {
                                    return <Checkbox key={i} defaultChecked={race !== 'The Lazax'} value={race}
                                                     onChange={this.handleCheck.bind(this)}>{race}</Checkbox>
                                }
                                return false
                            })}
                        </Col>

                        <Col md={6}>
                            {shardsOfTheThroneRaces.map((race, i) => {
                                if (i % 2 !== 0) {
                                    return <Checkbox key={i} defaultChecked value={race}
                                                     onChange={this.handleCheck.bind(this)}>{race}</Checkbox>
                                }
                                return false
                            })}
                        </Col>
                    </Panel>
                </Col>

                <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>I don't think so...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert bsStyle="info">I had to implement this because I know one of you guys would try to mess with it.</Alert>
                        <FormControl type="password" placeholder="Password" onChange={this.handleAdmin.bind(this)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal.bind(this)}>Close</Button>
                        <Button bsStyle="primary" onClick={() => {
                            this.handleStart()
                        }}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setPlayers: setPlayers,
        setRaces: setRaces,
        startRandomizer: startRandomizer
    }, dispatch);
}

export default connect(undefined, matchDispatchToProps)(MainMenu);
