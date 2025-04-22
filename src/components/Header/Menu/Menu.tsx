import tabsInfo from '@data/tabs/tabs-info.json';
import Logo from '../Logo/Logo';

import srcLogo from "@assets/images/header-logo.png";
import NavLinkMenu from './NavLinkMenu/NavLinkMenu';

const Menu = () => {

    return (
        <nav className="navbar navbar-expand-sm navbar-light w-auto">
            <Logo srcLogo={srcLogo} alt="Bosa Noga" />
            <div className="collapse navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                    {tabsInfo.map(tab => (
                        <li className="nav-item" key={tab.id}>
                            <NavLinkMenu tab={tab} />
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Menu