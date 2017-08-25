import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {clearBlocks} from "../action_creators/activity"
// import {clearPlayers} from "../action_creators/player"
// import {resetRandomizer} from "../action_creators/randomizer"
import { Button, Col } from 'react-bootstrap';
import ActivityFeed from '../components/ActivityFeed';
import RandomizerInfo from '../components/RandomizerInfo';
//
// const spacer = {
//     marginTop: '15px'
// };
//
class RandomizerMain extends Component {
//
//     handleReset() {
//         this.props.clearPlayers();
//         this.props.clearBlocks();
//         this.props.resetRandomizer();
//     }
//
//     render() {
//         return(
//             <Col md={10} mdOffset={1}>
//
//                 <Col md={12}>
//                     <Button bsStyle="danger" className="pull-right" style={spacer} onClick={() => {
//                         this.handleReset()
//                     }}>
//                         Reset
//                     </Button>
//                 </Col>
//
//                 <Col md={8}>
//                     <RandomizerInfo/>
//                 </Col>
//
//                 <Col md={4}>
//                     <ActivityFeed/>
//                 </Col>
//
//             </Col>
//         );
//     }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        // clearBlocks: clearBlocks,
        // clearPlayers: clearPlayers,
        // resetRandomizer: resetRandomizer
    }, dispatch);
}

export default connect(undefined, matchDispatchToProps)(RandomizerMain);