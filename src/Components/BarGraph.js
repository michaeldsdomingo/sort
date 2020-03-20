import React, { Component } from "react";
import * as d3 from "d3";
// import {bubbleSort, selectionSort} from '../js/sorting-algorithms'

export default class BarGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [30,20,10],
            test: []
        }
    }

    componentWillMount() {
        this.initialArray()
    }

    componentDidMount() {
        this.addGraph()
        
    }

    componentDidUpdate() {
        // this.addGraph()
    }

    addGraph = () => {
        const w = 3000;
        const h = 100;
        d3.select("div").select("svg").remove()
        const svg = d3.select(this.refs.graph)
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

        svg.selectAll("rect")
            .data(this.state.array)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 30)
            .attr("y", (d, i) => {
                //Bars will grow upward
                return h -  d
            })
            .attr("width", 25)
            .attr("height", (d, i) =>  d)
            .attr("fill", 'red')
    }

    initialArray = () => {
        let array = []
        for(let i = 0; i < 10; i++) {
            array.push(Math.floor(Math.random() * 100) + 1)
        }
        console.log(array)
        this.setState({
            array
        })
    }

    // sortArray = () => {
    //     let sortedArray = bubbleSort(this.state.array)
    //     this.setState({
    //         array: sortedArray
    //     })
    // }

    bubbleSort = () => {
        // console.log('bubble')
       
        let array = [...this.state.array]
        var swapped;
        var k = 0
        var speed = 500;
        var round = 0
        do {
            swapped = false;
            for(let i = 0; i < array.length - round; i++) {
                this.logDelay(i, k, array, speed)
                if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
                    swapped = true
                    
                    this.swap(array, i, i + 1,)
                    this.setDelay(i, k, array, swapped, speed)
                    
                }
                if ( i == (array.length - round)) {

                }
            }
            k++
            round++
        } while(swapped);
        // this.setState({array})
    }

    colorDelay = (i, k, array) => {
        this.logDelay(i, k)
    }

    setDelay = (i, k, array, swapped, speed) => {
        
        var arr = [...array]
        setTimeout( () => {
            this.setState({array: arr})
        }, (arr.length * k + i) * speed )
        

    }

    swap = (array, i, j) => {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    test = () => {
        var k = 0
        var arr = [0, 1, 2, 3]
        var swapped;
        do {
            for(let i = 0; i < 4; i++) {
                if (i == 2) {
                    k++
                    
                    this.delay(k, i, arr)
                }
                
                
            }
            
            
        } while(k <= 2)
    }

    delay = (k, i, arr) => {
        setTimeout( () => {
            arr.push(k + ' ' + i);
            console.log(arr)
            this.setState({
                test: arr
            })
        }, (4 * k + i) * 500)
    }

    log = () => {
        
        for(let i = 0 ; i < this.state.array.length; i++) {
            this.logDelay(i)
            
            
        }
        
    }

    logDelay = (i, k, arr, speed) => {
        setTimeout( () => {
            const what = d3.select(this.refs.graph)
            .select('svg')
            .selectAll('rect')
            .attr('fill', (d, index) => {
                if (i == index) {
                    // console.log(index, arr.length - k - 1)
                    return 'blue'
                }
                // else if (i == arr.length - k - 1 && index == arr.length - k - 1 - 1) {
                //     console.log(i, k, arr.length, index)
                //     return 'pink'
                // }
                // else return 'black'
                
            })
        }, (arr.length * k + i) * speed + 1)
    }


    render() {
        return (
            <div >
                <div ref='graph' id="graph"></div>
                {/* <div>{this.state.array.map(i => <span>{i + ' ' }</span>)}</div> */}
                <button onClick={this.bubbleSort}>Bubble Sort</button>
                <button onClick={this.test}>Test</button>
                <button onClick={this.log}>Log</button>
                
            </div>
            
        );
    }
  }