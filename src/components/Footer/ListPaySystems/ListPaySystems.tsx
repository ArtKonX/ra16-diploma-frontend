import './ListPaySystems.scss';

import paySystems from '@data/footer/pay-systems.json';
import PaySystem from './PaySystem/PaySystem';

const ListPaySystems = () => {

    return (
        <div className="footer-pay m-0 mt-2">
            <ul className="footer-paysystem-list">
                {paySystems.map(paySystem => (<li key={paySystem.id}>
                    <PaySystem namePaySystem={paySystem.name} />
                </li>))}
            </ul>
        </div>
    )
}

export default ListPaySystems