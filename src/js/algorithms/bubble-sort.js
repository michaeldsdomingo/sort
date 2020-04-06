import { resetArrayColors, wrapUpColors } from './array-colors'
import { updateArray } from '../redux/actions/actions'

export function bubbleSort(array, speed, dispatch) {
    let animations = bubbleSortAlg(array)
    
    let bars = document.getElementsByClassName("individualBar")
    resetArrayColors();
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
            // console.log(j)
            bars[index].classList.remove('bgPreSwap')
            bars[index + 1].classList.remove('bgPreSwap')
            bars[index].classList.add('bgPostSwap')
            bars[index + 1].classList.add('bgPostSwap')
            // this.setState({
            //     array
            // })
            dispatch(updateArray(array))
        }, (j + 1) * speed)

        //Remove green and add white
        setTimeout( () => {
            // console.log(j)
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
        wrapUpColors(speed, dispatch)
    }, (j + 1) * speed)
    
}

export function bubbleSortAlg(arr) {
        
       
    let array = [...arr]
    var swapped;
    var k = 0
    var round = 0
    var msEnding = 0;
    let animations = [];
    do {
        swapped = false;
        
        for(let i = 0; i < array.length - round; i++) {                
            
  
            if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
                swapped = true
                
                swap(array, i, i + 1)
                
                
                
            }
            let last = false;
            let arraySnapshot = [...array]
            if (i + 1 == array.length - round - 1) {
                last = true;
            }
            if (i + 1 < array.length - round) {
                animations.push({
                    index: i,
                    array: arraySnapshot,
                    last
                })
            }
            
            
        }
        
        k++
        msEnding += (array.length - round) 
        round++
        
    } while(swapped);
    return animations
   
}

let swap = (array, i, j) => {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}