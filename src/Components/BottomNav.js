import React, { useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';
import SortLogo from '../images/sort-logo.png'
import mergeSort from '../js/algorithms/merge-sort'
import { bubbleSort } from '../js/algorithms/bubble-sort'
import { updateArray, updateToggleSortStatus } from '../js/redux/actions/actions'
import { resetArrayColors, wrapUpColors } from '../js/algorithms/array-colors'

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: '0px',
    width: '100%',
    '& span': {
        '& span': {
            fontSize: '2rem'
        }
    }
  },
  button: `
    font-size: 120px;
  `,
  label: {
      fontSize: '120px'
  },
  lastButton: {
    borderRight: '3px solid Black'
  },
  vDivider: {
    fontSize: '2.5rem',
    lineHeight: '48px'
  },
  slider: {
    width: '200px',
    
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center'
  }
    
});




export default function BottomNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [barNum, setBarNum] = React.useState(40);
  const [sortMethod, setSortMethod] = React.useState('mergeSort')
  const [speed, setSpeed] = React.useState(10)
  const toggleSort = useSelector( state => state.toggleSort )
  const array = useSelector( state => state.array)
  const dispatch = useDispatch()

  useEffect( () => {
    initialArray(barNum);
  }, [])

  const handleBarNum = (event) => {
    setBarNum(event.target.value)
    initialArray(barNum)
  }

  const handleSortMethod = (event) => {
    switch(event.target.id) {
      case 'mergeSortButton':
        setSortMethod('mergeSort')
        break;
      case 'bubbleSortButton':
        setSortMethod('bubbleSort')
        break;
      default:
        setSortMethod('mergeSort')
        break;
    }
  }

  const sort = () => {
    switch(sortMethod) {
      case 'mergeSort':
        dispatch(updateToggleSortStatus())
        mergeSort(array, speed, dispatch);
        break;
      case 'bubbleSort':
        dispatch(updateToggleSortStatus())
        bubbleSort(array, speed, dispatch);
        break;
      default:
        this.mergeSort();
    }
  }

  const initialArray = (value) => {
    let array = []
    let windowHeight = window.innerHeight;
    let barHeightMax = windowHeight * .5;

    let length;
    length = (isNaN(value)) ? barNum : value;
    for(let i = 0; i < length ; i++) {
        array.push( Math.floor( ((Math.random() * 1000) + 100) / 1100 *  barHeightMax ) )
    }
    
    
    dispatch(updateArray(array))
    
    resetArrayColors();
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <img src={SortLogo} id='logo'/>

      <Button onClick={() => initialArray(barNum)} disabled={toggleSort}>New Array</Button>

      <div className={classes.sliderContainer}>
        <div class="slidecontainer">
          <label id="sliderLabel">Array Size:</label>
          <input type="range" min="1" max="100" value={barNum} onChange={handleBarNum} 
          disabled={toggleSort} class="slider" id="myRange" />
        </div>
      </div>
      

      <BottomNavigationAction 
        label="Merge Sort" 
        onClick={ handleSortMethod } 
        id='mergeSortButton'/>
      <BottomNavigationAction 
        label="Bubble Sort" 
        className={classes.lastButton} 
        onClick={ handleSortMethod }  
        id='bubbleSortButton'/>
      
      <Button variant='text' disabled={toggleSort} onClick={sort}>Sort!</Button>

    </BottomNavigation>
  );
}
