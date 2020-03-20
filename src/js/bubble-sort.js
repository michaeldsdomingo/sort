
export function bubbleSort1(arr) {
        
       
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