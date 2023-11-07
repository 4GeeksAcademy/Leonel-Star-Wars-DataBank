import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const CustomRightArrow = ({ onClick }) => {
    const arrowStyle = {
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '30px', // Adjust as needed
        height: '30px', // Adjust as needed
        backgroundColor: 'white', // Background color
        borderRadius: '50%', // Makes it round
        cursor: 'pointer',
    };

    return (
        <div style={arrowStyle} onClick={onClick}>
            <NavigateNextIcon />
        </div>

        // <button onClick={() => onClick()}><NavigateNextIcon /></button>
    )
}

export default CustomRightArrow

{/* <div className='custom-arrow' onClick={onClick}>

</div> */}