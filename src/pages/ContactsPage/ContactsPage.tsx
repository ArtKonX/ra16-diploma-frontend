import './ContactsPage.scss';

import MainBanner from "@components/MainBanner/MainBanner"
import { useEffect } from "react"
import HeadingWithContent from "@components/HeadingWithContent/HeadingWithContent"
import Paragraph from '@ui/Paragraph/Paragraph';
import { Link } from 'react-router-dom';

import bannerSrc from '@assets/images/banner.jpg';

import contactInfo from '@data/contacts/contact-info.json';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@src/redux/store';
import { removeIsSearching } from '@src/redux/slices/CatalogSlice';

const ContactsPage = () => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(removeIsSearching())
    }, [])

    return (
        <div className="row">
            <div className="row p-0">
                <MainBanner textBanner='К весне готовы!' bannerSrc={bannerSrc} />
                <HeadingWithContent classText='top-sales' titleHeading='Контакты'>
                    <Paragraph classInfo='text-start mb-3' text={contactInfo.address} />
                    <h5 className="title-coors text-center">Координаты для связи:</h5>
                    <p className="text-contacts text-start mb-3">
                        Телефон:
                        <Link className='text-decoration-none text-secondary mb-1' to={`tel:${contactInfo.phoneHref}`}>
                            {contactInfo.phone}
                        </Link>
                        ({contactInfo.workingHours})
                    </p>
                    <p className="text-contacts text-start mb-3">
                        Email:
                        <Link className='text-decoration-none text-secondary mb-1' to={`mailto:${contactInfo.email}`}>
                            {contactInfo.email}
                        </Link>
                    </p>
                </HeadingWithContent>
            </div>
        </div>
    )
}

export default ContactsPage