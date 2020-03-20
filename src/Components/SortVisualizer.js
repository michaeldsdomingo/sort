import React, { Component } from "react";
// import {bubbleSort, selectionSort} from '../js/sorting-algorithms'
import {mergeSortAlg} from '../js/sorting-algorithms'
import { bubbleSort1 } from '../js/bubble-sort'
import BottomNav from './BottomNav'
import { blueGrey } from "@material-ui/core/colors";

export default class SortVisualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [],
            speed: 50,
            barNum: 40,
            timer: 0,
            defaultColor: 'bgTeal',
            barContainerHeight: 100,
            currentSortMethod: 'mergeSort',
            disabled: false
        }
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        this.initialArray(40)
        this.reverseArray();
        
    }

    componentDidUpdate() {
        // this.initialArray()
    }

    handleSortChange = (event) => {
        // console.log(event.target.id, 'from App component')
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
            currentSortMethod: sortMethodString
        })
      }

    initialArray = (value) => {
        let array = []
        let windowHeight = window.innerHeight;
        let barHeightMax = windowHeight * .5;

        let length;
        length = (isNaN(value)) ? this.state.barNum : value;
        console.log(length)
        for(let i = 0; i < length ; i++) {
            array.push( Math.floor( ((Math.random() * 1000) + 100) / 1100 *  barHeightMax ) )
        }
        
        this.setState({
            array
        })
        
        
        this.resetArray();
    }

    resetArray = () => {
        let bars = document.getElementsByClassName('individualBar')
        for(let i = 0; i < bars.length; i++){
            bars[i].classList.remove('bgFinished')
        }
    }

    reverseArray = () => {
        let barContainerHeight = document.getElementById('barGraph').offsetHeight;
        
        this.setState({
            barContainerHeight
        })
        // console.log('container height', barContainerHeight)
        // console.log('state container height', this.state.barContainerHeight)
    }

    
    mergeSort = () => {
        let animations = mergeSortAlg(this.state.array)
        
        let bars = document.getElementsByClassName('individualBar')
        this.resetArray()
        let j = 0;
        
        let speed = this.state.speed

        
        
        for(let i = 0; i < animations.length; i++) {
            let [   
                    leftCompareIndex, 
                    rightCompareIndex, 
                    smallerValue, 
                    indicesRange, 
                    round,
                    relativeLeft, 
                    relativeRight, 
                    middleLeft, 
                    middleRight,
                    resultIndices,
                    rightCounter
                ] = animations[i]
            
            setTimeout( () => {
                
                
                //Add right counter to account for moving right element to the left when right is smaller
                // console.log('left compare index', leftCompareIndex,'right counter', rightCounter)
                bars[leftCompareIndex + rightCounter].classList.remove('bgDefault')
                bars[rightCompareIndex].classList.remove('bgDefault')
                bars[leftCompareIndex + rightCounter].classList.add('bgPreSwap')
                bars[rightCompareIndex].classList.add('bgPreSwap')
            }, j * speed )

            setTimeout( () => {
                
                let array = [...this.state.array]
                
                
               
                bars[leftCompareIndex + rightCounter].classList.remove('bgPreSwap')
                bars[rightCompareIndex].classList.remove('bgPreSwap')
                
                
                
                //Get elements to the left of the working array relative to the current
                let left = array.slice(0, indicesRange[0])
                
                //Get elements of the working array relative to the original array
                
                let middle = middleLeft.concat(middleRight)
                let middleCopy = [...middle]
                //Get elements to the right of the working array relative to the current
                let right = array.slice(indicesRange[indicesRange.length - 1] + 1)
                let updatedArray = []
                let orderedArray = []
                let removeRound = 0
                
                

                

                //Remove already compared entries from middle Array
                for (let k = 0; k <= round; k++) {
                    orderedArray.push(middleCopy[resultIndices[k]])

                }

                
                this.removeEleFromArray(middle, resultIndices, round)
                
                updatedArray = left.concat(orderedArray, middle, right)
                
                if (smallerValue == 'RIGHT') {
                    bars[leftCompareIndex + rightCounter].classList.add('bgPostSwap')
                    bars[leftCompareIndex + rightCounter + 1].classList.add('bgPostSwap')
                }
                else {
                    bars[leftCompareIndex + rightCounter].classList.add('bgPostSwap')
                    bars[rightCompareIndex].classList.add('bgPostSwap')
                }
                this.setState({array: updatedArray})
            }, (j + 1) * speed - 1 )
            setTimeout( () => {
                // console.log('black')
                if (smallerValue == "RIGHT") {
                    bars[leftCompareIndex + rightCounter].classList.remove('bgPostSwap')
                    bars[leftCompareIndex + rightCounter + 1].classList.remove('bgPostSwap')
                    bars[leftCompareIndex + rightCounter].classList.add('bgDefault')
                    bars[leftCompareIndex + rightCounter + 1].classList.add('bgDefault')
                }
                else {
                    bars[leftCompareIndex + rightCounter].classList.remove('bgPostSwap')
                    bars[rightCompareIndex].classList.remove('bgPostSwap')
                    bars[leftCompareIndex + rightCounter].classList.add('bgDefault')
                    bars[rightCompareIndex].classList.add('bgDefault')
                }
            }, (j + 2) * speed )
            j += 2
        }

        setTimeout( () => {
            this.wrapUp(speed)
        }, (j + 1) * speed)
    }

    removeEleFromArray = (array, removeIndices, round) => {
        let returnArray = []
        //Trim removeIndices arrray
        let removeIndicesTrim = removeIndices.slice(0, round + 1)
        
        
        //Sort trimmed array
        //Sort with compare function for numbers since 20 > 100 because 2 > 1
        removeIndicesTrim.sort( (a, b) => {
            return a-b
        })
        
        for ( let i = 0; i < removeIndicesTrim.length; i++) {
            array.splice(removeIndicesTrim[i] - i, 1)
        }
        
    }

    sort = () => {
        switch(this.state.currentSortMethod) {
            case 'mergeSort':
                this.toggleSortButton('disable');
                this.mergeSort();
                break;
            case 'bubbleSort':
                this.toggleSortButton('disable');
                this.bubbleSort();
                break;
            default:
                this.mergeSort();
        }
    }

    toggleSortButton = (disabled) => {
        //If you want to disable button then disabled == true
        if(disabled == 'disable') {
            this.setState({
                disabled: true
            })
        }
        else {
            this.setState({
                disabled: false
            })
        }
        
    }

    bubbleSort = () => {
        let animations = bubbleSort1(this.state.array)
        
        let bars = document.getElementsByClassName("individualBar")
        this.resetArray();
        let speed = this.state.speed
        let j = 0;
    
        animations.forEach( (value, i) => {
            let { index, array, last} = value;
            // console.log(index, index + 1, last)

            //Color the two indices red
            setTimeout( () => {
                // console.log(j)
                bars[index].classList.remove('bgDefault')
                bars[index + 1].classList.remove('bgDefault')
                bars[index].classList.add('bgPreSwap')
                bars[index + 1].classList.add('bgPreSwap')
            }, j * speed)
            
            //Update array and color indices green
            setTimeout( () => {
                console.log(j)
                bars[index].classList.remove('bgPreSwap')
                bars[index + 1].classList.remove('bgPreSwap')
                bars[index].classList.add('bgPostSwap')
                bars[index + 1].classList.add('bgPostSwap')
                this.setState({
                    array
                })
            }, (j + 1) * speed)

            //Remove green and add white
            setTimeout( () => {
                console.log(j)
                bars[index].classList.remove('bgPostSwap')
                bars[index + 1].classList.remove('bgPostSwap')
                bars[index].classList.add('bgDefault')
                bars[index + 1].classList.add('bgDefault')

                if(last) {
                    bars[index + 1].classList.remove('bgDefault')
                    bars[index + 1].classList.add('bgFinished')
                }
            }, (j + 2) * speed)
            j += 2
        })
        setTimeout( () => {
            this.wrapUp(speed)
        }, (j + 1) * speed)
        
    }

    wrapUp = (speed ) => {
        let bars = document.getElementsByClassName("individualBar");
        console.log('bars', bars.length)
        for( let i = 0; i < bars.length; i++ ) {
            
            bars[i].classList.add('bgDefault')
            bars[i].classList.remove('bgFinished')
            
        }
        for( let i = 0; i < bars.length; i++ ) {
            console.log(i)
            setTimeout( () => {
                bars[i].classList.remove('bgDefault')
                bars[i].classList.add('bgFinished')
                if( i == bars.length - 1) {
                    this.toggleSortButton('enable')
                }
            }, (i) * speed)
            

        }
    }

    handleBarNumChange = (value) => {
        
        this.setState({
            barNum: value
        })

        this.initialArray(value)
    }

    checkBarNum = () => {
        console.log(this.state.barNum)
    }

    render() {
        return (
            <div id='barGraphContainer'>
                <div id="barGraph">
                    {this.state.array.map((i, index) => 
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
                <BottomNav 
                    handleSortChange={this.handleSortChange}
                    sort={this.sort}
                    bubbleSort={this.bubbleSortNew}
                    disabled={this.state.disabled}
                    generateArray={this.initialArray}
                    barNum={this.state.barNum}
                    handleBarNum={this.handleBarNumChange}
                />
                
            </div>
            
        );
    }
  }