import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainMenu from '../components/MainMenu'
import RandomizerMain from '../containers/RandomizerMain'

class App extends Component {

    render() {

        return(
            <div>
                { this.props.started ? <RandomizerMain socket={this.props.socket}/> : <MainMenu/> }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        started: state.getIn(['randomizer', 'started'])
    }
}

export default connect(mapStateToProps)(App);
