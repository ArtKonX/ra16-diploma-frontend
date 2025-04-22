import { ChangeEvent } from 'react';
import './FormOrderTextInput.scss';

interface PersonalData {
    phone: string,
    address: string
}

interface FormOrderGroupProps {
    name: string,
    textLabel: string,
    placeholderText: string,
    personalData: PersonalData,
    setPersonalData: (personalData: PersonalData) => void
}

const FormOrderTextInput = (
    { name, textLabel, placeholderText, personalData, setPersonalData }:
        FormOrderGroupProps) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        let valuePhone = '';

        if (name == 'phone') {
            if (value) {
                valuePhone = '+7' + value.slice(2).replace(/[^\d]/g, '');;
            }
        }

        const newValue = name === 'phone' ? valuePhone?.slice(0, 12) : value;

        setPersonalData({ ...personalData, [name]: newValue })
    }

    return (
        <div className="form-group text-start">
            <label className='pb-2 pt-4 order-label' htmlFor={name}>{textLabel}</label>
            <input value={personalData[name]} name={name} onChange={onChange}
                className="form-control" id={name}
                placeholder={placeholderText} />
        </div>
    )
}

export default FormOrderTextInput