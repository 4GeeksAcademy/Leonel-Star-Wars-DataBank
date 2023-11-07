import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const CustomLeftArrow = ({ onClick }) => {
    return (
        <div className='custom-arrow' onClick={onClick}>
            <NavigateBeforeIcon />
        </div>
    )
}

export default CustomLeftArrow