import './FooterMenu.scss';

import tabsInfoFooter from '@data/tabs/tabs-info-footer.json'
import MenuLink from './MenuLink/MenuLink';

const FooterMenu = () => {

    return (
        <ul className="nav flex-column">
            {tabsInfoFooter.map(tab => (
                <li key={tab.id} className='nav-item'>
                    <MenuLink to={tab.to} title={tab.title} />
                </li>
            ))}
        </ul>
    )
}

export default FooterMenu