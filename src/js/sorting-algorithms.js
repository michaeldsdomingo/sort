const algorithms = {
    bubbleSort,
    selectionSort
}

export function bubbleSort(arr) {
    var len = arr.length;
    for (var i = len-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        if(arr[j-1]>arr[j]){
            
            setTimeout(() => {
                var temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
            }, 1000)
            
         }
      }
    }
    console.log('done')
    return arr;
}

export function selectionSort(arr) {
    var minIdx, temp, 
      len = arr.length;
    for(var i = 0; i < len; i++){
        minIdx = i;
        for(var  j = i+1; j<len; j++){
        if(arr[j]<arr[minIdx]){
            minIdx = j;
        }
        }
        temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
    return arr;
}

export function mergeSortAlg(array) {
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

