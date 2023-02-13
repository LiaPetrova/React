import { Link } from 'react-router-dom';

export const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contacts">Contacts</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/pricing/premium">Pricing Premium</Link></li>
            </ul>
        </nav>
    );
};