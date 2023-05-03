import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FaArrowRight, FaRegCalendarPlus } from 'react-icons/fa';

export default function Footer() {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
            <div className="d-flex justify-content-between rounded-3 w-100 " style={{"backgroundColor" :"#0c831f","height":"60px"}}>
                <div className = "d-flex flex-column px-3 text-white mt-2 ">
                    <div style={{"fontSize": "0.9em"}}>5 items</div>
                    <div>₹455</div>
                </div>
                <div className = "d-flex align-items-center px-2 text-white">
                    <div><a className="nav-link" href="/cart">
                    View Cart <FaArrowRight /> 
              </a></div>
                </div>
                </div>
    );
}
