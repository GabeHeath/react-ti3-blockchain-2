import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {clearBlocks, clearPlayers, resetRandomizer} from "../action_creators/root"
import { Alert, Button, Clearfix, Col, FormControl, Modal } from 'react-bootstrap';
import ActivityFeed from '../components/ActivityFeed';
import RandomizerInfo from '../components/RandomizerInfo';

const spacer = {
    marginTop: '15px'
};

class RandomizerMain extends Component {

    state = {
        showModal: false,
        isAdmin: false,
        errorMsg: null,
    };

    handleAdmin(event) {
        this.setState({
            isAdmin: event.target.value === process.env.REACT_APP_PASSWORD
        })
    }

    handleReset() {
        if(!this.state.isAdmin) {
            this.setState({
                showModal: false,
                errorMsg: 'Password is incorrect'
            });
            return false;
        }
        this.setState({ showModal: false });

        this.props.clearPlayers();
        this.props.resetRandomizer();
        this.props.clearBlocks();
    }

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
        return(
            <Col md={10} mdOffset={1}>

                {this.state.errorMsg ? <Alert style={spacer} bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
                    <h4>{this.state.errorMsg}</h4></Alert> : null}

                <Col md={12}>
                    <Button bsStyle="danger" className="pull-right" style={spacer} onClick={this.openModal.bind(this)}>
                        Reset
                    </Button>
                    <Clearfix />
                </Col>

                <Col md={8}>
                    <RandomizerInfo socket={this.props.socket}/>
                </Col>

                <Col md={4}>
                    <ActivityFeed socket={this.props.socket}/>
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
                            this.handleReset()
                        }}>Submit</Button>
                    </Modal.Footer>
                </Modal>

            </Col>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        clearBlocks: clearBlocks,
        clearPlayers: clearPlayers,
        resetRandomizer: resetRandomizer
    }, dispatch);
}

export default connect(undefined, matchDispatchToProps)(RandomizerMain);
