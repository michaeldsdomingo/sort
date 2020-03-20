import React, { useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import SortLogo from '../images/sort-logo.png'
import jss from 'jss'
// import template from 'jss-plugin-template'

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
  const [value, setValue] = React.useState(30);
  const [barNum, setBarNum] = React.useState(21);
  

  const handleClick = (e) => {
    console.log(e.target.id)
  }

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };

  const handleBarNum = (event) => {
    console.log(event.target.value)
    props.handleBarNum(event.target.value)
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
      <Button onClick={props.generateArray} disabled={props.disabled}>New Array</Button>
      
      <div className={classes.sliderContainer}>
        {/* <Slider value={props.barNum} onChange={handleBarNum} aria-labelledby="continuous-slider" className={classes.slider} />   */}
        <div class="slidecontainer">
          <label id="sliderLabel">Array Size:</label>
          <input type="range" min="1" max="100" value={props.barNum} onChange={handleBarNum} 
          disabled={props.disabled} class="slider" id="myRange" />
        </div>
      </div>
      

      <BottomNavigationAction 
        label="Merge Sort" 
        onClick={ props.handleSortChange } 
        id='mergeSortButton'/>
      <BottomNavigationAction 
        label="Bubble Sort" 
        className={classes.lastButton} 
        onClick={ props.handleSortChange }  
        id='bubbleSortButton'/>
      
      <Button variant='text' disabled={props.disabled} onClick={props.sort}>Sort!</Button>
    </BottomNavigation>
  );
}
