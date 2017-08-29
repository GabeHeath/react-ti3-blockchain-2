import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, Clearfix, Panel, Well} from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import TimeAgo from 'react-timeago'
import {List} from 'immutable';
import uuid from 'uuid';

bootstrapUtils.addStyle(Panel, 'secondary');

const spacer = {
    marginTop: '15px'
};

class ActivityFeed extends Component {

    state = {
        blocks: this.props.blocks.reverse(),
        panelsOpen: List([true])
    };

    componentDidMount() {
        this.props.socket.emit('startBlockchainListener');
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.blocks !== nextProps.blocks ) {
            //Controls the expanded/collapsed state of each panel. Also resets the first one to open in case it was closed in UI
            this.setState({panelsOpen: this.state.panelsOpen.withMutations( map => {
                map.push( this.state.panelsOpen.size === 0 )
                    .set(0, true);
                })
            });
            this.setState({blocks: this.state.blocks.unshift(nextProps.blocks.last())});
        }
    }

    render() {
        return(
            <Well style={spacer}>

                {this.props.blocks.size === 0 ?
                    <Alert bsStyle="warning">
                        <div><b>Waiting for first block from</b> <TimeAgo className="pull-right" date={Date.now()} /></div>
                        <a href="https://blockchain.info/" target="_blank" rel="noopener noreferrer">Blockchain.info</a>
                    </Alert> : null}

                <FlipMove staggerDelayBy={20}
                          staggerDurationBy="30"
                          duration={500}
                          appearAnimation="fade"
                          enterAnimation="elevator"
                >
                    {this.state.blocks.map( (block, i) => {
                        return <Panel
                            header={<div>{block.get('title')} <TimeAgo className="pull-right" date={block.get('timestamp')} /><Clearfix/></div>}
                            key={block.get('title')}
                            bsStyle={i === 0 ? 'primary' : 'secondary'}
                            collapsible
                            expanded={this.state.panelsOpen.get(i)}
                            onClick={() => {
                                this.setState({
                                    panelsOpen: this.state.panelsOpen.set(i, !this.state.panelsOpen.get(i))
                                })
                            }}
                            >
                                 <b>Description:</b><br/>
                                {block.get('description')}<br/>

                                <br/>
                                <b>RNG: </b>{block.get('rand')}<br/>

                                <br/>
                                <b>Choices:</b><br/>
                                <ol start="0">
                                    {block.get('choices').map( (choice, i) => <li key={uuid.v4()} style={{ color: i === block.get('rand') || block.get('rand') === 'N/A' ? 'red' : 'black' }}>{choice}</li>)}
                                </ol>

                                <br/>
                                 <b>Block Hash: </b>

                                {block.get('hash') === 'N/A' ?
                                    'N/A' :
                                    <div>
                                        <br/>
                                         <a  href={`https://blockchain.info/block/${block.get('hash')}`}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             style={{wordBreak: 'break-word' }}
                                         >{block.get('hash')}</a>
                                    </div>}
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
