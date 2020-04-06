import { resetArrayColors, wrapUpColors } from './array-colors'
import { updateArray } from '../redux/actions/actions'

export default function mergeSort(stateArray, speed, dispatch) {
    let animations = mergeSortAlg(stateArray)
    
    let bars = document.getElementsByClassName('individualBar')
    resetArrayColors()
    let j = 0;

    let updatedStateArray = stateArray;
    
    // let array = [...stateArray]  
    
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
            
            let array = [...updatedStateArray]
            // console.log(stateArray)
            
           
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

            
            removeEleFromArray(middle, resultIndices, round)
            
            updatedArray = left.concat(orderedArray, middle, right)
            
            if (smallerValue == 'RIGHT') {
                bars[leftCompareIndex + rightCounter].classList.add('bgPostSwap')
                bars[leftCompareIndex + rightCounter + 1].classList.add('bgPostSwap')
            }
            else {
                bars[leftCompareIndex + rightCounter].classList.add('bgPostSwap')
                bars[rightCompareIndex].classList.add('bgPostSwap')
            }
            // this.setState({array: updatedArray})
            updatedStateArray = updatedArray
            dispatch(updateArray(updatedArray))
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
        wrapUpColors(speed, dispatch)
    }, (j + 1) * speed)
}

const removeEleFromArray = (array, removeIndices, round) => {
    let returnArray = []
    //Trim removeIndices arrray
    let removeIndicesTrim = removeIndices.slice(0, round + 1)
    
    
    //Sort trimmed array
    //Sort with compare function for numbers since 20 > 100 because 2 > 1
    removeIndicesTrim.sort( (a, b) => {
        return a - b
    })
    
    for ( let i = 0; i < removeIndicesTrim.length; i++) {
        array.splice(removeIndicesTrim[i] - i, 1)
    }
}

function mergeSortAlg(array) {
    console.log('original array', array)
    let animations = []
    let indicesArray = []

    //Indices Array is the indices of the original array
    array.forEach( (x, index) => {
        indicesArray.push(index)
    })
    
    mergeUnsortedArray(array, indicesArray, animations)
    return animations
    
}

function mergeUnsortedArray(unsortedArray, parentArrayIndices, animations) {
    
    let array = [...unsortedArray]
    
    if (unsortedArray.length <= 1) {
        return unsortedArray;
    }

    const middle = Math.floor(array.length / 2)

    const left = unsortedArray.slice(0, middle);
    const leftIndices = [];
    left.forEach((x, index) => {
        leftIndices.push(parentArrayIndices[index])
    })
    const right = unsortedArray.slice(middle);
    const rightIndices = [];
    right.forEach( (x, index) => {
        rightIndices.push(parentArrayIndices[index + left.length])
    })

    

    let mergedArray = merge(mergeUnsortedArray(left, leftIndices, animations), mergeUnsortedArray(right, rightIndices, animations), leftIndices, rightIndices, animations)
    
    return mergedArray
}

function merge(left, right, leftIndices, rightIndices, animations) {
    let resultArray = []
    let resultIndicesArray = []
    let leftIndex = 0
    let rightIndex = 0
    let round = 0
    let rightCounter = 0
    
    

    while (leftIndex < left.length && rightIndex < right.length) {
        // console.log('left and right',left, right)
        // console.log(resultArray)
        // console.log("merge counter", timerObj.merges)
        // console.log('left and right', left, right)
        // console.log('left index of overall ', leftIndex )
        // console.log('right index of overall ', rightIndex)
        
        if (left[leftIndex] < right[rightIndex]) {
            // console.log('left is smaller', left[leftIndex], 'with left index', leftIndex)
            resultArray.push(left[leftIndex])
            resultIndicesArray.push(leftIndex)
            // console.log('left and right array', left, right)
            // console.log('left and right indices', leftIndices, rightIndices)
            // console.log(leftIndices[leftIndex], rightIndices[rightIndex])
            animations.push([ leftIndices[leftIndex], rightIndices[rightIndex], 'LEFT', leftIndices.concat(rightIndices), round, leftIndex, rightIndex, left, right, resultIndicesArray, rightCounter ])
            leftIndex++;
            
        }
        else {
            // console.log('right is smalelr', right[rightIndex], 'with right index', rightIndex)
            resultArray.push(right[rightIndex])
            resultIndicesArray.push(rightIndex + left.length)
            
            // console.log('left and right array', left, right)
            // console.log('left and right indices', leftIndices, rightIndices)
            // console.log(leftIndices[leftIndex], rightIndices[rightIndex])
            animations.push([leftIndices[leftIndex], rightIndices[rightIndex], 'RIGHT', 
            leftIndices.concat(rightIndices), round, leftIndex, rightIndex, left, right, resultIndicesArray, rightCounter ])
            rightIndex++
            rightCounter++;
        }
        // console.log('result array', resultArray)
        // console.log('round', round)
        // animations.push(round)
        round++
        

        // setTimeout( () => {
        //     console.log(left[leftIndex])
            
        // }, timerObj.timer)
        
    }

    

    
    let returningArray = resultArray.concat(left.slice(leftIndex))
                .concat(right.slice(rightIndex))
    // console.log(returningArray)
    // console.log('')
    return returningArray
}