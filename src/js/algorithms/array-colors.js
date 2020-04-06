import { updateToggleSortStatus } from '../redux/actions/actions'

export function resetArrayColors() {
    let bars = document.getElementsByClassName('individualBar')
    for(let i = 0; i < bars.length; i++){
        bars[i].classList.remove('bgFinished')
    }
}

export function wrapUpColors( speed, dispatch ) {
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
                // this.toggleSortButton('enable')
                dispatch(updateToggleSortStatus())
            }
        }, (i) * speed)
        

    }
}