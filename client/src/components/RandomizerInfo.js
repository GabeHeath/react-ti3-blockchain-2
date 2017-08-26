import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlipMove from 'react-flip-move';
import {List} from 'immutable';

class RandomizerInfo extends Component {

    // state = {
    //     blocks: List()
    // };
    //
    // componentWillReceiveProps(nextProps) {
    //     if( this.props.blocks !== nextProps.blocks ) {
    //         this.setState({blocks: this.state.blocks.unshift(nextProps.blocks.last())})
    //     }
    // }

    render() {
        return(
            <div>
                Sup
                {/*<FlipMove staggerDelayBy={20} staggerDurationBy="30" duration={500} appearAnimation="accordionVertical" enterAnimation="fade">*/}
                    {/*{this.state.blocks.map(article => {*/}
                        {/*return <div key={article.get('hash')}>{article.get('hash')}</div>*/}
                    {/*})}*/}
                {/*</FlipMove>*/}
            </div>
        );
    }
}

// function mapStateToProps(state, ownProps) {
//     return {
//         blocks: state.getIn(['activity', 'blocks'])
//     }
// }

// export default connect(mapStateToProps)(RandomizerInfo);
export default RandomizerInfo;