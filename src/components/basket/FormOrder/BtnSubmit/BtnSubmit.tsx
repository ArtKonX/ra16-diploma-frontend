import './BtnSubmit.scss';

interface BtnSubmitProps {
    textBtn: string,
    approvalWithRules: boolean
}

const BtnSubmit = ({ textBtn, approvalWithRules }: BtnSubmitProps) => {

    return (
        <button disabled={!approvalWithRules} type="submit"
            className="btn btn-outline-secondary">
            {textBtn}
        </button>
    )
}

export default BtnSubmit