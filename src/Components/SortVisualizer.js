import React, { Component } from "react";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        array: state.array,
        toggleSort: state.toggleSort
    }
}

class ConnectedSortVisualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {          
        }
    }

    componentDidMount() {
        this.reverseArray();
    }

    reverseArray = () => {
        let barContainerHeight = document.getElementById('barGraph').offsetHeight;
        
        this.setState({
            barContainerHeight
        })
    }

    render() {
        return (
            <div id='barGraphContainer'>
                <div id="barGraph">
                    {this.props.array.map((i, index) => 
                        <div style={
                                    { 
                                        height: `${i}px`, 
                                        width: '100px', 
                                        margin: '1px',
                                        transform: `translate(0, ${this.state.barContainerHeight - i - 200}px)`
                                    }
                                } 
                            className="individualBar "
                        ></div>)}
                </div>
            </div>
        );
    }
  }

  const SortVisualizer = connect(mapStateToProps, null)(ConnectedSortVisualizer)
  export default SortVisualizer