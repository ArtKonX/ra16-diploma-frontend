import { NavLink } from 'react-router-dom';
import './NavLinkMenu.scss';
import { useDispatch } from 'react-redux';
import { resetItems } from '@src/redux/slices/CatalogSlice';

interface Tab {
    to: string,
    title: string
}

const NavLinkMenu = ({ tab }: { tab: Tab }) => {

    const dispatch = useDispatch();

    const onReset = () => {
        dispatch(resetItems())
    }

    return (
        <NavLink onClick={onReset}
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            to={tab.to}
        >
            {tab.title}
        </NavLink>
    )
}

export default NavLinkMenu