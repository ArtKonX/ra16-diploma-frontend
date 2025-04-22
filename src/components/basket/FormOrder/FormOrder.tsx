import { FormEvent, useEffect, useState } from 'react';
import BtnSubmit from './BtnSubmit/BtnSubmit';
import './FormOrder.scss';
import FormOrderCheck from './FormOrderCheck/FormOrderCheck';
import FormOrderTextInput from './FormOrderTextInput/FormOrderTextInput';
import { useDispatch } from 'react-redux';
import { fetchOrder } from '@src/redux/slices/OrderDataSlice';
import { AppDispatch } from '@src/redux/store';
import { useSelector } from '@src/hooks/useTypedSelector';
import { selectBasketData } from '@src/selectors/selectors';

const FormOrder = () => {

    const [personalData, setPersonalData] = useState({ phone: '', address: '' });
    const [approvalWithRules, setApprovalWithRules] = useState(false);

    const [successData, setSuccessData] = useState(false);

    const basketData = useSelector(selectBasketData);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if ((personalData.phone.trim().length == 12) &&
            (personalData.address.trim().length > 4) &&
            approvalWithRules) {

            setSuccessData(true)
        } else {
            setSuccessData(false)
        }

    }, [personalData, setPersonalData, approvalWithRules, setApprovalWithRules])

    const onOrder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const orderArray = basketData.basketData.map(elem => ({
            "id": elem.id,
            "price": elem.price,
            "count": elem.count
        }))

        const data = {
            "owner": {
                "phone": personalData.phone,
                "address": personalData.address,
            },
            "items": [...orderArray]
        }

        dispatch(fetchOrder({ data: data }))
    }

    return (
        <>
            <form className="card-body" onSubmit={onOrder}>
                <FormOrderTextInput personalData={personalData} setPersonalData={setPersonalData}
                    name='phone' textLabel='Телефон'
                    placeholderText='Ваш телефон' />
                <FormOrderTextInput personalData={personalData} setPersonalData={setPersonalData}
                    name='address' textLabel='Адрес доставки'
                    placeholderText='Адрес доставки' />
                <FormOrderCheck htmlFor='agreement' labelText='Согласен с правилами доставки'
                    approvalWithRules={approvalWithRules}
                    setApprovalWithRules={setApprovalWithRules} />
                <BtnSubmit textBtn='Оформить' approvalWithRules={successData} />
            </form>
        </>
    )
}

export default FormOrder