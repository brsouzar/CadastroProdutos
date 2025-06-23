import { Link, NavLink } from "react-router-dom"
import "../pages/NavBarPrincipal.css"
import { useState } from "react"

export const NaviBarPrincipal = () => {
   const [open, setOpen] = useState(false);

    return <nav>
        <Link to="/" className="title">Loja Virtual</Link>
        <div className="menu" onClick={() => {
            setOpen(!open);
        }}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={open ? "open" : ""}>
            <li>
              <NavLink to="/categorias">Categorias</NavLink> 
            </li>
            <li><NavLink to="produtos">Produtos</NavLink> </li>            
        </ul>
    </nav>
}