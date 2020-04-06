import React, { Component } from "react";
import SortVisualizer from './Components/SortVisualizer'
import BottomNav from './Components/BottomNav'
import './App.css'
import Header from './Components/Header'

export default class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
          
      }
  }

  render() {
      return (
          <div id='appContainer'>
                <Header />
                <SortVisualizer />
                <BottomNav />

                
          </div>
      )
  }
}


