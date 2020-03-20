import React, { Component } from "react";
import BarGraph from './Components/BarGraph';
import SortVisualizer from './Components/SortVisualizer'
import BottomNav from './Components/BottomNav'
import './App.css'

import Header from './Components/Header'


export default class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
          sortMethod: 'mergeSort',
      }
  }

  handleSortChange = (event) => {
    console.log(event.target.id, 'from App component')
    let sortMethodString = ''
    switch(event.target.id) {
        case 'mergeSortButton':
            sortMethodString = 'mergeSort'
            break;
        case 'bubbleSortButton': 
            sortMethodString = 'bubbleSort'
            break;
        default: 
            sortMethodString = 'mergeSort'
    }
    this.setState({
        sortMethod: sortMethodString
    })
  }

  render() {
      return (
          <div id='appContainer'>
                <Header />
                <SortVisualizer sortMethod={this.state.sortMethod}/>
                {/* <BottomNav 
                    sortMethod={this.state.sortMethod}
                    handleSortChange={this.handleSortChange}
                /> */}

                
          </div>
      )
  }
}


