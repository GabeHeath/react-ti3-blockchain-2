import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, PanelGroup, Well} from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import TimeAgo from 'react-timeago'

bootstrapUtils.addStyle(Panel, 'secondary');

const spacer = {
    marginTop: '15px'
};

class ActivityFeed extends Component {

    componentDidMount() {
        this.props.socket.emit('startBlockchainListener');
    }

    render() {
        return(
            <Well style={spacer}>
                <PanelGroup>
                    <FlipMove staggerDelayBy={20} staggerDurationBy="30" duration={500} appearAnimation="fade" enterAnimation="accordionVertical">
                        {this.props.blocks.reverse().map((block, i) => {
                            return <Panel
                                bsStyle={i === 0 ? 'primary' : 'secondary'}
                                defaultExpanded={i === 0} collapsible
                                header={<div>Title: <TimeAgo className="pull-right" date={block.get('timestamp')} /></div>}
                                key={i}
                                eventKey={i+1}>
                                <b>Description:</b> {block.get('description')}<br/>
                                <b>Block Hash:</b><br/>
                                <div style={{fontSize: '0.6vw' }}>{block.get('hash')}</div>
                            </Panel>
                        })}
                    </FlipMove>
                </PanelGroup>
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