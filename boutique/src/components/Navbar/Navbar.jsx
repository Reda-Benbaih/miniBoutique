import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <section className="navbar">
            <div className="logo">
                <NavLink to="/">miniboutique</NavLink>
            </div>
            
            <div className="nav-actions">
                <NavLink to="/add-product" className="btn-add-nav">
                    Ajouter un produit
                </NavLink>
                <button className="btn-mode-test">test</button>
            </div>
        </section>
    );
}

export default Navbar;