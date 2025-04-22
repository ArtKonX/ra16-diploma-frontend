import { useDispatch } from 'react-redux';
import './ResultOrderMessage.scss';
import { useNavigate } from 'react-router-dom';
import { resetBasket } from '@src/redux/slices/BasketSlice';
import { resetError, resetSuccess } from '@src/redux/slices/OrderDataSlice';

interface ResultOrderMessageProps {
    status: string,
    titleText: string,
    text: string,
    thankfulness: string
}

const ResultOrderMessage = (
    { status, titleText, text, thankfulness }:
        ResultOrderMessageProps) => {

    const dispatch = useDispatch();
    const navigator = useNavigate();

    const onClose = () => {
        if (status === 'success') {
            dispatch(resetBasket());
            dispatch(resetSuccess());
            navigator('/')
        } else {
            dispatch(resetError());
        }
    }

    return (
        <div className="message-container">
            <div className={`${status}-message`}>
                <button className='close-btn' onClick={onClose}>x</button>
                <h3 className={`${status}-message__title`}>{titleText}</h3>
                <div className={`${status}-message__text`}>
                    <p className="text">{text}</p>
                    <p className="request">{thankfulness}</p>
                </div>
            </div>
        </div>
    )
}

export default ResultOrderMessage