import { Link, NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export const Navigation = () => {

    const setNavStyle = ({ isActive }) => {
        return isActive 
            ? styles['active-link']
            : undefined;
    }

    return (
        <nav>
            <ul>
                <li><NavLink className={setNavStyle} to="/" >Home</NavLink></li>
                <li><NavLink className={setNavStyle} to="/about">About</NavLink></li>
                <li><NavLink className={setNavStyle} to="/contacts">Contacts</NavLink></li>
                <li><NavLink className={setNavStyle} to="/pricing">Pricing</NavLink></li>
                <li><NavLink className={setNavStyle} to="/pricing/premium">Pricing Premium</NavLink></li>
                <li><NavLink className={setNavStyle} to="/planets">Planets</NavLink></li>
            </ul>
        </nav>
    );
};