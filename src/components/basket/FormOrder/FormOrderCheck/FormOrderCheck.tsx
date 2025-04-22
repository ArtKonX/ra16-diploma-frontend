import { ChangeEvent } from 'react';
import './FormOrderCheck.scss';

interface FormOrderGroupProps {
    htmlFor: string,
    labelText: string,
    approvalWithRules: boolean,
    setApprovalWithRules: (approvalWithRules: boolean) => void
}

const FormOrderCheck = (
    { htmlFor, labelText, approvalWithRules, setApprovalWithRules }:
        FormOrderGroupProps) => {


    const onCheck = (e: ChangeEvent<HTMLInputElement>) => {

        const { checked } = e.target;

        setApprovalWithRules(checked)
    }

    return (
        <div className="form-group form-check pt-4 text-start pb-4">
            <input className='float-none form-check-input' checked={approvalWithRules}
                onChange={onCheck} type="checkbox"
                id={htmlFor} />
            <label className="form-check-label ms-1" htmlFor={htmlFor}>
                {labelText}
            </label>
        </div>
    )
}

export default FormOrderCheck