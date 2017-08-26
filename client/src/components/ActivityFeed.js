import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, Panel, Well} from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import TimeAgo from 'react-timeago'
import {List} from 'immutable';

bootstrapUtils.addStyle(Panel, 'secondary');

const spacer = {
    marginTop: '15px'
};

class ActivityFeed extends Component {

    state = {
        blocks: this.props.blocks,
        panelsOpen: List([true])
        // panelsOpen: List([true, false, false, false])
    };

    componentDidMount() {
        this.props.socket.emit('startBlockchainListener');
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.blocks !== nextProps.blocks ) {
            this.setState({panelsOpen: this.state.panelsOpen.push( this.state.panelsOpen.size === 0 )});
            this.setState({blocks: this.state.blocks.unshift(nextProps.blocks.last())})
        }
    }

    render() {
        return(
            <Well style={spacer}>

                {this.props.blocks.size === 0 ?
                    <Alert bsStyle="warning">
                        <div><b>Waiting for first block from</b> <TimeAgo className="pull-right" date={Date.now()} /></div>
                        <a href="https://blockchain.info/" target="_blank">Blockchain.info</a>
                    </Alert> : null}

                <FlipMove staggerDelayBy={20}
                          staggerDurationBy="30"
                          duration={500}
                          appearAnimation="fade"
                          enterAnimation="elevator"
                >
                    {this.state.blocks.map( (block, i) => {
                        return <Panel
                            header={<div>Title: <TimeAgo className="pull-right" date={block.get('timestamp')} /></div>}
                            key={block.get('hash')}
                            bsStyle={i === 0 ? 'primary' : 'secondary'}
                            collapsible
                            expanded={this.state.panelsOpen.get(i)}
                            onClick={() => {
                                this.setState({
                                    panelsOpen: this.state.panelsOpen.set(i, !this.state.panelsOpen.get(i))
                                })
                            }}
                            >
                                 <b>Description:</b> {block.get('description')}<br/>

                                <br/>
                                 <b>Block Hash:</b><br/>
                                 <a  href={`https://blockchain.info/block/${block.get('hash')}`}
                                     target="_blank"
                                     style={{wordBreak: 'break-word' }}
                                 >{block.get('hash')}</a>
                            </Panel>
                    })}
                </FlipMove>
            </Well>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        blocks: state.getIn(['activity', 'blocks'])
    }
}

export default connect(mapStateToProps)(ActivityFeed);