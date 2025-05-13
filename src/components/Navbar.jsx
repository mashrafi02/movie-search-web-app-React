import {NavLink} from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>LOGO</h1>
            <ul>
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to='/favorites'>Favorites</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;