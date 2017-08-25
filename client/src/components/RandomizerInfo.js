import React, {Component} from 'react';
import FlipMove from 'react-flip-move';
import {List} from 'immutable';

class RandomizerInfo extends Component {

    state = {
      list: List([{id:1}, {id:2}, {id:3}, {id:4}, {id:5}])
    };

    handleClick() {
        console.log(this.props.list);
        this.setState({
            list: this.state.list.unshift({id: 0})
        })
    }

    render() {
        return(<div>
    <FlipMove staggerDelayBy={20} staggerDurationBy="30" duration={500} appearAnimation="accordionVertical" enterAnimation="accordionVertical">
        {this.state.list.map(article => (
        <div key={article.id} {...article}>{article.id}</div>
        ))}
    </FlipMove>
                <button onClick={() => {this.handleClick()}}>click</button>
            </div>
        );
    }
}

export default RandomizerInfo;