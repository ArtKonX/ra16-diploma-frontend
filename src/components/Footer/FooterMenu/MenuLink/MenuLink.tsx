import { NavLink } from 'react-router-dom';
import './MenuLink.scss';

interface MenuLinkProps {
    to: string,
    title: string
}

const MenuLink = ({ to, title }: MenuLinkProps) => {

    return (
        <NavLink
            className={({ isActive }) => isActive ? "nav-link active" :
                "nav-link"}
            to={to}
        >
            {title}
        </NavLink>
    )
}

export default MenuLink