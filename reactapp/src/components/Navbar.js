import { NavLink } from 'react-router-dom';
function Navbar() {
    return (
        <nav className="navBar">
            <ul>
                <li><NavLink exact to="/">Accueil</NavLink></li>
                <li><NavLink to="/connecter">Se connecter</NavLink></li>
                <li><NavLink to="/inscrire">S'inscrire</NavLink></li>
                <li><NavLink to="/calendrier">Calendrier</NavLink></li>

            </ul>
        </nav>
    );
}

export default Navbar;