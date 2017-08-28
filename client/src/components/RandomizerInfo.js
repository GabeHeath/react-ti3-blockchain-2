import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, ProgressBar, Table, Well} from 'react-bootstrap';
import uuid from 'uuid';

const spacer = {
    marginTop: '15px'
};

class RandomizerInfo extends Component {

    componentWillReceiveProps(nextProps) {
        if(nextProps.progress >= 100) {
            this.props.socket.emit('stopBlockchainListener');
        }
    }

    render() {
        return(
            <Col md={12} style={spacer}>
                <Well >
                    <Table striped hover>
                        <thead>
                        <tr>
                            <th>Player Order</th>
                            <th>Player</th>
                            <th>Races</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.players.map( (player, i) =>
                            <tr key={uuid.v4()}>
                                <td>{i+1}</td>
                                <td>{player.get('name')}</td>
                                <td>{player.get('races').map(race =>
                                    <div>{race.get('race')}</div>
                                )}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Well>

                <ProgressBar active={!(this.props.progress >= 100)} now={this.props.progress} label={`${this.props.progress >= 100 ? 100 : this.props.progress}%`} />

            </Col>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        players: state.getIn(['player', 'players']),
        progress: Math.ceil((state.getIn(['activity', 'blocks']).size / (state.getIn(['player', 'total']) + state.getIn(['race', 'total']))) * 100)

    }
}

export default connect(mapStateToProps)(RandomizerInfo);