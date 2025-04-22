import './PaySystem.scss';

const PaySystem = ({ namePaySystem }: { namePaySystem: string }) => {

    return (
        <div className={`me-2 footer-pay-systems footer-pay-systems-${namePaySystem}`} />
    )
}

export default PaySystem